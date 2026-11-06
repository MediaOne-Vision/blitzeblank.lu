"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { audiencePath } from "@/lib/audience"
import { useAudience } from "@/components/audience-provider"
import type { Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const IMAGES: Record<Audience, string> = {
  privat: "/images/leistungen/fassadenreinigung-einfamilienhaus-gereinigt-nachher.avif",
  gewerbe: "/images/hero-glasfassade-buerogebaeude.png",
}

const TEXT = {
  de: {
    eyebrow: "Wer sind Sie?",
    heading: "Wählen Sie Ihren Bereich",
    intro: "Wir zeigen Ihnen nur die Leistungen, Preise und Abläufe, die für Sie relevant sind.",
    privat: {
      title: "Privatkunden",
      text: "Für Ihr Haus, Ihre Wohnung und Ihren Garten.",
      points: ["Fenster, Fassade und Dachrinnen", "Terrasse, Einfahrt und Solaranlage", "Einmalig oder regelmäßig"],
      cta: "Zu den Privatkunden",
      imageAlt: "Gepflegtes Einfamilienhaus mit gereinigter Fassade",
    },
    gewerbe: {
      title: "Gewerbekunden",
      text: "Für Büros, Praxen, Handel, Hausverwaltungen und Industrie.",
      points: ["Unterhalts- und Glasreinigung nach Plan", "Industrie-, Fassaden- und Spezialreinigung", "Fester Ansprechpartner, Einsatz außerhalb der Betriebszeiten"],
      cta: "Zu den Gewerbekunden",
      imageAlt: "Moderne Glasfassade eines Bürogebäudes",
    },
  },
  en: {
    eyebrow: "Who are you?",
    heading: "Choose your area",
    intro: "We only show you the services, prices and processes that are relevant to you.",
    privat: {
      title: "Private customers",
      text: "For your house, apartment and garden.",
      points: ["Windows, facade and gutters", "Terrace, driveway and solar panels", "One-off or recurring"],
      cta: "Go to private customers",
      imageAlt: "Well-kept family home with a cleaned facade",
    },
    gewerbe: {
      title: "Business customers",
      text: "For offices, practices, retail, property managers and industry.",
      points: ["Scheduled maintenance and glass cleaning", "Industrial, facade and special cleaning", "Fixed contact, jobs outside operating hours"],
      cta: "Go to business customers",
      imageAlt: "Modern glass facade of an office building",
    },
  },
  fr: {
    eyebrow: "Qui êtes-vous ?",
    heading: "Choisissez votre espace",
    intro: "Nous vous montrons uniquement les prestations, prix et déroulements qui vous concernent.",
    privat: {
      title: "Particuliers",
      text: "Pour votre maison, votre appartement et votre jardin.",
      points: ["Vitres, façade et gouttières", "Terrasse, allée et installation solaire", "Ponctuel ou régulier"],
      cta: "Vers les particuliers",
      imageAlt: "Maison individuelle soignée avec façade nettoyée",
    },
    gewerbe: {
      title: "Entreprises",
      text: "Pour bureaux, cabinets, commerces, syndics et industrie.",
      points: ["Entretien et vitres selon planning", "Nettoyage industriel, de façades et spécial", "Interlocuteur fixe, interventions hors heures d'activité"],
      cta: "Vers les entreprises",
      imageAlt: "Façade vitrée moderne d'un immeuble de bureaux",
    },
  },
}

export function AudienceChoiceCards({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const { selectAudience } = useAudience()
  const audiences: Audience[] = ["privat", "gewerbe"]

  return (
    <section id="kundengruppen" className="scroll-mt-24 bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
          <h2 className="mb-3 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {t.heading}
          </h2>
          <p className="text-pretty text-neutral-600">{t.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {audiences.map((audience) => {
            const copy = t[audience]
            return (
              <article key={audience} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-navy/10">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={IMAGES[audience]}
                    alt={copy.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <h3 className="mb-1 font-display text-2xl font-extrabold text-brand-navy">{copy.title}</h3>
                  <p className="mb-5 text-neutral-600">{copy.text}</p>
                  <ul className="mb-8 space-y-2.5">
                    {copy.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-neutral-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="group mt-auto w-full rounded-full bg-brand-blue text-white hover:bg-brand-teal sm:w-auto sm:self-start">
                    <Link
                      href={audiencePath(audience, locale)}
                      onClick={() => selectAudience(audience, "choice_section")}
                      className="cursor-pointer"
                    >
                      {copy.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
