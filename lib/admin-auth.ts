import "server-only"
import { cookies } from "next/headers"

/**
 * Einfacher Passwortschutz für das Admin-Panel.
 * - Das Passwort wird über die Umgebungsvariable ADMIN_PASSWORD gesetzt.
 * - Nach erfolgreichem Login wird ein mit HMAC signiertes Session-Cookie gesetzt.
 * - Ohne zusätzliche Abhängigkeiten (Web Crypto API).
 */

const COOKIE_NAME = "bb_admin_session"
const SESSION_MAX_AGE = 60 * 60 * 8 // 8 Stunden

function getSecret(): string {
  // Fällt auf das Passwort zurück, falls kein separates Secret gesetzt ist.
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "insecure-dev-secret"
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return toHex(signature)
}

/** Zeitkonstanter Stringvergleich, um Timing-Angriffe zu vermeiden. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

/** Prüft das eingegebene Passwort gegen ADMIN_PASSWORD. */
export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(password, expected)
}

/** Erstellt das signierte Session-Cookie nach erfolgreichem Login. */
export async function createSession(): Promise<void> {
  const issuedAt = Date.now().toString()
  const signature = await sign(issuedAt)
  const token = `${issuedAt}.${signature}`
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  })
}

/** Entfernt das Session-Cookie (Logout). */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/** Prüft, ob eine gültige, nicht abgelaufene Session existiert. */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return false

  const [issuedAt, signature] = token.split(".")
  if (!issuedAt || !signature) return false

  const expected = await sign(issuedAt)
  if (!safeEqual(signature, expected)) return false

  const age = Date.now() - Number.parseInt(issuedAt, 10)
  if (Number.isNaN(age) || age > SESSION_MAX_AGE * 1000) return false

  return true
}

/** True, wenn überhaupt ein Admin-Passwort konfiguriert ist. */
export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}
