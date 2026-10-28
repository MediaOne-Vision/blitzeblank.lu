"use server"

import { headers } from "next/headers"
import { buildContactCustomerEmail, buildContactInternalEmail } from "@/lib/contact-email"
import { runFormPipeline } from "@/lib/form-pipeline"
import { clientIpFrom, clip, isValidEmail, isValidPhone } from "@/lib/form-security"
import { internalRecipient } from "@/lib/mailer"
import { logoAttachment } from "@/lib/quote-email"
import type { SubmitResult } from "@/lib/form-types"

const FROM_ADDRESS = "Blitzeblank <no-reply@mail.blitzeblank.lu>"

const SERVICE_LABELS: Record<string, string> = {
  industrie: "Industriereinigung",
  fenster: "Fensterreinigung",
  stein: "Steinreinigung",
  fassade: "Fassadenreinigung",
  sonstiges: "Sonstiges",
}

export interface SubmitContactInput {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
  consent: boolean
  locale: "de" | "en" | "fr"
  honeypot: string
  renderedAt: number
  submissionId: string
}

export async function submitContact(input: SubmitContactInput): Promise<SubmitResult> {
  const h = await headers()
  const name = clip(input.name, 120)
  const company = clip(input.company, 160)
  const email = clip(input.email, 200)
  const phone = clip(input.phone, 40)
  const message = clip(input.message, 5000)
  const service = SERVICE_LABELS[input.service] ? input.service : ""
  const locale: "de" | "en" | "fr" = input.locale === "en" || input.locale === "fr" ? input.locale : "de"

  return runFormPipeline({
    kind: "contact",
    submissionId: input.submissionId,
    honeypot: input.honeypot,
    renderedAt: input.renderedAt,
    ip: clientIpFrom(h),
    fingerprint: { name, company, email, phone, service, message },
    validate: () => {
      if (!name || !message || input.consent !== true) return "missing_fields"
      if (!isValidEmail(email)) return "invalid_email"
      if (phone && !isValidPhone(phone)) return "invalid_contact"
      return null
    },
    buildMails: (leadId) => {
      const submission = {
        name,
        company,
        email,
        phone,
        service,
        serviceLabel: SERVICE_LABELS[service] ?? "",
        message,
        locale,
        leadId,
      }
      const internal = buildContactInternalEmail(submission)
      const customer = buildContactCustomerEmail(submission)
      return {
        internal: { from: FROM_ADDRESS, to: internalRecipient(), replyTo: email, ...internal, attachments: [logoAttachment] },
        customer: { from: FROM_ADDRESS, to: email, ...customer, attachments: [logoAttachment] },
      }
    },
    claims: { ft: "contact", svc: service || undefined },
  })
}
