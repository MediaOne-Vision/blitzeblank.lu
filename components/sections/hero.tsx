import Link from "@/components/audience-link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const TRUST = {
  de: ["Antwort innerhalb von 24 Stunden", "Kostenlose Besichtigung vor Ort", "Festpreis nach Besichtigung", "Qualitätsgarantie inklusive"],
  en: ["We reply within 24 hours", "Free on-site visit", "Fixed price after the visit", "Quality guarantee included"],
  fr: ["Réponse sous 24 heures", "Visite sur place gratuite", "Prix fixe après la visite", "Garantie de qualité incluse"],
}

const CHOICE = {
  de: { privat: "Privatkunden", gewerbe: "Gewerbekunden" },
  en: { privat: "Private customers", gewerbe: "Business customers" },
  fr: { privat: "Particuliers", gewerbe: "Entreprises" },
}

const TEXT = {
  de: {
    neutral: {
      badge: "Gebäudereinigung in Luxemburg, Trier & Bitburg",
      heading: "Gebäudereinigung,",
      headingAccent: "die hält, was sie verspricht.",
      body: "Für Privathaushalte und Betriebe in Luxemburg, Trier und Bitburg.",
      primary: "Ich bin …",
      imageAlt: "Moderne Glasfassade eines Bürogebäudes in blauem Licht",
    },
    privat: {
      badge: "Reinigung für Hausbesitzer & Mieter",
      heading: "Fenster, Fassade, Terrasse –",
      headingAccent: "wieder wie neu.",
      body: "Für Ihr Haus in Luxemburg, Trier und Bitburg – mit Festpreis vorab.",
      primary: "Kostenloses Angebot anfordern",
      secondary: "Preis berechnen",
      other: "Sie suchen eine Reinigung für Ihren Betrieb?",
      otherLink: "Zu den Gewerbekunden",
      imageAlt: "Gepflegtes Einfamilienhaus mit gereinigter Fassade",
    },
    gewerbe: {
      badge: "Reinigung für Betriebe & Hausverwaltungen",
      heading: "Gebäudereinigung,",
      headingAccent: "die den Betrieb nicht stört.",
      body: "Für Büros, Praxen, Handel und Industrie in Luxemburg, Trier und Bitburg.",
      primary: "Besichtigung anfragen",
      secondary: "Preis berechnen",
      other: "Sie suchen eine Reinigung für Ihr Zuhause?",
      otherLink: "Zu den Privatkunden",
      imageAlt: "Moderne Glasfassade eines Bürogebäudes in blauem Licht",
    },
  },
  en: {
    neutral: {
      badge: "Building cleaning in Luxembourg, Trier & Bitburg",
      heading: "Building cleaning",
      headingAccent: "that keeps its promises.",
      body: "For households and businesses in Luxembourg, Trier and Bitburg.",
      primary: "I am …",
      imageAlt: "Modern glass facade of an office building in blue light",
    },
    privat: {
      badge: "Cleaning for homeowners & tenants",
      heading: "Windows, facade, terrace –",
      headingAccent: "like new again.",
      body: "For your home in Luxembourg, Trier and Bitburg – with a fixed price upfront.",
      primary: "Request a free quote",
      secondary: "Calculate price",
      other: "Looking for cleaning for your business?",
      otherLink: "Go to business customers",
      imageAlt: "Well-kept family home with a cleaned facade",
    },
    gewerbe: {
      badge: "Cleaning for businesses & property managers",
      heading: "Building cleaning",
      headingAccent: "that doesn't disrupt operations.",
      body: "For offices, practices, retail and industry in Luxembourg, Trier and Bitburg.",
      primary: "Request a site visit",
      secondary: "Calculate price",
      other: "Looking for cleaning for your home?",
      otherLink: "Go to private customers",
      imageAlt: "Modern glass facade of an office building in blue light",
    },
  },
  fr: {
    neutral: {
      badge: "Nettoyage de bâtiments à Luxembourg, Trèves et Bitburg",
      heading: "Un nettoyage de bâtiments",
      headingAccent: "qui tient parole.",
      body: "Pour particuliers et entreprises à Luxembourg, Trèves et Bitburg.",
      primary: "Je suis …",
      imageAlt: "Façade vitrée moderne d'un immeuble de bureaux dans une lumière bleue",
    },
    privat: {
      badge: "Nettoyage pour propriétaires et locataires",
      heading: "Vitres, façade, terrasse –",
      headingAccent: "comme neuves.",
      body: "Pour votre maison à Luxembourg, Trèves et Bitburg – avec prix ferme à l'avance.",
      primary: "Demander un devis gratuit",
      secondary: "Calculer le prix",
      other: "Vous cherchez un nettoyage pour votre entreprise ?",
      otherLink: "Vers les entreprises",
      imageAlt: "Maison individuelle soignée avec façade nettoyée",
    },
    gewerbe: {
      badge: "Nettoyage pour entreprises et syndics",
      heading: "Un nettoyage de bâtiments",
      headingAccent: "qui ne gêne pas l'activité.",
      body: "Pour bureaux, cabinets, commerces et industrie à Luxembourg, Trèves et Bitburg.",
      primary: "Demander une visite",
      secondary: "Calculer le prix",
      other: "Vous cherchez un nettoyage pour votre domicile ?",
      otherLink: "Vers les particuliers",
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
  const audienceCopy = audience ? TEXT[locale][audience] : null
  const otherAudiencePath = audience === "privat" ? "/gewerbekunden" : "/privatkunden"

  return (
    <section className="relative flex min-h-[80vh] flex-col overflow-hidden pt-20 lg:min-h-[44rem] lg:pt-24">
      <Image
        src={HERO_IMAGES[key]}
        alt={copy.imageAlt}
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

          <h1 className="mb-4 text-balance font-display text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-white sm:mb-6 sm:text-4xl lg:text-[2.75rem]">
            <span className="font-extrabold">{copy.heading}</span>
            <br />
            <span className="font-medium">{copy.headingAccent}</span>
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-pretty text-base leading-relaxed text-white/90 sm:mb-8 sm:text-lg lg:mx-0">
            {copy.body}
          </p>

          {audienceCopy ? (
            <>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild size="lg" className="group w-full rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal sm:w-auto">
                  <a href="#kontakt" className="cursor-pointer">
                    {audienceCopy.primary}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white sm:w-auto">
                  <Link href="/angebot" className="cursor-pointer">
                    {audienceCopy.secondary}
                  </Link>
                </Button>
              </div>
              <p className="mt-5 text-sm text-white/75">
                {audienceCopy.other}{" "}
                <Link href={otherAudiencePath} className="font-semibold text-white underline underline-offset-4 hover:text-brand-sky">
                  {audienceCopy.otherLink}
                </Link>
              </p>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild size="lg" className="group w-full rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal sm:w-auto">
                <Link href="/privatkunden" className="cursor-pointer">
                  {CHOICE[locale].privat}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group w-full rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white sm:w-auto">
                <Link href="/gewerbekunden" className="cursor-pointer">
                  {CHOICE[locale].gewerbe}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
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
