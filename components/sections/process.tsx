const steps = [
  {
    number: "01",
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden.",
  },
  {
    number: "02",
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen Ihre Räumlichkeiten, besprechen Anforderungen und erstellen ein individuelles Angebot.",
  },
  {
    number: "03",
    title: "Professionelle Reinigung",
    description: "Unser Team führt die Reinigung nach höchsten Standards durch - termingerecht und gründlich.",
  },
  {
    number: "04",
    title: "Zufriedenheitsgarantie",
    description: "Nach Abschluss prüfen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Maßstab.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            So funktioniert es
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground max-w-3xl">
            In 4 Schritten zu strahlender Sauberkeit
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Number */}
              <span className="text-7xl lg:text-8xl font-serif font-medium text-border group-hover:text-primary/20 transition-colors duration-300">
                {step.number}
              </span>
              
              {/* Content */}
              <div className="mt-4">
                <h3 className="text-xl font-medium text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
