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

/**
 * Ordnet einen Pfad einer Kundengruppe zu.
 * Die Zielgruppen-Seiten und Leistungen, die nur für eine Gruppe angeboten werden
 * (z. B. Unterhaltsreinigung), legen die Gruppe über die URL fest. Die URL hat damit
 * immer Vorrang vor einer gespeicherten Auswahl.
 */
export function getAudienceRoute(pathname: string | null | undefined): AudienceRoute {
  if (!pathname) return { kind: "other" }
  const path = stripLocalePrefix(pathname).replace(/\/+$/, "") || "/"
  if (path === "/") return { kind: "home" }
  if (path === AUDIENCE_PATHS.privat) return { kind: "audience-page", audience: "privat" }
  if (path === AUDIENCE_PATHS.gewerbe) return { kind: "audience-page", audience: "gewerbe" }

  const match = path.match(/^\/leistungen\/([^/]+)/)
  if (match) {
    const service = getService(match[1])
    if (service && service.audiences.length === 1) {
      return { kind: "single-audience-service", audience: service.audiences[0] }
    }
  }
  return { kind: "other" }
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
