import { emailShell, rowsToHtml, rowsToText, sectionTitle } from "@/lib/b2b-inquiry-email"

export interface ContactSubmission {
  name: string
  company: string
  email: string
  phone: string
  /** Wert aus der Leistungsauswahl (z. B. "fenster") */
  service: string
  serviceLabel: string
  message: string
  locale: "de" | "en" | "fr"
  leadId: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const BORDER = "#e2e8f0"
const SLATE = "#475569"

const CUSTOMER_TEXT = {
  de: {
    subject: "Ihre Anfrage bei Blitzeblank ist eingegangen",
    badge: "Eingangsbestätigung",
    headline: (n: string) => `Danke, ${n}!`,
    intro: "Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.",
    summary: "Ihre Angaben",
    labels: { service: "Leistung", message: "Nachricht" },
    note: "Dringend? Rufen Sie uns gerne direkt an: +352 661 830 493.",
  },
  en: {
    subject: "We have received your request – Blitzeblank",
    badge: "Confirmation of receipt",
    headline: (n: string) => `Thank you, ${n}!`,
    intro: "We have received your message and will get back to you shortly.",
    summary: "Your details",
    labels: { service: "Service", message: "Message" },
    note: "Urgent? Feel free to call us directly: +352 661 830 493.",
  },
  fr: {
    subject: "Nous avons bien reçu votre demande – Blitzeblank",
    badge: "Accusé de réception",
    headline: (n: string) => `Merci, ${n} !`,
    intro: "Nous avons bien reçu votre message et vous répondrons très prochainement.",
    summary: "Vos informations",
    labels: { service: "Prestation", message: "Message" },
    note: "Urgent ? N'hésitez pas à nous appeler directement : +352 661 830 493.",
  },
} as const

/** Eingangsbestätigung an den Absender. */
export function buildContactCustomerEmail(s: ContactSubmission, logoSrc = "cid:blitzeblank-logo") {
  const t = CUSTOMER_TEXT[s.locale]
  const firstName = s.name.split(" ")[0] || s.name
  const rows = [
    { label: t.labels.service, value: s.serviceLabel || "—" },
    { label: t.labels.message, value: s.message || "—" },
  ]
  const html = emailShell({
    logoSrc,
    badge: t.badge,
    headline: t.headline(firstName),
    intro: escapeHtml(t.intro),
    bodyHtml: `<div style="border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;margin-bottom:20px;">
        ${sectionTitle(t.summary)}
        <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
      </div>
      <p style="margin:0;color:${SLATE};font-size:14px;line-height:1.6;">${escapeHtml(t.note)}</p>`,
  })
  const text = [t.headline(firstName), "", t.intro, "", rowsToText(rows), "", t.note, "", "Blitzeblank · blitzeblank.lu"].join("\n")
  return { html, text, subject: t.subject }
}

/** Interne Benachrichtigung (immer Deutsch). */
export function buildContactInternalEmail(s: ContactSubmission, logoSrc = "cid:blitzeblank-logo") {
  const rows = [
    { label: "Name", value: s.name },
    { label: "Unternehmen", value: s.company || "—" },
    { label: "E-Mail", value: s.email },
    { label: "Telefon", value: s.phone || "—" },
    { label: "Leistung", value: s.serviceLabel || "—" },
  ]
  const html = emailShell({
    logoSrc,
    badge: "Neue Kontaktanfrage",
    headline: s.name,
    intro: escapeHtml(s.company || "Kontaktformular"),
    bodyHtml: `<div style="border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;margin-bottom:22px;">
        ${sectionTitle("Anfrage")}
        <table style="width:100%;border-collapse:collapse;margin-top:8px;">${rowsToHtml(rows)}</table>
      </div>
      <div style="border:1px solid ${BORDER};border-radius:14px;padding:20px 22px;">
        ${sectionTitle("Nachricht")}
        <p style="margin:8px 0 0;color:${SLATE};font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(s.message || "—")}</p>
      </div>`,
  })
  const text = [`Neue Kontaktanfrage – ${s.name}`, "", rowsToText(rows), "", `Nachricht:\n${s.message || "—"}`].join("\n")
  return { html, text, subject: `Neue Kontaktanfrage: ${s.name}` }
}
