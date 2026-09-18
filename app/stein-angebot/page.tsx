import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StoneOfferWizard } from "@/components/stone-offer-wizard"
import { Mountain } from "lucide-react"

export const metadata: Metadata = {
  title: "Steinpflege-Rechner | Blitzeblank - Professionelle Reinigung",
  description:
    "Konfigurieren Sie Schritt für Schritt Ihre Pflasterflächen- und Steinpflege: Fläche, Fuge, Steinfarbe, Schutz und thermische Unkrautentfernung - kostenlos und unverbindlich.",
  alternates: {
    canonical: "https://blitzeblank.lu/stein-angebot",
  },
}

export default function SteinAngebotPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15 backdrop-blur">
              <Mountain className="h-4 w-4" />
              Pflasterflächen- &amp; Steinpflege
            </span>
            <h1 className="mb-4 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Ihr Steinpflege-Rechner
            </h1>
            <p className="text-pretty text-lg text-white/75">
              Konfigurieren Sie Schritt für Schritt Ihre Pflasterflächen- und Steinpflege - von der Fläche über die
              passende Fuge und Steinfarbe bis zu Schutz und thermischer Unkrautentfernung. Kostenlos und
              unverbindlich.
            </p>
          </div>
        </section>

        {/* Wizard */}
        <section className="bg-brand-mint py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <StoneOfferWizard />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
