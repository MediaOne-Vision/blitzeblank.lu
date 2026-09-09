// Cookie-Consent Hilfsfunktionen und GTM-Loader
// GTM wird ausschließlich nach ausdrücklicher Zustimmung geladen.

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-WGV442WX"

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
    dataLayer?: Record<string, unknown>[]
    __gtmLoaded?: boolean
  }
}

// Lädt das GTM-Script genau einmal und schiebt den Consent-Status in den dataLayer.
export function loadGtm(consent: ConsentState) {
  if (typeof window === "undefined") return
  if (!consent.statistics && !consent.marketing) return // ohne Zustimmung kein GTM

  window.dataLayer = window.dataLayer || []

  // Consent-Status für GTM-Trigger bereitstellen (vor dem Laden)
  window.dataLayer.push({
    event: "consent_update",
    consent_statistics: consent.statistics ? "granted" : "denied",
    consent_marketing: consent.marketing ? "granted" : "denied",
  })

  if (window.__gtmLoaded) return
  window.__gtmLoaded = true

  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  })

  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  // Verhindert, dass ein blockiertes/fehlgeschlagenes Laden (z. B. durch einen
  // Adblocker oder eine Netzwerksperre in der Vorschau-Umgebung) als
  // unbehandelter globaler "error"-Event auftaucht.
  script.onerror = () => {
    window.__gtmLoaded = false
  }
  document.head.appendChild(script)
}
