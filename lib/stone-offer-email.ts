import { logoAttachment, photoUrl } from "@/lib/quote-email"

export interface StoneOfferPhoto {
  name: string
  /** Pfad im privaten Blob-Store */
  pathname: string
}

export interface StoneOfferSubmission {
  /** Titel der ausgewählten Leistungen, z. B. ["Fugensand", "Pflegeöl"] */
  services: string[]
  areaTypeLabel: string
  areaSize?: number
  condition: string
  preferredDate: string
  address: string
  photos?: StoneOfferPhoto[]
  name: string
  email: string
  phone: string
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
  if (s.services.length > 0) {
    rows.push({ label: "Gewünschte Leistungen", value: s.services.join(", ") })
  }
  rows.push({ label: "Art der Fläche", value: s.areaTypeLabel })
  if (s.areaSize) {
    rows.push({ label: "Ungefähre Fläche", value: `${s.areaSize} m²` })
  }
  if (s.condition.trim()) {
    rows.push({ label: "Zustand / Anmerkungen zur Fläche", value: s.condition })
  }
  rows.push({ label: "Adresse", value: s.address || "—" })
  if (s.preferredDate) {
    rows.push({ label: "Wunschtermin", value: s.preferredDate })
  }
  return rows
}

function rowsToHtml(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (r, i) => `
        <tr>
          <td style="padding:10px 0;color:${COLORS.slateLight};font-size:14px;vertical-align:top;width:170px;${
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
      ${sectionTitle("Zusammenfassung Ihrer Anfrage")}
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
    </div>`

  const photoNote =
    s.photos && s.photos.length > 0
      ? `<p style="margin:0 0 20px;color:${COLORS.slate};font-size:14px;line-height:1.6;">
           Ihre ${s.photos.length} hochgeladenen Foto${s.photos.length === 1 ? "" : "s"} haben wir erhalten.
         </p>`
      : ""

  const html = emailShell({
    logoSrc,
    badge: "Ihre Anfrage bei Blitzeblank",
    headline: `Vielen Dank, ${firstName}!`,
    intro: "Wir haben Ihre Anfrage zur Pflasterflächen- und Steinpflege erhalten und melden uns in Kürze bei Ihnen.",
    bodyHtml:
      summaryCard +
      photoNote +
      contactCta() +
      `<p style="margin:0;color:${COLORS.slate};font-size:15px;line-height:1.6;">
        Bei Fragen erreichen Sie uns jederzeit. Wir freuen uns darauf, für Sie tätig zu werden!
      </p>`,
  })

  const text = [
    `Vielen Dank, ${s.name}!`,
    "",
    "Wir haben Ihre Anfrage zur Pflasterflächen- und Steinpflege erhalten und melden uns in Kürze bei Ihnen.",
    "",
    "Zusammenfassung:",
    rowsToText(rows),
    "",
    `Telefon: ${CONTACT.phone}`,
    `E-Mail: ${CONTACT.email}`,
    "",
    "Blitzeblank · noreply@mail.blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: "Ihre Anfrage zur Pflasterflächen- & Steinpflege bei Blitzeblank" }
}

/** Interne Benachrichtigung mit allen Infos zur neuen Stein-Angebotsanfrage. */
export function buildStoneOfferInternalEmail(s: StoneOfferSubmission, baseUrl: string, logoSrc = "cid:blitzeblank-logo") {
  const rows = buildSummaryRows(s)

  const contactRows: { label: string; value: string }[] = [
    { label: "Name", value: s.name },
    { label: "E-Mail", value: s.email },
    { label: "Telefon", value: s.phone || "—" },
    { label: "Anfrage-ID", value: s.leadId },
  ]

  const photos = s.photos ?? []
  const photosBlock =
    photos.length > 0
      ? `
        <div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
          ${sectionTitle(`Fotos (${photos.length})`)}
          <p style="margin:6px 0 14px;color:${COLORS.slateLight};font-size:13px;">
            Die Fotos sind dieser E-Mail als Anhang beigefügt und können zusätzlich über die folgenden Links geöffnet werden:
          </p>
          <table style="border-collapse:collapse;">
            <tr>
              ${photos
                .map(
                  (p) => `
                <td style="padding:0 8px 8px 0;vertical-align:top;">
                  <a href="${photoUrl(baseUrl, p.pathname)}" target="_blank" style="text-decoration:none;">
                    <img src="${photoUrl(baseUrl, p.pathname)}" alt="${escapeHtml(
                      p.name,
                    )}" width="96" height="96" style="width:96px;height:96px;object-fit:cover;border-radius:10px;border:1px solid ${
                      COLORS.border
                    };display:block;" />
                  </a>
                </td>`,
                )
                .join("")}
            </tr>
          </table>
          <p style="margin:14px 0 0;font-size:13px;line-height:1.7;">
            ${photos
              .map(
                (p, i) =>
                  `<a href="${photoUrl(baseUrl, p.pathname)}" target="_blank" style="color:${
                    COLORS.teal
                  };font-weight:600;">Foto ${i + 1} öffnen (${escapeHtml(p.name)})</a>`,
              )
              .join("<br/>")}
          </p>
        </div>`
      : ""

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
    badge: "Neue Anfrage: Pflasterflächen- & Steinpflege",
    headline: s.services.length > 0 ? s.services.join(", ") : "Steinpflege-Angebotsersteller",
    intro: `<span style="display:inline-block;color:#ffffff;font-weight:700;">Anfrage-ID: ${escapeHtml(s.leadId)}</span>`,
    bodyHtml:
      `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Kontaktdaten")}
         <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(contactRows)}</table>
       </div>` +
      `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Details der Anfrage")}
         <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
       </div>` +
      photosBlock +
      messageBlock,
  })

  const text = [
    `Neue Anfrage: Pflasterflächen- & Steinpflege (${s.leadId})`,
    "",
    "Kontaktdaten:",
    rowsToText(contactRows),
    "",
    "Details der Anfrage:",
    rowsToText(rows),
    s.message.trim() ? `\nNachricht:\n${s.message.trim()}` : "",
  ].join("\n")

  return { html, text, subject: `Neue Anfrage: Pflasterflächen- & Steinpflege (${s.leadId})` }
}

export { logoAttachment, photoUrl }
