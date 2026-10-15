import { type NextRequest, NextResponse } from "next/server"
import { savePhoto } from "@/lib/storage"

/** Maximale Dateigröße pro Foto (10 MB) */
const MAX_SIZE = 10 * 1024 * 1024
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "image/avif"]

/**
 * Nimmt ein einzelnes Foto aus dem Angebots-Assistenten entgegen und legt es
 * im Upload-Verzeichnis (Volume) ab. Zurückgegeben wird der Pfad (pathname), über den
 * das Foto später via /api/quote-photo ausgeliefert werden kann.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Keine Datei übermittelt" }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Datei zu groß (max. 10 MB)" }, { status: 413 })
    }
    if (file.type && !ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Nur Bilddateien sind erlaubt" }, { status: 415 })
    }

    // Die UUID im Dateinamen macht den Pfad praktisch nicht erratbar.
    return NextResponse.json(await savePhoto(file))
  } catch (error) {
    console.log("[v0] Foto-Upload fehlgeschlagen:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "Upload fehlgeschlagen" }, { status: 500 })
  }
}
