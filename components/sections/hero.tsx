import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    badge: "Gewerbliche Reinigung vom Profi",
    heading: "Strahlend sauber.",
    headingAccent: "Garantiert.",
    bodyBefore: "Von der Industriereinigung bis zur Fassadenpflege: maßgeschneiderte Reinigungslösungen für Unternehmen in",
    regions: "Luxemburg, Trier, Bitburg und der Region.",
    consult: "Kostenlose Beratung",
    quote: "Angebot online erstellen",
    trustValues: ["Antwort innerhalb von 24 Stunden", "Kostenlose Besichtigung vor Ort", "Transparente, faire Preise", "Qualitätsgarantie inklusive"],
  },
  en: {
    badge: "Commercial Cleaning by Professionals",
    heading: "Sparkling clean.",
    headingAccent: "Guaranteed.",
    bodyBefore: "From industrial cleaning to facade care: tailored cleaning solutions for businesses in",
    regions: "Luxembourg, Trier, Bitburg and the surrounding region.",
    consult: "Free Consultation",
    quote: "Create an offer online",
    trustValues: ["We reply within 24 hours", "Free on-site visit", "Transparent, fair pricing", "Quality guarantee included"],
  },
}

export function HeroSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="relative flex min-h-[85vh] flex-col overflow-hidden bg-gradient-to-r from-[#103f54] via-[#216886] to-[#4ca8df] pt-14 lg:min-h-[56rem] lg:pt-24">
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-6 px-6 py-4 sm:px-8 sm:py-6 lg:flex-row lg:items-start lg:justify-between lg:gap-8 lg:px-16 lg:py-16 xl:px-24">
        <div className="min-w-0 max-w-2xl text-center lg:flex-1 lg:text-left">
          <span className="mb-4 block text-sm font-medium uppercase tracking-[0.08em] text-brand-sky sm:mb-8">
            {t.badge}
          </span>

          <h1 className="mb-4 text-balance font-display text-6xl font-extrabold leading-[1.02] tracking-tight text-white sm:mb-8 sm:text-6xl sm:leading-[0.98] md:text-7xl lg:text-[4.25rem]">
            <span className="font-extrabold">{t.heading}</span><br />
            <span className="font-medium">{t.headingAccent}</span>
          </h1>

          <p className="mx-auto mb-6 max-w-xl text-balance text-lg leading-relaxed text-white sm:mb-10 sm:text-lg lg:mx-0 lg:text-xl">
            {t.bodyBefore}{" "}
            <strong className="font-extrabold">{t.regions}</strong>
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button asChild size="lg" className="group w-full rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal sm:w-auto">
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.consult}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white sm:w-auto">
              <Link href={localizeHref("/angebot", locale)} className="cursor-pointer">
                {t.quote}
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto shrink-0 self-center animate-float lg:mx-0 lg:self-end">
          <Image
            src="/images/mascot.png"
            alt="Blitzeblank Maskottchen"
            width={560}
            height={560}
            className="h-40 w-auto sm:h-48 lg:h-64 xl:h-80 2xl:h-96"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/10">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-center text-sm font-medium text-white/85 sm:px-8 lg:justify-between lg:px-16 xl:px-24">
          {t.trustValues.map((value) => (
            <li key={value} className="text-balance">
              {value}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
