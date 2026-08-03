// Lead-Tracking für Google Ads & Meta über den GTM-dataLayer.
// Das Event wird nur vom GTM verarbeitet, wenn GTM geladen ist – und GTM lädt
// ausschließlich nach Cookie-Zustimmung (siehe lib/cookie-consent.ts).
// Ohne Zustimmung liegt das Event wirkungslos im dataLayer-Array.

export type LeadOutcome = "accepted" | "declined"

/**
 * Conversion-Werte je Lead-Typ (in EUR).
 * Ein angenommenes Angebot ist ein wärmerer Lead und bekommt daher einen höheren
 * Wert, damit Smart Bidding / der Meta-Algorithmus beide Typen unterschiedlich
 * gewichten kann. Werte können jederzeit angepasst werden.
 */
export const LEAD_VALUES: Record<LeadOutcome, number> = {
  accepted: 40,
  declined: 10,
}

/**
 * Schiebt ein `generate_lead`-Event in den dataLayer.
 * In GTM triggert dieses Event die Google-Ads- bzw. Meta-Conversion.
 */
export function pushLeadEvent(params: { outcome: LeadOutcome; value: number; service?: string }) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: "generate_lead",
    lead_outcome: params.outcome,
    lead_service: params.service || "unbekannt",
    value: params.value,
    currency: "EUR",
  })
}
