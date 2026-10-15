import { readFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import mysql from "mysql2/promise"

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env
if (!DB_HOST || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  console.error("DB_HOST, DB_NAME, DB_USER und DB_PASSWORD müssen gesetzt sein.")
  process.exit(1)
}

const schemaPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "db", "schema.sql")
const sql = await readFile(schemaPath, "utf8")

const connection = await mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  multipleStatements: true,
})

try {
  await connection.query(sql)
  console.log("Schema angelegt bzw. bereits vorhanden: app_settings")
} finally {
  await connection.end()
}
