"use client"

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { getAudienceRoute } from "@/lib/audience"
import { pushCustomerTypeSelected } from "@/lib/tracking"
import type { Audience } from "@/lib/locations"

interface AudienceContextValue {
  /** Kundengruppe, die ausschließlich aus der URL kommt. null = neutrale Seite. */
  audience: Audience | null
  /** Aus der URL bestimmt. */
  fromRoute: boolean
  /** Trackt die Auswahl einer Kundengruppe (nur mit Einwilligung). */
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

  const selectAudience = useCallback((value: Audience, source: string) => {
    pushCustomerTypeSelected(value, source)
  }, [])

  const routeAudience = route.kind === "audience-page" || route.kind === "single-audience-service" ? route.audience : null

  const value = useMemo<AudienceContextValue>(
    () => ({ audience: routeAudience, fromRoute: routeAudience !== null, selectAudience }),
    [routeAudience, selectAudience],
  )

  return <AudienceContext.Provider value={value}>{children}</AudienceContext.Provider>
}

export function useAudience() {
  return useContext(AudienceContext)
}
