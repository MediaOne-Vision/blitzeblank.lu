"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { setOptions, importLibrary } from "@googlemaps/js-api-loader"
import { COMPANY_ADDRESS } from "@/lib/quote-data"

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

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

/**
 * Client-seitige Google-Maps-Anbindung für den Angebotsrechner.
 *
 * Lädt die Google Maps JavaScript API (Places + Routes) einmalig über den
 * offiziellen Loader und stellt zwei Funktionen bereit:
 *  - getSuggestions: Adressvorschläge (Places Autocomplete)
 *  - getTravel:      Fahrstrecke von der Firmenadresse zur Zieladresse
 *
 * Ist kein API-Key gesetzt (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY), liefern die
 * Funktionen neutrale Ergebnisse zurück, sodass der Rechner nutzbar bleibt.
 */
export function useGoogleMaps() {
  const [ready, setReady] = useState(false)
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const distanceRef = useRef<google.maps.DistanceMatrixService | null>(null)
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)

  useEffect(() => {
    if (!API_KEY) return
    let cancelled = false

    setOptions({ key: API_KEY, v: "weekly", language: "de" })
    ;(async () => {
      try {
        const places = await importLibrary("places")
        if (cancelled) return
        autocompleteRef.current = new places.AutocompleteService()
        sessionTokenRef.current = new places.AutocompleteSessionToken()
        // DistanceMatrixService liegt in der Routes-Library
        const routes = await importLibrary("routes")
        if (cancelled) return
        distanceRef.current = new routes.DistanceMatrixService()
        setReady(true)
      } catch (err) {
        console.error("[v0] Google Maps konnte nicht geladen werden:", err)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  /** Adressvorschläge während der Eingabe (Places Autocomplete) */
  const getSuggestions = useCallback(async (input: string): Promise<AddressSuggestion[]> => {
    const service = autocompleteRef.current
    const query = input.trim()
    if (!service || query.length < 3) return []

    return new Promise((resolve) => {
      service.getPlacePredictions(
        {
          input: query,
          sessionToken: sessionTokenRef.current ?? undefined,
          language: "de",
          types: ["address"],
          componentRestrictions: { country: ["de", "lu", "be", "fr"] },
        },
        (predictions, status) => {
          if (status !== google.maps.places.PlacesServiceStatus.OK || !predictions) {
            resolve([])
            return
          }
          resolve(
            predictions.slice(0, 5).map((p) => ({
              description: p.description,
              placeId: p.place_id,
            })),
          )
        },
      )
    })
  }, [])

  /** Fahrstrecke (PKW) von der Firmenadresse zur gewählten Adresse */
  const getTravel = useCallback(async (placeId: string): Promise<TravelInfo | null> => {
    const service = distanceRef.current
    if (!service || !placeId) return null

    return new Promise((resolve) => {
      service.getDistanceMatrix(
        {
          origins: [COMPANY_ADDRESS],
          destinations: [{ placeId }],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          const element = response?.rows?.[0]?.elements?.[0]
          if (status !== "OK" || !element || element.status !== "OK") {
            resolve(null)
            return
          }
          const distanceKm = element.distance.value / 1000
          resolve({
            distanceKm: Math.round(distanceKm * 10) / 10,
            // Hin- und Rückweg werden abgerechnet
            billableKm: Math.round(distanceKm * 2 * 10) / 10,
          })
        },
      )
    })
  }, [])

  return { ready, getSuggestions, getTravel }
}
