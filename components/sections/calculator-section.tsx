import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Preiskalkulator</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
              Ihre unverbindliche Preisschatzung
            </h2>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            Wahlen Sie Ihre gewunschte Leistung und Flache. Der finale Preis wird nach 
            einer kostenlosen Besichtigung vor Ort individuell festgelegt.
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-xl">
          <PriceCalculator />
        </div>
      </div>
    </section>
  )
}
