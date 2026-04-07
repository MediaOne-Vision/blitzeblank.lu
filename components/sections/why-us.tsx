import { Clock, Shield, MessageCircle, Award } from "lucide-react"

const stats = [
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Weiterempfehlung" },
  { value: "24h", label: "Reaktionszeit" },
]

const features = [
  {
    icon: Clock,
    title: "Zuverlassigkeit",
    description: "Termingerechte Ausfuhrung und konstant hohe Qualitat sind fur uns selbstverstandlich.",
  },
  {
    icon: Shield,
    title: "Flexibilitat",
    description: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an.",
  },
  {
    icon: MessageCircle,
    title: "Personlicher Kontakt",
    description: "Ein fester Ansprechpartner fur alle Ihre Anliegen. Direkte Kommunikation ohne Umwege.",
  },
  {
    icon: Award,
    title: "Qualitatsgarantie",
    description: "Unsere Arbeit wird erst abgeschlossen, wenn Sie zufrieden sind.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-lg bg-background border border-border">
              <p className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Warum Blitzeblank?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Seit unserer Grundung steht Blitzeblank fur professionelle Reinigung mit Herz. 
              Sauberkeit schafft ein angenehmes Arbeitsumfeld und hinterlasst bei Ihren Kunden 
              einen positiven Eindruck.
            </p>
          </div>

          {/* Right Column - Features */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
