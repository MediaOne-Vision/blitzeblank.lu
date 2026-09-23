import Link from "next/link"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const SHOWCASES = {
  de: [
    {
      beforeSrc: "/images/leistungen/fensterreinigung-terrassenueberdachung-glasdach-verschmutzt-vorher.avif",
      afterSrc: "/images/leistungen/fensterreinigung-terrassenueberdachung-glasdach-gereinigt-nachher.avif",
      beforeAlt: "Verschmutztes Glasdach einer Terrassenüberdachung mit Wasserflecken vor der Reinigung",
      afterAlt: "Klares, streifenfreies Glasdach einer Terrassenüberdachung nach der Fensterreinigung",
      caption: "Fensterreinigung",
    },
    {
      beforeSrc: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-veralgt-vorher.avif",
      afterSrc: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
      beforeAlt: "Veralgte und vermooste Naturstein-Terrasse aus Polygonalplatten vor der Reinigung",
      afterAlt: "Saubere Naturstein-Terrasse aus Polygonalplatten nach der Steinreinigung",
      caption: "Steinreinigung",
    },
  ],
  en: [
    {
      beforeSrc: "/images/leistungen/fensterreinigung-terrassenueberdachung-glasdach-verschmutzt-vorher.avif",
      afterSrc: "/images/leistungen/fensterreinigung-terrassenueberdachung-glasdach-gereinigt-nachher.avif",
      beforeAlt: "Dirty glass roof of a patio cover with water stains before cleaning",
      afterAlt: "Clear, streak-free glass roof of a patio cover after window cleaning",
      caption: "Window Cleaning",
    },
    {
      beforeSrc: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-veralgt-vorher.avif",
      afterSrc: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
      beforeAlt: "Algae-covered and mossy natural stone terrace made of polygonal slabs before cleaning",
      afterAlt: "Clean natural stone terrace made of polygonal slabs after stone cleaning",
      caption: "Stone Cleaning",
    },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Vorher / Nachher",
    heading: "Ergebnisse, die für sich sprechen",
    body: "Ziehen Sie den Regler und sehen Sie selbst, welchen Unterschied unsere professionelle Reinigung macht.",
    cta: "Alle Leistungen entdecken",
  },
  en: {
    eyebrow: "Before / After",
    heading: "Results That Speak for Themselves",
    body: "Drag the slider and see for yourself what a difference our professional cleaning makes.",
    cta: "Discover All Services",
  },
}

export function ResultsShowcase({ locale = "de" }: { locale?: Locale }) {
  const showcases = SHOWCASES[locale]
  const t = TEXT[locale]
  return (
    <section className="bg-brand-navy py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-sky">{t.eyebrow}</p>
          <h2 className="text-balance font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-white">
            {t.heading}
          </h2>
          <p className="mt-4 text-white/70 text-pretty leading-relaxed">{t.body}</p>
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
              captionClassName="text-white/70"
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="rounded-full bg-brand-blue px-8 text-white hover:bg-brand-teal">
            <Link href={localizeHref("/leistungen", locale)} className="cursor-pointer">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
