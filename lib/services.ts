import { Factory, Grid3X3, Mountain, Building2, type LucideIcon } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

export interface ServiceItem {
  slug: string
  title: string
  titleEn: string
  shortDescription: string
  shortDescriptionEn: string
  href: string
  icon: LucideIcon
  imageQuery: string
}

// Reihenfolge bewusst conversion-optimiert: breit nachgefragte, niedrigschwellige
// Leistungen zuerst (hohe Wahrscheinlichkeit für eine Angebotsanfrage), spezialisierte
// B2B-Leistungen zuletzt.
export const services: ServiceItem[] = [
  {
    slug: "fensterreinigung",
    title: "Fensterreinigung",
    titleEn: "Window Cleaning",
    shortDescription:
      "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
    shortDescriptionEn:
      "Streak-free glass cleaning for office buildings, shops and industrial sites of any size.",
    href: "/leistungen/fensterreinigung",
    icon: Grid3X3,
    imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
  },
  {
    slug: "fassadenreinigung",
    title: "Fassadenreinigung",
    titleEn: "Facade Cleaning",
    shortDescription:
      "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
    shortDescriptionEn:
      "Professional exterior cleaning for building facades of all kinds - from office buildings to industrial sites.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    imageQuery: "modern+building+facade+exterior+cleaning+architecture",
  },
  {
    slug: "steinreinigung",
    title: "Steinreinigung",
    titleEn: "Stone Cleaning",
    shortDescription:
      "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    shortDescriptionEn:
      "Expert care and cleaning of natural stone, paving, terraces and outdoor areas.",
    href: "/leistungen/steinreinigung",
    icon: Mountain,
    imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
  },
  {
    slug: "industriereinigung",
    title: "Industriereinigung",
    titleEn: "Industrial Cleaning",
    shortDescription:
      "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    shortDescriptionEn:
      "Professional cleaning of production halls, warehouses and industrial facilities to the highest standards.",
    href: "/leistungen/industriereinigung",
    icon: Factory,
    imageQuery: "industrial+factory+production+hall+clean+polished+floor",
  },
]

/** Liefert die Services mit lokalisiertem Titel, Beschreibung und Link. */
export function getLocalizedServices(locale: Locale) {
  return services.map((s) => ({
    ...s,
    title: locale === "en" ? s.titleEn : s.title,
    shortDescription: locale === "en" ? s.shortDescriptionEn : s.shortDescription,
    href: localizeHref(s.href, locale),
  }))
}
