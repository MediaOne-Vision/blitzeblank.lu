import { type NextRequest, NextResponse } from "next/server"
import { isValidPhotoPathname, readPhoto } from "@/lib/storage"

/**
 * Liefert ein zuvor hochgeladenes Anfrage-Foto aus dem Upload-Verzeichnis aus.
 * Der Zugriff erfolgt über den (nicht erratbaren) Pfad, damit die Links in der
 * Benachrichtigungs-E-Mail direkt im Postfach geöffnet werden können.
 */
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname")

  if (!isValidPhotoPathname(pathname)) {
    return NextResponse.json({ error: "Ungültiger Pfad" }, { status: 400 })
  }

  try {
    const photo = await readPhoto(pathname)
    if (!photo) return new NextResponse("Nicht gefunden", { status: 404 })

    const headers = {
      ETag: photo.etag,
      "Cache-Control": "private, no-cache",
      "X-Content-Type-Options": "nosniff",
    }

    if (request.headers.get("if-none-match") === photo.etag) {
      return new NextResponse(null, { status: 304, headers })
    }

    const filename = pathname.split("/").pop() || "foto"
    return new NextResponse(new Uint8Array(photo.data), {
      headers: {
        ...headers,
        "Content-Type": photo.contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.log("[v0] Foto-Auslieferung fehlgeschlagen:", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: "Auslieferung fehlgeschlagen" }, { status: 500 })
  }
}
