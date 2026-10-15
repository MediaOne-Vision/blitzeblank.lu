// Lead-Tracking über den GTM-dataLayer.
//
// Event- und Feldnamen von `lead_submitted` sind mit dem GTM-Container abgestimmt
// und werden NICHT umbenannt. `lead_status` ist groß-/kleinschreibungssensitiv
// ("accepted" bzw. "price_rejected").
//
// Grundsätze:
// - Events entstehen erst nach serverseitig bestätigter Verarbeitung (siehe TrackLead).
// - Events enthalten keine personenbezogenen Daten (keine E-Mail, kein Telefon, kein Name).
// - Ohne Statistik- oder Marketing-Einwilligung wird NICHTS in den dataLayer geschrieben,
//   auch nicht für eine spätere Einwilligung. Die Einwilligungsflags stehen im Event,
//   damit GTM-Trigger/Tags darauf prüfen können.

import { loadConsent } from "@/lib/cookie-consent"
import type { ContactEventPayload, LeadEventPayload } from "@/lib/form-types"

export type { LeadStatus, QuoteType, FormType, LeadEventPayload, ContactEventPayload } from "@/lib/form-types"

/** sessionStorage-Schlüssel für die Übergabe Formular → Danke-Seite (enthält nur den opaken Nachweis) */
const HANDOFF_KEY = "bb_lead_handoff"
/** Merker, dass in dieser Session bereits eine Danke-Seite gezeigt wurde (erlaubt Reload ohne Event) */
const SEEN_KEY = "bb_lead_seen"

/** Schlüssel, die niemals im dataLayer landen dürfen. */
const FORBIDDEN_KEYS = new Set([
  "email",
  "e_mail",
  "phone",
  "telefon",
  "name",
  "first_name",
  "last_name",
  "contact_person",
  "company",
  "address",
  "message",
  "location",
])

/** Entfernt personenbezogene Felder aus einer Event-Nutzlast. */
export function stripPersonalData(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(data).filter(([key]) => !FORBIDDEN_KEYS.has(key.toLowerCase())))
}

/** True, wenn Statistik oder Marketing eingewilligt wurde. */
export function trackingAllowed(): boolean {
  const consent = loadConsent()
  return Boolean(consent && (consent.statistics || consent.marketing))
}

function consentFlags() {
  const consent = loadConsent()
  return {
    consent_statistics: consent?.statistics ? "granted" : "denied",
    consent_marketing: consent?.marketing ? "granted" : "denied",
  }
}

/** Baut die lead_submitted-Nutzlast. quote_value nur bei angenommenem Richtpreis. */
export function buildLeadEvent(payload: LeadEventPayload): Record<string, unknown> {
  const event: Record<string, unknown> = {
    event: "lead_submitted",
    lead_status: payload.lead_status,
    service: payload.service,
    quote_type: payload.quote_type,
    currency: "EUR",
    lead_id: payload.lead_id,
    form_type: payload.form_type,
  }
  if (payload.lead_status === "accepted" && typeof payload.quote_value === "number" && payload.quote_value > 0) {
    event.quote_value = payload.quote_value
    // Richtpreis aus dem Rechner, kein nachgewiesener Umsatz.
    event.value_type = "estimated_quote"
  }
  return event
}

/** Baut die contact_submitted-Nutzlast. */
export function buildContactEvent(payload: ContactEventPayload): Record<string, unknown> {
  return {
    event: "contact_submitted",
    lead_id: payload.lead_id,
    form_type: payload.form_type,
    ...(payload.service ? { service: payload.service } : {}),
  }
}

function pushToDataLayer(event: Record<string, unknown>): boolean {
  if (typeof window === "undefined") return false
  if (!trackingAllowed()) return false
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ ...stripPersonalData(event), ...consentFlags() })
  return true
}

/** Schreibt lead_submitted in den dataLayer. Gibt zurück, ob gepusht wurde (Einwilligung vorhanden). */
export function pushLeadEvent(payload: LeadEventPayload): boolean {
  return pushToDataLayer(buildLeadEvent(payload))
}

/** Schreibt contact_submitted in den dataLayer. */
export function pushContactEvent(payload: ContactEventPayload): boolean {
  return pushToDataLayer(buildContactEvent(payload))
}

/** Generisches Event (z. B. b2b_form_start) – ebenfalls einwilligungsgebunden und ohne PII. */
export function pushDataLayerEvent(eventName: string, data: Record<string, unknown> = {}): boolean {
  return pushToDataLayer({ event: eventName, ...data })
}

/** Legt den signierten Nachweis für die Danke-Seite ab. */
export function storeLeadHandoff(proof: string) {
  if (typeof window === "undefined") return
  try {
    sessionStorage.setItem(HANDOFF_KEY, proof)
  } catch {
    // sessionStorage nicht verfügbar – Tracking entfällt, Seite funktioniert trotzdem.
  }
}

/** Liest den Nachweis einmalig aus und entfernt ihn sofort (verhindert Doppel-Conversions). */
export function consumeLeadHandoff(): string | null {
  if (typeof window === "undefined") return null
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY)
    if (!raw) return null
    sessionStorage.removeItem(HANDOFF_KEY)
    return raw
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
