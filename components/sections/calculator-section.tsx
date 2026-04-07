import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
              Preiskalkulator
            </p>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Erhalten Sie eine erste Preisspanne
            </h2>
            <p className="mb-6 text-pretty text-muted-foreground leading-relaxed">
              Mit unserem Preiskalkulator erhalten Sie eine unverbindliche Schätzung für Ihre 
              Reinigungsanforderungen. Der finale Preis wird individuell nach einer kostenlosen 
              Besichtigung vor Ort festgelegt.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Wählen Sie Ihre Leistung</h4>
                  <p className="text-sm text-muted-foreground">Industriereinigung, Fenster, Trockeneis und mehr</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Geben Sie die Fläche an</h4>
                  <p className="text-sm text-muted-foreground">Eine ungefähre Schätzung reicht aus</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Erhalten Sie Ihre Preisspanne</h4>
                  <p className="text-sm text-muted-foreground">Sofort und unverbindlich</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <PriceCalculator />
        </div>
      </div>
    </section>
  )
}
