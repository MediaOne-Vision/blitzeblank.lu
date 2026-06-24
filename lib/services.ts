import { Factory, Grid3X3, Snowflake, Mountain, Building2, type LucideIcon } from "lucide-react"

export interface ServiceItem {
  slug: string
  title: string
  shortDescription: string
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
    shortDescription:
      "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
    href: "/leistungen/fensterreinigung",
    icon: Grid3X3,
    imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
  },
  {
    slug: "fassadenreinigung",
    title: "Fassadenreinigung",
    shortDescription:
      "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    imageQuery: "modern+building+facade+exterior+cleaning+architecture",
  },
  {
    slug: "steinreinigung",
    title: "Steinreinigung",
    shortDescription:
      "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    href: "/leistungen/steinreinigung",
    icon: Mountain,
    imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
  },
  {
    slug: "trockeneisreinigung",
    title: "Trockeneisreinigung",
    shortDescription:
      "Schonende und effektive Reinigung ohne Chemie oder Wasser - ideal für empfindliche Oberflächen.",
    href: "/leistungen/trockeneisreinigung",
    icon: Snowflake,
    imageQuery: "dry+ice+blasting+industrial+cleaning+machine+vapor",
  },
  {
    slug: "industriereinigung",
    title: "Industriereinigung",
    shortDescription:
      "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    href: "/leistungen/industriereinigung",
    icon: Factory,
    imageQuery: "industrial+factory+production+hall+clean+polished+floor",
  },
]
