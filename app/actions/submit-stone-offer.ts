"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import {
  buildStoneOfferCustomerEmail,
  buildStoneOfferInternalEmail,
  logoAttachment,
  type StoneOfferSubmission,
} from "@/lib/stone-offer-email"
import { isRateLimited } from "@/lib/simple-rate-limit"

const FROM_ADDRESS = "Blitzeblank <noreply@mail.blitzeblank.lu>"
/** Interne Benachrichtigung für den Steinpflege-Rechner geht ausschließlich hierhin. */
const INTERNAL_RECIPIENT = "felicia@mediaone-vision.de"

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

interface SubmitStoneOfferInput {
  submission: StoneOfferSubmission
  /** Honeypot-Feld – muss beim Absenden leer sein, sonst gilt die Anfrage als Spam. */
  honeypot: string
  /** Zeitstempel (Date.now()), zu dem das Formular gerendert wurde. */
  renderedAt: number
}

export async function submitStoneOffer(input: SubmitStoneOfferInput) {
  const { submission, honeypot, renderedAt } = input

  // Honeypot ausgefüllt -> stiller Erfolg, keine Verarbeitung.
  if (honeypot.trim().length > 0) {
    console.log("[v0] Steinpflege-Rechner: Honeypot ausgelöst, Anfrage verworfen")
    return { success: true as const, emailed: false as const }
  }

  // Formular zu schnell abgesendet (< 3 Sekunden) -> vermutlich Bot.
  if (Date.now() - renderedAt < 3000) {
    console.log("[v0] Steinpflege-Rechner: Timing-Check ausgelöst, Anfrage verworfen")
    return { success: true as const, emailed: false as const }
  }

  if (!isValidEmail(submission.email)) {
    return { success: false as const, error: "invalid_email" as const }
  }

  const h = await headers()
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  if (isRateLimited(`stone-offer:${ip}`, RATE_LIMIT)) {
    console.log("[v0] Steinpflege-Rechner: Rate-Limit erreicht für IP", ip)
    return { success: true as const, emailed: false as const }
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY fehlt – Anfrage wird nur protokolliert:", JSON.stringify(submission, null, 2))
    return { success: true as const, emailed: false as const }
  }

  const resend = new Resend(apiKey)

  const customerEmail = buildStoneOfferCustomerEmail(submission)
  const internalEmail = buildStoneOfferInternalEmail(submission)

  try {
    const internalResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: INTERNAL_RECIPIENT,
      replyTo: submission.email,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
      attachments: [logoAttachment],
    })

    if (internalResult.error) {
      console.log("[v0] Fehler beim Versand der internen Steinpflege-Mail:", internalResult.error)
    }

    const customerResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: submission.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      attachments: [logoAttachment],
    })

    if (customerResult.error) {
      console.log("[v0] Fehler beim Versand der Steinpflege-Kundenbestätigung:", customerResult.error)
    }

    const emailed = !internalResult.error && !customerResult.error
    return { success: true as const, emailed }
  } catch (error) {
    console.log("[v0] Unerwarteter Fehler beim Steinpflege-E-Mail-Versand:", error)
    return { success: true as const, emailed: false as const }
  }
}
