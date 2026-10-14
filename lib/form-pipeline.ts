import { createHash } from "node:crypto"
import { isRateLimited } from "@/lib/simple-rate-limit"
import { detectSpam, isSubmissionId } from "@/lib/form-security"
import { signLeadProof } from "@/lib/lead-proof"
import { resendMailer, type MailMessage, type Mailer } from "@/lib/mailer"
import type { FormErrorCode, LeadClaims, SubmitResult } from "@/lib/form-types"

export interface MailPair {
  /** Interne Benachrichtigung – ihre Annahme durch den Versanddienst entscheidet über den Erfolg. */
  internal: MailMessage
  /** Eingangsbestätigung an den Absender – best-effort, ein Fehler lässt die Einsendung nicht scheitern. */
  customer?: MailMessage | null
}

export interface PipelineOptions {
  kind: "quote" | "stone" | "b2b" | "contact"
  /** Vom Browser erzeugte UUID; bleibt bei Netzwerk-Neuversuchen identisch. */
  submissionId: unknown
  honeypot: unknown
  renderedAt: unknown
  ip: string
  /** Bereinigte Nutzdaten – fließen in den Idempotenz-Schlüssel ein. */
  fingerprint: unknown
  /** Fachliche Prüfung nach dem Spamschutz. Gibt einen Fehlercode oder null zurück. */
  validate: () => FormErrorCode | null
  buildMails: (leadId: string) => MailPair
  claims: Omit<LeadClaims, "lid" | "exp">
  /** Rate-Limit-Fenster (Standard: 5 Absendungen je IP in 10 Minuten). */
  rateLimit?: { max: number; windowMs: number }
  mailer?: Mailer
  now?: () => number
}

const DEFAULT_RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

/** Die Lead-ID leitet sich eindeutig von der Einsendungs-ID ab. */
export function leadIdFor(submissionId: string): string {
  return `BB-${submissionId.toLowerCase()}`
}

function idempotencyBase(kind: string, submissionId: string, fingerprint: unknown): string {
  const hash = createHash("sha256").update(JSON.stringify(fingerprint)).digest("hex").slice(0, 16)
  return `bb-${kind}-${submissionId.toLowerCase()}-${hash}`
}

/**
 * Gemeinsamer Ablauf aller Formulare:
 * Spamschutz → Validierung → Rate-Limit → Versand der internen Mail →
 * (best-effort) Kundenbestätigung → signierter Erfolgsnachweis.
 *
 * Erfolg wird erst gemeldet, wenn der Versanddienst die interne Mail angenommen hat.
 */
export async function runFormPipeline(options: PipelineOptions): Promise<SubmitResult> {
  const now = options.now?.() ?? Date.now()
  const mailer = options.mailer ?? resendMailer

  const spam = detectSpam({ honeypot: options.honeypot, renderedAt: options.renderedAt, now })
  if (spam) {
    console.log(`[v0] ${options.kind}: Spamschutz (${spam}) – neutrale Antwort, kein Lead`)
    return { status: "neutral" }
  }

  if (!isSubmissionId(options.submissionId)) return { status: "error", code: "validation" }
  const submissionId = options.submissionId

  const invalid = options.validate()
  if (invalid) return { status: "error", code: invalid }

  if (isRateLimited(`${options.kind}:${options.ip}`, options.rateLimit ?? DEFAULT_RATE_LIMIT)) {
    console.log(`[v0] ${options.kind}: Rate-Limit erreicht`)
    return { status: "error", code: "rate_limited" }
  }

  const leadId = leadIdFor(submissionId)
  const base = idempotencyBase(options.kind, submissionId, options.fingerprint)
  const mails = options.buildMails(leadId)

  const internal = await mailer(mails.internal, { idempotencyKey: `${base}-int` })
  if (!internal.ok) {
    console.log(`[v0] ${options.kind}: interne Mail nicht angenommen (${internal.reason})`)
    return { status: "error", code: internal.reason === "not_configured" ? "not_configured" : "delivery_failed" }
  }

  if (mails.customer) {
    const customer = await mailer(mails.customer, { idempotencyKey: `${base}-cus` })
    if (!customer.ok) console.log(`[v0] ${options.kind}: Kundenbestätigung nicht angenommen (${customer.reason})`)
  }

  const proof = signLeadProof({ ...options.claims, lid: leadId }, now)

  return { status: "confirmed", leadId, proof }
}
