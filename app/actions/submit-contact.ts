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
  fensterreinigung: "Fenster- & Glasreinigung",
  fassadenreinigung: "Fassaden- & Dachrinnenreinigung",
  industriereinigung: "Industriereinigung",
  unterhaltsreinigung: "Unterhaltsreinigung",
  spezialreinigung: "Spezialreinigung & ergänzende Dienstleistungen",
  steinreinigung: "Stein- & Terrassenreinigung",
  solarreinigung: "Solar- & Photovoltaikreinigung",
  reinigungsnotdienst: "Reinigungsnotdienst",
  treppenhausreinigung: "Treppenhausreinigung",
  sonstiges: "Sonstiges",
}

const AUDIENCE_LABELS: Record<string, string> = {
  privat: "Privatkunde",
  gewerbe: "Gewerbekunde",
}

export interface SubmitContactInput {
  name: string
  company: string
  email: string
  phone: string
  service: string
  /** Kundengruppe ("privat" | "gewerbe"); leer, wenn nicht bekannt. */
  audience?: string
  /** Ort bzw. Objektstandort (optional). */
  location?: string
  /** Objektart, z. B. Wohnhaus, Büro, Halle (optional). */
  objectType?: string
  /** Gewünschter Rhythmus: einmalig / regelmäßig (optional). */
  interval?: string
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
  const audience = AUDIENCE_LABELS[input.audience ?? ""] ? (input.audience as string) : ""
  const location = clip(input.location ?? "", 120)
  const objectType = clip(input.objectType ?? "", 120)
  const interval = input.interval === "einmalig" || input.interval === "regelmaessig" ? input.interval : ""
  const locale: "de" | "en" | "fr" = input.locale === "en" || input.locale === "fr" ? input.locale : "de"

  return runFormPipeline({
    kind: "contact",
    submissionId: input.submissionId,
    honeypot: input.honeypot,
    renderedAt: input.renderedAt,
    ip: clientIpFrom(h),
    fingerprint: { name, company, email, phone, service, audience, location, objectType, interval, message },
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
        audienceLabel: AUDIENCE_LABELS[audience] ?? "",
        location,
        objectType,
        intervalLabel: interval === "einmalig" ? "Einmalig" : interval === "regelmaessig" ? "Regelmäßig" : "",
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
