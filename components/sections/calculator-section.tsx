import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <p className="text-sm font-medium text-[#4AADE4] mb-3">Preiskalkulator</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900">
              Erhalten Sie eine unverbindliche Preisschatzung
            </h2>
          </div>
          <p className="text-neutral-600">
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
