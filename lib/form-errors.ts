import type { FormErrorCode } from "@/lib/form-types"

export type ClientFormError = FormErrorCode | "network"

const MESSAGES = {
  de: {
    input: "Bitte prüfen Sie Ihre Angaben, insbesondere die E-Mail-Adresse oder Telefonnummer.",
    rate: "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an: +352 661 830 493.",
    delivery:
      "Ihre Anfrage konnte gerade nicht übermittelt werden. Ihre Eingaben bleiben erhalten – bitte versuchen Sie es erneut oder rufen Sie uns an: +352 661 830 493.",
  },
  en: {
    input: "Please check your details, especially your email address or phone number.",
    rate: "Too many requests in a short time. Please try again in a few minutes or call us: +352 661 830 493.",
    delivery:
      "Your request could not be sent right now. Your entries are kept – please try again or call us: +352 661 830 493.",
  },
} as const

/** Verständliche, mehrsprachige Fehlermeldung ohne technische Details. */
export function formErrorMessage(code: ClientFormError, locale: "de" | "en" = "de"): string {
  const m = MESSAGES[locale]
  switch (code) {
    case "validation":
    case "invalid_email":
    case "invalid_contact":
    case "missing_fields":
      return m.input
    case "rate_limited":
      return m.rate
    default:
      return m.delivery
  }
}
