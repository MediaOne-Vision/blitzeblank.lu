"use server"

import { headers } from "next/headers"
import { runFormPipeline } from "@/lib/form-pipeline"
import { clientIpFrom, isValidEmail } from "@/lib/form-security"
import {
  buildStoneOfferCustomerEmail,
  buildStoneOfferInternalEmail,
  logoAttachment,
  type StoneOfferSubmission,
} from "@/lib/stone-offer-email"
import { internalRecipient } from "@/lib/mailer"
import type { SubmitResult } from "@/lib/form-types"

const FROM_ADDRESS = "Blitzeblank <no-reply@mail.blitzeblank.lu>"

export interface SubmitStoneOfferInput {
  submission: Omit<StoneOfferSubmission, "leadId">
  honeypot: string
  renderedAt: number
  submissionId: string
}

export async function submitStoneOffer(input: SubmitStoneOfferInput): Promise<SubmitResult> {
  const { submission } = input
  const h = await headers()

  return runFormPipeline({
    kind: "stone",
    submissionId: input.submissionId,
    honeypot: input.honeypot,
    renderedAt: input.renderedAt,
    ip: clientIpFrom(h),
    fingerprint: submission,
    validate: () => {
      if (!submission.name?.trim() || !submission.address?.trim()) return "missing_fields"
      if (!isValidEmail(submission.email)) return "invalid_email"
      return null
    },
    buildMails: (leadId) => {
      const full: StoneOfferSubmission = { ...submission, leadId }
      const customerEmail = buildStoneOfferCustomerEmail(full)
      const internalEmail = buildStoneOfferInternalEmail(full)
      return {
        internal: {
          from: FROM_ADDRESS,
          to: internalRecipient(),
          replyTo: full.email,
          subject: internalEmail.subject,
          html: internalEmail.html,
          text: internalEmail.text,
          attachments: [logoAttachment],
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
    // Der Steinpflege-Rechner liefert keinen Richtpreis: kein quote_value.
    claims: { ft: "stone_calculator", st: "accepted", svc: "steinreinigung", qt: "onetime" },
  })
}
