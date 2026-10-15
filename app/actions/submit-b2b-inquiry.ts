"use server"

import { headers } from "next/headers"
import {
  buildB2BCustomerEmail,
  buildB2BInternalEmail,
  type B2BInquirySubmission,
} from "@/lib/b2b-inquiry-email"
import { runFormPipeline } from "@/lib/form-pipeline"
import { clientIpFrom, clip, isValidEmail, isValidPhone } from "@/lib/form-security"
import { internalRecipient } from "@/lib/mailer"
import { logoAttachment } from "@/lib/quote-email"
import type { SubmitResult } from "@/lib/form-types"

const FROM_ADDRESS = "Blitzeblank <no-reply@mail.blitzeblank.lu>"

export interface SubmitB2BInput {
  submission: B2BInquirySubmission
  honeypot: string
  renderedAt: number
  submissionId: string
}

export async function submitB2BInquiry(input: SubmitB2BInput): Promise<SubmitResult> {
  const h = await headers()
  const s = input.submission
  const clean: B2BInquirySubmission = {
    ...s,
    company: clip(s.company, 160),
    contactPerson: clip(s.contactPerson, 120),
    location: clip(s.location, 160),
    email: clip(s.email, 200),
    phone: clip(s.phone, 40),
    message: clip(s.message, 5000),
  }

  return runFormPipeline({
    kind: "b2b",
    submissionId: input.submissionId,
    honeypot: input.honeypot,
    renderedAt: input.renderedAt,
    ip: clientIpFrom(h),
    fingerprint: { ...clean, leadId: undefined },
    validate: () => {
      if (!clean.company || !clean.contactPerson || !clean.location) return "missing_fields"
      if (!clean.email && !clean.phone) return "invalid_contact"
      if (clean.email && !isValidEmail(clean.email)) return "invalid_email"
      if (!clean.email && !isValidPhone(clean.phone)) return "invalid_contact"
      return null
    },
    buildMails: (leadId) => {
      const full = { ...clean, leadId }
      const internal = buildB2BInternalEmail(full)
      // Kundenbestätigung nur bei gültiger E-Mail (Telefon-only erhält keine Mail).
      const customer = full.email ? buildB2BCustomerEmail(full) : null
      return {
        internal: {
          from: FROM_ADDRESS,
          to: internalRecipient(),
          replyTo: full.email || undefined,
          ...internal,
          attachments: [logoAttachment],
        },
        customer: customer
          ? { from: FROM_ADDRESS, to: full.email, ...customer, attachments: [logoAttachment] }
          : null,
      }
    },
    claims: { ft: "window_b2b", svc: "window_cleaning" },
  })
}
