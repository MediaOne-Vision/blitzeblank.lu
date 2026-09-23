import Link from "next/link"
import { Clock, ShieldCheck, MapPin, CircleDollarSign, GitFork, UserCircle, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { localizeHref, type Locale } from "@/lib/i18n"

const FEATURES = {
  de: [
    { icon: Clock, title: "Schnelle Reaktion", text: "Antwort auf Ihre Anfrage innerhalb von 24 Stunden." },
    { icon: ShieldCheck, title: "Qualitätsgarantie", text: "Inklusive Testfläche auf Wunsch." },
    { icon: MapPin, title: "Kostenlose Besichtigung", text: "Vor-Ort-Termin für ein präzises Angebot - gratis." },
    { icon: CircleDollarSign, title: "Transparente Preise", text: "Faire Konditionen ohne versteckte Kosten." },
    { icon: GitFork, title: "Flexibilität", text: "Kurzfristige Terminvergabe und schnelle Reaktionszeiten." },
    { icon: UserCircle, title: "Persönlicher Kontakt", text: "Ein fester Ansprechpartner für alle Ihre Anliegen." },
  ],
  en: [
    { icon: Clock, title: "Fast Response", text: "We respond to your inquiry within 24 hours." },
    { icon: ShieldCheck, title: "Quality Guarantee", text: "Test area available on request." },
    { icon: MapPin, title: "Free Site Visit", text: "On-site appointment for an accurate quote - free of charge." },
    { icon: CircleDollarSign, title: "Transparent Pricing", text: "Fair terms with no hidden costs." },
    { icon: GitFork, title: "Flexibility", text: "Short-notice scheduling and fast response times." },
    { icon: UserCircle, title: "Personal Contact", text: "One dedicated point of contact for all your needs." },
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
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.08em] text-brand-blue">{t.eyebrow}</p>
          <h2 className="mb-5 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-5xl">
            {t.heading}
          </h2>
          <p className="text-pretty leading-relaxed text-neutral-600">{t.body}</p>
        </Reveal>

        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:gap-x-16">
          {features.map((feature, i) => (
            <Reveal
              key={feature.title}
              direction="up"
              delay={i * 120}
              className="group flex gap-4 rounded-2xl border-b border-neutral-200 p-4 -m-4 pb-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-brand-mint/60 hover:shadow-lg hover:shadow-brand-navy/5 cursor-default"
            >
              <feature.icon
                className="h-10 w-10 shrink-0 text-brand-navy transition-all duration-300 group-hover:scale-110 group-hover:text-brand-blue sm:h-11 sm:w-11"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-1 font-display text-lg font-bold text-brand-navy transition-colors group-hover:text-brand-blue">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600">{feature.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={720} className="mt-12 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <p className="text-pretty font-medium text-brand-navy">{t.ctaText}</p>
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
