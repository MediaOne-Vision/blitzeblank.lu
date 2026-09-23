import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getServiceMedia } from "@/lib/service-media"
import { ArrowRight, ArrowUpRight, Calculator, Factory, Grid3X3, Mountain, Building2, CheckCircle2 } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const SERVICES = {
  de: [
    {
      icon: Factory,
      title: "Industriereinigung",
      description:
        "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
      features: ["Produktionshallen", "Lagerräume", "Werkstätten", "Maschinen & Anlagen"],
      href: "/leistungen/industriereinigung",
      slug: "industriereinigung",
      imageQuery: "industrial+factory+production+hall+clean+polished+floor",
    },
    {
      icon: Grid3X3,
      title: "Fensterreinigung",
      description: "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
      features: ["Bürogebäude", "Schaufenster", "Glasfassaden", "Industrieverglasung"],
      href: "/leistungen/fensterreinigung",
      slug: "fensterreinigung",
      imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
    },
    {
      icon: Building2,
      title: "Fassadenreinigung",
      description:
        "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
      features: ["Putzfassaden", "Klinkerfassaden", "Metallfassaden", "Glasfassaden"],
      href: "/leistungen/fassadenreinigung",
      slug: "fassadenreinigung",
      imageQuery: "modern+building+facade+exterior+cleaning+architecture",
    },
    {
      icon: Mountain,
      title: "Steinreinigung",
      description: "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
      features: ["Naturstein", "Pflasterflächen", "Terrassen", "Außentreppen"],
      href: "/leistungen/steinreinigung",
      slug: "steinreinigung",
      imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
    },
  ],
  en: [
    {
      icon: Factory,
      title: "Industrial Cleaning",
      description:
        "Professional cleaning of production halls, warehouses and industrial facilities to the highest standards.",
      features: ["Production Halls", "Warehouses", "Workshops", "Machines & Equipment"],
      href: "/leistungen/industriereinigung",
      slug: "industriereinigung",
      imageQuery: "industrial+factory+production+hall+clean+polished+floor",
    },
    {
      icon: Grid3X3,
      title: "Window Cleaning",
      description: "Streak-free glass cleaning for office buildings, shops and industrial sites of any size.",
      features: ["Office Buildings", "Shop Windows", "Glass Facades", "Industrial Glazing"],
      href: "/leistungen/fensterreinigung",
      slug: "fensterreinigung",
      imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
    },
    {
      icon: Building2,
      title: "Facade Cleaning",
      description:
        "Professional exterior cleaning for building facades of all kinds - from office buildings to industrial sites.",
      features: ["Plaster Facades", "Brick Facades", "Metal Facades", "Glass Facades"],
      href: "/leistungen/fassadenreinigung",
      slug: "fassadenreinigung",
      imageQuery: "modern+building+facade+exterior+cleaning+architecture",
    },
    {
      icon: Mountain,
      title: "Stone Cleaning",
      description: "Expert care and cleaning of natural stone, paving, terraces and outdoor areas.",
      features: ["Natural Stone", "Paving", "Terraces", "Outdoor Stairs"],
      href: "/leistungen/steinreinigung",
      slug: "steinreinigung",
      imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
    },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Leistungen",
    heading: "Reinigung für jeden Anspruch",
    intro:
      "Von der Industriereinigung bis zur Fassadenpflege - wir bieten professionelle Reinigungslösungen für jeden Bedarf. Entdecken Sie unser umfassendes Angebot.",
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
      "From industrial cleaning to facade care - we offer professional cleaning solutions for every need. Discover our full range of services.",
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
}

export function LeistungenContent({ locale = "de" }: { locale?: Locale }) {
  const services = SERVICES[locale]
  const t = TEXT[locale]

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
                      <p className="mb-5 leading-relaxed text-neutral-600 text-pretty">{service.description}</p>
                      <ul className="mb-6 grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          asChild
                          className="group/btn w-fit bg-brand-blue text-white hover:bg-brand-teal rounded-full px-6 shadow-lg shadow-brand-blue/30"
                        >
                          <Link href={localizeHref(service.href, locale)} className="cursor-pointer">
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
