import "server-only"
import { put, get } from "@vercel/blob"
import {
  defaultPricingConfig,
  mergePricingConfig,
  type PricingConfig,
} from "@/lib/pricing-config"

/**
 * Server-seitiger Speicher für die Preisdynamik.
 * Die Konfiguration wird als einzelne JSON-Datei in einem privaten
 * Vercel-Blob-Store abgelegt und nur serverseitig gelesen/geschrieben.
 */
const BLOB_PATHNAME = "pricing/config.json"

/**
 * Lädt die aktuelle Preisdynamik aus Vercel Blob.
 * Fällt auf die Default-Werte zurück, wenn noch nichts gespeichert wurde
 * oder der Store nicht erreichbar ist.
 */
export async function getPricingConfig(): Promise<PricingConfig> {
  try {
    const result = await get(BLOB_PATHNAME, { access: "private" })
    if (!result || !result.stream) return defaultPricingConfig

    // Privater Blob: Inhalt direkt aus dem Stream lesen (URL ist nicht öffentlich).
    const data = (await new Response(result.stream).json()) as Partial<PricingConfig>
    return mergePricingConfig(data)
  } catch (error) {
    console.error("[v0] getPricingConfig error:", error)
    return defaultPricingConfig
  }
}

/**
 * Speichert eine neue Preisdynamik in Vercel Blob.
 * Überschreibt die bestehende Datei (fester Pfad, kein Zufallssuffix).
 */
export async function savePricingConfig(config: PricingConfig): Promise<void> {
  const merged = mergePricingConfig(config)
  await put(BLOB_PATHNAME, JSON.stringify(merged, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
  })
}
