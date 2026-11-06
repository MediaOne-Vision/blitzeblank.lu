"use client"

import Link from "@/components/audience-link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getServiceMedia } from "@/lib/service-media"
import { ArrowRight, ArrowUpRight, Calculator, CheckCircle2, Home, Building2 } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"
import { getLocalizedServices } from "@/lib/services"
import { extraServiceContent } from "@/lib/extra-service-content"
import { getAudienceLabel, getLocationCountry, type Audience } from "@/lib/locations"
import { useAudience } from "@/components/audience-provider"

const TEXT = {
  de: {
    eyebrow: "Leistungen",
    heading: "Reinigung für jeden Anspruch",
    intro:
      "Acht Leistungsbereiche für Privat- und Gewerbekunden in Luxemburg und Deutschland. Nur die Industriereinigung richtet sich ausschließlich an Gewerbekunden, die Treppenhausreinigung gibt es derzeit nur in Deutschland.",
    onlyIn: "nur in",
    locHeading: "Wo wir arbeiten",
    learnMore: "Mehr erfahren",
    priceCalc: "Preis berechnen",
    ctaHeading: "Nicht sicher, welche Leistung Sie benötigen?",
    ctaBody:
      "Kontaktieren Sie uns für eine kostenlose Beratung. Wir analysieren Ihre Anforderungen und empfehlen die optimale Lösung für Sie.",
    ctaButton: "Kostenlose Beratung anfragen",
    ctaCalcHeading: "Lieber sofort einen Preis sehen?",
    ctaCalcBody: "Nutzen Sie unseren Online-Rechner und erhalten Sie in 2 Minuten eine unverbindliche Preisschätzung.",
    ctaCalcButton: "Angebot online erstellen",
    ctaStoneButton: "Steinpflege-Rechner",
  },
  en: {
    eyebrow: "Services",
    heading: "Cleaning for Every Need",
    intro:
      "Eight service areas for private and business customers in Luxembourg and Germany. Only industrial cleaning is exclusively for business customers, and stairwell cleaning is currently available in Germany only.",
    onlyIn: "only in",
    locHeading: "Where we work",
    learnMore: "Learn More",
    priceCalc: "Calculate Price",
    ctaHeading: "Not sure which service you need?",
    ctaBody:
      "Contact us for a free consultation. We'll analyze your requirements and recommend the optimal solution for you.",
    ctaButton: "Request Free Consultation",
    ctaCalcHeading: "Prefer to see a price right away?",
    ctaCalcBody: "Use our online calculator and get a non-binding price estimate in 2 minutes.",
    ctaCalcButton: "Create an Offer Online",
    ctaStoneButton: "Stone Care Calculator",
  },
  fr: {
    eyebrow: "Prestations",
    heading: "Un nettoyage pour chaque exigence",
    intro:
      "Huit domaines de prestations pour particuliers et entreprises au Luxembourg et en Allemagne. Seul le nettoyage industriel est réservé aux entreprises, et le nettoyage de cages d'escalier n'est actuellement proposé qu'en Allemagne.",
    onlyIn: "uniquement en",
    locHeading: "Où nous intervenons",
    learnMore: "En savoir plus",
    priceCalc: "Calculer le prix",
    ctaHeading: "Vous ne savez pas quelle prestation choisir ?",
    ctaBody:
      "Contactez-nous pour un conseil gratuit. Nous analysons vos besoins et vous recommandons la solution optimale.",
    ctaButton: "Demander un conseil gratuit",
    ctaCalcHeading: "Vous préférez voir un prix tout de suite ?",
    ctaCalcBody: "Utilisez notre calculateur en ligne et obtenez en 2 minutes une estimation de prix sans engagement.",
    ctaCalcButton: "Créer un devis en ligne",
    ctaStoneButton: "Calculateur d'entretien de pierre",
  },
}

export function LeistungenContent({ locale = "de" }: { locale?: Locale }) {
  const { audience } = useAudience()
  const allServices = getLocalizedServices(locale)
  const services = audience ? allServices.filter((s) => s.audiences.includes(audience)) : allServices
  const t = TEXT[locale]
  const groups: { id: Audience; anchor: string; icon: typeof Home }[] = [
    { id: "privat" as const, anchor: "privatkunden", icon: Home },
    { id: "gewerbe" as const, anchor: "gewerbekunden", icon: Building2 },
  ].filter((g) => !audience || g.id === audience)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-sky">{t.eyebrow}</p>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t.heading}
            </h1>
            <p className="text-lg text-white/75 text-pretty">{t.intro}</p>
          </div>
        </section>

        {/* Overview by audience */}
        <section className="bg-brand-mint py-12 lg:py-16">
          <div className={`mx-auto grid max-w-6xl gap-6 px-6 ${groups.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}>
            {groups.map(({ id, anchor, icon: Icon }) => (
              <div key={id} id={anchor} className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/5">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="font-display text-xl font-extrabold text-brand-navy">{getAudienceLabel(id, locale)}</h2>
                </div>
                <ul className="space-y-2.5">
                  {services
                    .filter((s) => s.audiences.includes(id))
                    .map((s) => (
                      <li key={s.slug}>
                        <Link href={s.href} className="flex flex-wrap items-center gap-x-2 text-sm font-semibold text-brand-navy hover:text-brand-blue">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />
                          {s.title}
                          {s.locations.length === 1 && (
                            <span className="text-xs font-medium text-neutral-500">
                              ({t.onlyIn} {getLocationCountry(s.locations[0], locale)})
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-8">
              {services.map((service, index) => {
                const media = getServiceMedia(service.slug)
                return (
                  <div
                    key={index}
                    className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl lg:grid-cols-2"
                  >
                    {/* Image */}
                    <div
                      className={`relative h-56 overflow-hidden lg:h-auto ${index % 2 === 1 ? "lg:order-last" : ""}`}
                    >
                      <Image
                        src={media?.hero?.src ?? `/placeholder.svg?height=600&width=800&query=${service.imageQuery}`}
                        alt={media?.hero?.alt ?? service.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue shadow-lg">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-8 lg:p-10">
                      <h2 className="mb-3 font-display text-2xl font-extrabold text-brand-navy lg:text-3xl">
                        {service.title}
                      </h2>
                      {(!audience || service.locations.length === 1) && (
                        <ul className="mb-4 flex flex-wrap gap-2">
                          {!audience &&
                            service.audiences.map((a) => (
                              <li key={a} className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold text-brand-navy">
                                {getAudienceLabel(a, locale)}
                              </li>
                            ))}
                          {service.locations.length === 1 &&
                            service.locations.map((l) => (
                              <li key={l} className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-semibold text-brand-blue">
                                {t.onlyIn} {getLocationCountry(l, locale)}
                              </li>
                            ))}
                        </ul>
                      )}
                      <p className="mb-5 leading-relaxed text-neutral-600 text-pretty">{service.shortDescription}</p>
                      <ul className="mb-6 grid gap-2">
                        {service.items.map((item) => (
                          <li key={item.label} className="flex items-start gap-2 text-sm text-neutral-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                            <span>
                              {item.href ? (
                                <Link href={item.href} className="font-semibold text-brand-navy hover:text-brand-blue">
                                  {item.label}
                                </Link>
                              ) : (
                                item.label
                              )}
                              {item.locations && item.locations.length === 1 && (
                                <span className="ml-1.5 text-xs font-medium text-neutral-500">
                                  ({t.onlyIn} {getLocationCountry(item.locations[0], locale)})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          asChild
                          className="group/btn w-fit bg-brand-blue text-white hover:bg-brand-teal rounded-full px-6 shadow-lg shadow-brand-blue/30"
                        >
                          <Link href={service.href} className="cursor-pointer">
                            {t.learnMore}
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          className="group/btn w-fit rounded-full border-brand-navy/20 px-6 text-brand-navy hover:bg-brand-navy hover:text-white"
                        >
                          <Link
                            href={
                              service.slug === "steinreinigung"
                                ? "/stein-angebot"
                                : service.slug in extraServiceContent || service.slug === "solarreinigung"
                                  ? localizeHref("/kontakt", locale)
                                  : `${localizeHref("/angebot", locale)}?leistung=${service.slug}`
                            }
                            className="cursor-pointer"
                          >
                            <Calculator className="h-4 w-4" />
                            {t.priceCalc}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy">
              {t.ctaHeading}
            </h2>
            <p className="mb-8 text-neutral-600 text-pretty">{t.ctaBody}</p>
            <Button
              asChild
              size="lg"
              className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/30"
            >
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Calculator CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center lg:py-20">
              <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {t.ctaCalcHeading}
                </h2>
                <p className="mb-8 text-white/75 text-pretty">{t.ctaCalcBody}</p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105"
                  >
                    <Link href={localizeHref("/angebot", locale)} className="cursor-pointer">
                      <Calculator className="h-4 w-4" />
                      {t.ctaCalcButton}
                    </Link>
                  </Button>
                  {locale === "de" && (
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/5 text-white hover:bg-white/15 rounded-full px-8"
                    >
                      <Link href="/stein-angebot" className="cursor-pointer">
                        {t.ctaStoneButton}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}
