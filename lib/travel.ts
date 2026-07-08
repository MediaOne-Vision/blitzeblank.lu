/**
 * Entfernungsberechnung für den Angebotsrechner ohne kostenpflichtige API.
 *
 * Vorgehen (analog zum Koch-Umzüge-Rechner):
 * 1. Adressen werden über den kostenlosen OpenStreetMap-Nominatim-Dienst in
 *    Koordinaten umgewandelt (siehe app/actions/travel.ts).
 * 2. Die Luftlinie zwischen Firmenstandort und Zieladresse wird per
 *    Haversine-Formel berechnet.
 * 3. Ein Straßenfaktor von 1,3 schätzt die tatsächliche Fahrstrecke.
 */

/** Fester Firmenstandort: 6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg (vorab geocodiert) */
export const COMPANY_COORDS = { lat: 49.7962878, lon: 6.2856816 } as const

/** Straßen verlaufen nie schnurgerade – Luftlinie × 1,3 ≈ Fahrstrecke */
export const ROAD_FACTOR = 1.3

export interface AddressSuggestion {
  /** Vollständige, lesbare Adresse */
  description: string
  /** Breitengrad der Adresse */
  lat: number
  /** Längengrad der Adresse */
  lon: number
}

export interface TravelInfo {
  /** Einfache, geschätzte Fahrstrecke in Kilometern (Luftlinie × Straßenfaktor) */
  distanceKm: number
  /** Gefahrene Kilometer (Hin- und Rückweg) – Grundlage der Anfahrtskosten */
  billableKm: number
}

/** Luftlinie zwischen zwei Koordinatenpunkten in Kilometern (Haversine-Formel) */
export function haversineKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const R = 6371 // Erdradius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

/**
 * Berechnet die geschätzte Fahrstrecke vom Firmenstandort zur Zieladresse.
 * Nutzt Luftlinie × Straßenfaktor und rechnet Hin- und Rückweg für die Anfahrt.
 */
export function computeTravel(destination: { lat: number; lon: number }): TravelInfo {
  const straightLine = haversineKm(COMPANY_COORDS, destination)
  const distanceKm = straightLine * ROAD_FACTOR
  return {
    distanceKm: Math.round(distanceKm * 10) / 10,
    // Hin- und Rückweg werden abgerechnet
    billableKm: Math.round(distanceKm * 2 * 10) / 10,
  }
}
