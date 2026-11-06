import { localizeHref, stripLocalePrefix, type Locale } from "@/lib/i18n"
import { getService } from "@/lib/services"
import type { Audience } from "@/lib/locations"

/** localStorage-Schlüssel der zuletzt gewählten Kundengruppe. */
export const AUDIENCE_STORAGE_KEY = "bb_audience"

export const AUDIENCE_IDS: Audience[] = ["privat", "gewerbe"]

/** Kanonische (deutsche) Pfade der beiden Zielgruppen-Seiten. */
export const AUDIENCE_PATHS: Record<Audience, string> = {
  privat: "/privatkunden",
  gewerbe: "/gewerbekunden",
}

export function isAudience(value: unknown): value is Audience {
  return value === "privat" || value === "gewerbe"
}

/** Liest einen Query-Parameter wie ?kunde=privat (auch "gewerbe"/"business"/"private"). */
export function parseAudienceParam(value: string | null | undefined): Audience | null {
  if (!value) return null
  const v = value.toLowerCase()
  if (v === "privat" || v === "private" || v === "privatkunden") return "privat"
  if (v === "gewerbe" || v === "business" || v === "gewerbekunden") return "gewerbe"
  return null
}

export function audiencePath(audience: Audience, locale: Locale): string {
  return localizeHref(AUDIENCE_PATHS[audience], locale)
}

export type AudienceRoute =
  | { kind: "audience-page"; audience: Audience }
  | { kind: "single-audience-service"; audience: Audience }
  | { kind: "home" }
  | { kind: "other" }

/** Liefert die Zielgruppe, wenn der (kanonische) Pfad mit /privatkunden bzw. /gewerbekunden beginnt, plus den Rest. */
export function splitAudiencePath(canonicalPath: string): { audience: Audience; rest: string } | null {
  for (const audience of AUDIENCE_IDS) {
    const base = AUDIENCE_PATHS[audience]
    if (canonicalPath === base) return { audience, rest: "/" }
    if (canonicalPath.startsWith(`${base}/`)) return { audience, rest: canonicalPath.slice(base.length) }
  }
  return null
}

/**
 * Ordnet einen Pfad einer Kundengruppe zu. Alles unter /privatkunden bzw. /gewerbekunden gehört
 * zur jeweiligen Gruppe. Die URL bestimmt die Gruppe, es gibt keine versteckte Auswahl.
 */
export function getAudienceRoute(pathname: string | null | undefined): AudienceRoute {
  if (!pathname) return { kind: "other" }
  const path = stripLocalePrefix(pathname).replace(/\/+$/, "") || "/"
  if (path === "/") return { kind: "home" }
  const split = splitAudiencePath(path)
  if (split) return { kind: "audience-page", audience: split.audience }

  const match = path.match(/^\/leistungen\/([^/]+)/)
  if (match) {
    const service = getService(match[1])
    if (service && service.audiences.length === 1) {
      return { kind: "single-audience-service", audience: service.audiences[0] }
    }
  }
  return { kind: "other" }
}

/** Seiten, die es pro Zielgruppe gibt (kanonischer Pfad ohne Zielgruppen-Präfix). */
export function hasAudienceVersion(canonicalPath: string): boolean {
  const path = canonicalPath.replace(/\/+$/, "") || "/"
  if (path === "/") return true
  if (path === "/ueber-uns" || path === "/kontakt" || path === "/angebot" || path === "/leistungen") return true
  // /leistungen/<slug> ja, lokale Landingpages /leistungen/<slug>/<ort> nein
  return /^\/leistungen\/[^/]+$/.test(path)
}

/**
 * Baut den Link innerhalb einer Zielgruppe. `href` ist ein kanonischer (deutscher) Pfad,
 * optional mit Query/Hash. Ohne Zielgruppe oder bei Seiten ohne Zielgruppen-Version bleibt er neutral.
 */
export function audienceHref(href: string, audience: Audience | null | undefined, locale: Locale): string {
  if (!audience || !href.startsWith("/")) return localizeHref(href, locale)
  const [pathAndQuery, hash] = href.split("#")
  const [path, query] = pathAndQuery.split("?")
  if (!hasAudienceVersion(path)) return localizeHref(href, locale)
  const prefixed = path === "/" ? AUDIENCE_PATHS[audience] : `${AUDIENCE_PATHS[audience]}${path}`
  return localizeHref(`${prefixed}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`, locale)
}

/** Hängt die Kundengruppe (und optional die Leistung) als Query an einen internen Pfad an. */
export function withAudienceQuery(
  href: string,
  audience: Audience | null | undefined,
  extra: Record<string, string | undefined> = {},
): string {
  const [pathAndQuery, hash] = href.split("#")
  const [path, query = ""] = pathAndQuery.split("?")
  const params = new URLSearchParams(query)
  if (audience) params.set("kunde", audience)
  for (const [key, value] of Object.entries(extra)) {
    if (value) params.set(key, value)
  }
  const qs = params.toString()
  return `${path}${qs ? `?${qs}` : ""}${hash ? `#${hash}` : ""}`
}

export const AUDIENCE_UI = {
  de: { privat: "Privat", gewerbe: "Gewerbe", switcher: "Kundengruppe wählen" },
  en: { privat: "Private", gewerbe: "Business", switcher: "Choose customer type" },
  fr: { privat: "Particuliers", gewerbe: "Entreprises", switcher: "Choisir le type de client" },
} as const
