import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, BadgeCheck, Sparkles } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

interface QuoteBannerProps {
  /** Optional service slug to preselect in the wizard */
  slug?: string
  /** Optional service title to personalize the copy */
  serviceTitle?: string
  /** Optional CTA target. Defaults to the standalone /angebot page. */
  ctaHref?: string
  locale?: Locale
}

const TEXT = {
  de: {
    free: "Kostenlos & unverbindlich",
    freeShort: "Unverbindlich & kostenlos",
    eyebrow: "2 Minuten, kostenlos & unverbindlich",
    headingFor: "Kostenloses Angebot für",
    heading: "Berechnen Sie Ihr kostenloses Angebot",
    body: "In nur wenigen Schritten zu Ihrem unverbindlichen Richtpreis - inklusive Mengenrabatten für regelmäßige Reinigung.",
    fast: "In 2 Minuten erledigt",
    instant: "Sofortige Preisschätzung",
    calculator: "Preisrechner",
    cta: "Preis sofort berechnen",
    ctaSecondary: "Beratungstermin vereinbaren",
  },
  en: {
    free: "Free & non-binding",
    freeShort: "Non-binding & free",
    eyebrow: "2 minutes, free & non-binding",
    headingFor: "Free Quote for",
    heading: "Calculate Your Free Quote",
    body: "Get your non-binding estimate in just a few steps - including volume discounts for regular cleaning.",
    fast: "Done in 2 minutes",
    instant: "Instant price estimate",
    calculator: "Price Calculator",
    cta: "Calculate Price Now",
    ctaSecondary: "Book a Consultation",
  },
}

export function QuoteBanner({ slug, serviceTitle, ctaHref, locale = "de" }: QuoteBannerProps) {
  const angebot = localizeHref("/angebot", locale)
  const href = ctaHref ?? (slug ? `${angebot}?leistung=${slug}` : angebot)
  const t = TEXT[locale]

  const featured = Boolean(serviceTitle)

  if (featured) {
    return (
      <section className="px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue px-8 py-14 shadow-2xl shadow-brand-blue/30 ring-1 ring-brand-blue/20 sm:px-16 sm:py-20">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-teal/40 blur-3xl animate-float-slow" />
            <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-float" />

            <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-base font-bold text-brand-blue shadow-sm">
                  <Sparkles className="h-5 w-5" />
                  {t.free}
                </span>
                <h2 className="text-balance font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t.headingFor}{" "}
                  <span className="text-brand-navy">{serviceTitle}</span>
                </h2>
                <p className="mt-5 text-pretty text-lg text-white/90">{t.body}</p>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-base text-white/90">
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    {t.fast}
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5" />
                    {t.instant}
                  </span>
                </div>
              </div>

              <Button
                asChild
                size="lg"
                className="group h-16 shrink-0 rounded-full bg-white px-10 text-lg font-bold text-brand-blue shadow-xl ring-4 ring-white/30 transition-transform hover:scale-105 hover:bg-brand-mint"
              >
                <Link href={href} className="cursor-pointer">
                  {t.cta}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28 -mt-px">
      <Image
        src="/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif"
        alt="Gepflegte Natursteinterrasse als Hintergrund"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-navy/75" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="text-sm font-bold uppercase tracking-wide text-brand-sky">{t.eyebrow}</span>
        <h2 className="mt-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t.heading}
        </h2>
        <p className="mt-4 text-pretty text-base text-white/85 sm:text-lg">{t.body}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group w-full rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105 hover:bg-brand-teal sm:w-auto"
          >
            <Link href="/stein-angebot" className="cursor-pointer">
              {t.calculator}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-2 border-white/60 bg-transparent px-8 text-white transition-colors hover:bg-white hover:text-brand-navy sm:w-auto"
          >
            <Link href={href} className="cursor-pointer">
              {t.cta}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
