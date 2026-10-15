// Serverseitige Validierungs- und Spamschutz-Helfer, die von allen Formularen geteilt werden.

/** Mindestdauer zwischen Rendern und Absenden, darunter gilt die Anfrage als Bot. */
export const MIN_FILL_MS = 3000

/** E-Mail: name@domain.tld, TLD nur Buchstaben (min. 2), keine doppelten/führenden/abschließenden Punkte. */
export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false
  const trimmed = email.trim()
  if (trimmed.length > 254) return false
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return false
  if (trimmed.includes("..")) return false
  const [local, domain] = trimmed.split("@")
  if (!local || !domain) return false
  if (local.startsWith(".") || local.endsWith(".")) return false
  if (domain.startsWith(".") || domain.endsWith(".")) return false
  return true
}

/** Telefon gilt als plausibel, wenn mindestens 6 Ziffern enthalten sind. */
export function isValidPhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false
  return (phone.match(/\d/g) ?? []).length >= 6
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** Die Einsendungs-ID muss eine UUID sein (vom Browser kryptografisch erzeugt). */
export function isSubmissionId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value)
}

/** Kürzt und trimmt Freitext; nicht-Strings werden zu "". */
export function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, max)
}

export type SpamReason = "honeypot" | "too_fast"

/**
 * Erkennt Bots: gefülltes Honeypot-Feld oder zu schnelles Absenden.
 * Ein leeres Honeypot-Feld lässt die Anfrage immer passieren.
 */
export function detectSpam(input: {
  honeypot: unknown
  renderedAt: unknown
  now: number
}): SpamReason | null {
  const honeypot = typeof input.honeypot === "string" ? input.honeypot.trim() : ""
  if (honeypot.length > 0) return "honeypot"

  const renderedAt = typeof input.renderedAt === "number" ? input.renderedAt : Number.NaN
  if (!Number.isFinite(renderedAt) || renderedAt > input.now) return "too_fast"
  if (input.now - renderedAt < MIN_FILL_MS) return "too_fast"
  return null
}

/** Ermittelt die Client-IP aus den üblichen Proxy-Headern. */
export function clientIpFrom(headers: { get(name: string): string | null }): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() || headers.get("x-real-ip") || "unknown"
}
