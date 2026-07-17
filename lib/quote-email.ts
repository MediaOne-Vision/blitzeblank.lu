import { EMAIL_LOGO_BASE64 } from "@/lib/email-logo"

export interface QuotePhoto {
  name: string
  /** Pfad im privaten Blob-Store */
  pathname: string
}

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
  /** Hochgeladene Fotos (im privaten Blob-Store abgelegt) */
  photos?: QuotePhoto[]
  name: string
  email: string
  phone: string
  message: string
  estimatedMin: number
  estimatedMax: number
  decision: "accepted" | "declined"
}

/** Blitzeblank Markenfarben (CI) */
const COLORS = {
  blue: "#4AADE4",
  sky: "#7FCDEE",
  teal: "#1E8FB0",
  navy: "#0B2A45",
  mint: "#EAF7FC",
  slate: "#475569",
  slateLight: "#64748b",
  ink: "#0f172a",
  border: "#e2e8f0",
  bg: "#eef4f8",
}

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

/** Absolute URL, über die ein privates Foto ausgeliefert wird */
export function photoUrl(baseUrl: string, pathname: string): string {
  return `${baseUrl}/api/quote-photo?pathname=${encodeURIComponent(pathname)}`
}

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
      (r, i) => `
        <tr>
          <td style="padding:10px 0;color:${COLORS.slateLight};font-size:14px;vertical-align:top;width:150px;${
            i === 0 ? "" : `border-top:1px solid ${COLORS.border};`
          }">${escapeHtml(r.label)}</td>
          <td style="padding:10px 0;color:${COLORS.ink};font-size:14px;font-weight:600;${
            i === 0 ? "" : `border-top:1px solid ${COLORS.border};`
          }">${escapeHtml(r.value)}</td>
        </tr>`,
    )
    .join("")
}

/** Wandelt Label/Wert-Paare in Klartext um (Fallback für Text-Only-Clients) */
function rowsToText(rows: { label: string; value: string }[]): string {
  return rows.map((r) => `${r.label}: ${r.value}`).join("\n")
}

/** Abschnitts-Überschrift im Body */
function sectionTitle(text: string): string {
  return `<p style="margin:0 0 4px;color:${COLORS.blue};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${escapeHtml(
    text,
  )}</p>`
}

/** Grundgerüst für alle E-Mails im Blitzeblank-Look (weiße Logo-Leiste + hellblaues Banner) */
function emailShell(opts: { badge: string; headline: string; intro: string; bodyHtml: string }): string {
  const { badge, headline, intro, bodyHtml } = opts
  return `
  <div style="margin:0;padding:24px 12px;background-color:${COLORS.bg};font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;">
    <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(11,42,69,0.10);">
      <!-- Logo-Leiste -->
      <div style="padding:22px 32px;background-color:#ffffff;border-bottom:1px solid ${COLORS.border};">
        <img src="cid:blitzeblank-logo" alt="Blitzeblank" height="26" style="height:26px;display:block;border:0;outline:none;text-decoration:none;" />
      </div>
      <!-- Hellblaues CI-Banner -->
      <div style="padding:30px 32px;background:linear-gradient(135deg,${COLORS.blue} 0%,${COLORS.teal} 100%);background-color:${COLORS.blue};">
        <p style="margin:0 0 8px;color:rgba(255,255,255,0.85);font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${escapeHtml(
          badge,
        )}</p>
        <h1 style="margin:0 0 10px;color:#ffffff;font-size:22px;font-weight:800;line-height:1.25;">${escapeHtml(
          headline,
        )}</h1>
        <p style="margin:0;color:rgba(255,255,255,0.92);font-size:15px;line-height:1.55;">${intro}</p>
      </div>
      <!-- Inhalt -->
      <div style="padding:30px 32px;">
        ${bodyHtml}
      </div>
      <!-- Footer -->
      <div style="background-color:${COLORS.mint};padding:22px 32px;border-top:1px solid ${COLORS.border};">
        <p style="margin:0;color:${COLORS.slateLight};font-size:12px;line-height:1.6;">
          <strong style="color:${COLORS.navy};">Blitzeblank</strong> &middot; 6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg<br/>
          Diese E-Mail wurde automatisch versendet &middot; noreply@mail.blitzeblank.lu
        </p>
      </div>
    </div>
  </div>`
}

/** Bestätigungs-E-Mail an den Anfragenden */
export function buildCustomerEmail(s: QuoteSubmission) {
  const rows = buildSummaryRows(s)
  const firstName = s.name.split(" ")[0] || s.name

  const summaryCard = `
    <div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      ${sectionTitle("Zusammenfassung Ihrer Anfrage")}
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
    </div>`

  const priceBlock = `
    <div style="background-color:${COLORS.mint};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
      <p style="margin:0 0 4px;color:${COLORS.slateLight};font-size:13px;">Unverbindlicher Richtpreis</p>
      <p style="margin:0;color:${COLORS.navy};font-size:26px;font-weight:800;">${priceText(s)}</p>
    </div>`

  const photoNote =
    s.photos && s.photos.length > 0
      ? `<p style="margin:0 0 20px;color:${COLORS.slate};font-size:14px;line-height:1.6;">
           Ihre ${s.photos.length} hochgeladenen Foto${s.photos.length === 1 ? "" : "s"} haben wir erhalten.
         </p>`
      : ""

  const html = emailShell({
    badge: "Ihre Anfrage bei Blitzeblank",
    headline: `Vielen Dank, ${firstName}!`,
    intro: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.",
    bodyHtml:
      summaryCard +
      priceBlock +
      photoNote +
      `<p style="margin:0;color:${COLORS.slate};font-size:15px;line-height:1.6;">
        Bei Fragen erreichen Sie uns jederzeit. Wir freuen uns darauf, für Sie tätig zu werden!
      </p>`,
  })

  const text = [
    `Vielen Dank für Ihre Anfrage, ${s.name}!`,
    "",
    "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.",
    "",
    "Zusammenfassung:",
    rowsToText(rows),
    "",
    `Unverbindlicher Richtpreis: ${priceText(s)}`,
    s.photos && s.photos.length > 0 ? `\nHochgeladene Fotos: ${s.photos.length}` : "",
    "",
    "Blitzeblank · noreply@mail.blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: `Ihre Anfrage bei Blitzeblank – ${s.serviceLabel}` }
}

/** Interne Benachrichtigung mit allen Infos */
export function buildInternalEmail(s: QuoteSubmission, baseUrl: string) {
  const rows = buildSummaryRows(s)
  const decisionLabel = s.decision === "accepted" ? "Angebot angenommen" : "Angebot abgelehnt / Preis auf Anfrage"

  const contactRows: { label: string; value: string }[] = [
    { label: "Name", value: s.name },
    { label: "E-Mail", value: s.email },
    { label: "Telefon", value: s.phone || "—" },
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

  const statusBadge = `<span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">${
    s.decision === "accepted" ? "Angebot angenommen" : "Preis auf Anfrage"
  }</span>`

  const html = emailShell({
    badge: "Neue Angebotsanfrage",
    headline: s.serviceLabel,
    intro: `${statusBadge} &nbsp; <span style="display:inline-block;color:#ffffff;font-weight:700;">Richtpreis: ${priceText(
      s,
    )}</span>`,
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
    photos.length > 0
      ? `Fotos (${photos.length}):\n${photos
          .map((p, i) => `Foto ${i + 1} (${p.name}): ${photoUrl(baseUrl, p.pathname)}`)
          .join("\n")}`
      : "Fotos: keine",
    "",
    s.message.trim() ? `Nachricht:\n${s.message}` : "Nachricht: —",
  ].join("\n")

  return { html, text, subject: `Neue Anfrage: ${s.serviceLabel} – ${s.name}` }
}

/** Logo als Inline-Anhang (wird im Header über cid:blitzeblank-logo referenziert) */
export const logoAttachment = {
  filename: "blitzeblank-logo.png",
  content: EMAIL_LOGO_BASE64,
  contentId: "blitzeblank-logo",
  contentType: "image/png",
}
