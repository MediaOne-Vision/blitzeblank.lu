// deployment-center:contact-form-tracking v1
// Einheitliches Erfolgsereignis contact_form_submitted für alle Formulare.
// Nur nach serverseitig angenommener Anfrage aufrufen (SubmitResult.status === "confirmed").
// Ohne Statistik-/Marketing-Einwilligung wird nichts in den dataLayer geschrieben und nichts nachgeholt.
import { trackingAllowed } from "@/lib/tracking"

const STORAGE_KEY = "bb_contact_form_reported"
const MAX_REMEMBERED = 20
const reported = new Set<string>()

function readStored(): string[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : []
  } catch {
    return []
  }
}

function remember(id: string) {
  reported.add(id)
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...readStored(), id].slice(-MAX_REMEMBERED)))
  } catch {
    // sessionStorage nicht verfügbar – Deduplizierung im Speicher genügt
  }
}

/**
 * Schreibt contact_form_submitted in den dataLayer. Gibt zurück, ob gepusht wurde.
 * Wirft nie: Trackingfehler dürfen die angenommene Anfrage und die Weiterleitung nicht beeinflussen.
 * submissionId ist die serverseitige Lead-ID (bleibt für dieselbe Anfrage gleich, neue Anfrage = neue ID).
 */
export function trackContactFormSubmitted(input: { formId: string; submissionId: string }): boolean {
  try {
    if (typeof window === "undefined") return false
    const { formId, submissionId } = input
    if (!formId || !submissionId) return false
    if (!trackingAllowed()) return false
    if (reported.has(submissionId) || readStored().includes(submissionId)) return false
    remember(submissionId)
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "contact_form_submitted",
      form_id: formId,
      page_path: window.location.pathname,
      submission_id: submissionId,
    })
    return true
  } catch {
    return false
  }
}
