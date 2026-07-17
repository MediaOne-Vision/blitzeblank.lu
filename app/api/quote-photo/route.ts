import { get } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Liefert ein zuvor hochgeladenes Anfrage-Foto aus dem privaten Blob-Store aus.
 * Der Zugriff erfolgt über den (nicht erratbaren) Pfad, damit die Links in der
 * Benachrichtigungs-E-Mail direkt im Postfach geöffnet werden können.
 */
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname")

  if (!pathname || !pathname.startsWith("anfragen-fotos/")) {
    return NextResponse.json({ error: "Ungültiger Pfad" }, { status: 400 })
  }

  try {
    const result = await get(pathname, {
      access: "private",
      ifNoneMatch: request.headers.get("if-none-match") ?? undefined,
    })

    if (!result) {
      return new NextResponse("Nicht gefunden", { status: 404 })
    }

    if (result.statusCode === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: { ETag: result.blob.etag, "Cache-Control": "private, no-cache" },
      })
    }

    const filename = pathname.split("/").pop() || "foto"
    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${filename}"`,
        ETag: result.blob.etag,
        "Cache-Control": "private, no-cache",
      },
    })
  } catch (error) {
    console.log("[v0] Foto-Auslieferung fehlgeschlagen:", error)
    return NextResponse.json({ error: "Auslieferung fehlgeschlagen" }, { status: 500 })
  }
}
