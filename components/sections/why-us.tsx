import Image from "next/image"
import { Zap, Repeat, UserCheck, Award } from "lucide-react"

const stats = [
  { value: "500+", label: "Zufriedene Kunden", color: "bg-brand-blue text-white" },
  { value: "3", label: "Jahre Erfahrung", color: "bg-brand-sky text-brand-navy" },
  { value: "98%", label: "Weiterempfehlung", color: "bg-brand-teal text-white" },
  { value: "24h", label: "Reaktionszeit", color: "bg-brand-navy text-white" },
]

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
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Über uns</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
              Darauf vertrauen Unternehmen
            </h2>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. 
            Wir verstehen, dass Sauberkeit mehr ist als nur Hygiene - sie schafft ein 
            angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden einen bleibenden Eindruck.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-2xl p-6 text-center ${stat.color}`}>
              <p className="font-display text-3xl lg:text-4xl font-extrabold mb-2">{stat.value}</p>
              <p className="text-sm opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-brand-mint p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-brand-navy mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
          
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/15 to-brand-teal/10 rounded-3xl" />
            <Image
              src="/images/mascot.png"
              alt="Blitzeblank Maskottchen"
              width={350}
              height={350}
              className="relative h-auto w-full max-w-sm drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
