import { useRef } from "react"

/** Erzeugt eine UUID v4 – bevorzugt kryptografisch über crypto.randomUUID. */
export function createSubmissionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID()

  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/**
 * Liefert eine stabile Einsendungs-ID pro Formular. Sie bleibt bei Wiederholungen
 * nach Fehlern identisch (Server verhindert so doppelte Mails) und wird erst nach
 * bestätigtem Erfolg erneuert.
 */
export function useSubmissionId() {
  const ref = useRef<string | null>(null)
  return {
    get(): string {
      if (!ref.current) ref.current = createSubmissionId()
      return ref.current
    },
    renew() {
      ref.current = createSubmissionId()
    },
  }
}
