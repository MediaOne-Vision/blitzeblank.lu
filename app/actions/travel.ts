"use server"

import type { AddressSuggestion } from "@/lib/travel"

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
}

/**
 * Adresssuche über den kostenlosen OpenStreetMap-Nominatim-Dienst.
 *
 * Läuft serverseitig, um der Nominatim-Nutzungsrichtlinie zu entsprechen
 * (aussagekräftiger User-Agent, keine CORS-Probleme). Die Treffer enthalten
 * bereits die Koordinaten, sodass keine zweite Anfrage nötig ist.
 */
export async function searchAddresses(query: string): Promise<AddressSuggestion[]> {
  const q = query.trim()
  if (q.length < 3) return []

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search")
    url.searchParams.set("format", "json")
    url.searchParams.set("addressdetails", "0")
    url.searchParams.set("limit", "5")
    url.searchParams.set("accept-language", "de")
    // Schwerpunkt auf die Region rund um Wolsfeld (DE, LU, BE, FR)
    url.searchParams.set("countrycodes", "de,lu,be,fr")
    url.searchParams.set("q", q)

    const res = await fetch(url, {
      headers: {
        "User-Agent": "Blitzeblank-Preisrechner/1.0 (Kostenvoranschlag)",
        "Accept-Language": "de",
      },
      cache: "no-store",
    })
    if (!res.ok) return []

    const data = (await res.json()) as NominatimResult[]
    return data
      .map((r) => ({
        description: r.display_name,
        lat: Number.parseFloat(r.lat),
        lon: Number.parseFloat(r.lon),
      }))
      .filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lon))
  } catch (err) {
    console.error("[v0] Nominatim-Adresssuche fehlgeschlagen:", err)
    return []
  }
}
