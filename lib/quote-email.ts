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
  /** Eindeutige Anfrage-ID (z. B. BB-2026-00417) zur Korrelation mit dem Conversion-Tracking */
  leadId?: string
  /** Sprache des Kunden – steuert nur die Kunden-Bestätigungsmail, die interne Mail bleibt Deutsch */
  locale?: "de" | "en"
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

const SUMMARY_LABELS = {
  de: {
    service: "Leistung",
    customerType: "Kundentyp",
    commercial: "Gewerbe",
    private: "Privat",
    details: "Details",
    windowCount: "Anzahl Fenster",
    breakdown: "Aufschlüsselung",
    area: "Fläche",
    frequency: "Turnus",
    address: "Adresse",
    distance: "Entfernung",
    distancePrefix: "ca.",
    date: "Wunschtermin",
    onRequest: "Auf Anfrage",
  },
  en: {
    service: "Service",
    customerType: "Customer Type",
    commercial: "Commercial",
    private: "Private",
    details: "Details",
    windowCount: "Number of Windows",
    breakdown: "Breakdown",
    area: "Area",
    frequency: "Frequency",
    address: "Address",
    distance: "Distance",
    distancePrefix: "approx.",
    date: "Preferred Date",
    onRequest: "On Request",
  },
}

/** Baut die gemeinsamen Eckdaten der Anfrage als Liste von Label/Wert-Paaren */
function buildSummaryRows(s: QuoteSubmission, locale: "de" | "en" = "de"): { label: string; value: string }[] {
  const l = SUMMARY_LABELS[locale]
  const rows: { label: string; value: string }[] = [{ label: l.service, value: s.serviceLabel }]

  if (s.customerType) {
    rows.push({ label: l.customerType, value: s.customerType === "gewerbe" ? l.commercial : l.private })
  }
  if (s.details.length > 0) {
    rows.push({ label: l.details, value: s.details.join(", ") })
  }
  if (s.windowCount) {
    rows.push({ label: l.windowCount, value: String(s.windowCount) })
  }
  if (s.windowBreakdown) {
    rows.push({ label: l.breakdown, value: s.windowBreakdown })
  }
  if (!s.windowCount && s.area > 0) {
    rows.push({ label: l.area, value: `${s.area} m²` })
  }
  if (s.frequencyLabel) {
    rows.push({ label: l.frequency, value: s.frequencyLabel })
  }
  rows.push({ label: l.address, value: s.address })
  if (typeof s.distanceKm === "number") {
    rows.push({ label: l.distance, value: `${l.distancePrefix} ${s.distanceKm} km` })
  }
  if (s.preferredDate) {
    rows.push({ label: l.date, value: s.preferredDate })
  }
  return rows
}

/** Preis-Text für die Anzeige (Richtpreis oder "auf Anfrage") */
function priceText(s: QuoteSubmission, locale: "de" | "en" = "de"): string {
  if (s.estimatedMin === 0 && s.estimatedMax === 0) return SUMMARY_LABELS[locale].onRequest
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
function emailShell(opts: { badge: string; headline: string; intro: string; bodyHtml: string; logoSrc: string }): string {
  const { badge, headline, intro, bodyHtml, logoSrc } = opts
  return `
  <div style="margin:0;padding:24px 12px;background-color:${COLORS.bg};font-family:'Helvetica Neue',Arial,Helvetica,sans-serif;">
    <div style="max-width:580px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(11,42,69,0.10);">
      <!-- Logo-Leiste -->
      <div style="padding:22px 32px;background-color:#ffffff;border-bottom:1px solid ${COLORS.border};">
        <img src="${logoSrc}" alt="Blitzeblank" height="30" style="height:30px;display:block;border:0;outline:none;text-decoration:none;" />
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
          Diese E-Mail wurde automatisch versendet &middot; info@blitzeblank.lu
        </p>
      </div>
    </div>
  </div>`
}

/** Firmenkontakt für Call-to-Action in Kunden-Mails */
const CONTACT = {
  phone: "+352 661 830 493",
  phoneHref: "tel:+352661830493",
  email: "info@blitzeblank.lu",
}

/** Kontakt-CTA-Block (Telefon + E-Mail) im Blitzeblank-Look */
function contactCta(locale: "de" | "en" = "de"): string {
  const ct = CUSTOMER_TEXT[locale]
  return `
    <div style="border:1px dashed ${COLORS.blue};border-radius:14px;padding:20px 22px;margin-bottom:22px;background-color:${COLORS.mint};">
      ${sectionTitle(ct.contactCtaTitle)}
      <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:${COLORS.slate};">
        ${ct.contactPhoneLabel} <a href="${CONTACT.phoneHref}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.phone}</a><br/>
        ${ct.contactEmailLabel} <a href="mailto:${CONTACT.email}" style="color:${COLORS.teal};font-weight:700;text-decoration:none;">${CONTACT.email}</a>
      </p>
    </div>`
}

const CUSTOMER_TEXT = {
  de: {
    summaryTitle: "Zusammenfassung Ihrer Anfrage",
    priceLabel: "Unverbindlicher Richtpreis",
    photoNote: (n: number) => `Ihre ${n} hochgeladenen Foto${n === 1 ? "" : "s"} haben wir erhalten.`,
    declinedBadge: "Schade, dass es diesmal nicht gepasst hat",
    declinedHeadline: (name: string) => `Bleiben wir im Gespräch, ${name}?`,
    declinedIntro:
      "Wir haben gesehen, dass Ihnen unser Richtpreis noch nicht zugesagt hat – das ist überhaupt kein Problem.",
    declinedBody1: `Unser Online-Richtpreis ist bewusst vorsichtig kalkuliert und berücksichtigt noch nicht die Besonderheiten Ihres Objekts. Häufig lässt sich vor Ort ein <strong>faireres, passenderes Angebot</strong> finden – gerade bei wiederkehrenden Aufträgen oder mehreren Leistungen zusammen.`,
    declinedBody2:
      "Rufen Sie uns einfach kurz an oder schreiben Sie uns – wir schauen gemeinsam, wie wir Ihnen trotzdem weiterhelfen können. Ganz unverbindlich.",
    declinedClosing: "Wir würden uns freuen, Sie doch noch als Kundin oder Kunde begrüßen zu dürfen!",
    declinedTextBody: [
      "Schade, dass Ihnen unser Online-Richtpreis noch nicht zugesagt hat - das ist kein Problem.",
      "",
      "Unser Richtpreis ist bewusst vorsichtig kalkuliert. Vor Ort lässt sich oft ein faireres,",
      "passenderes Angebot finden. Rufen Sie uns an oder schreiben Sie uns - ganz unverbindlich.",
    ],
    declinedSubject: "Bleiben wir im Gespräch? – Ihre Anfrage bei Blitzeblank",
    acceptedBadge: "Ihre Anfrage bei Blitzeblank",
    acceptedHeadline: (name: string) => `Vielen Dank, ${name}!`,
    acceptedIntro: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.",
    acceptedClosing: "Bei Fragen erreichen Sie uns jederzeit. Wir freuen uns darauf, für Sie tätig zu werden!",
    acceptedTextIntro: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.",
    acceptedSubject: (serviceLabel: string) => `Ihre Anfrage bei Blitzeblank – ${serviceLabel}`,
    summaryLabel: "Zusammenfassung:",
    priceTextLabel: "Unverbindlicher Richtpreis:",
    photosLabel: "Hochgeladene Fotos:",
    contactCtaTitle: "Sie erreichen uns direkt",
    contactPhoneLabel: "Telefon:",
    contactEmailLabel: "E-Mail:",
  },
  en: {
    summaryTitle: "Summary of Your Request",
    priceLabel: "Non-Binding Estimate",
    photoNote: (n: number) => `We've received your ${n} uploaded photo${n === 1 ? "" : "s"}.`,
    declinedBadge: "Too bad it wasn't a match this time",
    declinedHeadline: (name: string) => `Shall we stay in touch, ${name}?`,
    declinedIntro:
      "We noticed our estimated price didn't quite work for you – that's absolutely no problem.",
    declinedBody1: `Our online estimate is deliberately calculated on the cautious side and doesn't yet take the specifics of your property into account. On site, we can often find a <strong>fairer, better-suited offer</strong> – especially for recurring jobs or several services combined.`,
    declinedBody2:
      "Just give us a quick call or write to us – we'll look together at how we can still help you. Completely non-binding.",
    declinedClosing: "We'd love to welcome you as a customer after all!",
    declinedTextBody: [
      "Too bad our online estimate didn't quite work for you - that's no problem.",
      "",
      "Our estimate is deliberately calculated on the cautious side. On site we can often find a",
      "fairer, better-suited offer. Give us a call or write to us - completely non-binding.",
    ],
    declinedSubject: "Shall we stay in touch? – Your request at Blitzeblank",
    acceptedBadge: "Your Request at Blitzeblank",
    acceptedHeadline: (name: string) => `Thank you, ${name}!`,
    acceptedIntro: "We've received your request and will get back to you shortly.",
    acceptedClosing: "If you have any questions, feel free to reach out. We look forward to working with you!",
    acceptedTextIntro: "We've received your request and will get back to you shortly.",
    acceptedSubject: (serviceLabel: string) => `Your request at Blitzeblank – ${serviceLabel}`,
    summaryLabel: "Summary:",
    priceTextLabel: "Non-binding estimate:",
    photosLabel: "Uploaded photos:",
    contactCtaTitle: "You can reach us directly",
    contactPhoneLabel: "Phone:",
    contactEmailLabel: "Email:",
  },
}

/** Bestätigungs-E-Mail an den Anfragenden. logoSrc = "cid:blitzeblank-logo" im Versand, data-URI in der Vorschau. */
export function buildCustomerEmail(s: QuoteSubmission, logoSrc = "cid:blitzeblank-logo") {
  const locale = s.locale ?? "de"
  const ct = CUSTOMER_TEXT[locale]
  const rows = buildSummaryRows(s, locale)
  const firstName = s.name.split(" ")[0] || s.name
  const isDeclined = s.decision === "declined"

  const summaryCard = `
    <div style="border:1px solid ${COLORS.border};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
      ${sectionTitle(ct.summaryTitle)}
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
    </div>`

  const priceBlock = `
    <div style="background-color:${COLORS.mint};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
      <p style="margin:0 0 4px;color:${COLORS.slateLight};font-size:13px;">${ct.priceLabel}</p>
      <p style="margin:0;color:${COLORS.navy};font-size:26px;font-weight:800;">${priceText(s, locale)}</p>
    </div>`

  const photoNote =
    s.photos && s.photos.length > 0
      ? `<p style="margin:0 0 20px;color:${COLORS.slate};font-size:14px;line-height:1.6;">
           ${ct.photoNote(s.photos.length)}
         </p>`
      : ""

  if (isDeclined) {
    // Kunde hat den Richtpreis abgelehnt: freundliche "Schade"-Nachricht mit offener Tür.
    const html = emailShell({
      logoSrc,
      badge: ct.declinedBadge,
      headline: ct.declinedHeadline(firstName),
      intro: ct.declinedIntro,
      bodyHtml:
        `<p style="margin:0 0 20px;color:${COLORS.slate};font-size:15px;line-height:1.7;">
           ${ct.declinedBody1}
         </p>
         <p style="margin:0 0 22px;color:${COLORS.slate};font-size:15px;line-height:1.7;">
           ${ct.declinedBody2}
         </p>` +
        contactCta(locale) +
        summaryCard +
        photoNote +
        `<p style="margin:0;color:${COLORS.slate};font-size:15px;line-height:1.6;">
          ${ct.declinedClosing}
        </p>`,
    })

    const text = [
      ct.declinedHeadline(firstName),
      "",
      ...ct.declinedTextBody,
      "",
      `${ct.contactPhoneLabel} ${CONTACT.phone}`,
      `${ct.contactEmailLabel} ${CONTACT.email}`,
      "",
      ct.summaryLabel,
      rowsToText(rows),
      "",
      "Blitzeblank · info@blitzeblank.lu",
    ].join("\n")

    return { html, text, subject: ct.declinedSubject }
  }

  const html = emailShell({
    logoSrc,
    badge: ct.acceptedBadge,
    headline: ct.acceptedHeadline(firstName),
    intro: ct.acceptedIntro,
    bodyHtml:
      summaryCard +
      priceBlock +
      photoNote +
      `<p style="margin:0;color:${COLORS.slate};font-size:15px;line-height:1.6;">
        ${ct.acceptedClosing}
      </p>`,
  })

  const text = [
    ct.acceptedHeadline(s.name),
    "",
    ct.acceptedTextIntro,
    "",
    ct.summaryLabel,
    rowsToText(rows),
    "",
    `${ct.priceTextLabel} ${priceText(s, locale)}`,
    s.photos && s.photos.length > 0 ? `\n${ct.photosLabel} ${s.photos.length}` : "",
    "",
    "Blitzeblank · info@blitzeblank.lu",
  ].join("\n")

  return { html, text, subject: ct.acceptedSubject(s.serviceLabel) }
}

/** Interne Benachrichtigung mit allen Infos. */
export function buildInternalEmail(s: QuoteSubmission, baseUrl: string, logoSrc = "cid:blitzeblank-logo") {
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

  const priceBadge = `<span style="display:inline-block;background-color:rgba(255,255,255,0.2);color:#ffffff;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;">${
    s.decision === "accepted" ? "Angebot angenommen" : "Preis auf Anfrage"
  }</span>`

  const html = emailShell({
    logoSrc,
    badge: "Neue Angebotsanfrage",
    headline: s.serviceLabel,
    intro: `${priceBadge} &nbsp; <span style="display:inline-block;color:#ffffff;font-weight:700;">Richtpreis: ${priceText(
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

  const isDeclined = s.decision === "declined"
  // Bei abgelehntem Preis wird der Betreff mit "PREIS ABGELEHNT:" vorangestellt,
  // damit es im Postfach sofort ersichtlich ist.
  const subject = isDeclined
    ? `PREIS ABGELEHNT: ${s.serviceLabel} – ${s.name}`
    : `Neue Anfrage: ${s.serviceLabel} – ${s.name}`

  const text = [
    isDeclined ? `PREIS ABGELEHNT: ${s.serviceLabel} – ${s.name}` : `Neue Angebotsanfrage: ${s.serviceLabel}`,
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
      ? `Fotos (${photos.length}):\n${photos.map((p, i) => `Foto ${i + 1} (${p.name}): ${photoUrl(baseUrl, p.pathname)}`).join("\n")}`
      : "Fotos: keine",
    "",
    s.message.trim() ? `Nachricht:\n${s.message}` : "Nachricht: —",
  ].join("\n")

  return { html, text, subject }
}

/** Logo als Inline-Anhang (wird im Header über cid:blitzeblank-logo referenziert) */
export const logoAttachment = {
  filename: "blitzeblank-logo.png",
  content: EMAIL_LOGO_BASE64,
  contentId: "blitzeblank-logo",
  contentType: "image/png",
}
