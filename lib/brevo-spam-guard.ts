// deployment-center:brevo-spam-guard v3
// Schutzschicht vor dem Brevo-Versand. Erkannter Spam wird still verworfen (Antwort wie bei Erfolg),
// damit Bots nichts über den Filter lernen. Wird vom Deployment Center verwaltet und bei Updates überschrieben.
// Feineinstellung per Umgebungsvariable: BREVO_GUARD_MAX_PER_HOUR (Standard 30 Mails), BREVO_GUARD_MAX_PER_DAY (Standard 150 Mails),
// BREVO_GUARD_MAX_PER_IP (Standard 10), BREVO_GUARD_ALLOW_NON_LATIN=1 (Nachrichten in kyrillischer, chinesischer,
// arabischer Schrift usw. zulassen).

type Address = { email?: string }
type Payload = { to?: Address[]; replyTo?: Address; subject?: string; textContent?: string; htmlContent?: string }
type Check = { reason: string | null; commit: () => void }

const HOUR = 60 * 60 * 1000
const events = new Map<string, number[]>()
const blockedSenders = new Map<string, number>()
const sentBodies = new Map<string, number>()

const DISPOSABLE = [
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', 'yopmail.com', 'yopmail.fr',
  'tempmail.com', 'temp-mail.org', 'temp-mail.io', '10minutemail.com', '10minutemail.net', 'trashmail.com',
  'trashmail.de', 'getnada.com', 'dispostable.com', 'maildrop.cc', 'throwawaymail.com', 'fakeinbox.com',
  'mailnesia.com', 'mintemail.com', 'spamgourmet.com', 'tempail.com', 'emailondeck.com', 'moakt.com',
  'mohmal.com', 'burnermail.io', 'wegwerfmail.de', 'einrot.com', 'cuvox.de', 'armyspy.com', 'dayrep.com',
  'fleckens.hu', 'gustr.com', 'jourrapide.com', 'rhyta.com', 'superrito.com', 'teleworm.us',
]

const SPAM_WORDS = [
  'casino', 'viagra', 'cialis', 'bitcoin', 'crypto', 'forex', 'binance', 'usdt', 'airdrop', 'nft ',
  'backlink', 'link building', 'linkbuilding', 'guest post', 'domain authority', 'seo service', 'seo-service',
  'seo agency', 'seo-agentur', 'website traffic', 'web traffic', 'rank higher', 'google ranking',
  'first page of google', 'erste seite bei google', 'payday loan', 'kredit ohne schufa', 'make money',
  'geld verdienen', 'passive income', 'passives einkommen', 'investment opportunity', 'you have won',
  'sie haben gewonnen', 'lottery', 'porn', 'escort', 'dating', 'click here', 'jetzt klicken', 'telegram',
]

function limit(name: string, fallback: number): number {
  const value = Number(process.env[name])
  return Number.isFinite(value) && value > 0 ? value : fallback
}

function count(key: string, windowMs: number): number {
  const now = Date.now()
  const list = (events.get(key) ?? []).filter((t) => now - t < windowMs)
  if (list.length > 0) events.set(key, list)
  else events.delete(key)
  return list.length
}

function record(key: string): void {
  if (events.size > 5000) events.clear()
  const list = events.get(key) ?? []
  list.push(Date.now())
  events.set(key, list)
}

function isActive(map: Map<string, number>, key: string): boolean {
  const until = map.get(key)
  if (until === undefined) return false
  if (until < Date.now()) {
    map.delete(key)
    return false
  }
  return true
}

function remember(map: Map<string, number>, key: string, ms: number): void {
  if (map.size > 2000) map.clear()
  map.set(key, Date.now() + ms)
}

function isDisposable(email: string): boolean {
  const domain = email.split('@')[1] ?? ''
  return DISPOSABLE.indexOf(domain) !== -1
}

function visibleText(payload: Payload): string {
  const raw = payload.textContent && payload.textContent.trim() ? payload.textContent : payload.htmlContent ?? ''
  return raw
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .slice(0, 20000)
}

function ownDomains(): string[] {
  const domain = String(process.env.BREVO_FROM_MAIL ?? '').split('@')[1]
  return domain ? [domain.toLowerCase().replace(/^www\./, '')] : []
}

function externalHosts(text: string): string[] {
  const own = ownDomains()
  const found = text.match(/(?:https?:\/\/|www\.)[^\s<>"')\]]+/gi) ?? []
  const hosts: string[] = []
  for (const link of found) {
    const host = (link.replace(/^https?:\/\//i, '').split(/[\/?#:]/)[0] ?? '').toLowerCase().replace(/^www\./, '')
    if (!host || host.endsWith('.vercel.app') || host.endsWith('.project.space')) continue
    if (own.some((d) => host === d || host.endsWith('.' + d))) continue
    if (hosts.indexOf(host) === -1) hosts.push(host)
  }
  return hosts
}

function nonLatinShare(text: string): { letters: number; share: number } {
  let letters = 0
  let foreign = 0
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i)
    const isForeign =
      (code >= 0x0400 && code <= 0x04ff) ||
      (code >= 0x0600 && code <= 0x06ff) ||
      (code >= 0x0e00 && code <= 0x0e7f) ||
      (code >= 0x3040 && code <= 0x30ff) ||
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0xac00 && code <= 0xd7af)
    const char = text.charAt(i)
    if (isForeign) {
      letters++
      foreign++
    } else if (char.toLowerCase() !== char.toUpperCase()) {
      letters++
    }
  }
  return { letters, share: letters > 0 ? foreign / letters : 0 }
}

function contentVerdict(text: string): string | null {
  const lower = text.toLowerCase()
  const words = SPAM_WORDS.filter((word) => lower.indexOf(word) !== -1)
  const hosts = externalHosts(text)
  if (hosts.length >= 3) return 'zu-viele-links'
  if (words.length >= 2) return 'spam-woerter'
  if (words.length >= 1 && hosts.length >= 1) return 'spam-wort-mit-link'
  if (process.env.BREVO_GUARD_ALLOW_NON_LATIN !== '1') {
    const script = nonLatinShare(text)
    if (script.letters >= 30 && script.share > 0.5) return 'fremde-schrift'
  }
  return null
}

function hash(text: string): string {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0
  return String(h)
}

async function clientIp(): Promise<string | null> {
  try {
    const mod = await import('next/headers')
    const h = await mod.headers()
    const cloudflare = h.get('cf-connecting-ip')
    if (cloudflare) return cloudflare.trim()
    const real = h.get('x-real-ip')
    if (real) return real.trim()
    const forwarded = h.get('x-forwarded-for')
    if (forwarded) {
      const parts = forwarded.split(',')
      return (parts[parts.length - 1] ?? '').trim() || null
    }
  } catch {
    return null
  }
  return null
}

async function inspect(init?: RequestInit): Promise<Check> {
  const pass: Check = { reason: null, commit: () => undefined }
  if (!init || typeof init.body !== 'string') return pass
  let payload: Payload
  try {
    payload = JSON.parse(init.body) as Payload
  } catch {
    return pass
  }
  const recipients = (payload.to ?? []).map((a) => String(a.email ?? '').toLowerCase()).filter(Boolean)
  if (recipients.length === 0) return pass

  const internalTargets = String(process.env.CONTACT_TO_MAIL ?? '')
    .split(/[;,]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  const internal = internalTargets.length > 0 && recipients.every((r) => internalTargets.indexOf(r) !== -1)
  const replyTo = String(payload.replyTo?.email ?? '').toLowerCase()
  const text = internal ? visibleText(payload) : ''
  const bodyKey = internal ? hash(replyTo + '|' + text) : ''
  const ip = await clientIp()

  let reason: string | null = null
  if (ip && count('strike:' + ip, HOUR) >= 3) reason = 'ip-gesperrt'
  else if (count('all', HOUR) >= limit('BREVO_GUARD_MAX_PER_HOUR', 30)) reason = 'flut'
  else if (count('day', 24 * HOUR) >= limit('BREVO_GUARD_MAX_PER_DAY', 150)) reason = 'tages-flut'
  else if (ip && count('ip:' + ip, HOUR) >= limit('BREVO_GUARD_MAX_PER_IP', 10)) reason = 'ip-limit'
  else if (internal) {
    if (replyTo && isDisposable(replyTo)) reason = 'wegwerf-adresse'
    else if (/(https?:\/\/|www\.)/i.test(String(payload.subject ?? ''))) reason = 'link-im-betreff'
    else if (replyTo && count('from:' + replyTo, 24 * HOUR) >= 3) reason = 'absender-limit'
    else reason = contentVerdict(text)
    if (!reason && isActive(sentBodies, bodyKey)) reason = 'duplikat'
  } else if (recipients.some((r) => isActive(blockedSenders, r))) reason = 'gesperrter-absender'
  else if (recipients.some((r) => isDisposable(r))) reason = 'wegwerf-adresse'
  else if (recipients.some((r) => count('rcpt:' + r, HOUR) >= 2)) reason = 'empfaenger-limit'

  if (reason) {
    if (ip && reason !== 'duplikat') record('strike:' + ip)
    if (internal && replyTo && reason !== 'duplikat') remember(blockedSenders, replyTo, 30 * 60 * 1000)
    return { reason, commit: () => undefined }
  }

  return {
    reason: null,
    commit: () => {
      record('all')
      record('day')
      if (ip) record('ip:' + ip)
      if (internal && replyTo) record('from:' + replyTo)
      if (internal) remember(sentBodies, bodyKey, 10 * 60 * 1000)
      else for (const r of recipients) record('rcpt:' + r)
    },
  }
}

/** Ersatz für fetch() beim Aufruf der Brevo-API. Gleiche Signatur, gleiche Antwort. */
export async function guardedBrevoFetch(input: Parameters<typeof fetch>[0], init?: RequestInit): Promise<Response> {
  let check: Check = { reason: null, commit: () => undefined }
  try {
    check = await inspect(init)
  } catch {
    check = { reason: null, commit: () => undefined }
  }
  if (check.reason) {
    console.warn('[brevo-guard] Mail verworfen: ' + check.reason)
    return new Response(JSON.stringify({ messageId: '<verworfen-' + check.reason + '>' }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    })
  }
  const response = await fetch(input, init)
  if (response.ok) check.commit()
  return response
}
