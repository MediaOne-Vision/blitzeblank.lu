"use server"

/**
 * Google-Maps-Anbindung für den Angebotsrechner.
 *
 * Alle Aufrufe laufen serverseitig, damit der API-Key (GOOGLE_MAPS_API_KEY)
 * niemals im Browser landet. Ist kein Key gesetzt, liefern die Funktionen
 * neutrale Ergebnisse zurück (keine Vorschläge, keine Entfernung) – der
 * Rechner bleibt dadurch voll funktionsfähig.
 */

/** Feste Firmenadresse als Startpunkt für die Entfernungsberechnung */
export const COMPANY_ADDRESS = "6A, Rue Michel Rodange, 7681 Waldbillig, Luxemburg"

export interface AddressSuggestion {
  /** Vollständige, lesbare Adresse */
  description: string
  /** Google-Place-ID für die anschließende Entfernungsberechnung */
  placeId: string
}

export interface TravelInfo {
  /** Einfache Entfernung in Kilometern */
  distanceKm: number
  /** Gefahrene Kilometer (Hin- und Rückweg) – Grundlage der Anfahrtskosten */
  billableKm: number
}

/**
 * Liefert Adressvorschläge während der Eingabe (Google Places Autocomplete).
 * Auf Adressen in Luxemburg, Deutschland, Belgien und Frankreich eingegrenzt.
 */
export async function getAddressSuggestions(input: string): Promise<AddressSuggestion[]> {
  const key = process.env.GOOGLE_MAPS_API_KEY
  const query = input.trim()
  if (!key || query.length < 3) return []

  const url = new URL("https://maps.googleapis.com/maps/api/place/autocomplete/json")
  url.searchParams.set("input", query)
  url.searchParams.set("key", key)
  url.searchParams.set("language", "de")
  url.searchParams.set("types", "address")
  url.searchParams.set("components", "country:lu|country:de|country:be|country:fr")

  try {
    const res = await fetch(url, { cache: "no-store" })
    const data = (await res.json()) as {
      status: string
      predictions?: { description: string; place_id: string }[]
    }
    if (data.status !== "OK" || !data.predictions) return []
    return data.predictions.slice(0, 5).map((p) => ({
      description: p.description,
      placeId: p.place_id,
    }))
  } catch {
    return []
  }
}

/**
 * Berechnet die Fahrstrecke von der Firmenadresse zur Zieladresse
 * (Google Distance Matrix). Zurückgegeben werden einfache Entfernung und
 * die abzurechnenden Kilometer inkl. Rückweg.
 */
export async function getTravelInfo(placeId: string): Promise<TravelInfo | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key || !placeId) return null

  const url = new URL("https://maps.googleapis.com/maps/api/distancematrix/json")
  url.searchParams.set("origins", COMPANY_ADDRESS)
  url.searchParams.set("destinations", `place_id:${placeId}`)
  url.searchParams.set("key", key)
  url.searchParams.set("language", "de")
  url.searchParams.set("units", "metric")

  try {
    const res = await fetch(url, { cache: "no-store" })
    const data = (await res.json()) as {
      status: string
      rows?: { elements?: { status: string; distance?: { value: number } }[] }[]
    }
    const element = data.rows?.[0]?.elements?.[0]
    if (data.status !== "OK" || !element || element.status !== "OK" || !element.distance) {
      return null
    }
    const distanceKm = element.distance.value / 1000
    return {
      distanceKm: Math.round(distanceKm * 10) / 10,
      // Hin- und Rückweg werden abgerechnet
      billableKm: Math.round(distanceKm * 2 * 10) / 10,
    }
  } catch {
    return null
  }
}
