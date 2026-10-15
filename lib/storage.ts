import "server-only"
import { randomUUID } from "node:crypto"
import { mkdir, readFile, stat, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

/** Unterverzeichnis für Fotos aus dem Angebotsrechner. Der Pfad bleibt wie bisher `anfragen-fotos/<datei>`. */
export const PHOTO_DIR = "anfragen-fotos"

const PHOTO_FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,200}$/

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
  heic: "image/heic",
  heif: "image/heif",
}

/**
 * Wurzelverzeichnis für persistente Uploads (in Produktion ein Volume).
 * Ohne `UPLOAD_DIR` gibt es lokal ein temporäres Verzeichnis; in Produktion ist
 * das ein Fehler, damit nie versehentlich auf flüchtigem Speicher gespeichert wird.
 */
export function getUploadDir(): string {
  const configured = process.env.UPLOAD_DIR?.trim()
  if (configured) return path.resolve(configured)
  if (process.env.NODE_ENV === "production") {
    throw new Error("UPLOAD_DIR ist in Produktion nicht gesetzt.")
  }
  return path.join(os.tmpdir(), "blitzeblank-uploads")
}

/** Erlaubt ausschließlich `anfragen-fotos/<dateiname>` ohne Pfadtricks. */
export function isValidPhotoPathname(pathname: unknown): pathname is string {
  if (typeof pathname !== "string") return false
  const parts = pathname.split("/")
  if (parts.length !== 2) return false
  const [dir, name] = parts
  return dir === PHOTO_DIR && PHOTO_FILENAME.test(name) && !name.includes("..")
}

function resolveInsideUploadDir(relativePath: string): string {
  const root = getUploadDir()
  const resolved = path.resolve(root, relativePath)
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error("Ungültiger Speicherpfad.")
  }
  return resolved
}

function sanitizeFilename(name: string): string {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^A-Za-z0-9._-]+/g, "-")
    .replace(/\.{2,}/g, ".")
    .replace(/^[-.]+/, "")
    .slice(-100)
  return cleaned || "foto"
}

export function photoContentType(pathname: string): string {
  const ext = pathname.split(".").pop()?.toLowerCase() ?? ""
  return CONTENT_TYPES[ext] ?? "application/octet-stream"
}

/** Speichert ein hochgeladenes Foto und gibt den stabilen Pfad zurück. */
export async function savePhoto(file: File): Promise<{ pathname: string; name: string }> {
  const filename = `${randomUUID()}-${sanitizeFilename(file.name)}`
  const pathname = `${PHOTO_DIR}/${filename}`
  const target = resolveInsideUploadDir(pathname)

  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, Buffer.from(await file.arrayBuffer()), { flag: "wx" })

  return { pathname, name: file.name }
}

export interface StoredPhoto {
  data: Buffer
  contentType: string
  etag: string
}

/** Liest ein gespeichertes Foto. Gibt null zurück, wenn der Pfad ungültig ist oder die Datei fehlt. */
export async function readPhoto(pathname: string): Promise<StoredPhoto | null> {
  if (!isValidPhotoPathname(pathname)) return null
  try {
    const target = resolveInsideUploadDir(pathname)
    const info = await stat(target)
    if (!info.isFile()) return null
    return {
      data: await readFile(target),
      contentType: photoContentType(pathname),
      etag: `"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}"`,
    }
  } catch {
    return null
  }
}

/** Pfad der Preis-Konfiguration für die lokale Entwicklung ohne Datenbank. */
export function devPricingFilePath(): string {
  return resolveInsideUploadDir("pricing-config.json")
}
