import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AudienceChoiceCards } from "@/components/audience-choice-cards"
import { withAudienceQuery } from "@/lib/audience"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const TRUST = {
  de: ["Antwort innerhalb von 24 Stunden", "Kostenlose Besichtigung vor Ort", "Transparente, faire Preise", "Qualitätsgarantie inklusive"],
  en: ["We reply within 24 hours", "Free on-site visit", "Transparent, fair pricing", "Quality guarantee included"],
  fr: ["Réponse sous 24 heures", "Visite sur place gratuite", "Tarifs transparents et équitables", "Garantie de qualité incluse"],
}

const TEXT = {
  de: {
    neutral: {
      badge: "Reinigung vom Profi",
      heading: "Strahlend sauber.",
      headingAccent: "Garantiert.",
      body: "Fenster, Fassade, Stein und mehr in Luxemburg, Trier, Bitburg und der Region.",
    },
    privat: {
      badge: "Für Privatkunden",
      heading: "Reinigung für",
      headingAccent: "Ihr Zuhause.",
      body: "Fenster, Fassade, Terrasse, Dach und Treppenhaus: sauber, zuverlässig und zum fairen Preis - in Luxemburg, Trier, Bitburg und der Region.",
      primary: "Kostenloses Angebot anfordern",
      secondary: "Preis berechnen",
      imageAlt: "Gepflegtes Einfamilienhaus mit gereinigter Fassade",
    },
    gewerbe: {
      badge: "Für Gewerbekunden",
      heading: "Reinigung für",
      headingAccent: "Ihren Betrieb.",
      body: "Unterhalts-, Fenster-, Fassaden- und Industriereinigung mit festen Ansprechpartnern - planbar, diskret und zuverlässig für Büros, Praxen und Betriebe.",
      primary: "Besichtigung anfragen",
      secondary: "Preis berechnen",
      imageAlt: "Moderne Glasfassade eines Bürogebäudes in blauem Licht",
    },
  },
  en: {
    neutral: {
      badge: "Professional cleaning",
      heading: "Sparkling clean.",
      headingAccent: "Guaranteed.",
      body: "Windows, facades, stone and more in Luxembourg, Trier, Bitburg and the surrounding region.",
    },
    privat: {
      badge: "For private customers",
      heading: "Cleaning for",
      headingAccent: "your home.",
      body: "Windows, facade, terrace, roof and stairwell: clean, reliable and fairly priced - in Luxembourg, Trier, Bitburg and the surrounding region.",
      primary: "Request a free quote",
      secondary: "Calculate price",
      imageAlt: "Well-kept family home with a cleaned facade",
    },
    gewerbe: {
      badge: "For business customers",
      heading: "Cleaning for",
      headingAccent: "your business.",
      body: "Maintenance, window, facade and industrial cleaning with fixed contacts - dependable, discreet and plannable for offices, practices and companies.",
      primary: "Request a site visit",
      secondary: "Calculate price",
      imageAlt: "Modern glass facade of an office building in blue light",
    },
  },
  fr: {
    neutral: {
      badge: "Nettoyage professionnel",
      heading: "Propreté éclatante.",
      headingAccent: "Garantie.",
      body: "Vitres, façades, pierre et plus encore à Luxembourg, Trèves, Bitburg et dans la région.",
    },
    privat: {
      badge: "Pour les particuliers",
      heading: "Nettoyage pour",
      headingAccent: "votre domicile.",
      body: "Vitres, façade, terrasse, toiture et cage d'escalier : propre, fiable et à prix équitable - à Luxembourg, Trèves, Bitburg et dans la région.",
      primary: "Demander un devis gratuit",
      secondary: "Calculer le prix",
      imageAlt: "Maison individuelle soignée avec façade nettoyée",
    },
    gewerbe: {
      badge: "Pour les entreprises",
      heading: "Nettoyage pour",
      headingAccent: "votre entreprise.",
      body: "Nettoyage d'entretien, de vitres, de façades et industriel avec interlocuteurs fixes - fiable, discret et planifiable pour bureaux, cabinets et sociétés.",
      primary: "Demander une visite",
      secondary: "Calculer le prix",
      imageAlt: "Façade vitrée moderne d'un immeuble de bureaux dans une lumière bleue",
    },
  },
}

const HERO_IMAGES: Record<"neutral" | Audience, string> = {
  neutral: "/images/hero-glasfassade-buerogebaeude.png",
  gewerbe: "/images/hero-glasfassade-buerogebaeude.png",
  privat: "/images/leistungen/fassadenreinigung-einfamilienhaus-gereinigt-nachher.avif",
}

export function HeroSection({ locale = "de", audience = null }: { locale?: Locale; audience?: Audience | null }) {
  const key = audience ?? "neutral"
  const copy = TEXT[locale][key]
  const trust = TRUST[locale]

  const primaryHref = audience
    ? withAudienceQuery(localizeHref("/kontakt", locale), audience, audience === "gewerbe" ? { anliegen: "besichtigung" } : {})
    : ""
  const secondaryHref = audience ? withAudienceQuery(localizeHref("/angebot", locale), audience) : ""
  const audienceCopy = audience ? TEXT[locale][audience] : null
  const imageAlt = audienceCopy?.imageAlt ?? TEXT[locale].gewerbe.imageAlt

  return (
    <section className="relative flex min-h-[85vh] flex-col overflow-hidden pt-20 lg:min-h-[48rem] lg:pt-24">
      <Image
        src={HERO_IMAGES[key]}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/95 via-brand-navy/80 to-brand-navy/70 lg:bg-gradient-to-r lg:from-brand-navy lg:via-brand-navy/70 lg:to-brand-navy/30" />
      <div className="absolute inset-0 bg-brand-navy/25" />

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-8 px-6 py-8 sm:px-8 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-16 lg:py-12 xl:px-24">
        <div className="min-w-0 max-w-2xl text-center lg:flex-1 lg:text-left">
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.08em] text-brand-sky sm:mb-6 sm:text-sm">
            {copy.badge}
          </span>

          <h1 className="mb-4 text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:mb-6 sm:text-6xl sm:leading-[0.98] lg:text-[3.75rem]">
            <span className="font-extrabold">{copy.heading}</span>
            <br />
            <span className="font-medium">{copy.headingAccent}</span>
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-balance text-base leading-relaxed text-white sm:mb-8 sm:text-lg lg:mx-0 lg:text-xl">
            {copy.body}
          </p>

          {audienceCopy ? (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="group w-full rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal sm:w-auto">
                <Link href={primaryHref} className="cursor-pointer">
                  {audienceCopy.primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white sm:w-auto">
                <Link href={secondaryHref} className="cursor-pointer">
                  {audienceCopy.secondary}
                </Link>
              </Button>
            </div>
          ) : (
            <AudienceChoiceCards locale={locale} />
          )}
        </div>

        <div className="mx-auto hidden shrink-0 self-end sm:block lg:mx-0 lg:self-end">
          <Image
            src="/images/mascot.png"
            alt="Blitzeblank Maskottchen"
            width={560}
            height={560}
            className="h-44 w-auto drop-shadow-[0_18px_28px_rgba(10,25,55,0.55)] sm:h-52 lg:h-64 xl:h-72"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-brand-navy/50 backdrop-blur-sm">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-center text-sm font-medium text-white/85 sm:px-8 lg:justify-between lg:px-16 xl:px-24">
          {trust.map((value) => (
            <li key={value} className="text-balance">
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
