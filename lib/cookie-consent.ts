// Cookie-Consent Hilfsfunktionen, Google Consent Mode v2 und GTM-Loader.
// GTM wird ausschließlich nach ausdrücklicher Zustimmung geladen.

// GTM-Container-ID bewusst als Klartext-Konstante (kein Env-Var):
// Das Projekt wird via GitHub Actions deployt, wo NEXT_PUBLIC_* zur Build-Zeit
// nicht injiziert wird und GTM sonst still ausfiele. Die ID ist nicht sensibel.
export const GTM_ID = "GTM-WGV442WX"

export const CONSENT_STORAGE_KEY = "bb-cookie-consent"
// Version erhöhen, wenn sich Kategorien ändern -> Banner erscheint erneut
export const CONSENT_VERSION = 1

export type ConsentState = {
  version: number
  necessary: true // immer aktiv
  statistics: boolean
  marketing: boolean
  timestamp: string
}

export function loadConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed.version !== CONSENT_VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function saveConsent(consent: Omit<ConsentState, "version" | "necessary" | "timestamp">) {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    necessary: true,
    statistics: consent.statistics,
    marketing: consent.marketing,
    timestamp: new Date().toISOString(),
  }
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state))
  return state
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    __gtmLoaded?: boolean
    __consentDefaultsSet?: boolean
  }
}

type GrantValue = "granted" | "denied"

export interface GoogleConsentSignals {
  ad_storage: GrantValue
  ad_user_data: GrantValue
  ad_personalization: GrantValue
  analytics_storage: GrantValue
}

/**
 * Übersetzt die Banner-Kategorien in Consent-Mode-v2-Signale:
 * Statistik → analytics_storage, Marketing → ad_storage, ad_user_data, ad_personalization.
 */
export function toGoogleConsent(consent: Pick<ConsentState, "statistics" | "marketing">): GoogleConsentSignals {
  const ads: GrantValue = consent.marketing ? "granted" : "denied"
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: consent.statistics ? "granted" : "denied",
  }
}

// gtag() muss ein echtes `arguments`-Objekt in den dataLayer schieben – ein Array wird von GTM ignoriert.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

/** Setzt die restriktiven Standardwerte, bevor irgendein Google-Tag geladen wird (einmalig). */
export function initConsentDefaults() {
  if (typeof window === "undefined" || window.__consentDefaultsSet) return
  window.__consentDefaultsSet = true
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  })
}

function injectGtmScript() {
  if (window.__gtmLoaded) return
  window.__gtmLoaded = true

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  // Verhindert, dass ein blockiertes/fehlgeschlagenes Laden (z. B. Adblocker) als
  // unbehandelter globaler "error"-Event auftaucht.
  script.onerror = () => {
    window.__gtmLoaded = false
  }
  document.head.appendChild(script)
}

/**
 * Wendet eine Einwilligungsentscheidung an – bei Zustimmung, Ablehnung und Widerruf.
 *
 * Reihenfolge (wichtig): 1. Defaults "denied", 2. Consent-Update mit der tatsächlichen
 * Auswahl, 3. erst dann das GTM-Script. Bei Ablehnung wird GTM nicht geladen; war es
 * bereits geladen (Widerruf), erhält es ein "denied"-Update.
 * Eigene Tracking-Events prüft `trackingAllowed()` gegen den gespeicherten Stand.
 */
export function applyConsent(consent: Pick<ConsentState, "statistics" | "marketing">) {
  if (typeof window === "undefined") return

  initConsentDefaults()
  gtag("consent", "update", toGoogleConsent(consent))
  window.dataLayer?.push({
    event: "consent_update",
    consent_statistics: consent.statistics ? "granted" : "denied",
    consent_marketing: consent.marketing ? "granted" : "denied",
  })

  if (consent.statistics || consent.marketing) injectGtmScript()
}
