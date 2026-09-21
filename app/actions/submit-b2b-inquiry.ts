"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import {
  buildB2BCustomerEmail,
  buildB2BInternalEmail,
  type B2BInquirySubmission,
} from "@/lib/b2b-inquiry-email"
import { logoAttachment } from "@/lib/quote-email"
import { isRateLimited } from "@/lib/simple-rate-limit"

const FROM_ADDRESS = "Blitzeblank <noreply@mail.blitzeblank.lu>"
const INTERNAL_RECIPIENT = "info@blitzeblank.lu"

/** Erlaubt max. 5 Absendungen pro IP innerhalb von 10 Minuten */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

/** Server-seitige E-Mail-Validierung: einfaches Format, kein führender/abschließender oder doppelter Punkt */
function isValidEmail(email: string): boolean {
  const trimmed = email.trim()
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return false
  if (trimmed.includes("..")) return false
  const [, domain] = trimmed.split("@")
  if (!domain || domain.startsWith(".") || domain.endsWith(".")) return false
  return true
}

/** Telefon gilt als gültig, wenn mindestens 6 Ziffern enthalten sind */
function isValidPhone(phone: string): boolean {
  const digits = (phone.match(/\d/g) ?? []).length
  return digits >= 6
}

export type B2BInquiryResult =
  | { success: true; emailed: boolean }
  | { success: false; error: "invalid_email" | "invalid_contact" | "missing_fields" }

interface SubmitB2BInput {
  submission: B2BInquirySubmission
  /** Honeypot-Feld – muss beim Absenden leer sein, sonst gilt die Anfrage als Spam. */
  honeypot: string
  /** Zeitstempel (Date.now()), zu dem das Formular gerendert wurde. */
  renderedAt: number
}

export async function submitB2BInquiry(input: SubmitB2BInput): Promise<B2BInquiryResult> {
  const { submission, honeypot, renderedAt } = input

  // Honeypot ausgefüllt -> stiller Erfolg, keine Verarbeitung.
  if (honeypot.trim().length > 0) {
    console.log("[v0] B2B-Anfrage: Honeypot ausgelöst, Anfrage verworfen")
    return { success: true, emailed: false }
  }

  // Formular zu schnell abgesendet (< 3 Sekunden) -> vermutlich Bot.
  if (Date.now() - renderedAt < 3000) {
    console.log("[v0] B2B-Anfrage: Timing-Check ausgelöst, Anfrage verworfen")
    return { success: true, emailed: false }
  }

  // Pflichtfelder serverseitig prüfen (autoritativ).
  const company = submission.company?.trim() ?? ""
  const contactPerson = submission.contactPerson?.trim() ?? ""
  const location = submission.location?.trim() ?? ""
  const email = submission.email?.trim() ?? ""
  const phone = submission.phone?.trim() ?? ""

  if (!company || !contactPerson || !location) {
    return { success: false, error: "missing_fields" }
  }

  // Mindestens ein Kontaktweg muss vorliegen.
  if (!email && !phone) {
    return { success: false, error: "invalid_contact" }
  }
  // Falls eine E-Mail angegeben wurde, muss sie gültig sein.
  if (email && !isValidEmail(email)) {
    return { success: false, error: "invalid_email" }
  }
  // Falls nur Telefon vorliegt, muss die Nummer plausibel sein.
  if (!email && phone && !isValidPhone(phone)) {
    return { success: false, error: "invalid_contact" }
  }

  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  if (isRateLimited(`b2b-inquiry:${ip}`, RATE_LIMIT)) {
    console.log("[v0] B2B-Anfrage: Rate-Limit erreicht für IP", ip)
    return { success: true, emailed: false }
  }

  const clean: B2BInquirySubmission = {
    ...submission,
    company,
    contactPerson,
    location,
    email,
    phone,
    message: submission.message?.trim() ?? "",
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY fehlt – B2B-Anfrage wird nur protokolliert:", JSON.stringify(clean, null, 2))
    return { success: true, emailed: false }
  }

  const resend = new Resend(apiKey)
  const internalEmail = buildB2BInternalEmail(clean)

  try {
    const internalResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: INTERNAL_RECIPIENT,
      replyTo: clean.email || undefined,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
      attachments: [logoAttachment],
    })

    if (internalResult.error) {
      console.log("[v0] Fehler beim Versand der internen B2B-Mail:", internalResult.error)
    }

    // Kundenbestätigung nur bei gültiger E-Mail (best effort).
    let customerError = false
    if (clean.email && isValidEmail(clean.email)) {
      const customerEmail = buildB2BCustomerEmail(clean)
      const customerResult = await resend.emails.send({
        from: FROM_ADDRESS,
        to: clean.email,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
        attachments: [logoAttachment],
      })
      if (customerResult.error) {
        customerError = true
        console.log("[v0] Fehler beim Versand der B2B-Kundenbestätigung:", customerResult.error)
      }
    }

    const emailed = !internalResult.error && !customerError
    return { success: true, emailed }
  } catch (error) {
    console.log("[v0] Unerwarteter Fehler beim B2B-E-Mail-Versand:", error)
    return { success: true, emailed: false }
  }
}
