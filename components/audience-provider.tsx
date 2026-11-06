"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { AUDIENCE_STORAGE_KEY, getAudienceRoute, isAudience } from "@/lib/audience"
import { pushCustomerTypeSelected } from "@/lib/tracking"
import type { Audience } from "@/lib/locations"

interface AudienceContextValue {
  /** Aktive Kundengruppe: URL hat Vorrang vor der gespeicherten Auswahl. null = neutrale Ansicht. */
  audience: Audience | null
  /** Aus der URL bestimmt (Zielgruppen-Seite oder Leistung nur für eine Gruppe). */
  fromRoute: boolean
  /** Explizite Auswahl durch den Besucher (Karte, Umschalter). Speichert und trackt (nur mit Einwilligung). */
  selectAudience: (audience: Audience, source: string) => void
}

const AudienceContext = createContext<AudienceContextValue>({
  audience: null,
  fromRoute: false,
  selectAudience: () => {},
})

export function AudienceProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const route = useMemo(() => getAudienceRoute(pathname), [pathname])
  const [stored, setStored] = useState<Audience | null>(null)

  useEffect(() => {
    try {
      const fromQuery = new URLSearchParams(window.location.search).get("kunde")
      if (isAudience(fromQuery)) {
        setStored(fromQuery)
        localStorage.setItem(AUDIENCE_STORAGE_KEY, fromQuery)
        return
      }
      const value = localStorage.getItem(AUDIENCE_STORAGE_KEY)
      if (isAudience(value)) setStored(value)
    } catch {
      // localStorage nicht verfügbar – neutrale Ansicht bleibt bestehen.
    }
  }, [])

  const persist = useCallback((value: Audience) => {
    setStored(value)
    try {
      localStorage.setItem(AUDIENCE_STORAGE_KEY, value)
    } catch {
      // ignorieren
    }
  }, [])

  // Wer eine Zielgruppen-Seite aufruft, hat sich damit entschieden – die Auswahl wird gemerkt.
  // Umgekehrt überschreibt eine gespeicherte Auswahl nie die URL.
  useEffect(() => {
    if (route.kind === "audience-page") persist(route.audience)
  }, [route, persist])

  const selectAudience = useCallback(
    (value: Audience, source: string) => {
      persist(value)
      pushCustomerTypeSelected(value, source)
    },
    [persist],
  )

  const routeAudience = route.kind === "audience-page" || route.kind === "single-audience-service" ? route.audience : null

  const value = useMemo<AudienceContextValue>(
    () => ({
      audience: routeAudience ?? stored,
      fromRoute: routeAudience !== null,
      selectAudience,
    }),
    [routeAudience, stored, selectAudience],
  )

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export function useAudience() {
  return useContext(AudienceContext)
}
