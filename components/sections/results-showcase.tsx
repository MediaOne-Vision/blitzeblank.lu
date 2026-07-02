import Link from "next/link"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const showcases = [
  {
    beforeSrc: "/images/leistungen/fenster-verschmutzt-vor-glasreinigung.avif",
    afterSrc: "/images/leistungen/fenster-sauber-nach-glasreinigung.avif",
    beforeAlt: "Verschmutztes Fenster mit Schlieren vor der Glasreinigung",
    afterAlt: "Streifenfrei gereinigtes Fenster nach der Glasreinigung",
    caption: "Fensterreinigung",
  },
  {
    beforeSrc: "/images/leistungen/gartenweg-pflaster-vor-reinigung.avif",
    afterSrc: "/images/leistungen/gartenweg-kopfsteinpflaster-ergebnis.avif",
    beforeAlt: "Veralgter Gartenweg aus Pflastersteinen vor der Reinigung",
    afterAlt: "Gereinigter Gartenweg aus Kopfsteinpflaster nach der Steinreinigung",
    caption: "Steinreinigung",
  },
]

export function ResultsShowcase() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 lg:py-24">
      {/* Dekorative, weiche Farbakzente für den dunklen Auftritt */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-brand-sky/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-sky">Vorher / Nachher</p>
          <h2 className="text-balance font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
            Ergebnisse, die für sich sprechen
          </h2>
          <p className="mt-4 text-white/70 text-pretty leading-relaxed">
            Ziehen Sie den Regler und sehen Sie selbst, welchen Unterschied unsere
            professionelle Reinigung macht.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {showcases.map((item) => (
            <BeforeAfterSlider
              key={item.afterSrc}
              beforeSrc={item.beforeSrc}
              afterSrc={item.afterSrc}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
              caption={item.caption}
              captionClassName="text-white/85"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-white px-8 text-brand-navy hover:bg-brand-sky">
            <Link href="/leistungen" className="cursor-pointer">
              Alle Leistungen entdecken
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
