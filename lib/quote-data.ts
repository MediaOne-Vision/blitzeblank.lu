import {
  Factory,
  Grid3X3,
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

/** Anfahrtskosten: 2,00 € pro gefahrenem Kilometer */
export const TRAVEL_COST_PER_KM = 2

/** Feste Firmenadresse als Startpunkt für die Entfernungsberechnung */
export const COMPANY_ADDRESS = "6A, Rue Michel Rodange, 7681 Waldbillig, Luxemburg"

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
    // Bei der Fensterreinigung erfolgt die Kalkulation über die einzelnen
    // Fensterarten (siehe windowTypes), daher kein zusätzlicher Grundpreis.
    basePrice: 0,
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

/**
 * Turnus / Reinigungsintervall – wird ausschließlich bei der Fensterreinigung
 * angeboten. Der frühere Eintrag "Wöchentlich" wurde durch "Halbjährlich" ersetzt.
 */
export const quoteFrequencies: QuoteFrequency[] = [
  { value: "einmalig", label: "Einmalig", multiplier: 1, discount: 0 },
  { value: "monatlich", label: "Monatlich", multiplier: 0.9, discount: 10 },
  { value: "quartalsweise", label: "Quartalsweise", multiplier: 0.95, discount: 5 },
  { value: "halbjaehrlich", label: "Halbjährlich", multiplier: 0.98, discount: 2 },
]

export function getQuoteServiceBySlug(slug: string): QuoteService | undefined {
  return quoteServices.find((s) => s.slug === slug)
}

/* ---- Fensterreinigung: feste Fensterarten mit Pauschalpreisen ---- */

export interface WindowType {
  value: string
  label: string
  /** Ungefähre Größe / Beschreibung, wird unter dem Label angezeigt */
  dimension: string
  /** Preis pro Fenster (bzw. pro m² wenn perSqm = true) in EUR */
  price: number
  /** Wenn true, gilt der Preis pro m² statt pro Stück (z. B. Rollladen) */
  perSqm?: boolean
}

/** Basispreise laut Preisliste (Stand aktuell) */
export const windowTypes: WindowType[] = [
  { value: "xs", label: "Fenster XS", dimension: "bis ca. 40 × 40 cm", price: 3.5 },
  { value: "s", label: "Fenster S", dimension: "ca. 60 × 60 cm", price: 5 },
  { value: "m", label: "Fenster M", dimension: "ca. 100 × 100 cm", price: 7 },
  { value: "l", label: "Fenster L", dimension: "ca. 120 × 120 cm", price: 9 },
  { value: "xl", label: "Fenster XL", dimension: "ca. 120 × 150 cm", price: 10.5 },
  { value: "xxl", label: "Fenster XXL", dimension: "ca. 120 × 170 cm", price: 12 },
  { value: "front", label: "Fensterfront", dimension: "große, zusammenhängende Glasfläche", price: 16 },
  { value: "terrasse", label: "Terrassenfenster", dimension: "bodentiefe Verglasung", price: 10 },
  { value: "glastuer-m", label: "Glastür M", dimension: "Standard-Glastür", price: 9 },
  { value: "glastuer-l", label: "Glastür L", dimension: "große Glastür", price: 13 },
  { value: "glastuer-xl", label: "Glastür XL", dimension: "sehr große Glastür", price: 16 },
  { value: "rollladen", label: "Rollladen", dimension: "Abrechnung pro m²", price: 3, perSqm: true },
]

export function getWindowType(value: string): WindowType | undefined {
  return windowTypes.find((t) => t.value === value)
}

/** Eine Zeile pro ausgewählter Fensterart: Fensterart + Menge (Stück bzw. m²) */
export interface WindowRowEntry {
  /** Fensterart-Wert aus windowTypes, z. B. "m" oder "rollladen" */
  type: string
  /** Anzahl der Fenster – bzw. m² bei Rollladen */
  quantity: number
}

export interface CalculatedPrice {
  min: number
  max: number
}

/**
 * Die eigentliche Preisberechnung ist konfigurationsgetrieben und lebt in
 * `lib/pricing-config.ts`. Dort wird die (im Admin-Panel bearbeitbare)
 * Preisdynamik angewendet.
 */
