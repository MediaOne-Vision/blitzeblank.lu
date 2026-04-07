import { PriceCalculator } from "@/components/price-calculator"

export function CalculatorSection() {
  return (
    <section id="preiskalkulator" className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Content */}
          <div className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Preiskalkulator
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground mb-8">
              Erhalten Sie eine erste Preisspanne
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Mit unserem Preiskalkulator erhalten Sie eine unverbindliche Schätzung. 
              Der finale Preis wird nach einer kostenlosen Besichtigung festgelegt.
            </p>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Leistung wählen", desc: "Industrie, Fenster, Trockeneis und mehr" },
                { step: "02", title: "Fläche angeben", desc: "Eine Schätzung reicht aus" },
                { step: "03", title: "Preis erhalten", desc: "Sofort und unverbindlich" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 pb-6 border-b border-border last:border-0">
                  <span className="text-primary font-mono text-sm">{item.step}</span>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <PriceCalculator />
        </div>
      </div>
    </section>
  )
}
