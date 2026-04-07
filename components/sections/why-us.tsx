import { Shield, Clock, Users, Award } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Zuverlässigkeit",
    description: "Wir halten, was wir versprechen. Termingerechte Ausführung und konstant hohe Qualität sind für uns selbstverständlich.",
  },
  {
    icon: Clock,
    title: "Flexibilität",
    description: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an.",
  },
  {
    icon: Users,
    title: "Persönlicher Kontakt",
    description: "Ein fester Ansprechpartner für alle Ihre Anliegen. Direkte Kommunikation ohne Umwege.",
  },
  {
    icon: Award,
    title: "Qualitätsgarantie",
    description: "Unsere Arbeit wird erst abgeschlossen, wenn Sie zufrieden sind. Probearbeit auf Wunsch möglich.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
              Warum Blitzeblank
            </p>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ihr Vertrauen ist unser Antrieb
            </h2>
            <p className="mb-8 text-pretty text-muted-foreground leading-relaxed">
              Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. 
              Wir verstehen, dass Sauberkeit mehr ist als nur Optik - sie schafft ein 
              angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden einen positiven Eindruck.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <reason.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-2xl bg-primary p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-foreground lg:text-5xl">500+</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Zufriedene Kunden</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-foreground lg:text-5xl">15+</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Jahre Erfahrung</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-foreground lg:text-5xl">98%</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Weiterempfehlung</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary-foreground lg:text-5xl">24h</p>
                <p className="mt-2 text-sm text-primary-foreground/70">Reaktionszeit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
