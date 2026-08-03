"use client"

import { useEffect, useRef } from "react"
import { pushLeadEvent, type LeadOutcome } from "@/lib/tracking"

/**
 * Feuert beim Mounten der Danke-Seite genau einmal das Lead-Event in den dataLayer.
 * Rendert nichts.
 */
export function TrackLead({
  outcome,
  value,
  service,
}: {
  outcome: LeadOutcome
  value: number
  service?: string
}) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true
    pushLeadEvent({ outcome, value, service })
  }, [outcome, value, service])

  return null
}
