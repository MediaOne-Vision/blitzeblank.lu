import "server-only"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import type { RowDataPacket } from "mysql2"
import { getDb, isDbConfigured } from "@/lib/db"
import { devPricingFilePath } from "@/lib/storage"
import {
  defaultPricingConfig,
  mergePricingConfig,
  type PricingConfig,
} from "@/lib/pricing-config"

/**
 * Server-seitiger Speicher für die Preisdynamik.
 * Produktion: eine Zeile in der MySQL-Tabelle `app_settings`.
 * Lokale Entwicklung ohne Datenbank: JSON-Datei im Upload-Verzeichnis.
 */
const SETTING_KEY = "pricing_config"

function parseStored(value: unknown): Partial<PricingConfig> | null {
  if (value == null) return null
  if (typeof value === "string") return JSON.parse(value) as Partial<PricingConfig>
  if (Buffer.isBuffer(value)) return JSON.parse(value.toString("utf8")) as Partial<PricingConfig>
  return value as Partial<PricingConfig>
}

async function readFromDb(): Promise<Partial<PricingConfig> | null> {
  const pool = await getDb()
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT setting_value FROM app_settings WHERE setting_key = ? LIMIT 1",
    [SETTING_KEY],
  )
  return parseStored(rows[0]?.setting_value)
}

async function readFromDevFile(): Promise<Partial<PricingConfig> | null> {
  try {
    return JSON.parse(await readFile(devPricingFilePath(), "utf8")) as Partial<PricingConfig>
  } catch {
    return null
  }
}

/**
 * Lädt die aktuelle Preisdynamik.
 * Fällt auf die Default-Werte zurück, wenn noch nichts gespeichert wurde
 * oder der Speicher nicht erreichbar ist.
 */
export async function getPricingConfig(): Promise<PricingConfig> {
  try {
    const stored = isDbConfigured() ? await readFromDb() : await readFromDevFile()
    return stored ? mergePricingConfig(stored) : defaultPricingConfig
  } catch (error) {
    console.error("[v0] getPricingConfig error:", error instanceof Error ? error.message : error)
    return defaultPricingConfig
  }
}

/** Speichert eine neue Preisdynamik und überschreibt die bestehende Einstellung. */
export async function savePricingConfig(config: PricingConfig): Promise<void> {
  const json = JSON.stringify(mergePricingConfig(config))

  if (isDbConfigured()) {
    const pool = await getDb()
    await pool.query(
      `INSERT INTO app_settings (setting_key, setting_value) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [SETTING_KEY, json],
    )
    return
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Datenbank nicht konfiguriert – Preisdynamik kann nicht gespeichert werden.")
  }
  const file = devPricingFilePath()
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, json, "utf8")
}
