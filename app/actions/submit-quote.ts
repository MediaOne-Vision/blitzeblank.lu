"use server"

import { Resend } from "resend"

export interface QuoteSubmission {
  service: string
  serviceLabel: string
  details: string[]
  preferredDate: string
  address: string
  frequency: string
  frequencyLabel: string
  area: number
  /** Nur bei Fensterreinigung: Gesamtanzahl der Fenster */
  windowCount?: number
  /** Nur bei Fensterreinigung: Aufschlüsselung nach Größe */
  windowBreakdown?: string
  /** Nur bei Fensterreinigung: Privat- oder Gewerbekunde */
  customerType?: "privat" | "gewerbe"
  /** Einfache Entfernung zur Firmenadresse in km (falls ermittelt) */
  distanceKm?: number
  photoCount: number
  name: string
  email: string
  phone: string
  message: string
  estimatedMin: number
  estimatedMax: number
  decision: "accepted" | "declined"
}

/** Absender- und Empfängeradressen für den E-Mail-Versand */
const FROM_ADDRESS = "Blitzeblank <noreply@mail.blitzeblank.lu>"
const INTERNAL_RECIPIENT = "roman@mediaone-vision.de"

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

/** Baut die gemeinsamen Eckdaten der Anfrage als Liste von Label/Wert-Paaren */
function buildSummaryRows(s: QuoteSubmission): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [{ label: "Leistung", value: s.serviceLabel }]

  if (s.customerType) {
    rows.push({ label: "Kundentyp", value: s.customerType === "gewerbe" ? "Gewerbe" : "Privat" })
  }
  if (s.details.length > 0) {
    rows.push({ label: "Details", value: s.details.join(", ") })
  }
  if (s.windowCount) {
    rows.push({ label: "Anzahl Fenster", value: String(s.windowCount) })
  }
  if (s.windowBreakdown) {
    rows.push({ label: "Aufschlüsselung", value: s.windowBreakdown })
  }
  if (!s.windowCount && s.area > 0) {
    rows.push({ label: "Fläche", value: `${s.area} m²` })
  }
  if (s.frequencyLabel) {
    rows.push({ label: "Turnus", value: s.frequencyLabel })
  }
  rows.push({ label: "Adresse", value: s.address })
  if (typeof s.distanceKm === "number") {
    rows.push({ label: "Entfernung", value: `ca. ${s.distanceKm} km` })
  }
  if (s.preferredDate) {
    rows.push({ label: "Wunschtermin", value: s.preferredDate })
  }
  if (s.photoCount > 0) {
    rows.push({ label: "Fotos", value: `${s.photoCount} hochgeladen` })
  }
  return rows
}

/** Preis-Text für die Anzeige (Richtpreis oder "auf Anfrage") */
function priceText(s: QuoteSubmission): string {
  if (s.estimatedMin === 0 && s.estimatedMax === 0) return "Auf Anfrage"
  if (s.estimatedMin === s.estimatedMax) return euro(s.estimatedMin)
  return `${euro(s.estimatedMin)} – ${euro(s.estimatedMax)}`
}

/** Wandelt Label/Wert-Paare in HTML-Tabellenzeilen um */
function rowsToHtml(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (r) => `
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:14px;vertical-align:top;width:150px;">${escapeHtml(
            r.label,
          )}</td>
          <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${escapeHtml(r.value)}</td>
        </tr>`,
    )
    .join("")
}

/** Wandelt Label/Wert-Paare in Klartext um (Fallback für Text-Only-Clients) */
function rowsToText(rows: { label: string; value: string }[]): string {
  return rows.map((r) => `${r.label}: ${r.value}`).join("\n")
}

/** Grundgerüst für alle E-Mails im Blitzeblank-Look */
function emailShell(headline: string, intro: string, bodyHtml: string): string {
  return `
  <div style="margin:0;padding:24px;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.08);">
      <div style="background-color:#0f2942;padding:28px 32px;">
        <span style="color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.02em;">Blitzeblank</span>
      </div>
      <div style="padding:32px;">
        <h1 style="margin:0 0 12px;color:#0f172a;font-size:20px;font-weight:700;">${escapeHtml(headline)}</h1>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.6;">${intro}</p>
        ${bodyHtml}
      </div>
      <div style="background-color:#f8fafc;padding:20px 32px;border-top:1px solid #e2e8f0;">
        <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.5;">
          Blitzeblank &middot; 6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg<br/>
          Diese E-Mail wurde automatisch versendet &middot; noreply@mail.blitzeblank.lu
        </p>
      </div>
    </div>
  </div>`
}

/** Bestätigungs-E-Mail an den Anfragenden */
function buildCustomerEmail(s: QuoteSubmission) {
  const rows = buildSummaryRows(s)
  const summaryTable = `
    <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;margin-bottom:24px;">
      ${rowsToHtml(rows)}
    </table>`

  const priceBlock = `
    <div style="background-color:#eff6ff;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 4px;color:#64748b;font-size:13px;">Unverbindlicher Richtpreis</p>
      <p style="margin:0;color:#0f2942;font-size:24px;font-weight:700;">${priceText(s)}</p>
    </div>`

  const html = emailShell(
    `Vielen Dank für Ihre Anfrage, ${escapeHtml(s.name.split(" ")[0] || s.name)}!`,
    "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen. Hier ist eine Zusammenfassung Ihrer Angaben:",
    summaryTable + priceBlock +
      `<p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
        Bei Fragen erreichen Sie uns jederzeit. Wir freuen uns darauf, für Sie tätig zu werden!
      </p>`,
  )

  const text = [
    `Vielen Dank für Ihre Anfrage, ${s.name}!`,
    "",
    "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.",
    "",
    "Zusammenfassung:",
    rowsToText(rows),
    "",
    `Unverbindlicher Richtpreis: ${priceText(s)}`,
    "",
    "Blitzeblank · noreply@mail.blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: `Ihre Anfrage bei Blitzeblank – ${s.serviceLabel}` }
}

/** Interne Benachrichtigung mit allen Infos */
function buildInternalEmail(s: QuoteSubmission) {
  const rows = buildSummaryRows(s)
  const decisionLabel =
    s.decision === "accepted" ? "Angebot angenommen" : "Angebot abgelehnt / Preis auf Anfrage"

  const contactRows: { label: string; value: string }[] = [
    { label: "Name", value: s.name },
    { label: "E-Mail", value: s.email },
    { label: "Telefon", value: s.phone || "—" },
  ]

  const html = emailShell(
    `Neue Angebotsanfrage: ${escapeHtml(s.serviceLabel)}`,
    `Status: <strong>${escapeHtml(decisionLabel)}</strong> &middot; Richtpreis: <strong>${priceText(s)}</strong>`,
    `
      <h2 style="margin:0 0 8px;color:#0f172a;font-size:15px;font-weight:700;">Kontaktdaten</h2>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;margin-bottom:24px;">
        ${rowsToHtml(contactRows)}
      </table>
      <h2 style="margin:0 0 8px;color:#0f172a;font-size:15px;font-weight:700;">Details der Anfrage</h2>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;margin-bottom:24px;">
        ${rowsToHtml(rows)}
      </table>
      ${
        s.message.trim()
          ? `<h2 style="margin:0 0 8px;color:#0f172a;font-size:15px;font-weight:700;">Nachricht</h2>
             <p style="margin:0;color:#475569;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
               s.message,
             )}</p>`
          : ""
      }`,
  )

  const text = [
    `Neue Angebotsanfrage: ${s.serviceLabel}`,
    `Status: ${decisionLabel}`,
    `Richtpreis: ${priceText(s)}`,
    "",
    "Kontaktdaten:",
    rowsToText(contactRows),
    "",
    "Details:",
    rowsToText(rows),
    "",
    s.message.trim() ? `Nachricht:\n${s.message}` : "Nachricht: —",
  ].join("\n")

  return { html, text, subject: `Neue Anfrage: ${s.serviceLabel} – ${s.name}` }
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

  const customerEmail = buildCustomerEmail(submission)
  const internalEmail = buildInternalEmail(submission)

  try {
    // Interne Benachrichtigung an das Team – mit Reply-To auf den Kunden,
    // damit direkt geantwortet werden kann.
    const internalResult = await resend.emails.send({
      from: FROM_ADDRESS,
      to: INTERNAL_RECIPIENT,
      replyTo: submission.email,
      subject: internalEmail.subject,
      html: internalEmail.html,
      text: internalEmail.text,
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
