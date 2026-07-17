import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

/** Maximale Dateigröße pro Foto (10 MB) */
const MAX_SIZE = 10 * 1024 * 1024
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/avif"]

/**
 * Nimmt ein einzelnes Foto aus dem Angebots-Assistenten entgegen und legt es
 * im (privaten) Blob-Store ab. Zurückgegeben wird der Pfad (pathname), über den
 * das Foto später via /api/quote-photo ausgeliefert werden kann.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "Keine Datei übermittelt" }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Datei zu groß (max. 10 MB)" }, { status: 413 })
    }
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Nur Bilddateien sind erlaubt" }, { status: 415 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")

    // Privater Store: zufälliger Suffix macht den Pfad praktisch nicht erratbar.
    const blob = await put(`anfragen-fotos/${safeName}`, file, {
      access: "private",
      addRandomSuffix: true,
      contentType: file.type || "application/octet-stream",
    })

    return NextResponse.json({ pathname: blob.pathname, name: file.name })
  } catch (error) {
    console.log("[v0] Foto-Upload fehlgeschlagen:", error)
    return NextResponse.json({ error: "Upload fehlgeschlagen" }, { status: 500 })
  }
}
