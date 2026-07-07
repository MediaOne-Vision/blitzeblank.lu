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
  /** Flächenmodell der Steinreinigung */
  stein: {
    minArea: number
    maxArea: number
    maxPrice: number
    minPrice: number
  }
  /**
   * Flächenmodell der Fassadenreinigung (laut Preisdynamik-Tabelle).
   * Der m²-Preis sinkt linear von maxPrice (bei minArea) auf minPrice (bei maxArea).
   * Zusätzlich gilt ein Mindestpreis (minCharge) für sehr kleine Flächen.
   */
  fassade: {
    minArea: number
    maxArea: number
    maxPrice: number
    minPrice: number
    minCharge: number
  }
  /** Anfahrtspauschale pro gefahrenem Kilometer, in EUR */
  travelCostPerKm: number
  /** Rabatt für Privatkunden (z. B. 0.15 = 15 %) */
  privateDiscount: number
  /** Sicherheitsaufschlag für Gewerbekunden (z. B. 0.15 = 15 %) */
  commercialSurcharge: number
  /** Aufschlag auf den Basispreis für den Anfangspreis der Spanne (z. B. 0.15) */
  rangeStartMarkup: number
  /** Zusätzlicher Spielraum für die obere Grenze der Spanne (z. B. 0.15) */
  rangeSpread: number
}

/** Standard-Preisdynamik, abgeleitet aus den fest hinterlegten Ausgangswerten. */
export const defaultPricingConfig: PricingConfig = {
  windowPrices: Object.fromEntries(windowTypes.map((t) => [t.value, t.price])),
  services: Object.fromEntries(
    quoteServices.map((s) => [s.slug, { basePrice: s.basePrice, pricePerSqm: s.pricePerSqm }]),
  ),
  frequencyMultipliers: Object.fromEntries(quoteFrequencies.map((f) => [f.value, f.multiplier])),
  stein: { minArea: 10, maxArea: 150, maxPrice: 30, minPrice: 20 },
  // Werte aus der Preisdynamik-Tabelle: der m²-Preis fällt linear von 17 €/m²
  // (bei 10 m²) auf 10 €/m² (bei 350 m²). Für Flächen bis 10 m² gilt ein
  // Mindestpreis von 200 €.
  fassade: { minArea: 10, maxArea: 350, maxPrice: 17, minPrice: 10, minCharge: 200 },
  travelCostPerKm: 2,
  privateDiscount: 0.15,
  commercialSurcharge: 0.15,
  rangeStartMarkup: 0.15,
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
    stein: { ...defaultPricingConfig.stein, ...partial.stein },
    fassade: { ...defaultPricingConfig.fassade, ...partial.fassade },
    travelCostPerKm: partial.travelCostPerKm ?? defaultPricingConfig.travelCostPerKm,
    privateDiscount: partial.privateDiscount ?? defaultPricingConfig.privateDiscount,
    commercialSurcharge: partial.commercialSurcharge ?? defaultPricingConfig.commercialSurcharge,
    rangeStartMarkup: partial.rangeStartMarkup ?? defaultPricingConfig.rangeStartMarkup,
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
 * 1. Basispreis (Privatkunden mit Rabatt, Gewerbekunden ohne).
 * 2. Anfangspreis (untere Grenze): Basispreis + rangeStartMarkup.
 * 3. Obere Grenze: Anfangspreis + rangeSpread.
 */
function applyRangeAndTravel(
  subtotal: number,
  config: PricingConfig,
  options?: PriceOptions,
): CalculatedPrice {
  const travelCost = (options?.travelKm ?? 0) * config.travelCostPerKm
  const total = subtotal + travelCost
  const basePrice = options?.isCommercial
    ? total * (1 + config.commercialSurcharge)
    : total * (1 - config.privateDiscount)
  const rangeStart = basePrice * (1 + config.rangeStartMarkup)
  const rangeEnd = rangeStart * (1 + config.rangeSpread)
  return { min: Math.round(rangeStart), max: Math.round(rangeEnd) }
}

/** Dynamischer m²-Preis für die Steinreinigung (Flächenmodell). */
export function getSteinPricePerSqm(area: number, config: PricingConfig): number {
  const { minArea, maxArea, maxPrice, minPrice } = config.stein
  if (area <= minArea) return maxPrice
  if (area >= maxArea) return minPrice
  return maxPrice - ((maxPrice - minPrice) / (maxArea - minArea)) * (area - minArea)
}

/** Dynamischer m²-Preis für die Fassadenreinigung (Flächenmodell). */
export function getFassadePricePerSqm(area: number, config: PricingConfig): number {
  const { minArea, maxArea, maxPrice, minPrice } = config.fassade
  if (area <= minArea) return maxPrice
  if (area >= maxArea) return minPrice
  return maxPrice - ((maxPrice - minPrice) / (maxArea - minArea)) * (area - minArea)
}

/** Gesamter (Netto-)Grundpreis der Fassadenreinigung inkl. Mindestpreis. */
export function getFassadeBaseTotal(area: number, config: PricingConfig): number {
  return Math.max(area * getFassadePricePerSqm(area, config), config.fassade.minCharge)
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
  if (service.slug === "steinreinigung") {
    totalBase = area * getSteinPricePerSqm(area, config)
  } else if (service.slug === "fassadenreinigung") {
    // Fassadenreinigung nutzt das Flächenmodell aus der Preisdynamik-Tabelle
    // (inkl. Mindestpreis) ohne separaten Grundpreis.
    totalBase = getFassadeBaseTotal(area, config)
  } else {
    totalBase = (svc?.basePrice ?? service.basePrice) + area * (svc?.pricePerSqm ?? service.pricePerSqm)
  }
  const multiplier = config.frequencyMultipliers[frequency.value] ?? frequency.multiplier
  return applyRangeAndTravel(totalBase * multiplier, config, options)
}
