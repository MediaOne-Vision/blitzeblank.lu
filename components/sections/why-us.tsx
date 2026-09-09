import Link from "next/link"
import { Zap, Repeat, UserCheck, Award, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { localizeHref, type Locale } from "@/lib/i18n"

const FEATURES = {
  de: [
    { icon: Zap, title: "Zuverlässigkeit", text: "Termingerechte Ausführung und konstant hohe Qualität sind für uns selbstverständlich." },
    { icon: Repeat, title: "Flexibilität", text: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an." },
    { icon: UserCheck, title: "Persönlicher Kontakt", text: "Ein fester Ansprechpartner für alle Ihre Anliegen. Direkte Kommunikation ohne Umwege." },
    { icon: Award, title: "Qualitätsgarantie", text: "Unsere Arbeit wird erst abgeschlossen, wenn Sie vollständig zufrieden sind." },
  ],
  en: [
    { icon: Zap, title: "Reliability", text: "On-time execution and consistently high quality are a given for us." },
    { icon: Repeat, title: "Flexibility", text: "Short-notice scheduling and fast response times - we adapt to your timeline." },
    { icon: UserCheck, title: "Personal Contact", text: "One dedicated point of contact for all your needs. Direct communication, no detours." },
    { icon: Award, title: "Quality Guarantee", text: "Our work is only complete once you're fully satisfied." },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Über uns",
    heading: "Darauf vertrauen Unternehmen",
    body: "Seit unserer Gründung steht Blitzeblank für professionelle Reinigung mit Herz. Wir verstehen, dass Sauberkeit mehr ist als nur Hygiene - sie schafft ein angenehmes Arbeitsumfeld und hinterlässt bei Ihren Kunden einen bleibenden Eindruck.",
    ctaText: "Überzeugen Sie sich selbst - wir beraten Sie gern unverbindlich.",
    ctaButton: "Jetzt unverbindlich anfragen",
  },
  en: {
    eyebrow: "About Us",
    heading: "Trusted by Businesses",
    body: "Since our founding, Blitzeblank has stood for professional cleaning with heart. We understand that cleanliness is more than just hygiene - it creates a pleasant working environment and leaves a lasting impression on your customers.",
    ctaText: "See for yourself - we're happy to advise you, no obligation.",
    ctaButton: "Request a Free Consultation",
  },
}

export function WhyUsSection({ locale = "de" }: { locale?: Locale }) {
  const features = FEATURES[locale]
  const t = TEXT[locale]
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="max-w-3xl mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">{t.eyebrow}</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance mb-6">
            {t.heading}
          </h2>
          <p className="text-neutral-600 leading-relaxed text-pretty">{t.body}</p>
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
          <p className="text-brand-navy font-medium text-pretty">{t.ctaText}</p>
          <Button
            asChild
            size="lg"
            className="group shrink-0 rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal"
          >
            <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
              {t.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
