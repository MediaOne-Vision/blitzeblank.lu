import {
  Car,
  Droplets,
  Flame,
  Footprints,
  Leaf,
  Paintbrush,
  ShieldCheck,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Fläche                                                                     */
/* -------------------------------------------------------------------------- */

export interface StoneAreaType {
  value: string
  label: string
}

export const stoneAreaTypes: StoneAreaType[] = [
  { value: "pflaster", label: "Pflasterfläche" },
  { value: "terrasse", label: "Terrasse" },
  { value: "einfahrt", label: "Einfahrt" },
  { value: "gehweg", label: "Gehweg" },
  { value: "naturstein", label: "Naturstein" },
  { value: "sonstiges", label: "Sonstiges" },
]

/* -------------------------------------------------------------------------- */
/*  Materialbedarf-Standardwerte (Fuge)                                        */
/* -------------------------------------------------------------------------- */

export const stoneDimensionDefaults = {
  steinbreite: 20, // cm
  steinlaenge: 10, // cm
  fugenbreite: 3, // mm
  fugentiefe: 20, // mm
}

export type StoneDimensions = typeof stoneDimensionDefaults

/* -------------------------------------------------------------------------- */
/*  Nutzung / Belastungsklasse                                                 */
/* -------------------------------------------------------------------------- */

export interface UsageClass {
  value: string
  label: string
  icon: LucideIcon
}

export const usageClasses: UsageClass[] = [
  { value: "fussgaenger", label: "Fußgänger", icon: Footprints },
  { value: "pkw", label: "PKW bis 3,5 T", icon: Car },
  { value: "lkw", label: "LKW bis 7,5 T", icon: Truck },
]

/* -------------------------------------------------------------------------- */
/*  Fugeneigenschaften                                                         */
/* -------------------------------------------------------------------------- */

export interface JointProperty {
  value: string
  label: string
  icon: LucideIcon
}

export const jointProperties: JointProperty[] = [
  { value: "fest", label: "Feste Fuge", icon: ShieldCheck },
  { value: "unkrauthemmend", label: "Unkrauthemmend", icon: Sprout },
  { value: "wasserdurchlaessig", label: "Wasserdurchlässig", icon: Droplets },
  { value: "oekologisch", label: "Ökologisch", icon: Leaf },
]

/* -------------------------------------------------------------------------- */
/*  Farb-Swatches (für Steinfarbe & Fugenfarbe)                                */
/* -------------------------------------------------------------------------- */

export const colorSwatches: Record<string, string> = {
  Natur: "#d8ccb8",
  Sandbeige: "#d9c7a3",
  Steingrau: "#9aa0a6",
  Basalt: "#2f3337",
  Anthrazit: "#31363b",
  Dunkelgrau: "#2b2f38",
  Hellgrau: "#6b7280",
  "Klinker/Rot": "#a5382f",
  "Antik/Rot": "#9c5a3c",
  Sandstein: "#c9b285",
}

/* -------------------------------------------------------------------------- */
/*  Steinfarbe (aktueller Stein)                                               */
/* -------------------------------------------------------------------------- */

export interface StoneColor {
  value: string
  label: string
}

export const stoneColors: StoneColor[] = [
  { value: "dunkelgrau", label: "Dunkelgrau" },
  { value: "hellgrau", label: "Hellgrau" },
  { value: "klinkerrot", label: "Klinker/Rot" },
  { value: "antikrot", label: "Antik/Rot" },
  { value: "sandstein", label: "Sandstein" },
]

/* -------------------------------------------------------------------------- */
/*  Passende Fuge (Materialien)                                                */
/* -------------------------------------------------------------------------- */

export interface JointMaterial {
  id: string
  title: string
  description: string
  image: string
  /** Eigenschaften, die dieses Material erfüllt (Werte aus jointProperties) */
  properties: string[]
  /** Für welche Belastungsklassen geeignet (Werte aus usageClasses) */
  usage: string[]
  /** Verfügbare Fugenfarben (Keys aus colorSwatches) */
  colors: string[]
}

export const jointMaterials: JointMaterial[] = [
  {
    id: "vdw800",
    title: "vdw 800 (2K-PflasterfugenMörtel)",
    description:
      "Der bekannte Klassiker unter den Pflasterfugensystemen mit breitem Einsatzspektrum für Pflaster- und Klinkerbeläge. Schnelle, saubere und selbstverdichtende Verfugung ab 5 mm Fugenbreite - kehrsaugmaschinenfest und abriebfest.",
    image: "/images/products/vdw-800.png",
    properties: ["fest", "wasserdurchlaessig"],
    usage: ["fussgaenger", "pkw"],
    colors: ["Sandbeige", "Steingrau", "Basalt"],
  },
  {
    id: "vdw815plus",
    title: "vdw 815 plus (2K-PlattenfugenMörtel)",
    description:
      "Hochfließfähiger Plattenfugenmörtel für die enge Fuge ab 3 mm. Selbstverdichtend, saubere Oberfläche ohne Abdecken und auch bei niedrigen Temperaturen und Regen verarbeitbar - ideal für Terrassenplatten und Gartenwege.",
    image: "/images/products/vdw-815-plus.png",
    properties: ["fest", "wasserdurchlaessig"],
    usage: ["fussgaenger", "pkw"],
    colors: ["Sandbeige", "Steingrau", "Basalt"],
  },
  {
    id: "vdw850plus",
    title: "vdw 850 plus (2K-FugenMörtel selbstverdichtend)",
    description:
      "Der Top-Allrounder unter den Pflasterfugenmörteln für besonders breite Fugen ab 5 mm - hervorragend für befahrene Flächen geeignet. Hoher Frost-/Tausalzwiderstand und dauerhaft verfüllte Fuge, auch bei Regen und niedrigen Temperaturen verarbeitbar.",
    image: "/images/products/vdw-850-plus.png",
    properties: ["fest", "wasserdurchlaessig"],
    usage: ["fussgaenger", "pkw", "lkw"],
    colors: ["Sandbeige", "Steingrau", "Basalt"],
  },
  {
    id: "fugenmoertel",
    title: "vdw 400 ZementfugenMörtel",
    description:
      "Zementärer, schnellhärtender Fugenmörtel für PKW-beanspruchte Flächen im Innen- und Außenbereich. Hoher Frost-/Tausalzwiderstand, früh begehbar und belastbar - für Terrassen, Einfahrten und Gartenwege.",
    image: "/images/products/fugenmoertel.png",
    properties: ["fest", "unkrauthemmend"],
    usage: ["fussgaenger", "pkw", "lkw"],
    colors: ["Sandbeige", "Steingrau", "Basalt"],
  },
]

/**
 * Filtert die passenden Fugenmaterialien nach Belastungsklasse und gewünschten
 * Eigenschaften. Ein Material passt, wenn es die Belastungsklasse abdeckt und
 * ALLE gewählten Eigenschaften erfüllt.
 */
export function filterJointMaterials(usage: string, properties: string[]): JointMaterial[] {
  return jointMaterials.filter((m) => {
    const usageOk = !usage || m.usage.includes(usage)
    const propsOk = properties.every((p) => m.properties.includes(p))
    return usageOk && propsOk
  })
}

/* -------------------------------------------------------------------------- */
/*  Schutz (Imprägnierung / Pflegeöl)                                          */
/* -------------------------------------------------------------------------- */

export interface ProtectionOption {
  id: string
  title: string
  description: string
  image: string
  icon: LucideIcon
}

export const protectionOptions: ProtectionOption[] = [
  {
    id: "impraegnierung",
    title: "Nanoacryl Steinimprägnierung (farblos)",
    description:
      "Farblose Imprägnierung für saugfähige mineralische Untergründe. Wasser- und schmutzabweisend mit Abperleffekt - vorbeugend gegen Grünbelag und Frostschäden.",
    image: "/images/products/impraegnierung.png",
    icon: ShieldCheck,
  },
  {
    id: "pflegeoel",
    title: "Stein & Klinker Pflegeöl (farbvertiefend)",
    description:
      "Pflegeöl zur Schutzbehandlung mineralischer Oberflächen. Vertieft die Farbe, betont die Struktur und reduziert Schmutzaufnahme sowie Fleckenbildung.",
    image: "/images/products/pflegeoel.png",
    icon: Droplets,
  },
]

/* -------------------------------------------------------------------------- */
/*  Thermische Unkrautentfernung                                               */
/* -------------------------------------------------------------------------- */

export const thermalWeedInfo = {
  title: "Thermische Unkrautbehandlung",
  description: "Effektive und umweltfreundliche Unkrautbekämpfung mit Heißwasser - ganz ohne Chemie.",
  image: "/images/products/unkrautbehandlung.png",
  icon: Flame,
  detail:
    "Mit 100 °C heißem Wasser werden Unkraut und Wurzeln effektiv abgetötet - gründlich, schonend und ohne chemische Zusätze. Bis zu viermal pro Jahr empfohlen, um Ihre Fläche langfristig unkrautfrei zu halten.",
}

export { Paintbrush }
