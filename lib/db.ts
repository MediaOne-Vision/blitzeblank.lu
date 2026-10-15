import "server-only"
import mysql, { type Pool } from "mysql2/promise"

/**
 * Einzige Tabelle der Anwendung. `db/schema.sql` enthält dieselbe Anweisung für
 * den manuellen Einsatz (`pnpm db:init`). Es wird nie etwas gelöscht oder überschrieben.
 */
export const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS app_settings (
    setting_key VARCHAR(191) NOT NULL,
    setting_value JSON NOT NULL,
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    PRIMARY KEY (setting_key)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
]

interface DbGlobals {
  __bbPool?: Pool
  __bbSchemaReady?: Promise<void>
}

const globals = globalThis as unknown as DbGlobals

/** True, wenn alle Pflichtvariablen für die MySQL-Verbindung gesetzt sind. */
export function isDbConfigured(): boolean {
  return Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD)
}

function createPool(): Pool {
  return mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4",
    timezone: "Z",
    waitForConnections: true,
    connectionLimit: 5,
    connectTimeout: 10_000,
    enableKeepAlive: true,
  })
}

/** Liefert den Verbindungspool und legt fehlende Tabellen einmalig an (`IF NOT EXISTS`). */
export async function getDb(): Promise<Pool> {
  if (!isDbConfigured()) {
    throw new Error("Datenbank nicht konfiguriert (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD).")
  }

  globals.__bbPool ??= createPool()
  const pool = globals.__bbPool

  globals.__bbSchemaReady ??= (async () => {
    for (const statement of SCHEMA_STATEMENTS) await pool.query(statement)
  })().catch((error) => {
    globals.__bbSchemaReady = undefined
    throw error
  })

  await globals.__bbSchemaReady
  return pool
}
