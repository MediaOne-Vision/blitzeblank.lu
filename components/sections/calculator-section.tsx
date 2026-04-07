import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Preiskalkulator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Erhalten Sie eine unverbindliche Preisspanne fur Ihre Reinigung. Der finale Preis wird nach einer kostenlosen Besichtigung festgelegt.
          </p>
        </div>

        {/* Calculator */}
        <div className="max-w-2xl mx-auto">
          <PriceCalculator />
        </div>
      </div>
    </section>
  )
}
