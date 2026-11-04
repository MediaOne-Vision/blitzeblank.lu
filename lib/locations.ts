import type { Locale } from "@/lib/i18n"

export type LocationId = "lu" | "de"
export type Audience = "privat" | "gewerbe"

type Localized = Record<Locale, string>

export interface LocationInfo {
  id: LocationId
  country: Localized
  /** Betreibende Gesellschaft; null, solange noch nicht hinterlegt (wird dann nicht angezeigt). */
  entity: string | null
  regions: Localized
  address: string[] | null
}

export const LOCATION_IDS: LocationId[] = ["lu", "de"]

export const locations: Record<LocationId, LocationInfo> = {
  lu: {
    id: "lu",
    country: { de: "Luxemburg", en: "Luxembourg", fr: "Luxembourg" },
    entity: "BLITZEBLANK S.à r.l.",
    regions: {
      de: "Luxemburg und Region",
      en: "Luxembourg and the surrounding region",
      fr: "Luxembourg et région",
    },
    address: ["6A, Rue Michel Rodange", "7681 Waldbillig"],
  },
  de: {
    id: "de",
    country: { de: "Deutschland", en: "Germany", fr: "Allemagne" },
    entity: null,
    regions: {
      de: "Trier, Bitburg und Umgebung",
      en: "Trier, Bitburg and surroundings",
      fr: "Trèves, Bitburg et environs",
    },
    address: null,
  },
}

export const AUDIENCE_LABELS: Record<Audience, Localized> = {
  privat: { de: "Privatkunden", en: "Private customers", fr: "Particuliers" },
  gewerbe: { de: "Gewerbekunden", en: "Business customers", fr: "Entreprises" },
}

export function getAudienceLabel(audience: Audience, locale: Locale) {
  return AUDIENCE_LABELS[audience][locale]
}

export function getLocationCountry(id: LocationId, locale: Locale) {
  return locations[id].country[locale]
}

/** Kurzer Einsatzgebiet-Text für eine Leistung, abhängig von den verfügbaren Standorten. */
export function getAvailabilityText(ids: LocationId[], locale: Locale) {
  const onlyGermany = ids.length === 1 && ids[0] === "de"
  const onlyLuxembourg = ids.length === 1 && ids[0] === "lu"
  if (onlyGermany) {
    return {
      de: "Aktiv in Deutschland: Trier, Bitburg & Region",
      en: "Active in Germany: Trier, Bitburg & the region",
      fr: "Actif en Allemagne : Trèves, Bitburg et région",
    }[locale]
  }
  if (onlyLuxembourg) {
    return {
      de: "Aktiv in Luxemburg & Region",
      en: "Active in Luxembourg & the region",
      fr: "Actif au Luxembourg et dans la région",
    }[locale]
  }
  return {
    de: "Aktiv in Luxemburg, Trier, Bitburg & Region",
    en: "Active in Luxembourg, Trier, Bitburg & the region",
    fr: "Actif à Luxembourg, Trèves, Bitburg et dans la région",
  }[locale]
}
