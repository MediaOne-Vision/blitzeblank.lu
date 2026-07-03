import {
  Factory,
  Grid3X3,
  Snowflake,
  Mountain,
  Building2,
  type LucideIcon,
} from "lucide-react"

export interface QuoteServiceOption {
  /** Label for the optional sub-selection group, e.g. "Fensterart" */
  optionLabel: string
  /** Available optional choices (multi-select, all optional) */
  options: string[]
}

export interface QuoteService {
  slug: string
  value: string
  label: string
  icon: LucideIcon
  /** Fixed base price in EUR */
  basePrice: number
  /** Price per square meter in EUR */
  pricePerSqm: number
  /** Optional, service-specific multi-select choices */
  detail: QuoteServiceOption
}

export const quoteServices: QuoteService[] = [
  {
    slug: "industriereinigung",
    value: "industrie",
    label: "Industriereinigung",
    icon: Factory,
    basePrice: 150,
    pricePerSqm: 2.5,
    detail: {
      optionLabel: "Welche Bereiche?",
      options: [
        "Hallenboden",
        "Maschinen",
        "Lager & Regale",
        "Decken & Wände",
        "Lüftungsanlagen",
        "Sonderreinigung",
      ],
    },
  },
  {
    slug: "fensterreinigung",
    value: "fenster",
    label: "Fensterreinigung",
    icon: Grid3X3,
    basePrice: 80,
    pricePerSqm: 8,
    detail: {
      optionLabel: "Welche Art von Fenstern?",
      options: [
        "Bürofenster",
        "Schaufenster",
        "Glasfassaden",
        "Industrieverglasung",
        "Spezialverglasung",
        "Dachfenster",
      ],
    },
  },
  {
    slug: "trockeneisreinigung",
    value: "trockeneis",
    label: "Trockeneisreinigung",
    icon: Snowflake,
    basePrice: 200,
    pricePerSqm: 15,
    detail: {
      optionLabel: "Welche Anwendung?",
      options: [
        "Maschinen",
        "Elektronik & Schaltschränke",
        "Oberflächen",
        "Werkzeuge & Formen",
        "Fahrzeuge",
        "Denkmalpflege",
      ],
    },
  },
  {
    slug: "steinreinigung",
    value: "stein",
    label: "Steinreinigung",
    icon: Mountain,
    basePrice: 120,
    pricePerSqm: 12,
    detail: {
      optionLabel: "Welche Art von Stein?",
      options: [
        "Naturstein",
        "Pflasterflächen",
        "Terrasse",
        "Außentreppe",
        "Mauerwerk",
        "Beton",
      ],
    },
  },
  {
    slug: "fassadenreinigung",
    value: "fassade",
    label: "Fassadenreinigung",
    icon: Building2,
    basePrice: 180,
    pricePerSqm: 10,
    detail: {
      optionLabel: "Welches Fassadenmaterial?",
      options: [
        "Putzfassade",
        "Klinkerfassade",
        "Metallfassade",
        "Glasfassade",
        "Betonfassade",
        "Graffiti-Entfernung",
      ],
    },
  },
]

export interface QuoteFrequency {
  value: string
  label: string
  /** Price multiplier applied to the base total */
  multiplier: number
  /** Discount note in percent (0 = none) */
  discount: number
}

export const quoteFrequencies: QuoteFrequency[] = [
  { value: "einmalig", label: "Einmalig", multiplier: 1, discount: 0 },
  { value: "woechentlich", label: "Wöchentlich", multiplier: 0.85, discount: 15 },
  { value: "monatlich", label: "Monatlich", multiplier: 0.9, discount: 10 },
  { value: "quartalsweise", label: "Quartalsweise", multiplier: 0.95, discount: 5 },
]

export function getQuoteServiceBySlug(slug: string): QuoteService | undefined {
  return quoteServices.find((s) => s.slug === slug)
}

/* ---- Fensterreinigung: Größen statt Quadratmeter ---- */

export interface WindowSize {
  value: string
  label: string
  hint: string
  /** Pauschalpreis pro Fenster dieser Größe in EUR */
  pricePerWindow: number
}

export const windowSizes: WindowSize[] = [
  { value: "klein", label: "Klein", hint: "z. B. Kippfenster, bis ca. 0,5 m²", pricePerWindow: 6 },
  { value: "mittel", label: "Mittelgroß", hint: "z. B. Standardfenster, ca. 0,5 – 1,5 m²", pricePerWindow: 10 },
  { value: "gross", label: "Groß", hint: "z. B. Schaufenster, ab ca. 1,5 m²", pricePerWindow: 16 },
]

/** Eine Zeile pro Fensterart: Anzahl, Größe und optionale exakte Maße */
export interface WindowRowEntry {
  /** Fensterart, z. B. "Bürofenster" */
  type: string
  /** Anzahl der Fenster dieser Art */
  count: number
  /** Größenkategorie (klein | mittel | gross) */
  size: string
  /** Optionale exakte Breite in Metern (0 = nicht angegeben) */
  width: number
  /** Optionale exakte Höhe in Metern (0 = nicht angegeben) */
  height: number
}

export function calculateWindowRowsPrice(
  service: QuoteService | undefined,
  frequency: QuoteFrequency | undefined,
  rows: WindowRowEntry[],
): CalculatedPrice {
  if (!service || !frequency) return { min: 0, max: 0 }
  let total = service.basePrice
  for (const row of rows) {
    if (row.count <= 0) continue
    if (row.width > 0 && row.height > 0) {
      // Exakte Maße angegeben: Fläche × Quadratmeterpreis
      total += row.count * row.width * row.height * service.pricePerSqm
    } else {
      // Sonst Pauschalpreis je nach Größe
      const size = windowSizes.find((s) => s.value === row.size) ?? windowSizes[1]
      total += row.count * size.pricePerWindow
    }
  }
  const withFrequency = total * frequency.multiplier
  return {
    min: Math.round(withFrequency * 0.85),
    max: Math.round(withFrequency * 1.15),
  }
}

export interface CalculatedPrice {
  min: number
  max: number
}

export function calculateQuotePrice(
  service: QuoteService | undefined,
  frequency: QuoteFrequency | undefined,
  area: number,
): CalculatedPrice {
  if (!service || !frequency) return { min: 0, max: 0 }
  const totalBase = service.basePrice + area * service.pricePerSqm
  const withFrequency = totalBase * frequency.multiplier
  return {
    min: Math.round(withFrequency * 0.85),
    max: Math.round(withFrequency * 1.15),
  }
}
