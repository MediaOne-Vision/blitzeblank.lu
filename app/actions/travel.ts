"use server"

import type { AddressSuggestion } from "@/lib/travel"

interface PhotonFeature {
  geometry: { coordinates: [number, number] } // [lon, lat]
  properties: {
    name?: string
    housenumber?: string
    street?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    district?: string
    state?: string
    country?: string
  }
}

/** Baut eine knappe Adresse: "Straße Hausnummer, PLZ Ort". */
function formatAddress(p: PhotonFeature["properties"]): string {
  const street = p.street ?? p.name
  const line1 = [street, p.housenumber].filter(Boolean).join(" ")
  const place = p.city ?? p.town ?? p.village ?? p.district
  const line2 = [p.postcode, place].filter(Boolean).join(" ")
  return [line1, line2].filter(Boolean).join(", ")
}

/**
 * Adresssuche über den kostenlosen Photon-Dienst (Komoot).
 *
 * Photon ist speziell für schnelle Adress-Autovervollständigung ausgelegt und
 * deutlich flotter als Nominatim. Läuft serverseitig, liefert bereits die
 * Koordinaten mit (keine zweite Anfrage nötig).
 */
export async function searchAddresses(query: string): Promise<AddressSuggestion[]> {
  const q = query.trim()
  if (q.length < 3) return []

  try {
    const url = new URL("https://photon.komoot.io/api/")
    url.searchParams.set("q", q)
    url.searchParams.set("lang", "de")
    url.searchParams.set("limit", "5")
    // Vorrang für die Region rund um Wolsfeld (Zentrum bei ~49.91, 6.46)
    url.searchParams.set("lat", "49.909")
    url.searchParams.set("lon", "6.458")

    const res = await fetch(url, {
      headers: { "User-Agent": "Blitzeblank-Preisrechner/1.0 (Kostenvoranschlag)" },
      // Gleiche Suchen kurz zwischenspeichern, damit Wiederholungen sofort da sind
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const data = (await res.json()) as { features?: PhotonFeature[] }
    const seen = new Set<string>()
    return (data.features ?? [])
      .map((f) => ({
        description: formatAddress(f.properties),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      }))
      .filter((s) => {
        if (!s.description || !Number.isFinite(s.lat) || !Number.isFinite(s.lon)) return false
        // Dubletten (gleiche Adresszeile) herausfiltern
        if (seen.has(s.description)) return false
        seen.add(s.description)
        return true
      })
  } catch (err) {
    console.error("[v0] Photon-Adresssuche fehlgeschlagen:", err)
    return []
  }
}
