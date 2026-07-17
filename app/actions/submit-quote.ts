"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import {
  buildCustomerEmail,
  buildInternalEmail,
  logoAttachment,
  photoUrl,
  type QuoteSubmission,
} from "@/lib/quote-email"

/** Absender- und Empfängeradressen für den E-Mail-Versand */
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

export async function submitQuote(submission: QuoteSubmission) {
  const apiKey = process.env.RESEND_API_KEY

  // Ohne konfigurierten API-Key wird die Anfrage nur protokolliert, damit das
  // Formular in der Vorschau/Entwicklung weiterhin funktioniert.
  if (!apiKey) {
    console.log("[v0] RESEND_API_KEY fehlt – Anfrage wird nur protokolliert:", JSON.stringify(submission, null, 2))
    return { success: true as const, emailed: false as const }
  }

  const resend = new Resend(apiKey)
  const baseUrl = await getBaseUrl()

  const customerEmail = buildCustomerEmail(submission)
  const internalEmail = buildInternalEmail(submission, baseUrl)

  // Fotos als Remote-Anhänge (Resend lädt sie beim Versand über die Auslieferungs-Route)
  const photoAttachments = (submission.photos ?? []).map((p, i) => {
    const ext = p.name.split(".").pop()?.toLowerCase()
    const safeExt = ext && /^[a-z0-9]+$/.test(ext) ? ext : "jpg"
    return {
      filename: `Foto-${i + 1}.${safeExt}`,
      path: photoUrl(baseUrl, p.pathname),
    }
  })

  try {
    // Interne Benachrichtigung an das Team – mit Reply-To auf den Kunden,
    // damit direkt geantwortet werden kann. Fotos als Anhang + Links.
    const internalResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: INTERNAL_RECIPIENT,
      replyTo: submission.email,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
      attachments: [logoAttachment, ...photoAttachments],
    })

    if (internalResult.error) {
      console.log("[v0] Fehler beim Versand der internen Mail:", internalResult.error)
    }

    // Bestätigung an den Anfragenden
    const customerResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: submission.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      attachments: [logoAttachment],
    })

    if (customerResult.error) {
      console.log("[v0] Fehler beim Versand der Kundenbestätigung:", customerResult.error)
    }

    const emailed = !internalResult.error && !customerResult.error
    return { success: true as const, emailed }
  } catch (error) {
    console.log("[v0] Unerwarteter Fehler beim E-Mail-Versand:", error)
    // Die Anfrage gilt trotzdem als übermittelt, damit der Nutzer eine
    // Erfolgsmeldung erhält – der Fehler wird protokolliert.
    return { success: true as const, emailed: false as const }
  }
}
