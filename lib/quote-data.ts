import {
  Grid3X3,
  Mountain,
  Building2,
  type LucideIcon,
} from "lucide-react"

export interface QuoteServiceOption {
  /** Label for the optional sub-selection group, e.g. "Fensterart" */
  optionLabel: string
  optionLabelEn: string
  /** Available optional choices (multi-select, all optional) */
  options: string[]
  optionsEn: string[]
}

export interface QuoteService {
  slug: string
  value: string
  label: string
  labelEn: string
  icon: LucideIcon
  /** Fixed base price in EUR */
  basePrice: number
  /** Price per square meter in EUR */
  pricePerSqm: number
  /** Optional, service-specific multi-select choices */
  detail: QuoteServiceOption
}

/** Liefert Services / Detail-Optionen mit englischem Label, falls locale === "en". */
export function getLocalizedQuoteServices(locale: "de" | "en") {
  return quoteServices.map((s) => ({
    ...s,
    label: locale === "en" ? s.labelEn : s.label,
    detail: {
      ...s.detail,
      optionLabel: locale === "en" ? s.detail.optionLabelEn : s.detail.optionLabel,
      options: locale === "en" ? s.detail.optionsEn : s.detail.options,
    },
  }))
}

/** Anfahrtskosten: 2,00 € pro gefahrenem Kilometer */
export const TRAVEL_COST_PER_KM = 2

/** Feste Firmenadresse als Startpunkt für die Entfernungsberechnung */
export const COMPANY_ADDRESS = "6A Rue Michel Rodange, 7681 Waldbillig, Luxemburg"

// Hinweis: Die Industriereinigung wird ausschließlich auf Anfrage kalkuliert
// und ist daher bewusst NICHT im Preisrechner enthalten.
export const quoteServices: QuoteService[] = [
  {
    slug: "fensterreinigung",
    value: "fenster",
    label: "Fensterreinigung",
    labelEn: "Window Cleaning",
    icon: Grid3X3,
    // Bei der Fensterreinigung erfolgt die Kalkulation über die einzelnen
    // Fensterarten (siehe windowTypes), daher kein zusätzlicher Grundpreis.
    basePrice: 0,
    pricePerSqm: 8,
    detail: {
      optionLabel: "Welche Art von Fenstern?",
      optionLabelEn: "What type of windows?",
      options: [
        "Bürofenster",
        "Schaufenster",
        "Glasfassaden",
        "Industrieverglasung",
        "Spezialverglasung",
        "Dachfenster",
      ],
      optionsEn: [
        "Office windows",
        "Shop windows",
        "Glass facades",
        "Industrial glazing",
        "Specialty glazing",
        "Roof windows",
      ],
    },
  },
  {
    slug: "steinreinigung",
    value: "stein",
    label: "Steinreinigung",
    labelEn: "Stone Cleaning",
    icon: Mountain,
    // Kein Grundpreis – die Steinreinigung wird rein über den m²-Preis kalkuliert.
    basePrice: 0,
    pricePerSqm: 12,
    detail: {
      optionLabel: "Welche Art von Stein?",
      optionLabelEn: "What type of stone?",
      options: [
        "Naturstein",
        "Pflasterflächen",
        "Terrasse",
        "Außentreppe",
        "Mauerwerk",
        "Beton",
      ],
      optionsEn: [
        "Natural stone",
        "Paving",
        "Terrace",
        "Outdoor stairs",
        "Masonry",
        "Concrete",
      ],
    },
  },
  {
    slug: "fassadenreinigung",
    value: "fassade",
    label: "Fassadenreinigung",
    labelEn: "Facade Cleaning",
    icon: Building2,
    // Kein Grundpreis – die Fassadenreinigung nutzt das Flächenmodell (m²-Preis).
    basePrice: 0,
    pricePerSqm: 10,
    detail: {
      optionLabel: "Welches Fassadenmaterial?",
      optionLabelEn: "What facade material?",
      options: [
        "Putzfassade",
        "Klinkerfassade",
        "Metallfassade",
        "Glasfassade",
        "Betonfassade",
        "Graffiti-Entfernung",
      ],
      optionsEn: [
        "Plaster facade",
        "Brick facade",
        "Metal facade",
        "Glass facade",
        "Concrete facade",
        "Graffiti removal",
      ],
    },
  },
]

export interface QuoteFrequency {
  value: string
  label: string
  labelEn: string
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
  { value: "einmalig", label: "Einmalig", labelEn: "One-time", multiplier: 1, discount: 0 },
  { value: "monatlich", label: "Monatlich", labelEn: "Monthly", multiplier: 0.9, discount: 10 },
  { value: "quartalsweise", label: "Quartalsweise", labelEn: "Quarterly", multiplier: 0.95, discount: 5 },
  { value: "halbjaehrlich", label: "Halbjährlich", labelEn: "Semi-annually", multiplier: 0.98, discount: 2 },
]

export function getLocalizedQuoteFrequencies(locale: "de" | "en") {
  return quoteFrequencies.map((f) => ({ ...f, label: locale === "en" ? f.labelEn : f.label }))
}

export function getQuoteServiceBySlug(slug: string): QuoteService | undefined {
  return quoteServices.find((s) => s.slug === slug)
}

/* ---- Fensterreinigung: feste Fensterarten mit Pauschalpreisen ---- */

export interface WindowType {
  value: string
  label: string
  labelEn: string
  /** Ungefähre Größe / Beschreibung, wird unter dem Label angezeigt */
  dimension: string
  dimensionEn: string
  /** Preis pro Fenster (bzw. pro m² wenn perSqm = true) in EUR */
  price: number
  /** Wenn true, gilt der Preis pro m² statt pro Stück (z. B. Rollladen) */
  perSqm?: boolean
  /**
   * Sonstige Fensterart (z. B. Fensterfront, Glastür, Rollladen). Diese stehen
   * für alle Kunden im einklappbaren Bereich "Sonstige Fensterarten" unten.
   */
  optional?: boolean
}

/** Basispreise laut Preisliste (Stand aktuell) */
export const windowTypes: WindowType[] = [
  // Standardgrößen – immer sichtbar für alle Kunden
  { value: "xs", label: "Fenster XS", labelEn: "Window XS", dimension: "bis ca. 40 × 40 cm", dimensionEn: "up to approx. 40 × 40 cm", price: 3.5 },
  { value: "s", label: "Fenster S", labelEn: "Window S", dimension: "ca. 60 × 60 cm", dimensionEn: "approx. 60 × 60 cm", price: 5 },
  { value: "m", label: "Fenster M", labelEn: "Window M", dimension: "ca. 100 × 100 cm", dimensionEn: "approx. 100 × 100 cm", price: 7 },
  { value: "l", label: "Fenster L", labelEn: "Window L", dimension: "ca. 120 × 120 cm", dimensionEn: "approx. 120 × 120 cm", price: 9 },
  { value: "xl", label: "Fenster XL", labelEn: "Window XL", dimension: "ca. 120 × 150 cm", dimensionEn: "approx. 120 × 150 cm", price: 10.5 },
  { value: "xxl", label: "Fenster XXL", labelEn: "Window XXL", dimension: "ca. 120 × 170 cm", dimensionEn: "approx. 120 × 170 cm", price: 12 },
  // Sonstige Fensterarten – optional, im aufklappbaren Bereich für alle Kunden
  { value: "front", label: "Fensterfront", labelEn: "Window Front", dimension: "große, zusammenhängende Glasfläche", dimensionEn: "large, continuous glass surface", price: 16, optional: true },
  { value: "terrasse", label: "Terrassenfenster", labelEn: "Patio Window", dimension: "bodentiefe Verglasung", dimensionEn: "floor-to-ceiling glazing", price: 10, optional: true },
  { value: "glastuer-m", label: "Glastür M", labelEn: "Glass Door M", dimension: "Standard-Glastür", dimensionEn: "standard glass door", price: 9, optional: true },
  { value: "glastuer-l", label: "Glastür L", labelEn: "Glass Door L", dimension: "große Glastür", dimensionEn: "large glass door", price: 13, optional: true },
  { value: "glastuer-xl", label: "Glastür XL", labelEn: "Glass Door XL", dimension: "sehr große Glastür", dimensionEn: "extra-large glass door", price: 16, optional: true },
  { value: "rollladen", label: "Rollladen", labelEn: "Roller Shutter", dimension: "Abrechnung pro m²", dimensionEn: "billed per m²", price: 3, perSqm: true, optional: true },
]

export function getWindowType(value: string): WindowType | undefined {
  return windowTypes.find((t) => t.value === value)
}

export function getLocalizedWindowTypes(locale: "de" | "en") {
  return windowTypes.map((t) => ({
    ...t,
    label: locale === "en" ? t.labelEn : t.label,
    dimension: locale === "en" ? t.dimensionEn : t.dimension,
  }))
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
