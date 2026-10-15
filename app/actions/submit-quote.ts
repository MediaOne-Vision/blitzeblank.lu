"use server"

import { headers } from "next/headers"
import { runFormPipeline } from "@/lib/form-pipeline"
import { clientIpFrom, isValidEmail } from "@/lib/form-security"
import {
  buildCustomerEmail,
  buildInternalEmail,
  logoAttachment,
  photoUrl,
  type QuoteSubmission,
} from "@/lib/quote-email"
import type { LeadStatus, QuoteType, SubmitResult } from "@/lib/form-types"

const FROM_ADDRESS = "Blitzeblank <noreply@mail.blitzeblank.lu>"
const INTERNAL_RECIPIENT = "info@blitzeblank.lu"

/** Baut die aktuelle Origin-URL, um absolute Links (z. B. zu Fotos) zu erzeugen */
async function getBaseUrl(): Promise<string> {
  try {
    const h = await headers()
    const host = h.get("x-forwarded-host") ?? h.get("host")
    const proto = h.get("x-forwarded-proto") ?? "https"
    if (host) return `${proto}://${host}`
  } catch {
    // headers() nicht verfügbar – Fallback unten
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://blitzeblank.lu"
}

export interface SubmitQuoteInput {
  submission: Omit<QuoteSubmission, "leadId">
  /** Tracking-Werte aus dem Rechner (Richtpreis, kein Umsatz). */
  tracking: { quoteType: QuoteType; quoteValue?: number }
  honeypot: string
  renderedAt: number
  submissionId: string
}

export async function submitQuote(input: SubmitQuoteInput): Promise<SubmitResult> {
  const { submission } = input
  const h = await headers()
  const baseUrl = await getBaseUrl()

  const decision = submission.decision === "accepted" ? "accepted" : "declined"
  const leadStatus: LeadStatus = decision === "accepted" ? "accepted" : "price_rejected"
  const qv = input.tracking.quoteValue
  const quoteValue = typeof qv === "number" && Number.isFinite(qv) && qv > 0 && qv < 10_000_000 ? Math.round(qv) : undefined

  return runFormPipeline({
    kind: "quote",
    submissionId: input.submissionId,
    honeypot: input.honeypot,
    renderedAt: input.renderedAt,
    ip: clientIpFrom(h),
    fingerprint: { ...submission, photos: submission.photos?.map((p) => p.pathname), leadId: undefined },
    validate: () => {
      if (!submission.name?.trim() || !submission.service || !submission.address?.trim()) return "missing_fields"
      if (!isValidEmail(submission.email)) return "invalid_email"
      return null
    },
    buildMails: (leadId) => {
      const full: QuoteSubmission = { ...submission, decision, leadId }
      const customerEmail = buildCustomerEmail(full)
      const internalEmail = buildInternalEmail(full, baseUrl)

      const photoAttachments = (full.photos ?? []).map((p, i) => {
        const ext = p.name.split(".").pop()?.toLowerCase()
        const safeExt = ext && /^[a-z0-9]+$/.test(ext) ? ext : "jpg"
        return { filename: `Foto-${i + 1}.${safeExt}`, path: photoUrl(baseUrl, p.pathname) }
      })

      return {
        internal: {
          from: FROM_ADDRESS,
          to: INTERNAL_RECIPIENT,
          replyTo: full.email,
          subject: internalEmail.subject,
          html: internalEmail.html,
          text: internalEmail.text,
          attachments: [logoAttachment, ...photoAttachments],
        },
        customer: {
          from: FROM_ADDRESS,
          to: full.email,
          subject: customerEmail.subject,
          html: customerEmail.html,
          text: customerEmail.text,
          attachments: [logoAttachment],
        },
      }
    },
    claims: {
      ft: "quote_calculator",
      st: leadStatus,
      svc: submission.service,
      qt: input.tracking.quoteType === "onetime" ? "onetime" : "recurring",
      // Bei abgelehntem Richtpreis wird kein Wert mitgeführt.
      qv: leadStatus === "accepted" ? quoteValue : undefined,
    },
  })
}
