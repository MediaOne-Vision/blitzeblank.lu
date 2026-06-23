import { Zap, Repeat, UserCheck, Award } from "lucide-react"

const features = [
  { icon: Zap, title: "Zuverlässigkeit", text: "Termingerechte Ausführung und konstant hohe Qualität sind für uns selbstverständlich." },
  { icon: Repeat, title: "Flexibilität", text: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an." },
  { icon: UserCheck, title: "Persönlicher Kontakt", text: "Ein fester Ansprechpartner für alle Ihre Anliegen. Direkte Kommunikation ohne Umwege." },
  { icon: Award, title: "Qualitätsgarantie", text: "Unsere Arbeit wird erst abgeschlossen, wenn Sie vollständig zufrieden sind." },
]

export function WhyUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Über uns</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance mb-6">
            Darauf vertrauen Unternehmen
          </h2>
          <p className="text-neutral-600 leading-relaxed text-pretty">
            Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. 
            Wir verstehen, dass Sauberkeit mehr ist als nur Hygiene - sie schafft ein 
            angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden einen bleibenden Eindruck.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl bg-brand-mint p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-navy mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
