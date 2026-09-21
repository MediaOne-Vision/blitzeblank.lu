/**
 * E-Mails für das B2B-Anfrageformular der Fensterreinigung (kostenlose
 * Objektbesichtigung). Gleiches Blitzeblank-Branding wie die übrigen Mails.
 *
 * - Interne Benachrichtigung: immer Deutsch.
 * - Kundenbestätigung: in der Sprache des Formulars (de/en); nur wenn eine
 *   gültige E-Mail-Adresse vorliegt (Telefon-only-Anfragen erhalten keine Mail).
 */

export type B2BObjectType = "buero" | "geschaeft" | "gewerbe" | "sonstiges"
export type B2BCleaningNeed = "einmalig" | "regelmaessig" | "offen" | ""

export interface B2BInquirySubmission {
  company: string
  contactPerson: string
  /** PLZ und Ort des Objekts (freie Eingabe, LU/DE erlaubt) */
  location: string
  objectType: B2BObjectType
  cleaningNeed: B2BCleaningNeed
  email: string
  phone: string
  message: string
  /** interne Kennzeichnung, fest auf Fensterreinigung */
  service: "window_cleaning"
  formType: "b2b_site_visit"
  /** Sprache des Kunden – steuert nur die Kundenbestätigung */
  locale: "de" | "en"
  /** Eindeutige Anfrage-ID zur Korrelation mit dem Tracking */
  leadId?: string
}

/** Blitzeblank Markenfarben (CI) */
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

const CONTACT = {
  phone: "+352 661 830 493",
  phoneHref: "tel:+352661830493",
  email: "info@blitzeblank.lu",
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

/** Deutsche Labels für die interne Mail (immer Deutsch) */
const OBJECT_TYPE_LABELS: Record<B2BObjectType, string> = {
  buero: "Büro",
  geschaeft: "Geschäft / Schaufenster",
  gewerbe: "Gewerbegebäude",
  sonstiges: "Sonstiges",
}

const CLEANING_NEED_LABELS: Record<Exclude<B2BCleaningNeed, "">, string> = {
  einmalig: "Einmalig",
  regelmaessig: "Regelmäßig",
  offen: "Noch offen",
}

export function objectTypeLabel(value: B2BObjectType): string {
  return OBJECT_TYPE_LABELS[value] ?? OBJECT_TYPE_LABELS.sonstiges
}

export function cleaningNeedLabel(value: B2BCleaningNeed): string {
  if (!value) return "—"
  return CLEANING_NEED_LABELS[value] ?? "—"
}

function sectionTitle(text: string): string {
  return `<p style="margin:0 0 4px;color:${COLORS.blue};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${escapeHtml(
    text,
  )}</p>`
}

function rowsToHtml(rows: { label: string; value: string }[]): string {
  return rows
    .map(
      (r, i) => `
        <tr>
          <td style="padding:10px 0;color:${COLORS.slateLight};font-size:14px;vertical-align:top;width:160px;${
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
          Telefon: <a href="${CONTACT.phoneHref}" style="color:${COLORS.teal};text-decoration:none;">${CONTACT.phone}</a> &middot; <a href="mailto:${CONTACT.email}" style="color:${COLORS.teal};text-decoration:none;">${CONTACT.email}</a><br/>
          <a href="https://blitzeblank.lu" style="color:${COLORS.teal};text-decoration:none;">blitzeblank.lu</a>
        </p>
      </div>
    </div>
  </div>`
}

/** Baut die gemeinsamen Eckdaten der Anfrage (interne Mail, Deutsch) */
function buildRows(s: B2BInquirySubmission): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [
    { label: "Unternehmen", value: s.company },
    { label: "Ansprechpartner", value: s.contactPerson },
    { label: "PLZ / Ort", value: s.location },
    { label: "Objektart", value: objectTypeLabel(s.objectType) },
    { label: "Reinigungsbedarf", value: cleaningNeedLabel(s.cleaningNeed) },
    { label: "E-Mail", value: s.email || "—" },
    { label: "Telefon", value: s.phone || "—" },
  ]
  if (s.leadId) rows.push({ label: "Anfrage-ID", value: s.leadId })
  return rows
}

const CUSTOMER_TEXT = {
  de: {
    badge: "Ihre Anfrage bei Blitzeblank",
    headline: (name: string) => `Vielen Dank, ${name}!`,
    intro:
      "Wir haben Ihre Anfrage für eine kostenlose Objektbesichtigung erhalten und melden uns zur Abstimmung der nächsten Schritte bei Ihnen.",
    summaryTitle: "Ihre Angaben",
    note: "Mit dieser Anfrage beauftragen Sie noch keine Reinigung. Wir stimmen zunächst gemeinsam einen Besichtigungstermin und Ihren Bedarf ab.",
    contactTitle: "Sie erreichen uns direkt",
    phoneLabel: "Telefon:",
    emailLabel: "E-Mail:",
    subject: "Ihre Anfrage bei Blitzeblank – Fensterreinigung",
    labels: {
      company: "Unternehmen",
      contact: "Ansprechpartner",
      location: "PLZ / Ort",
      objectType: "Objektart",
      cleaningNeed: "Reinigungsbedarf",
    },
  },
  en: {
    badge: "Your request at Blitzeblank",
    headline: (name: string) => `Thank you, ${name}!`,
    intro:
      "We've received your request for a free on-site visit and will get in touch to arrange the next steps with you.",
    summaryTitle: "Your details",
    note: "This request does not yet commission any cleaning. We'll first arrange a site visit and discuss your requirements together.",
    contactTitle: "You can reach us directly",
    phoneLabel: "Phone:",
    emailLabel: "Email:",
    subject: "Your request at Blitzeblank – Window Cleaning",
    labels: {
      company: "Company",
      contact: "Contact person",
      location: "Postal code / city",
      objectType: "Property type",
      cleaningNeed: "Cleaning needs",
    },
  },
}

const OBJECT_TYPE_LABELS_EN: Record<B2BObjectType, string> = {
  buero: "Office",
  geschaeft: "Shop / shop window",
  gewerbe: "Commercial building",
  sonstiges: "Other",
}

const CLEANING_NEED_LABELS_EN: Record<Exclude<B2BCleaningNeed, "">, string> = {
  einmalig: "One-time",
  regelmaessig: "Recurring",
  offen: "Still open",
}

/** Bestätigungs-E-Mail an den Anfragenden. */
export function buildB2BCustomerEmail(s: B2BInquirySubmission, logoSrc = "cid:blitzeblank-logo") {
  const locale = s.locale ?? "de"
  const ct = CUSTOMER_TEXT[locale]
  const firstName = s.contactPerson.split(" ")[0] || s.contactPerson

  const objectLabel = locale === "en" ? OBJECT_TYPE_LABELS_EN[s.objectType] : objectTypeLabel(s.objectType)
  const needLabel = s.cleaningNeed
    ? locale === "en"
      ? CLEANING_NEED_LABELS_EN[s.cleaningNeed]
      : cleaningNeedLabel(s.cleaningNeed)
    : "—"

  const rows: { label: string; value: string }[] = [
    { label: ct.labels.company, value: s.company },
    { label: ct.labels.contact, value: s.contactPerson },
    { label: ct.labels.location, value: s.location },
    { label: ct.labels.objectType, value: objectLabel },
    { label: ct.labels.cleaningNeed, value: needLabel },
  ]

  const summaryCard = `
    <div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      ${sectionTitle(ct.summaryTitle)}
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
    </div>`

  const noteCard = `
    <div style="background-color:${COLORS.mint};border-radius:14px;padding:18px 22px;margin-bottom:20px;">
      <p style="margin:0;color:${COLORS.slate};font-size:14px;line-height:1.6;">${escapeHtml(ct.note)}</p>
    </div>`

  const contactCta = `
    <div style="border:1px dashed ${COLORS.blue};border-radius:14px;padding:20px 22px;background-color:${COLORS.mint};">
      ${sectionTitle(ct.contactTitle)}
      <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:${COLORS.slate};">
        ${ct.phoneLabel} <a href="${CONTACT.phoneHref}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.phone}</a><br/>
        ${ct.emailLabel} <a href="mailto:${CONTACT.email}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.email}</a>
      </p>
    </div>`

  const html = emailShell({
    logoSrc,
    badge: ct.badge,
    headline: ct.headline(firstName),
    intro: escapeHtml(ct.intro),
    bodyHtml: summaryCard + noteCard + contactCta,
  })

  const text = [
    ct.headline(firstName),
    "",
    ct.intro,
    "",
    rowsToText(rows),
    "",
    ct.note,
    "",
    `${ct.phoneLabel} ${CONTACT.phone}`,
    `${ct.emailLabel} ${CONTACT.email}`,
    "",
    "Blitzeblank · blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: ct.subject }
}

/** Interne Benachrichtigung mit allen Infos (immer Deutsch). */
export function buildB2BInternalEmail(s: B2BInquirySubmission, logoSrc = "cid:blitzeblank-logo") {
  const rows = buildRows(s)

  const messageBlock = s.message.trim()
    ? `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Zusätzliche Angaben")}
         <p style="margin:8px 0 0;color:${COLORS.slate};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
           s.message,
         )}</p>
       </div>`
    : ""

  const sourceBadge = `<span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">B2B · Objektbesichtigung</span>`

  const html = emailShell({
    logoSrc,
    badge: "Neue Anfrage · Fensterreinigung",
    headline: `${s.company}`,
    intro: `${sourceBadge} &nbsp; <span style="display:inline-block;color:#ffffff;font-weight:700;">${escapeHtml(
      s.contactPerson,
    )}</span>`,
    bodyHtml:
      `<div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
         ${sectionTitle("Anfrage")}
         <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
       </div>` + messageBlock,
  })

  const text = [
    `Neue B2B-Anfrage: Fensterreinigung – ${s.company}`,
    "",
    rowsToText(rows),
    "",
    s.message.trim() ? `Zusätzliche Angaben:\n${s.message}` : "Zusätzliche Angaben: —",
    "",
    "Quelle: window_cleaning / b2b_site_visit",
  ].join("\n")

  return { html, text, subject: `Neue Anfrage: Fensterreinigung – ${s.company}` }
}
