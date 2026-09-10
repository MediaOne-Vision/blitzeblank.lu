/**
 * Sehr schlankes i18n-Setup: Deutsch ist die kanonische Sprache ohne Präfix
 * (z. B. /leistungen/fensterreinigung), Englisch lebt unter demselben Pfad
 * mit /en-Präfix (z. B. /en/leistungen/fensterreinigung). Es gibt bewusst
 * kein zentrales Wörterbuch – jede Seite/Komponente definiert ihre eigenen
 * de/en-Texte direkt im jeweiligen Content-Objekt.
 */

export type Locale = "de" | "en"

export const DEFAULT_LOCALE: Locale = "de"

/** Ermittelt die Sprache aus dem aktuellen Pfad (z. B. via usePathname()). */
export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "de"
}

/** Entfernt ein evtl. vorhandenes /en-Präfix und liefert den kanonischen (deutschen) Pfad. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/"
  if (pathname.startsWith("/en/")) return pathname.slice(3)
  return pathname
}

/** Baut aus einem kanonischen (deutschen) Pfad die passende Ziel-URL für die gegebene Sprache. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "de") return href
  if (href === "/") return "/en"
  return `/en${href}`
}

/** Liefert die URL derselben Seite in der jeweils anderen Sprache (für den Sprachumschalter). */
export function getCounterpartPath(pathname: string): string {
  const isEnglish = getLocaleFromPathname(pathname) === "en"
  const canonical = stripLocalePrefix(pathname)
  return isEnglish ? canonical : localizeHref(canonical, "en")
}
