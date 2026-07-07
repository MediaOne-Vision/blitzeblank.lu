import {
  quoteServices,
  quoteFrequencies,
  windowTypes,
  getWindowType,
  type QuoteService,
  type QuoteFrequency,
  type WindowRowEntry,
  type CalculatedPrice,
} from "@/lib/quote-data"

/**
 * Vollständige, editierbare Preisdynamik des kostenlosen Angebotsrechners.
 * Diese Struktur wird im Admin-Panel bearbeitet und in Vercel Blob gespeichert.
 * Sie enthält ausschließlich Zahlenwerte – die Struktur (Labels, Icons, Optionen)
 * bleibt fest im Code.
 */
export interface PricingConfig {
  /** Pauschalpreis je Fensterart (Schlüssel = windowTypes.value), in EUR */
  windowPrices: Record<string, number>
  /** Grund- und m²-Preis je Leistung (Schlüssel = quoteServices.slug), in EUR */
  services: Record<string, { basePrice: number; pricePerSqm: number }>
  /** Multiplikator je Turnus (Schlüssel = quoteFrequencies.value) */
  frequencyMultipliers: Record<string, number>
  /**
   * Flächenmodell der Fassadenreinigung.
   * Der m²-Preis sinkt linear vom Preis bei minArea (maxPrice) auf den Preis
   * bei maxArea (minPrice). Beispiel: 20 €/m² bei 10 m² bis 10 €/m² bei 350 m².
   */
  fassade: {
    minArea: number
    maxArea: number
    maxPrice: number
    minPrice: number
  }
  /** Anfahrtspauschale pro gefahrenem Kilometer, in EUR */
  travelCostPerKm: number
  /** Rabatt für Privatkunden (z. B. 0.15 = 15 %) */
  privateDiscount: number
  /** Sicherheitsaufschlag für Gewerbekunden (z. B. 0.15 = 15 %) */
  commercialSurcharge: number
  /** Aufschlag für die obere Grenze der angezeigten Spanne (z. B. 0.15 = 15 %) */
  rangeSpread: number
}

/** Standard-Preisdynamik, abgeleitet aus den fest hinterlegten Ausgangswerten. */
export const defaultPricingConfig: PricingConfig = {
  windowPrices: Object.fromEntries(windowTypes.map((t) => [t.value, t.price])),
  services: Object.fromEntries(
    quoteServices.map((s) => [s.slug, { basePrice: s.basePrice, pricePerSqm: s.pricePerSqm }]),
  ),
  frequencyMultipliers: Object.fromEntries(quoteFrequencies.map((f) => [f.value, f.multiplier])),
  // m²-Preis fällt linear von 20 €/m² (bei 10 m²) auf 10 €/m² (bei 350 m²).
  fassade: { minArea: 10, maxArea: 350, maxPrice: 20, minPrice: 10 },
  travelCostPerKm: 2,
  privateDiscount: 0.15,
  commercialSurcharge: 0.15,
  rangeSpread: 0.15,
}

/**
 * Führt eine (evtl. unvollständige) gespeicherte Konfiguration mit den Defaults
 * zusammen, damit neue Felder immer einen gültigen Wert haben.
 */
export function mergePricingConfig(partial: Partial<PricingConfig> | null | undefined): PricingConfig {
  if (!partial) return defaultPricingConfig
  return {
    windowPrices: { ...defaultPricingConfig.windowPrices, ...partial.windowPrices },
    services: { ...defaultPricingConfig.services, ...partial.services },
    frequencyMultipliers: {
      ...defaultPricingConfig.frequencyMultipliers,
      ...partial.frequencyMultipliers,
    },
    fassade: { ...defaultPricingConfig.fassade, ...partial.fassade },
    travelCostPerKm: partial.travelCostPerKm ?? defaultPricingConfig.travelCostPerKm,
    privateDiscount: partial.privateDiscount ?? defaultPricingConfig.privateDiscount,
    commercialSurcharge: partial.commercialSurcharge ?? defaultPricingConfig.commercialSurcharge,
    rangeSpread: partial.rangeSpread ?? defaultPricingConfig.rangeSpread,
  }
}

/** Zusätzliche Kalkulationsoptionen (Anfahrt & Kundentyp) */
export interface PriceOptions {
  /** Gefahrene Kilometer für die Anfahrtspauschale */
  travelKm?: number
  /** true = Gewerbekunde (Sicherheitsaufschlag statt Rabatt) */
  isCommercial?: boolean
}

/**
 * Wendet Anfahrtskosten und die kundentypabhängige Preisspanne an.
 * 1. Eigentlicher Preis (Privatkunden mit Rabatt, Gewerbekunden mit Aufschlag).
 *    Dieser bildet die untere Grenze der angezeigten Spanne.
 * 2. Obere Grenze: eigentlicher Preis + rangeSpread (z. B. +15 %).
 *
 * Es wird bewusst NICHT mehr mehrfach aufgeschlagen – die obere Grenze liegt
 * dadurch nur um rangeSpread über dem eigentlichen Preis.
 */
function applyRangeAndTravel(
  subtotal: number,
  config: PricingConfig,
  options?: PriceOptions,
): CalculatedPrice {
  const travelCost = (options?.travelKm ?? 0) * config.travelCostPerKm
  const total = subtotal + travelCost
  const actualPrice = options?.isCommercial
    ? total * (1 + config.commercialSurcharge)
    : total * (1 - config.privateDiscount)
  const rangeEnd = actualPrice * (1 + config.rangeSpread)
  return { min: Math.round(actualPrice), max: Math.round(rangeEnd) }
}

/** Dynamischer m²-Preis für die Fassadenreinigung (Flächenmodell). */
export function getFassadePricePerSqm(area: number, config: PricingConfig): number {
  const { minArea, maxArea, maxPrice, minPrice } = config.fassade
  if (area <= minArea) return maxPrice
  if (area >= maxArea) return minPrice
  return maxPrice - ((maxPrice - minPrice) / (maxArea - minArea)) * (area - minArea)
}

/** Preisberechnung für die Fensterreinigung anhand der einzelnen Fensterarten */
export function calculateWindowRowsPrice(
  service: QuoteService | undefined,
  frequency: QuoteFrequency | undefined,
  rows: WindowRowEntry[],
  config: PricingConfig,
  options?: PriceOptions,
): CalculatedPrice {
  if (!service || !frequency) return { min: 0, max: 0 }
  let total = config.services[service.slug]?.basePrice ?? service.basePrice
  for (const row of rows) {
    if (row.quantity <= 0) continue
    const type = getWindowType(row.type)
    if (!type) continue
    const unitPrice = config.windowPrices[row.type] ?? type.price
    total += row.quantity * unitPrice
  }
  const multiplier = config.frequencyMultipliers[frequency.value] ?? frequency.multiplier
  return applyRangeAndTravel(total * multiplier, config, options)
}

/** Preisberechnung für flächenbasierte Leistungen (alle außer Fensterreinigung) */
export function calculateQuotePrice(
  service: QuoteService | undefined,
  frequency: QuoteFrequency | undefined,
  area: number,
  config: PricingConfig,
  options?: PriceOptions,
): CalculatedPrice {
  if (!service || !frequency) return { min: 0, max: 0 }
  const svc = config.services[service.slug]
  let totalBase: number
  if (service.slug === "fassadenreinigung") {
    // Fassadenreinigung nutzt das Flächenmodell (dynamischer m²-Preis).
    totalBase = area * getFassadePricePerSqm(area, config)
  } else {
    // Alle übrigen Flächenleistungen: Grundpreis (i. d. R. 0) + m²-Preis.
    totalBase = (svc?.basePrice ?? service.basePrice) + area * (svc?.pricePerSqm ?? service.pricePerSqm)
  }
  const multiplier = config.frequencyMultipliers[frequency.value] ?? frequency.multiplier
  return applyRangeAndTravel(totalBase * multiplier, config, options)
}
