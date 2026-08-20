"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  consumeLeadHandoff,
  hasLeadSeen,
  markLeadSeen,
  pushLeadEvent,
  type LeadStatus,
} from "@/lib/tracking"

/**
 * Feuert beim Laden der Danke-Seite genau einmal das `lead_submitted`-Event.
 *
 * Die Tracking-Daten stammen aus dem sessionStorage-Handoff, den das Formular
 * beim Absenden gesetzt hat. Wird die Seite ohne vorherigen Formular-Submit
 * aufgerufen (geteilter Link, Crawler, Direktaufruf), gibt es keinen Handoff:
 * dann wird kein Event gefeuert und – sofern in dieser Session noch keine
 * Danke-Seite gezeigt wurde – auf die Startseite umgeleitet. So werden
 * Conversions nicht durch fremde Aufrufe verfälscht.
 *
 * Rendert nichts.
 */
export function TrackLead({ expectedStatus }: { expectedStatus: LeadStatus }) {
  const ran = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const handoff = consumeLeadHandoff()

    if (handoff) {
      // Frischer Submit: Event nur feuern, wenn der Status zur Seite passt.
      if (handoff.lead_status === expectedStatus) {
        pushLeadEvent(handoff)
      }
      markLeadSeen()
      return
    }

    // Kein Handoff: Reload nach Conversion (Seite darf bleiben) vs. echter
    // Direktaufruf (umleiten, damit keine fremden Aufrufe die Seite sehen).
    if (!hasLeadSeen()) {
      router.replace("/")
    }
  }, [expectedStatus, router])

  return null
}
