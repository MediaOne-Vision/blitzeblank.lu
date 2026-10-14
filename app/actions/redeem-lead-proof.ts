"use server"

import { verifyLeadProof } from "@/lib/lead-proof"
import type { ContactEventPayload, ExpectedProof, LeadEventPayload } from "@/lib/form-types"

export type RedeemResult =
  | { kind: "lead"; payload: LeadEventPayload }
  | { kind: "contact"; payload: ContactEventPayload }
  | null

/**
 * Prüft den serverseitig signierten Erfolgsnachweis und liefert die PII-freie
 * Tracking-Nutzlast. Ohne gültigen, zur Seite passenden Nachweis entsteht kein Event.
 */
export async function redeemLeadProof(token: string, expected: ExpectedProof): Promise<RedeemResult> {
  const claims = verifyLeadProof(token)
  if (!claims) return null

  if (expected === "contact") {
    if (claims.ft !== "contact") return null
    return { kind: "contact", payload: { lead_id: claims.lid, form_type: "contact", service: claims.svc } }
  }

  if (claims.ft !== "quote_calculator" && claims.ft !== "stone_calculator") return null
  if (claims.st !== expected) return null

  return {
    kind: "lead",
    payload: {
      lead_status: claims.st,
      service: claims.svc ?? "",
      quote_type: claims.qt ?? "recurring",
      quote_value: claims.qv,
      lead_id: claims.lid,
      form_type: claims.ft,
    },
  }
}
