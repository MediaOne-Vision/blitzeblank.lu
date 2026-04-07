import { Phone, ClipboardList, Sparkles, ThumbsUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen Ihre Räumlichkeiten vor Ort, besprechen Ihre Anforderungen und erstellen ein individuelles Angebot.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Professionelle Reinigung",
    description: "Unser geschultes Team führt die Reinigung nach höchsten Standards durch - termingerecht und gründlich.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Zufriedenheitsgarantie",
    description: "Nach Abschluss prüfen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Maßstab.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            So läuft es ab
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            In 4 Schritten zu strahlender Sauberkeit
          </h2>
          <p className="text-pretty text-muted-foreground">
            Wir machen es Ihnen einfach. Von der ersten Anfrage bis zum perfekten Ergebnis 
            begleiten wir Sie durch jeden Schritt.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 hidden h-0.5 w-full bg-border lg:block" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <step.icon className="h-8 w-8 text-primary-foreground" />
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
