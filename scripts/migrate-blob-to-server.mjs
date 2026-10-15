/**
 * Einmalige Migration von Vercel Blob auf den eigenen Server.
 * Liest ausschließlich aus Blob (es wird nichts gelöscht oder verändert) und schreibt
 *   - Fotos aus `anfragen-fotos/` in UPLOAD_DIR (bestehende Dateien werden übersprungen),
 *   - `pricing/config.json` in die MySQL-Tabelle `app_settings` (nur wenn dort noch kein Wert existiert,
 *     außer mit --overwrite-pricing).
 * Mit --dry-run wird nur berichtet, was passieren würde.
 *
 * Benötigt: BLOB_READ_WRITE_TOKEN, UPLOAD_DIR sowie DB_HOST, DB_NAME, DB_USER, DB_PASSWORD (optional DB_PORT).
 */
import { mkdir, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { get, list } from "@vercel/blob"
import mysql from "mysql2/promise"

const dryRun = process.argv.includes("--dry-run")
const overwritePricing = process.argv.includes("--overwrite-pricing")

const { BLOB_READ_WRITE_TOKEN, UPLOAD_DIR, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
if (!BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN fehlt.")
if (!UPLOAD_DIR) throw new Error("UPLOAD_DIR fehlt.")
const root = path.resolve(UPLOAD_DIR)

async function exists(file) {
  try {
    await stat(file)
    return true
  } catch {
    return false
  }
}

const blobs = []
let cursor
do {
  const page = await list({ cursor, limit: 1000 })
  blobs.push(...page.blobs)
  cursor = page.hasMore ? page.cursor : undefined
} while (cursor)

const photos = blobs.filter((b) => /^anfragen-fotos\/[^/]+$/.test(b.pathname))
const pricing = blobs.find((b) => b.pathname === "pricing/config.json")
console.log(`Blob gesamt: ${blobs.length} | Fotos: ${photos.length} | Preis-Konfiguration: ${pricing ? "ja" : "nein"}`)

const stats = { copied: 0, skipped: 0, failed: 0 }
for (const photo of photos) {
  const target = path.resolve(root, photo.pathname)
  if (!target.startsWith(root + path.sep)) {
    console.log(`Übersprungen (ungültiger Pfad): ${photo.pathname}`)
    stats.failed++
    continue
  }
  if (await exists(target)) {
    stats.skipped++
    continue
  }
  if (dryRun) {
    console.log(`[dry-run] würde kopieren: ${photo.pathname} (${photo.size} Bytes)`)
    stats.copied++
    continue
  }
  try {
    const result = await get(photo.pathname, { access: "private" })
    if (!result?.stream) throw new Error("kein Inhalt")
    const data = Buffer.from(await new Response(result.stream).arrayBuffer())
    if (data.length !== photo.size) throw new Error(`Größe weicht ab (${data.length} statt ${photo.size})`)
    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, data, { flag: "wx" })
    stats.copied++
  } catch (error) {
    console.log(`Fehler bei ${photo.pathname}: ${error instanceof Error ? error.message : error}`)
    stats.failed++
  }
}
console.log(`Fotos: ${stats.copied} kopiert, ${stats.skipped} bereits vorhanden, ${stats.failed} Fehler`)

if (pricing) {
  if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD) {
    console.log("Preis-Konfiguration übersprungen: DB_* nicht gesetzt.")
  } else {
    const result = await get("pricing/config.json", { access: "private" })
    const json = JSON.stringify(await new Response(result.stream).json())
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT) || 3306,
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    })
    try {
      await connection.query(
        `CREATE TABLE IF NOT EXISTS app_settings (
          setting_key VARCHAR(191) NOT NULL,
          setting_value JSON NOT NULL,
          updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
          PRIMARY KEY (setting_key)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      )
      const [rows] = await connection.query("SELECT 1 FROM app_settings WHERE setting_key = 'pricing_config'")
      if (rows.length > 0 && !overwritePricing) {
        console.log("Preis-Konfiguration: bereits in der Datenbank, nicht überschrieben (--overwrite-pricing zum Ersetzen).")
      } else if (dryRun) {
        console.log("[dry-run] würde Preis-Konfiguration in app_settings schreiben.")
      } else {
        await connection.query(
          `INSERT INTO app_settings (setting_key, setting_value) VALUES ('pricing_config', ?)
           ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
          [json],
        )
        console.log("Preis-Konfiguration in app_settings geschrieben.")
      }
    } finally {
      await connection.end()
    }
  }
}

process.exit(stats.failed > 0 ? 1 : 0)
