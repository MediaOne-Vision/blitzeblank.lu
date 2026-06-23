import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Sparkles, ArrowRight, Calculator } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] bg-brand-navy pt-20 flex items-center overflow-hidden">
      {/* Colorful gradient backdrop (analogous navy -> teal -> blue) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-teal/40 to-brand-blue/30" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-blue/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-sky/20 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm font-medium text-brand-sky mb-8 ring-1 ring-white/15">
            <Sparkles className="h-4 w-4" />
            Gewerbliche Reinigung vom Profi
          </span>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-8 text-balance">
            Strahlend sauber.{" "}
            <span className="text-brand-sky">Garantiert.</span>
          </h1>

          <p className="text-white/70 text-lg max-w-lg mb-8 leading-relaxed">
            Von der Industriereinigung bis zur Fassadenpflege: maßgeschneiderte
            Reinigungslösungen für Unternehmen in Luxemburg und Deutschland.
          </p>

          <div className="flex items-center gap-2.5 text-lg sm:text-xl font-semibold text-brand-sky mb-10">
            <MapPin className="h-6 w-6 text-brand-sky" />
            <span>Aktiv in Luxemburg &amp; Deutschland</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105">
              <Link href="/kontakt" className="cursor-pointer">
                Kostenlose Beratung
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/15 rounded-full px-8">
              <Link href="/#preiskalkulator" className="cursor-pointer">
                <Calculator className="h-4 w-4" />
                Preis berechnen
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
          className="h-64 lg:h-[26rem] w-auto drop-shadow-2xl"
          priority
        />
      </div>
    </section>
  )
}
