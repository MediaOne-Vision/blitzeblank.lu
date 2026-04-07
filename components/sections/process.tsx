import { Phone, Eye, Sparkles, ThumbsUp } from "lucide-react"

const steps = [
  {
    icon: Phone,
    number: "01",
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden.",
  },
  {
    icon: Eye,
    number: "02",
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen Ihre Raumlichkeiten, besprechen Anforderungen und erstellen ein individuelles Angebot.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Professionelle Reinigung",
    description: "Unser Team fuhrt die Reinigung nach hochsten Standards durch - termingerecht und grundlich.",
  },
  {
    icon: ThumbsUp,
    number: "04",
    title: "Zufriedenheitsgarantie",
    description: "Nach Abschluss prufen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Massstab.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            So funktioniert es
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In vier einfachen Schritten zu strahlender Sauberkeit.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-xs font-medium text-primary mb-2">{step.number}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
