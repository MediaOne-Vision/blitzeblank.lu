import { createHash, createHmac, timingSafeEqual } from "node:crypto"
import type { LeadClaims } from "@/lib/form-types"

/** Der Erfolgsnachweis ist nur kurz gültig: Formular absenden, weiterleiten, Event feuern. */
export const PROOF_TTL_MS = 15 * 60 * 1000

/**
 * Signierschlüssel. Bevorzugt `LEAD_PROOF_SECRET`; ohne diese Variable wird ein
 * Schlüssel aus dem Brevo-Key abgeleitet. Ohne beides gibt es keinen Nachweis.
 */
function getSecret(): string | null {
  const explicit = process.env.LEAD_PROOF_SECRET
  if (explicit && explicit.length >= 16) return explicit
  const apiKey = process.env.BREVO_API_KEY
  if (apiKey) return createHash("sha256").update(`bb-lead-proof:${apiKey}`).digest("hex")
  return null
}

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url")
}

/**
 * Erzeugt einen signierten Nachweis. Er enthält ausschließlich technische
 * Kennungen und Formularmerkmale, keine Namen, E-Mail-Adressen oder Telefonnummern.
 */
export function signLeadProof(claims: Omit<LeadClaims, "exp">, now = Date.now()): string | null {
  const secret = getSecret()
  if (!secret) return null
  const body = Buffer.from(JSON.stringify({ ...claims, exp: now + PROOF_TTL_MS })).toString("base64url")
  return `${body}.${sign(body, secret)}`
}

/** Prüft Signatur und Ablauf. Gibt die Claims zurück oder null. */
export function verifyLeadProof(token: unknown, now = Date.now()): LeadClaims | null {
  if (typeof token !== "string" || token.length > 2000) return null
  const secret = getSecret()
  if (!secret) return null

  const [body, signature, extra] = token.split(".")
  if (!body || !signature || extra !== undefined) return null

  const expected = Buffer.from(sign(body, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null

  try {
    const claims = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as LeadClaims
    if (typeof claims.lid !== "string" || typeof claims.ft !== "string") return null
    if (typeof claims.exp !== "number" || claims.exp < now) return null
    return claims
  } catch {
    return null
  }
}
