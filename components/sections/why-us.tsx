import Image from "next/image"

const stats = [
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Weiterempfehlung" },
  { value: "24h", label: "Reaktionszeit" },
]

const features = [
  {
    title: "Zuverlässigkeit",
    description: "Termingerechte Ausführung und konstant hohe Qualität sind für uns selbstverständlich.",
  },
  {
    title: "Flexibilität",
    description: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an.",
  },
  {
    title: "Persönlicher Kontakt",
    description: "Ein fester Ansprechpartner für alle Ihre Anliegen. Direkte Kommunikation ohne Umwege.",
  },
  {
    title: "Qualitätsgarantie",
    description: "Unsere Arbeit wird erst abgeschlossen, wenn Sie zufrieden sind.",
  },
]

export function WhyUsSection() {
  return (
    <section className="py-24 lg:py-32 bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-background/60 mb-4">
              Warum Blitzeblank
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight mb-8">
              Ihr Vertrauen ist unser Antrieb
            </h2>
            <p className="text-lg text-background/70 mb-12 leading-relaxed max-w-lg">
              Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. 
              Sauberkeit schafft ein angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden 
              einen positiven Eindruck.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 pb-6 border-b border-background/10 last:border-0">
                  <span className="text-primary font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-background/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats + Mascot */}
          <div className="lg:sticky lg:top-32">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-1 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-background/5 p-8 first:rounded-tl-3xl [&:nth-child(2)]:rounded-tr-3xl [&:nth-child(3)]:rounded-bl-3xl last:rounded-br-3xl">
                  <p className="text-4xl lg:text-5xl font-serif font-medium mb-2">{stat.value}</p>
                  <p className="text-sm text-background/60">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Mascot */}
            <div className="relative flex justify-center">
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbär"
                width={250}
                height={250}
                className="w-48 h-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
