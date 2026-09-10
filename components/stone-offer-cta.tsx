import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

/**
 * Cross-Sell-Banner auf der Steinreinigung-Seite: verlinkt auf den eigenständigen
 * Steinpflege-Angebotsersteller (Fugensand, Imprägnierung, Pflegeöl etc.).
 * Nur für Deutsch, da /stein-angebot bislang keine englische Fassung hat.
 */
export function StoneOfferCta() {
  return (
    <section className="px-6 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5 sm:p-10">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-mint px-4 py-1.5 text-sm font-semibold text-brand-teal">
                <Sparkles className="h-4 w-4" />
                Steinpflege-Rechner
              </span>
              <h2 className="text-balance font-display text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Ihre Pflasterfläche verdient die richtige Pflege
              </h2>
              <p className="mt-3 text-pretty text-neutral-600">
                Beantworten Sie ein paar kurze Fragen zu Ihrer Fläche und wir stellen Ihnen die passende Lösung
                zusammen - von der Fuge über den Schutz bis zur Unkrautentfernung. Kostenlos und unverbindlich.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="group shrink-0 rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105 hover:bg-brand-teal"
            >
              <Link href="/stein-angebot" className="cursor-pointer">
                Zum Steinpflege-Rechner
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
