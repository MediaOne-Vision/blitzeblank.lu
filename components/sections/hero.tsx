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
  },
  en: {
    badge: "Commercial Cleaning by Professionals",
    heading: "Sparkling clean.",
    headingAccent: "Guaranteed.",
    bodyBefore: "From industrial cleaning to facade care: tailored cleaning solutions for businesses in",
    regions: "Luxembourg, Trier, Bitburg and the surrounding region.",
    consult: "Free Consultation",
    quote: "Create an offer online",
  },
}

export function HeroSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-gradient-to-r from-[#103f54] via-[#216886] to-[#4ca8df] pt-20">
      <div className="relative z-10 flex w-full flex-col items-center gap-12 px-6 py-20 lg:min-h-[44.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-16 lg:py-24 xl:px-24">
        <div className="min-w-0 max-w-2xl lg:flex-1">
          <span className="mb-8 block text-sm font-medium uppercase tracking-[0.08em] text-brand-sky">
            {t.badge}
          </span>

          <h1 className="mb-8 text-balance font-display text-6xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-[4.25rem]">
            <span className="whitespace-nowrap font-extrabold">{t.heading}</span><br />
            <span className="font-medium">{t.headingAccent}</span>
          </h1>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white sm:text-xl">
            {t.bodyBefore}{" "}
            <strong className="font-extrabold">{t.regions}</strong>
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal">
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.consult}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white">
              <Link href={localizeHref("/angebot", locale)} className="cursor-pointer">
                {t.quote}
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden shrink-0 xl:block">
          <Image
            src="/images/mascot.png"
            alt="Blitzeblank Maskottchen"
            width={560}
            height={560}
            className="h-[22rem] w-auto 2xl:h-[26rem]"
            priority
          />
        </div>
      </div>
    </section>
  )
}
