import { Droplets, Flame, Layers, Paintbrush, ShieldCheck, PackageCheck, type LucideIcon } from "lucide-react"

export interface StoneOfferService {
  id: string
  title: string
  description: string
  image: string
  icon: LucideIcon
}

/** Leistungen rund um die Pflasterflächen- und Steinpflege, die im Angebotsersteller ausgewählt werden können. */
export const stoneOfferServices: StoneOfferService[] = [
  {
    id: "fugensand",
    title: "Fugensand",
    description: "Klassisches Verfugen von Pflasterflächen mit hochwertigem Fugensand.",
    image: "/images/products/fugensand.png",
    icon: PackageCheck,
  },
  {
    id: "variosand",
    title: "VarioSand",
    description: "Elastischer Fugensand mit Bindemittel - dauerhaft stabil und hemmt Unkraut- und Ameisenwuchs.",
    image: "/images/products/variosand.png",
    icon: Layers,
  },
  {
    id: "fugenmoertel",
    title: "Fugenmörtel",
    description: "Feste, dauerhafte Verfugung für stark beanspruchte Pflaster- und Terrassenflächen.",
    image: "/images/products/fugenmoertel.png",
    icon: PackageCheck,
  },
  {
    id: "impraegnierung",
    title: "Nanoacryl-Imprägnierung",
    description: "Unsichtbarer Schutzfilm gegen Wasser, Öl und Flecken - erhält die natürliche Optik.",
    image: "/images/products/impraegnierung.png",
    icon: ShieldCheck,
  },
  {
    id: "pflegeoel",
    title: "Pflegeöl",
    description: "Frischt Farbe und Textur von Naturstein auf und schützt vor Witterungseinflüssen.",
    image: "/images/products/pflegeoel.png",
    icon: Droplets,
  },
  {
    id: "unkrautbehandlung",
    title: "Thermische Unkrautentfernung",
    description: "Chemiefreie Beseitigung von Unkraut und Moos in den Fugen durch gezielte Hitzebehandlung.",
    image: "/images/products/unkrautbehandlung.png",
    icon: Flame,
  },
  {
    id: "steinfarben",
    title: "Steinfarben & Neueinfärbung",
    description: "Frischt verblasste oder verschmutzte Flächen mit neuer, gleichmäßiger Farbe auf.",
    image: "/images/products/steinfarben.png",
    icon: Paintbrush,
  },
]

export interface StoneAreaType {
  value: string
  label: string
}

/** Art der Fläche, für die die Leistungen benötigt werden. */
export const stoneAreaTypes: StoneAreaType[] = [
  { value: "pflaster", label: "Pflasterfläche" },
  { value: "terrasse", label: "Terrasse" },
  { value: "naturstein", label: "Naturstein" },
  { value: "mauerwerk", label: "Mauerwerk" },
  { value: "sonstiges", label: "Sonstiges" },
]

export function getStoneOfferService(id: string): StoneOfferService | undefined {
  return stoneOfferServices.find((s) => s.id === id)
}
