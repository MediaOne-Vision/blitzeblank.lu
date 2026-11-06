import type { ComponentType } from "react"
import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"

export interface SubpageModule {
  default: ComponentType<any>
  metadata?: Metadata
}

type Loader = () => Promise<SubpageModule>

/** Bestehende Seiten, die es pro Zielgruppe unter /privatkunden bzw. /gewerbekunden gibt (kanonischer Pfad). */
export const SUBPAGE_LOADERS: Record<Locale, Record<string, Loader>> = {
  de: {
    "/leistungen": () => import("@/app/leistungen/page"),
    "/leistungen/fassadenreinigung": () => import("@/app/leistungen/fassadenreinigung/page"),
    "/leistungen/fensterreinigung": () => import("@/app/leistungen/fensterreinigung/page"),
    "/leistungen/industriereinigung": () => import("@/app/leistungen/industriereinigung/page"),
    "/leistungen/reinigungsnotdienst": () => import("@/app/leistungen/reinigungsnotdienst/page"),
    "/leistungen/solarreinigung": () => import("@/app/leistungen/solarreinigung/page"),
    "/leistungen/spezialreinigung": () => import("@/app/leistungen/spezialreinigung/page"),
    "/leistungen/steinreinigung": () => import("@/app/leistungen/steinreinigung/page"),
    "/leistungen/treppenhausreinigung": () => import("@/app/leistungen/treppenhausreinigung/page"),
    "/leistungen/unterhaltsreinigung": () => import("@/app/leistungen/unterhaltsreinigung/page"),
    "/ueber-uns": () => import("@/app/ueber-uns/page"),
    "/kontakt": () => import("@/app/kontakt/page"),
    "/kontakt/danke": () => import("@/app/kontakt/danke/page"),
    "/angebot": () => import("@/app/angebot/page"),
  },
  en: {
    "/leistungen": () => import("@/app/en/leistungen/page"),
    "/leistungen/fassadenreinigung": () => import("@/app/en/leistungen/fassadenreinigung/page"),
    "/leistungen/fensterreinigung": () => import("@/app/en/leistungen/fensterreinigung/page"),
    "/leistungen/industriereinigung": () => import("@/app/en/leistungen/industriereinigung/page"),
    "/leistungen/reinigungsnotdienst": () => import("@/app/en/leistungen/reinigungsnotdienst/page"),
    "/leistungen/solarreinigung": () => import("@/app/en/leistungen/solarreinigung/page"),
    "/leistungen/spezialreinigung": () => import("@/app/en/leistungen/spezialreinigung/page"),
    "/leistungen/steinreinigung": () => import("@/app/en/leistungen/steinreinigung/page"),
    "/leistungen/treppenhausreinigung": () => import("@/app/en/leistungen/treppenhausreinigung/page"),
    "/leistungen/unterhaltsreinigung": () => import("@/app/en/leistungen/unterhaltsreinigung/page"),
    "/ueber-uns": () => import("@/app/en/ueber-uns/page"),
    "/kontakt": () => import("@/app/en/kontakt/page"),
    "/kontakt/danke": () => import("@/app/en/kontakt/danke/page"),
    "/angebot": () => import("@/app/en/angebot/page"),
  },
  fr: {
    "/leistungen": () => import("@/app/fr/leistungen/page"),
    "/leistungen/fassadenreinigung": () => import("@/app/fr/leistungen/fassadenreinigung/page"),
    "/leistungen/fensterreinigung": () => import("@/app/fr/leistungen/fensterreinigung/page"),
    "/leistungen/industriereinigung": () => import("@/app/fr/leistungen/industriereinigung/page"),
    "/leistungen/reinigungsnotdienst": () => import("@/app/fr/leistungen/reinigungsnotdienst/page"),
    "/leistungen/solarreinigung": () => import("@/app/fr/leistungen/solarreinigung/page"),
    "/leistungen/spezialreinigung": () => import("@/app/fr/leistungen/spezialreinigung/page"),
    "/leistungen/steinreinigung": () => import("@/app/fr/leistungen/steinreinigung/page"),
    "/leistungen/treppenhausreinigung": () => import("@/app/fr/leistungen/treppenhausreinigung/page"),
    "/leistungen/unterhaltsreinigung": () => import("@/app/fr/leistungen/unterhaltsreinigung/page"),
    "/ueber-uns": () => import("@/app/fr/ueber-uns/page"),
    "/kontakt": () => import("@/app/fr/kontakt/page"),
    "/kontakt/danke": () => import("@/app/fr/kontakt/danke/page"),
    "/angebot": () => import("@/app/fr/angebot/page"),
  },
}

export const SUBPAGE_PATHS = Object.keys(SUBPAGE_LOADERS.de)
