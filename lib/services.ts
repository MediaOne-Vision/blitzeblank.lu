import { Factory, Grid3X3, Mountain, Building2, Sparkles, Layers, type LucideIcon } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience, LocationId } from "@/lib/locations"

export interface ServiceItem {
  slug: string
  title: string
  titleEn: string
  titleFr: string
  shortDescription: string
  shortDescriptionEn: string
  shortDescriptionFr: string
  href: string
  icon: LucideIcon
  imageQuery: string
  /** Für welche Kundengruppen die Leistung angeboten wird. */
  audiences: Audience[]
  /** In welchen Ländern die Leistung angeboten wird. */
  locations: LocationId[]
}

// Reihenfolge bewusst conversion-optimiert: breit nachgefragte, niedrigschwellige
// Leistungen zuerst (hohe Wahrscheinlichkeit für eine Angebotsanfrage), spezialisierte
// Gewerbeleistungen zuletzt.
export const services: ServiceItem[] = [
  {
    slug: "fensterreinigung",
    title: "Fensterreinigung",
    titleEn: "Window Cleaning",
    shortDescription:
      "Streifenfreie Glasreinigung für Wohnhäuser, Büros, Geschäfte und Industrieanlagen jeder Größe.",
    shortDescriptionEn:
      "Streak-free glass cleaning for homes, offices, shops and industrial sites of any size.",
    titleFr: "Nettoyage de vitres",
    shortDescriptionFr:
      "Nettoyage de vitres sans traces pour maisons, bureaux, commerces et sites industriels de toute taille.",
    href: "/leistungen/fensterreinigung",
    icon: Grid3X3,
    imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "fassadenreinigung",
    title: "Fassadenreinigung",
    titleEn: "Facade Cleaning",
    shortDescription:
      "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Einfamilienhaus bis zur Industrieanlage.",
    shortDescriptionEn:
      "Professional exterior cleaning for building facades of all kinds - from family homes to industrial sites.",
    titleFr: "Nettoyage de façades",
    shortDescriptionFr:
      "Nettoyage extérieur professionnel pour tous types de façades - de la maison individuelle au site industriel.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    imageQuery: "modern+building+facade+exterior+cleaning+architecture",
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "steinreinigung",
    title: "Steinreinigung",
    titleEn: "Stone Cleaning",
    shortDescription:
      "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen - für Haus, Garten und Firmengelände.",
    shortDescriptionEn:
      "Expert care and cleaning of natural stone, paving, terraces and outdoor areas - for homes, gardens and company grounds.",
    titleFr: "Nettoyage de pierre",
    shortDescriptionFr:
      "Entretien et nettoyage professionnels de la pierre naturelle, des pavés, des terrasses et des aménagements extérieurs - pour la maison, le jardin et les sites d'entreprise.",
    href: "/leistungen/steinreinigung",
    icon: Mountain,
    imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    titleEn: "Stairwell Cleaning",
    shortDescription:
      "Regelmäßige Reinigung von Treppenhäusern, Eingangsbereichen und Fluren in Mehrfamilienhäusern und Gebäuden. Derzeit in Deutschland.",
    shortDescriptionEn:
      "Regular cleaning of stairwells, entrance areas and corridors in apartment buildings and commercial properties. Currently in Germany.",
    titleFr: "Nettoyage de cages d'escalier",
    shortDescriptionFr:
      "Nettoyage régulier des cages d'escalier, entrées et couloirs dans les immeubles d'habitation et commerciaux. Actuellement en Allemagne.",
    href: "/leistungen/treppenhausreinigung",
    icon: Layers,
    imageQuery: "clean+apartment+building+stairwell+staircase+entrance",
    audiences: ["privat", "gewerbe"],
    locations: ["de"],
  },
  {
    slug: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    titleEn: "Maintenance Cleaning",
    shortDescription:
      "Regelmäßige Reinigung von Büros, Praxen, Geschäften und Gewerbeflächen - zuverlässig und zu festen Terminen.",
    shortDescriptionEn:
      "Regular cleaning of offices, practices, shops and commercial spaces - reliable and on fixed schedules.",
    titleFr: "Nettoyage d'entretien",
    shortDescriptionFr:
      "Nettoyage régulier de bureaux, cabinets, commerces et locaux professionnels - fiable et à dates fixes.",
    href: "/leistungen/unterhaltsreinigung",
    icon: Sparkles,
    imageQuery: "clean+modern+office+interior+cleaning+maintenance",
    audiences: ["gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "industriereinigung",
    title: "Industriereinigung",
    titleEn: "Industrial Cleaning",
    shortDescription:
      "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    shortDescriptionEn:
      "Professional cleaning of production halls, warehouses and industrial facilities to the highest standards.",
    titleFr: "Nettoyage industriel",
    shortDescriptionFr:
      "Nettoyage professionnel de halls de production, d'entrepôts et d'installations industrielles selon les normes les plus strictes.",
    href: "/leistungen/industriereinigung",
    icon: Factory,
    imageQuery: "industrial+factory+production+hall+clean+polished+floor",
    audiences: ["gewerbe"],
    locations: ["lu", "de"],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

/** Liefert die Services mit lokalisiertem Titel, Beschreibung und Link. */
export function getLocalizedServices(locale: Locale) {
  return services.map((s) => ({
    ...s,
    title: locale === "en" ? s.titleEn : locale === "fr" ? s.titleFr : s.title,
    shortDescription:
      locale === "en" ? s.shortDescriptionEn : locale === "fr" ? s.shortDescriptionFr : s.shortDescription,
    href: localizeHref(s.href, locale),
  }))
}
