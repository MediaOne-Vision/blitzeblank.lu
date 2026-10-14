// Gemeinsame Typen für Formularverarbeitung und Tracking.
// Bewusst ohne Node-Importe, damit sie auch im Browser genutzt werden können.

export type LeadStatus = "accepted" | "price_rejected"
export type QuoteType = "recurring" | "onetime"

/** Eindeutige Kennzeichnung des Formulars in Tracking-Daten und Erfolgsnachweis. */
export type FormType = "quote_calculator" | "stone_calculator" | "contact" | "window_b2b"

export type FormErrorCode =
  | "validation"
  | "invalid_email"
  | "invalid_contact"
  | "missing_fields"
  | "rate_limited"
  | "not_configured"
  | "delivery_failed"

/**
 * Ergebnis einer Formularverarbeitung.
 *
 * - `confirmed`: Der Versanddienst hat die interne Benachrichtigung nachweislich
 *   angenommen. `proof` ist ein kurzlebiger, signierter Erfolgsnachweis ohne
 *   personenbezogene Daten (null, falls er nicht signiert werden konnte).
 * - `neutral`: Spamschutz hat angeschlagen. Nach außen unauffällig, aber ohne
 *   Lead, ohne Nachweis und ohne Tracking.
 * - `error`: Nichts wurde bestätigt. Das Formular muss Eingaben erhalten und
 *   eine Wiederholung anbieten.
 */
export type SubmitResult =
  | { status: "confirmed"; leadId: string; proof: string | null }
  | { status: "neutral" }
  | { status: "error"; code: FormErrorCode }

/** Inhalt des signierten Erfolgsnachweises (keine Kontaktdaten). */
export interface LeadClaims {
  /** lead_id */
  lid: string
  /** form_type */
  ft: FormType
  /** lead_status (nur Angebots-/Steinpflege-Rechner) */
  st?: LeadStatus
  /** service */
  svc?: string
  /** quote_type */
  qt?: QuoteType
  /** quote_value – geschätzter Richtpreis, kein Umsatz */
  qv?: number
  /** Ablaufzeitpunkt (ms seit Epoch) */
  exp: number
}

/** Tracking-Nutzlast von lead_submitted (ohne personenbezogene Daten). */
export interface LeadEventPayload {
  lead_status: LeadStatus
  service: string
  quote_type: QuoteType
  quote_value?: number
  lead_id: string
  form_type: FormType
}

/** Tracking-Nutzlast von contact_submitted (ohne personenbezogene Daten). */
export interface ContactEventPayload {
  lead_id: string
  form_type: "contact"
  service?: string
}

/** Welche Danke-Seite welchen Nachweis erwartet. */
export type ExpectedProof = "accepted" | "price_rejected" | "contact"
