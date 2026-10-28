/**
 * Sehr schlankes i18n-Setup: Deutsch ist die kanonische Sprache ohne Präfix
 * (z. B. /leistungen/fensterreinigung), Englisch lebt unter demselben Pfad
 * mit /en-Präfix und Französisch mit /fr-Präfix
 * (z. B. /en/leistungen/fensterreinigung, /fr/leistungen/fensterreinigung).
 * Es gibt bewusst kein zentrales Wörterbuch – jede Seite/Komponente definiert
 * ihre eigenen de/en/fr-Texte direkt im jeweiligen Content-Objekt.
 */

export const LOCALES = ["de", "en", "fr"] as const

export type Locale = (typeof LOCALES)[number]

/** Sprachen, die unter einem URL-Präfix liegen (alle außer der Standardsprache). */
export type PrefixedLocale = Exclude<Locale, "de">

export const PREFIXED_LOCALES: readonly PrefixedLocale[] = ["en", "fr"]

export const DEFAULT_LOCALE: Locale = "de"

/** Ermittelt die Sprache aus dem aktuellen Pfad (z. B. via usePathname()). */
export function getLocaleFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return DEFAULT_LOCALE
  for (const locale of PREFIXED_LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale
  }
  return DEFAULT_LOCALE
}

/** Entfernt ein evtl. vorhandenes Sprachpräfix und liefert den kanonischen (deutschen) Pfad. */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of PREFIXED_LOCALES) {
    if (pathname === `/${locale}`) return "/"
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname
}

/** Baut aus einem kanonischen (deutschen) Pfad die passende Ziel-URL für die gegebene Sprache. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "de") return href
  if (href === "/") return `/${locale}`
  return `/${locale}${href}`
}

/** Liefert die URL derselben Seite in der gewünschten Sprache (für den Sprachumschalter). */
export function getPathForLocale(pathname: string, locale: Locale): string {
  return localizeHref(stripLocalePrefix(pathname), locale)
}

/** Sprachen-Map (für `alternates.languages`) einer kanonischen Route inkl. x-default. */
export function getLanguageAlternates(canonicalPath: string): Record<string, string> {
  return {
    de: localizeHref(canonicalPath, "de"),
    en: localizeHref(canonicalPath, "en"),
    fr: localizeHref(canonicalPath, "fr"),
  }
}
