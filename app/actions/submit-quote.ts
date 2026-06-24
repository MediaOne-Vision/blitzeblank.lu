"use server"

export interface QuoteSubmission {
  service: string
  serviceLabel: string
  details: string[]
  preferredDate: string
  address: string
  frequency: string
  frequencyLabel: string
  area: number
  photoCount: number
  name: string
  email: string
  phone: string
  message: string
  estimatedMin: number
  estimatedMax: number
  decision: "accepted" | "declined"
}

export async function submitQuote(submission: QuoteSubmission) {
  // In a production setup this would send an email or persist to a database.
  // For now we log the structured request so it reaches the Blitzeblank team.
  console.log("[v0] Neue Angebotsanfrage für Blitzeblank:", JSON.stringify(submission, null, 2))

  // Simulate async processing (e.g. email dispatch)
  await new Promise((resolve) => setTimeout(resolve, 600))

  return { success: true as const }
}
