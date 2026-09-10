/**
 * Sehr einfaches, speicherinternes Rate-Limiting pro IP-Adresse (Fixed-Window).
 * Da Serverless-Funktionen zwischen Aufrufen nicht garantiert denselben Prozess
 * wiederverwenden, ist dies bewusst nur eine zusätzliche Schutzschicht gegen
 * Formular-Spam - keine kryptographisch verlässliche Begrenzung.
 */

interface WindowEntry {
  count: number
  windowStart: number
}

const buckets = new Map<string, WindowEntry>()

/**
 * Prüft, ob ein weiterer Versuch für den angegebenen Schlüssel (i. d. R. IP +
 * Formularname) innerhalb des Zeitfensters erlaubt ist, und zählt ihn direkt mit.
 */
export function isRateLimited(key: string, opts: { max: number; windowMs: number }): boolean {
  const now = Date.now()
  const entry = buckets.get(key)

  if (!entry || now - entry.windowStart > opts.windowMs) {
    buckets.set(key, { count: 1, windowStart: now })
    return false
  }

  entry.count += 1
  if (entry.count > opts.max) {
    return true
  }
  return false
}
