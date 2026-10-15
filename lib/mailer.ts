/** Maximale Wartezeit auf den Versanddienst. Danach gilt der Versand als ungeklärt, nicht als Erfolg. */
export const MAIL_TIMEOUT_MS = 15_000

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email"

/** Die E-Mail-Vorlagen referenzieren das Logo als CID; die Brevo-API kennt keine Inline-Anhänge. */
const LOGO_CID_REFERENCE = "cid:blitzeblank-logo"

export interface MailAttachment {
  filename: string
  content?: string
  path?: string
  contentId?: string
  contentType?: string
}

export interface MailMessage {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  text: string
  attachments?: MailAttachment[]
}

export type MailFailure = "not_configured" | "provider_error" | "timeout"

/**
 * `ok: true` bedeutet ausschließlich: Der Versanddienst hat die Nachricht
 * angenommen und eine ID vergeben. Das ist kein Beleg für die Zustellung im Postfach.
 */
export type MailResult = { ok: true; id: string } | { ok: false; reason: MailFailure }

export type Mailer = (message: MailMessage, options: { idempotencyKey: string }) => Promise<MailResult>

interface BrevoAttachment {
  name: string
  content?: string
  url?: string
}

interface BrevoPayload {
  sender: { email: string; name?: string }
  to: { email: string }[]
  replyTo?: { email: string }
  subject: string
  htmlContent: string
  textContent: string
  attachment?: BrevoAttachment[]
}

/** Öffentlich erreichbare Logo-URL. Per `EMAIL_LOGO_URL` überschreibbar, z. B. vor dem Domainwechsel. */
export function emailLogoUrl(): string {
  const explicit = process.env.EMAIL_LOGO_URL?.trim()
  if (explicit) return explicit
  const site = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://blitzeblank.lu").replace(/\/+$/, "")
  return `${site}/images/logo.png`
}

/** Zerlegt `Name <adresse@domain>` in Name und Adresse. */
export function parseAddress(value: string): { email: string; name?: string } {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (!match) return { email: value.trim() }
  return { email: match[2].trim(), name: match[1].replace(/^"|"$/g, "") || undefined }
}

function senderFor(message: MailMessage): { email: string; name?: string } {
  const email = process.env.BREVO_FROM_EMAIL?.trim()
  if (email) return { email, name: process.env.BREVO_FROM_NAME?.trim() || undefined }
  return parseAddress(message.from)
}

export function buildBrevoPayload(message: MailMessage, options: { includeRemoteAttachments: boolean }): BrevoPayload {
  const attachment: BrevoAttachment[] = []
  for (const item of message.attachments ?? []) {
    if (item.contentId) continue
    if (item.content) attachment.push({ name: item.filename, content: item.content })
    else if (item.path && options.includeRemoteAttachments) attachment.push({ name: item.filename, url: item.path })
  }

  return {
    sender: senderFor(message),
    to: [{ email: message.to }],
    replyTo: message.replyTo ? { email: message.replyTo } : undefined,
    subject: message.subject,
    htmlContent: message.html.split(LOGO_CID_REFERENCE).join(emailLogoUrl()),
    textContent: message.text,
    attachment: attachment.length > 0 ? attachment : undefined,
  }
}

interface BrevoResponse {
  status: number
  body: { messageId?: string; code?: string; message?: string }
}

async function postToBrevo(payload: BrevoPayload, apiKey: string): Promise<BrevoResponse> {
  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(MAIL_TIMEOUT_MS),
  })
  const body = (await response.json().catch(() => ({}))) as BrevoResponse["body"]
  return { status: response.status, body }
}

/**
 * Brevo bietet keinen Idempotenz-Schlüssel. Innerhalb dieses Prozesses wird eine
 * bereits angenommene Mail deshalb nicht erneut gesendet, wenn derselbe Schlüssel wiederkehrt.
 */
const SENT_TTL_MS = 60 * 60 * 1000
const SENT_MAX_ENTRIES = 1000
const sentMessages = new Map<string, { id: string; at: number }>()

function rememberSent(key: string, id: string): void {
  const now = Date.now()
  for (const [existing, entry] of sentMessages) {
    if (now - entry.at > SENT_TTL_MS || sentMessages.size >= SENT_MAX_ENTRIES) sentMessages.delete(existing)
  }
  sentMessages.set(key, { id, at: now })
}

function recallSent(key: string): string | null {
  const entry = sentMessages.get(key)
  if (!entry) return null
  if (Date.now() - entry.at > SENT_TTL_MS) {
    sentMessages.delete(key)
    return null
  }
  return entry.id
}

export function resetSentMessagesForTests(): void {
  sentMessages.clear()
}

export const brevoMailer: Mailer = async (message, { idempotencyKey }) => {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) return { ok: false, reason: "not_configured" }

  const already = recallSent(idempotencyKey)
  if (already) return { ok: true, id: already }

  try {
    let result = await postToBrevo(buildBrevoPayload(message, { includeRemoteAttachments: true }), apiKey)

    // Eine abgewiesene Anfrage hat keine Mail erzeugt. Mit nicht abrufbaren Anhang-URLs
    // (z. B. lokale Vorschau) wird einmal ohne diese Anhänge wiederholt; die Links stehen im Mailtext.
    const hasRemoteAttachments = message.attachments?.some((a) => a.path && !a.contentId) ?? false
    if (result.status >= 400 && result.status < 500 && result.status !== 401 && hasRemoteAttachments) {
      result = await postToBrevo(buildBrevoPayload(message, { includeRemoteAttachments: false }), apiKey)
    }

    if (result.status >= 200 && result.status < 300 && result.body.messageId) {
      rememberSent(idempotencyKey, result.body.messageId)
      return { ok: true, id: result.body.messageId }
    }

    console.log(
      `[v0] Brevo hat die Nachricht nicht angenommen: HTTP ${result.status} ${result.body.code ?? ""} ${result.body.message ?? ""}`.trim(),
    )
    return { ok: false, reason: "provider_error" }
  } catch (error) {
    if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
      return { ok: false, reason: "timeout" }
    }
    console.log("[v0] Brevo nicht erreichbar:", error instanceof Error ? error.name : "unknown")
    return { ok: false, reason: "provider_error" }
  }
}
