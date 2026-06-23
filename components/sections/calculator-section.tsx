import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Preiskalkulator</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
            Ihre unverbindliche Preisschätzung
          </h2>
          <p className="text-neutral-600 leading-relaxed mt-4 text-pretty">
            Wählen Sie Ihre gewünschte Leistung und Fläche. Der finale Preis wird nach 
            einer kostenlosen Besichtigung vor Ort individuell festgelegt.
          </p>
        </div>

        {/* Calculator */}
        <PriceCalculator />
      </div>
    </section>
  )
}
