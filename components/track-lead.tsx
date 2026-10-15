"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { redeemLeadProof } from "@/app/actions/redeem-lead-proof"
import { consumeLeadHandoff, hasLeadSeen, markLeadSeen, pushContactEvent, pushLeadEvent } from "@/lib/tracking"
import type { ExpectedProof } from "@/lib/form-types"

/**
 * Feuert beim Laden der Danke-Seite genau einmal das passende Tracking-Event.
 *
 * Grundlage ist ein serverseitig signierter Erfolgsnachweis, den das Formular erst
 * nach bestätigter Verarbeitung im sessionStorage ablegt. Ohne gültigen Nachweis
 * (Direktaufruf, geteilter Link, Crawler, abgelaufen, falscher Status) entsteht kein
 * Event. Die Seite leitet dann auf die Startseite um, sofern in dieser Session noch
 * keine Danke-Seite gezeigt wurde; ein Reload bleibt ohne zweites Event möglich.
 *
 * Rendert nichts.
 */
export function TrackLead({ expected, homeHref = "/" }: { expected: ExpectedProof; homeHref?: string }) {
  const ran = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    const proof = consumeLeadHandoff()

    if (!proof) {
      if (!hasLeadSeen()) router.replace(homeHref)
      return
    }

    markLeadSeen()
    redeemLeadProof(proof, expected)
      .then((result) => {
        if (!result) return
        if (result.kind === "lead") pushLeadEvent(result.payload)
        else pushContactEvent(result.payload)
      })
      .catch(() => {
        // Tracking ist optional – die Danke-Seite bleibt unberührt.
      })
  }, [expected, homeHref, router])

  return null
}
