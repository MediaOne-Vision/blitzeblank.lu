// Lead-Tracking für Google Ads & Meta über den GTM-dataLayer.
//
// Das Event `lead_submitted` und alle Feldnamen sind mit dem GTM-Container
// abgestimmt und dürfen NICHT umbenannt werden. `lead_status` ist
// groß-/kleinschreibungssensitiv und muss exakt "accepted" bzw. "price_rejected"
// lauten.
//
// Der GTM verarbeitet das Event nur, wenn er geladen ist – und GTM lädt
// ausschließlich nach Cookie-Zustimmung (siehe lib/cookie-consent.ts). Ohne
// Zustimmung liegt das Event wirkungslos im dataLayer-Array; E-Mail/Telefon
// verlassen den Browser dann nicht.

export type LeadStatus = "accepted" | "price_rejected"
export type QuoteType = "recurring" | "onetime"

/**
 * Nutzlast, die beim Absenden im Formular erzeugt und per sessionStorage an die
 * Danke-Seite übergeben wird. Dort wird daraus das dataLayer-Event gebaut.
 */
export interface LeadTrackingPayload {
  lead_status: LeadStatus
  /** Slug der Leistung, z. B. "fensterreinigung" */
  service: string
  /** Netto-Angebotssumme als Zahl (bei Turnus der Jahreswert). Weglassen, wenn unbekannt. */
  quote_value?: number
  quote_type: QuoteType
  /** Eindeutige ID der Anfrage, z. B. BB-2026-00417 */
  lead_id: string
  /** Klartext aus dem Formular – GTM hasht die Werte vor dem Versand. */
  email: string
  phone: string
}

/** sessionStorage-Schlüssel für die Übergabe Formular → Danke-Seite */
const HANDOFF_KEY = "bb_lead_handoff"
/** Merker, dass in dieser Session bereits eine Danke-Seite gezeigt wurde (erlaubt Reload) */
const SEEN_KEY = "bb_lead_seen"

/** Erzeugt eine eindeutige Anfrage-ID im Format BB-<Jahr>-<5 Ziffern>. */
export function generateLeadId(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `BB-${year}-${rand}`
}

/** Legt die Tracking-Nutzlast für die anschließende Danke-Seite ab. */
export function storeLeadHandoff(payload: LeadTrackingPayload) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(payload))
  } catch {
    // sessionStorage nicht verfügbar – Tracking entfällt, Seite funktioniert trotzdem.
  }
}

/** Liest die Nutzlast einmalig aus und entfernt sie sofort (verhindert Doppel-Conversions). */
export function consumeLeadHandoff(): LeadTrackingPayload | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY)
    if (!raw) return null
    sessionStorage.removeItem(HANDOFF_KEY)
    return JSON.parse(raw) as LeadTrackingPayload
  } catch {
    return null
  }
}

/** Markiert, dass in dieser Session eine Danke-Seite gezeigt wurde (Reload bleibt erlaubt). */
export function markLeadSeen() {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(SEEN_KEY, "1")
  } catch {
    // ignorieren
  }
}

/** True, wenn in dieser Session bereits eine Danke-Seite gezeigt wurde. */
export function hasLeadSeen(): boolean {
  if (typeof window === "undefined") return false
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1"
  } catch {
    return false
  }
}

/**
 * Generisches Event in den dataLayer schieben (z. B. B2B-Formular-Events).
 * Wirkt nur, wenn GTM nach Cookie-Zustimmung geladen wurde – sonst liegt das
 * Event wirkungslos im Array. Feldnamen sind mit dem GTM-Container abgestimmt.
 */
export function pushDataLayerEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

/**
 * Schiebt das `lead_submitted`-Event in den dataLayer.
 * In GTM triggert dieses Event die Google-Ads- bzw. Meta-Conversion.
 */
export function pushLeadEvent(payload: LeadTrackingPayload) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []

  const event: Record<string, unknown> = {
    event: "lead_submitted",
    lead_status: payload.lead_status,
    service: payload.service,
    quote_type: payload.quote_type,
    currency: "EUR",
    lead_id: payload.lead_id,
    email: payload.email,
    phone: payload.phone,
  }

  // quote_value nur mitgeben, wenn ein sinnvoller Wert vorliegt (sonst Feld weglassen).
  if (typeof payload.quote_value === "number" && payload.quote_value > 0) {
    event.quote_value = payload.quote_value
  }

  window.dataLayer.push(event)
}
