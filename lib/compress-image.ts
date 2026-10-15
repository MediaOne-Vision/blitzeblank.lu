const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.8
/** Dateien unter dieser Größe werden unverändert hochgeladen. */
const SKIP_BELOW_BYTES = 300 * 1024

/**
 * Verkleinert ein Foto im Browser (max. 1600 px, JPEG), damit Upload und
 * Mail-Anhang schnell bleiben. Formate, die der Browser nicht dekodieren kann
 * (z. B. HEIC), und Fehler führen zur Originaldatei.
 */
export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || file.size < SKIP_BELOW_BYTES) return file

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" })
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext("2d")
    if (!context) return file
    context.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY))
    if (!blob || blob.size >= file.size) return file

    const baseName = file.name.replace(/\.[^.]+$/, "") || "foto"
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg", lastModified: file.lastModified })
  } catch {
    return file
  }
}
