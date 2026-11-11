import { notFound, permanentRedirect } from "next/navigation"
import type { Metadata } from "next"
import { SUBPAGE_LOADERS } from "@/lib/audience-subpages"
import { AUDIENCE_PATHS } from "@/lib/audience"
import { localizeHref, LOCALES, type Locale } from "@/lib/i18n"
import { getService } from "@/lib/services"
import type { Audience } from "@/lib/locations"

const SITE = "https://blitzeblank.lu"

/**
 * Seiten, die unter /privatkunden bzw. /gewerbekunden tatsächlich eigenständige Inhalte haben
 * (gefilterte Leistungsübersicht, zielgruppenspezifische Fensterreinigung). Sie behalten einen
 * eigenen Canonical. Alle übrigen Segment-Kopien (über uns, Kontakt, Angebot, gemeinsame
 * Leistungsseiten) bleiben für die Besucherführung erreichbar, verweisen aber per Canonical auf die
 * führende neutrale URL der jeweiligen Sprache.
 */
const AUDIENCE_SPECIFIC_PATHS = new Set(["/leistungen", "/leistungen/fensterreinigung"])

type SeoCopy = { title: string; description: string }

const SPECIFIC_COPY: Record<string, Record<Locale, Record<Audience, SeoCopy>>> = {
  "/leistungen": {
    de: {
      privat: {
        title: "Reinigungsleistungen für Privatkunden | Blitzeblank",
        description:
          "Fenster-, Fassaden-, Stein- und Treppenhausreinigung für Ihr Zuhause in Luxemburg, Trier und Bitburg. Kostenlose Besichtigung und klares Angebot.",
      },
      gewerbe: {
        title: "Reinigungsleistungen für Gewerbekunden | Blitzeblank",
        description:
          "Unterhalts-, Fenster-, Fassaden-, Industrie- und Spezialreinigung für Büros, Praxen und Betriebe in Luxemburg, Trier und Bitburg. Feste Ansprechpartner.",
      },
    },
    en: {
      privat: {
        title: "Cleaning Services for Private Customers | Blitzeblank",
        description:
          "Window, facade, stone and stairwell cleaning for your home in Luxembourg, Trier and Bitburg. Free on-site visit and a clear quote.",
      },
      gewerbe: {
        title: "Cleaning Services for Business Customers | Blitzeblank",
        description:
          "Maintenance, window, facade, industrial and specialist cleaning for offices, practices and companies in Luxembourg, Trier and Bitburg. Dedicated contacts.",
      },
    },
    fr: {
      privat: {
        title: "Services de nettoyage pour particuliers | Blitzeblank",
        description:
          "Nettoyage de vitres, façades, pierre et cages d'escalier pour votre domicile à Luxembourg, Trèves et Bitburg. Visite gratuite et offre claire.",
      },
      gewerbe: {
        title: "Services de nettoyage pour entreprises | Blitzeblank",
        description:
          "Nettoyage d'entretien, de vitres, de façades, industriel et spécialisé pour bureaux, cabinets et entreprises à Luxembourg, Trèves et Bitburg.",
      },
    },
  },
  "/leistungen/fensterreinigung": {
    de: {
      privat: {
        title: "Fensterreinigung für Privatkunden in Trier, Bitburg & Luxemburg | Blitzeblank",
        description:
          "Fensterreinigung für Haus und Wohnung in Trier, Bitburg und Luxemburg: Glas, Rahmen und Falze, auf Wunsch innen und außen. Kostenlose Besichtigung, klares Angebot.",
      },
      gewerbe: {
        title: "Fensterreinigung für Gewerbekunden in Trier, Bitburg & Luxemburg | Blitzeblank",
        description:
          "Fensterreinigung für Büros, Geschäfte und Gewerbeobjekte in Trier, Bitburg und Luxemburg. Kostenlose Besichtigung, klares Festangebot, verlässliche Termine.",
      },
    },
    en: {
      privat: {
        title: "Window Cleaning for Homeowners in Luxembourg, Trier & Bitburg | Blitzeblank",
        description:
          "Window cleaning for houses and apartments in Luxembourg, Trier and Bitburg: glass, frames and rebates, inside and outside on request. Free site visit, clear quote.",
      },
      gewerbe: {
        title: "Window Cleaning for Businesses in Luxembourg, Trier & Bitburg | Blitzeblank",
        description:
          "Window cleaning for offices, shops and commercial properties in Luxembourg, Trier and Bitburg. Free site visit, clear fixed quote, reliable appointments.",
      },
    },
    fr: {
      privat: {
        title: "Nettoyage de vitres pour particuliers au Luxembourg, à Trèves et Bitburg | Blitzeblank",
        description:
          "Nettoyage de vitres pour maisons et appartements : verre, cadres et feuillures, à l'intérieur et à l'extérieur sur demande. Visite gratuite, offre claire.",
      },
      gewerbe: {
        title: "Nettoyage de vitres pour entreprises au Luxembourg, à Trèves et Bitburg | Blitzeblank",
        description:
          "Nettoyage de vitres pour bureaux, commerces et locaux professionnels au Luxembourg, à Trèves et Bitburg. Visite gratuite, offre ferme claire.",
      },
    },
  },
}

function toCanonicalPath(rest: string[]) {
  return `/${rest.join("/")}`
}

function audienceUrl(audience: Audience, canonicalPath: string, locale: Locale) {
  return `${SITE}${localizeHref(`${AUDIENCE_PATHS[audience]}${canonicalPath}`, locale)}`
}

function neutralUrl(canonicalPath: string, locale: Locale) {
  return `${SITE}${localizeHref(canonicalPath, locale)}`
}

/** Leistungen, die es nur für eine Kundengruppe gibt, existieren unter der anderen Gruppe nicht. */
function neutralTargetForMismatch(audience: Audience, path: string): string | null {
  const match = path.match(/^\/leistungen\/([^/]+)$/)
  if (!match) return null
  const service = getService(match[1])
  if (!service || service.audiences.includes(audience)) return null
  return path
}

export function audienceSubpageParams() {
  return Object.keys(SUBPAGE_LOADERS.de).map((path) => ({ rest: path.split("/").filter(Boolean) }))
}

export async function audienceSubpageMetadata(
  audience: Audience,
  locale: Locale,
  rest: string[],
): Promise<Metadata> {
  const path = toCanonicalPath(rest)
  const loader = SUBPAGE_LOADERS[locale][path]
  if (!loader) return {}
  const mod = await loader()
  const base = (mod.metadata ?? {}) as Metadata

  const specific = AUDIENCE_SPECIFIC_PATHS.has(path) && !neutralTargetForMismatch(audience, path)
  const canonical = specific ? audienceUrl(audience, path, locale) : neutralUrl(path, locale)
  const copy = specific ? SPECIFIC_COPY[path]?.[locale]?.[audience] : undefined
  const title = copy?.title ?? base.title ?? undefined
  const description = copy?.description ?? base.description ?? undefined

  return {
    ...base,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical,
      ...(specific
        ? {
            languages: Object.fromEntries(LOCALES.map((l) => [l, audienceUrl(audience, path, l)])),
          }
        : {}),
    },
    openGraph: {
      ...(base.openGraph ?? {}),
      ...(title ? { title: typeof title === "string" ? title : undefined } : {}),
      ...(description ? { description } : {}),
      url: canonical,
    },
  }
}

export async function renderAudienceSubpage(
  audience: Audience,
  locale: Locale,
  rest: string[],
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const path = toCanonicalPath(rest)
  const loader = SUBPAGE_LOADERS[locale][path]
  if (!loader) notFound()

  const mismatch = neutralTargetForMismatch(audience, path)
  if (mismatch) {
    const params = await searchParams
    const qs = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) value.forEach((v) => qs.append(key, v))
      else if (value !== undefined) qs.set(key, value)
    }
    const query = qs.toString()
    permanentRedirect(`${localizeHref(mismatch, locale)}${query ? `?${query}` : ""}`)
  }

  const { default: Page } = await loader()
  return <Page searchParams={searchParams} audience={audience} />
}
