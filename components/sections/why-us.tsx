import Link from "next/link"
import { Zap, Repeat, UserCheck, Award, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"

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
        <Reveal className="max-w-3xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Über uns</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance mb-6">
            Darauf vertrauen Unternehmen
          </h2>
          <p className="text-neutral-600 leading-relaxed text-pretty">
            Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. 
            Wir verstehen, dass Sauberkeit mehr ist als nur Hygiene - sie schafft ein 
            angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden einen bleibenden Eindruck.
          </p>
        </Reveal>

        {/* Features */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              direction="up"
              delay={i * 100}
              className="rounded-2xl bg-brand-mint p-6 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-navy mb-2">{feature.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{feature.text}</p>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <p className="text-brand-navy font-medium text-pretty">
            Überzeugen Sie sich selbst - wir beraten Sie gern unverbindlich.
          </p>
          <Button
            asChild
            size="lg"
            className="group shrink-0 rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal"
          >
            <Link href="/kontakt" className="cursor-pointer">
              Jetzt unverbindlich anfragen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
