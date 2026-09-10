import { logoAttachment } from "@/lib/quote-email"

export interface StoneOfferSubmission {
  areaTypeLabel: string
  areaSize?: number
  /** Maße für den Materialbedarf der Fuge */
  dimensions: {
    steinbreite: number
    steinlaenge: number
    fugenbreite: number
    fugentiefe: number
  }
  usageLabel: string
  jointPropertyLabels: string[]
  stoneColorLabel: string
  /** Gewählte Fuge inkl. Farbe, oder null wenn "ohne Fugensanierung" */
  jointChoice: { materialLabel: string; colorLabel: string } | null
  /** Gewählter Schutz, oder null wenn "ohne Schutz" */
  protectionLabel: string | null
  thermalWeed: boolean
  name: string
  email: string
  phone: string
  address: string
  message: string
  /** Eindeutige Anfrage-ID zur Wiedererkennung in Rückfragen */
  leadId: string
}

/** Blitzeblank Markenfarben (CI) - identisch zu lib/quote-email.ts */
const COLORS = {
  blue: "#4AADE4",
  teal: "#1E8FB0",
  navy: "#0B2A45",
  mint: "#EAF7FC",
  slate: "#475569",
  slateLight: "#64748b",
  ink: "#0f172a",
  border: "#e2e8f0",
  bg: "#eef4f8",
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

function buildSummaryRows(s: StoneOfferSubmission): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = []
  rows.push({ label: "Art der Fläche", value: s.areaTypeLabel })
  if (s.areaSize) {
    rows.push({ label: "Ungefähre Fläche", value: `${s.areaSize} m²` })
  }
  rows.push({ label: "Nutzung / Belastung", value: s.usageLabel })
  rows.push({
    label: "Materialbedarf (Fuge)",
    value: `Stein ${s.dimensions.steinbreite}×${s.dimensions.steinlaenge} cm · Fuge ${s.dimensions.fugenbreite} mm breit, ${s.dimensions.fugentiefe} mm tief`,
  })
  rows.push({ label: "Aktuelle Steinfarbe", value: s.stoneColorLabel })
  rows.push({
    label: "Wichtige Fugeneigenschaften",
    value: s.jointPropertyLabels.length > 0 ? s.jointPropertyLabels.join(", ") : "Keine Angabe",
  })
  rows.push({
    label: "Gewählte Fuge",
    value: s.jointChoice ? `${s.jointChoice.materialLabel} (Farbe: ${s.jointChoice.colorLabel})` : "Ohne Fugensanierung",
  })
  rows.push({ label: "Oberflächenschutz", value: s.protectionLabel ?? "Ohne Schutz" })
  rows.push({ label: "Thermische Unkrautentfernung", value: s.thermalWeed ? "Ja, gewünscht" : "Nein" })
  return rows
}

function rowsToHtml(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (r, i) => `
        <tr>
          <td style="padding:10px 0;color:${COLORS.slateLight};font-size:14px;vertical-align:top;width:190px;${
            i === 0 ? "" : `border-top:1px solid ${COLORS.border};`
          }">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0;color:${COLORS.ink};font-size:14px;font-weight:600;${
            i === 0 ? "" : `border-top:1px solid ${COLORS.border};`
          }">${escapeHtml(r.value)}</td>
        </tr>`,
    )
    .join("")
}

function rowsToText(rows: { label: string; value: string }[]): string {
  return rows.map((r) => `${r.label}: ${r.value}`).join("\n")
}

function sectionTitle(text: string): string {
  return `<p style="margin:0 0 4px;color:${COLORS.blue};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${escapeHtml(
    text,
  )}</p>`
}

/** Grundgerüst für alle E-Mails im Blitzeblank-Look (weiße Logo-Leiste + hellblaues Banner) */
function emailShell(opts: { badge: string; headline: string; intro: string; bodyHtml: string; logoSrc: string }): string {
  const { badge, headline, intro, bodyHtml, logoSrc } = opts
  return `
  <div style="margin:0;padding:24px 12px;background-color:${COLORS.bg};font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;">
    <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(11,42,69,0.10);">
      <div style="padding:22px 32px;background-color:#ffffff;border-bottom:1px solid ${COLORS.border};">
        <img src="${logoSrc}" alt="Blitzeblank" height="30" style="height:30px;display:block;border:0;outline:none;text-decoration:none;" />
      </div>
      <div style="padding:30px 32px;background:linear-gradient(135deg,${COLORS.blue} 0%,${COLORS.teal} 100%);background-color:${COLORS.blue};">
        <p style="margin:0 0 8px;color:rgba(255,255,255,0.85);font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(
          badge,
        )}</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:22px;font-weight:800;line-height:1.25;">${escapeHtml(
          headline,
        )}</h1>
        <p style="margin:0;color:rgba(255,255,255,0.92);font-size:15px;line-height:1.55;">${intro}</p>
      </div>
      <div style="padding:30px 32px;">
        ${bodyHtml}
      </div>
      <div style="background-color:${COLORS.mint};padding:22px 32px;border-top:1px solid ${COLORS.border};">
        <p style="margin:0;color:${COLORS.slateLight};font-size:12px;line-height:1.6;">
          <strong style="color:${COLORS.navy};">Blitzeblank</strong> &middot; 6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg<br/>
          Diese E-Mail wurde automatisch versendet &middot; noreply@mail.blitzeblank.lu
        </p>
      </div>
    </div>
  </div>`
}

const CONTACT = {
  phone: "+352 661 830 493",
  phoneHref: "tel:+352661830493",
  email: "info@blitzeblank.lu",
}

function contactCta(): string {
  return `
    <div style="border:1px dashed ${COLORS.blue};border-radius:14px;padding:20px 22px;margin-bottom:22px;background-color:${COLORS.mint};">
      ${sectionTitle("Sie erreichen uns direkt")}
      <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:${COLORS.slate};">
        Telefon: <a href="${CONTACT.phoneHref}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.phone}</a><br/>
        E-Mail: <a href="mailto:${CONTACT.email}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.email}</a>
      </p>
    </div>`
}

/** Bestätigungs-E-Mail an den Anfragenden. logoSrc = "cid:blitzeblank-logo" im Versand. */
export function buildStoneOfferCustomerEmail(s: StoneOfferSubmission, logoSrc = "cid:blitzeblank-logo") {
  const rows = buildSummaryRows(s)
  const firstName = s.name.split(" ")[0] || s.name

  const summaryCard = `
    <div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      ${sectionTitle("Zusammenfassung Ihrer Konfiguration")}
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
    </div>`

  const html = emailShell({
    logoSrc,
    badge: "Ihre Anfrage bei Blitzeblank",
    headline: `Vielen Dank, ${firstName}!`,
    intro: "Wir haben Ihre Anfrage über den Steinpflege-Rechner erhalten und melden uns in Kürze mit Ihrem persönlichen Angebot.",
    bodyHtml:
      summaryCard +
      contactCta() +
      `<p style="margin:0;color:${COLORS.slate};font-size:15px;line-height:1.6;">
        Bei Fragen erreichen Sie uns jederzeit. Wir freuen uns darauf, für Sie tätig zu werden!
      </p>`,
  })

  const text = [
    `Vielen Dank, ${s.name}!`,
    "",
    "Wir haben Ihre Anfrage über den Steinpflege-Rechner erhalten und melden uns in Kürze mit Ihrem persönlichen Angebot.",
    "",
    "Zusammenfassung Ihrer Konfiguration:",
    rowsToText(rows),
    "",
    `Telefon: ${CONTACT.phone}`,
    `E-Mail: ${CONTACT.email}`,
    "",
    "Blitzeblank · noreply@mail.blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: "Ihre Anfrage über den Steinpflege-Rechner bei Blitzeblank" }
}

/** Interne Benachrichtigung mit allen Infos zur neuen Steinpflege-Anfrage. */
export function buildStoneOfferInternalEmail(s: StoneOfferSubmission, logoSrc = "cid:blitzeblank-logo") {
  const rows = buildSummaryRows(s)

  const contactRows: { label: string; value: string }[] = [
    { label: "Name", value: s.name },
    { label: "E-Mail", value: s.email },
    { label: "Telefon", value: s.phone || "—" },
    { label: "Adresse", value: s.address || "—" },
    { label: "Anfrage-ID", value: s.leadId },
  ]

  const messageBlock = s.message.trim()
    ? `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Nachricht")}
         <p style="margin:8px 0 0;color:${COLORS.slate};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
           s.message,
         )}</p>
       </div>`
    : ""

  const html = emailShell({
    logoSrc,
    badge: "Neue Anfrage: Steinpflege-Rechner",
    headline: s.jointChoice ? s.jointChoice.materialLabel : "Steinpflege-Anfrage",
    intro: `<span style="display:inline-block;color:#ffffff;font-weight:700;">Anfrage-ID: ${escapeHtml(s.leadId)}</span>`,
    bodyHtml:
      `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Kontaktdaten")}
         <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(contactRows)}</table>
       </div>` +
      `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Konfiguration")}
         <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
       </div>` +
      messageBlock,
  })

  const text = [
    `Neue Anfrage: Steinpflege-Rechner (${s.leadId})`,
    "",
    "Kontaktdaten:",
    rowsToText(contactRows),
    "",
    "Konfiguration:",
    rowsToText(rows),
    s.message.trim() ? `\nNachricht:\n${s.message.trim()}` : "",
  ].join("\n")

  return { html, text, subject: `Neue Anfrage: Steinpflege-Rechner (${s.leadId})` }
}

export { logoAttachment }
