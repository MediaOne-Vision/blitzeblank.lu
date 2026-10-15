"use server"

import type { AddressSuggestion } from "@/lib/travel"

interface NominatimResult {
  lat: string
  lon: string
  display_name: string
  address?: {
    road?: string
    pedestrian?: string
    house_number?: string
    postcode?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    hamlet?: string
  }
}

/** Baut eine knappe Adresse: "Straße Hausnummer, PLZ Ort". */
function formatAddress(r: NominatimResult): string {
  const a = r.address
  if (!a) return r.display_name
  const street = a.road ?? a.pedestrian
  const line1 = [street, a.house_number].filter(Boolean).join(" ")
  const place = a.city ?? a.town ?? a.village ?? a.municipality ?? a.hamlet
  const line2 = [a.postcode, place].filter(Boolean).join(" ")
  return [line1, line2].filter(Boolean).join(", ") || r.display_name
}

/**
 * Adresssuche über OpenStreetMap Nominatim. Läuft serverseitig, liefert die
 * Koordinaten direkt mit und antwortet in unter einer Sekunde. Der kurze
 * Timeout verhindert, dass die Eingabe bei Störungen des Dienstes hängt.
 */
export async function searchAddresses(query: string): Promise<AddressSuggestion[]> {
  const q = query.trim()
  if (q.length < 3) return []

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search")
    url.searchParams.set("q", q)
    url.searchParams.set("format", "jsonv2")
    url.searchParams.set("addressdetails", "1")
    url.searchParams.set("limit", "6")
    url.searchParams.set("accept-language", "de")
    url.searchParams.set("countrycodes", "lu,de,be,fr")

    const res = await fetch(url, {
      headers: { "User-Agent": "Blitzeblank-Preisrechner/1.0 (info@blitzeblank.lu)" },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []

    const data = (await res.json()) as NominatimResult[]
    const seen = new Set<string>()
    return data
      .map((r) => ({ description: formatAddress(r), lat: Number(r.lat), lon: Number(r.lon) }))
      .filter((s) => {
        if (!s.description || !Number.isFinite(s.lat) || !Number.isFinite(s.lon)) return false
        if (seen.has(s.description)) return false
        seen.add(s.description)
        return true
      })
      .slice(0, 5)
  } catch (err) {
    console.error("[v0] Nominatim-Adresssuche fehlgeschlagen:", err)
    return []
  }
}
