import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Sparkles, ArrowRight, Calculator } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    badge: "Gewerbliche Reinigung vom Profi",
    heading: "Strahlend sauber.",
    headingAccent: "Garantiert.",
    body: "Von der Industriereinigung bis zur Fassadenpflege: maßgeschneiderte Reinigungslösungen für Unternehmen in Luxemburg, Trier, Bitburg und der Region.",
    activeIn: "Aktiv in Luxemburg, Trier, Bitburg & Region",
    consult: "Kostenlose Beratung",
    quote: "Kostenloses Angebot",
  },
  en: {
    badge: "Commercial Cleaning by Professionals",
    heading: "Sparkling clean.",
    headingAccent: "Guaranteed.",
    body: "From industrial cleaning to facade care: tailored cleaning solutions for businesses in Luxembourg, Trier, Bitburg and the surrounding region.",
    activeIn: "Active in Luxembourg, Trier, Bitburg & the region",
    consult: "Free Consultation",
    quote: "Free Quote",
  },
}

export function HeroSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="relative min-h-[92vh] bg-brand-navy pt-20 flex items-center overflow-hidden">
      {/* Colorful gradient backdrop (analogous navy -> teal -> blue) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-teal/40 to-brand-blue/30" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl animate-float" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium text-brand-sky mb-8 ring-1 ring-white/15" style={{ animationDelay: "0.05s" }}>
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </span>

          <h1 className="animate-fade-up font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 text-balance" style={{ animationDelay: "0.15s" }}>
            {t.heading}{" "}
            <span className="text-brand-sky">{t.headingAccent}</span>
          </h1>

          <p className="animate-fade-up text-white/70 text-lg max-w-lg mb-8 leading-relaxed" style={{ animationDelay: "0.3s" }}>
            {t.body}
          </p>

          <div className="animate-fade-up flex items-center gap-2.5 text-lg sm:text-xl font-semibold text-brand-sky mb-10" style={{ animationDelay: "0.42s" }}>
            <MapPin className="h-6 w-6 text-brand-sky" />
            <span>{t.activeIn}</span>
          </div>

          <div className="animate-fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.54s" }}>
            <Button asChild size="lg" className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105">
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.consult}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 rounded-full px-8">
              <Link href={localizeHref("/angebot", locale)} className="cursor-pointer">
                <Calculator className="h-4 w-4" />
                {t.quote}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mascot - Bottom Right */}
      <div className="absolute bottom-0 right-0 lg:right-16 opacity-30 lg:opacity-100 pointer-events-none">
        <Image
          src="/images/mascot.png"
          alt="Blitzeblank Maskottchen"
          width={420}
          height={420}
          className="h-64 lg:h-[26rem] w-auto drop-shadow-2xl animate-float"
          priority
        />
      </div>
    </section>
  )
}
