"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/reveal"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const SERVICES = {
  de: [
    {
      title: "Industriereinigung",
      href: "/leistungen/industriereinigung",
      image: "/images/leistungen/industriereinigung-reinraum-industriesauger-skyvac.avif",
      imageAlt: "Mitarbeiter im Schutzanzug reinigt einen industriellen Doppelboden mit Industriesauger",
      bullets: ["Hallenboden", "Decken & Wände", "Maschinen", "Lagerräume", "Lüftungen"],
    },
    {
      title: "Fensterreinigung",
      href: "/leistungen/fensterreinigung",
      image: "/images/leistungen/fensterreinigung-wintergarten-glasanbau-gereinigt.avif",
      imageAlt: "Gereinigter Glas-Wintergarten mit klaren Glasflächen",
      bullets: ["Bürofenster", "Schaufenster", "Glasfassaden", "Wintergärten", "Solaranlagen"],
    },
    {
      title: "Fassadenreinigung",
      href: "/leistungen/fassadenreinigung",
      image: "/images/leistungen/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif",
      imageAlt: "Saubere, helle Mehrfamilienhaus-Fassade nach der Fassadenreinigung",
      bullets: ["Putzfassaden", "Klinkerfassaden", "Metallfassaden", "Glasfassaden", "Betonfassaden"],
    },
    {
      title: "Steinreinigung",
      href: "/leistungen/steinreinigung",
      image: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
      imageAlt: "Gereinigte Naturstein-Terrasse mit Polygonalplatten",
      bullets: ["Naturstein", "Pflaster", "Terrassen", "Treppen", "Mauerwerk"],
    },
  ],
  en: [
    {
      title: "Industrial Cleaning",
      href: "/leistungen/industriereinigung",
      image: "/images/leistungen/industriereinigung-reinraum-industriesauger-skyvac.avif",
      imageAlt: "Employee in protective suit cleaning an industrial raised floor with an industrial vacuum",
      bullets: ["Hall floors", "Ceilings & walls", "Machinery", "Storage areas", "Ventilation"],
    },
    {
      title: "Window Cleaning",
      href: "/leistungen/fensterreinigung",
      image: "/images/leistungen/fensterreinigung-wintergarten-glasanbau-gereinigt.avif",
      imageAlt: "Cleaned glass conservatory with clear glass surfaces",
      bullets: ["Office windows", "Shop windows", "Glass facades", "Conservatories", "Solar panels"],
    },
    {
      title: "Facade Cleaning",
      href: "/leistungen/fassadenreinigung",
      image: "/images/leistungen/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif",
      imageAlt: "Clean, bright multi-family house facade after facade cleaning",
      bullets: ["Rendered facades", "Brick facades", "Metal facades", "Glass facades", "Concrete facades"],
    },
    {
      title: "Stone Cleaning",
      href: "/leistungen/steinreinigung",
      image: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
      imageAlt: "Cleaned natural stone terrace with polygonal slabs",
      bullets: ["Natural stone", "Paving", "Terraces", "Steps", "Masonry"],
    },
  ],
  fr: [
    {
      title: "Nettoyage industriel",
      href: "/leistungen/industriereinigung",
      image: "/images/leistungen/industriereinigung-reinraum-industriesauger-skyvac.avif",
      imageAlt: "Employé en combinaison de protection nettoyant un faux plancher industriel avec un aspirateur industriel",
      bullets: ["Sols de halls", "Plafonds et murs", "Machines", "Entrepôts", "Ventilation"],
    },
    {
      title: "Nettoyage de vitres",
      href: "/leistungen/fensterreinigung",
      image: "/images/leistungen/fensterreinigung-wintergarten-glasanbau-gereinigt.avif",
      imageAlt: "Véranda en verre nettoyée avec des surfaces vitrées claires",
      bullets: ["Fenêtres de bureaux", "Vitrines", "Façades vitrées", "Vérandas", "Panneaux solaires"],
    },
    {
      title: "Nettoyage de façades",
      href: "/leistungen/fassadenreinigung",
      image: "/images/leistungen/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif",
      imageAlt: "Façade propre et claire d'un immeuble collectif après le nettoyage de façade",
      bullets: ["Façades crépies", "Façades en brique", "Façades métalliques", "Façades vitrées", "Façades en béton"],
    },
    {
      title: "Nettoyage de pierre",
      href: "/leistungen/steinreinigung",
      image: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
      imageAlt: "Terrasse en pierre naturelle nettoyée avec des dalles polygonales",
      bullets: ["Pierre naturelle", "Pavés", "Terrasses", "Escaliers", "Maçonnerie"],
    },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Leistungen",
    headingLine1: "Reinigung für",
    headingLine2: "jeden Anspruch.",
    viewAll: "Alle Leistungen ansehen",
    ctaText: "Entdecken Sie unser komplettes Leistungsspektrum",
  },
  en: {
    eyebrow: "Services",
    headingLine1: "Cleaning for",
    headingLine2: "every need.",
    viewAll: "View all services",
    ctaText: "Discover our full range of services",
  },
  fr: {
    eyebrow: "Prestations",
    headingLine1: "Un nettoyage pour",
    headingLine2: "chaque exigence.",
    viewAll: "Voir toutes les prestations",
    ctaText: "Découvrez toute notre gamme de prestations",
  },
}

export function ServicesOverview({ locale = "de" }: { locale?: Locale }) {
  const services = SERVICES[locale]
  const t = TEXT[locale]
  const [activeIndex, setActiveIndex] = useState(0)
  const active = services[activeIndex]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-brand-mint py-16 sm:py-20 lg:py-28">
      {/* Preload every service image up front so switching the active/open item never waits on a fresh network fetch. */}
      <div aria-hidden="true" className="sr-only">
        {services.map((service, i) => (
          <Image
            key={service.title}
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            width={1}
            height={1}
            priority={i > 0}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between mb-10 lg:mb-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">{t.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance">
              <span className="text-brand-navy">{t.headingLine1}</span>
              <br />
              <span className="text-brand-blue">{t.headingLine2}</span>
            </h2>
          </div>
          <Link
            href={localizeHref("/leistungen", locale)}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-brand-navy transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.viewAll}
            <span aria-hidden="true">&gt;</span>
          </Link>
        </Reveal>

        {/* Mobile accordion */}
        <div className="lg:hidden">
          <Reveal direction="up">
            <div className="flex flex-col">
              {services.map((service, i) => {
                const isOpen = i === openIndex
                return (
                  <div key={service.title} className={i > 0 ? "border-t border-brand-navy/10" : ""}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center gap-4 py-5 text-left cursor-pointer"
                    >
                      <span
                        className={`font-display font-extrabold tabular-nums transition-all duration-300 ${
                          isOpen ? "text-4xl text-brand-blue" : "text-3xl text-brand-navy/20"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`flex-1 font-display font-bold text-balance transition-all duration-300 ${
                          isOpen ? "text-2xl text-brand-navy" : "text-xl text-neutral-500"
                        }`}
                      >
                        {service.title}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-all duration-300 ${
                          isOpen ? "rotate-180 text-brand-blue" : "text-brand-navy/40"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <Link
                          href={localizeHref(service.href, locale)}
                          className="group relative mb-5 block aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer"
                        >
                          <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.imageAlt}
                            fill
                            sizes="100vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={i === 0}
                            loading={i === 0 ? "eager" : "lazy"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                          <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-brand-navy">
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-6">
                            <h3 className="font-display text-2xl font-bold text-white">{service.title}</h3>
                            <span className="mt-3 mb-4 block h-0.5 w-14 bg-brand-sky" />
                            <ul className="space-y-1.5">
                              {service.bullets.map((bullet) => (
                                <li key={bullet} className="text-white/85 text-sm">
                                  • {bullet}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href={localizeHref("/leistungen", locale)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-brand-navy/20 px-7 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white cursor-pointer"
            >
              {t.viewAll}
            </Link>
          </Reveal>
        </div>

        <div className="hidden lg:grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Numbered list */}
          <Reveal direction="up">
            <ol className="flex flex-col">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                return (
                  <li key={service.title} className={i > 0 ? "border-t border-brand-navy/10" : ""}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onFocus={() => setActiveIndex(i)}
                      onClick={() => setActiveIndex(i)}
                      aria-pressed={isActive}
                      className="group flex w-full items-center gap-5 py-5 text-left cursor-pointer"
                    >
                      <span
                        className={`font-display font-extrabold tabular-nums transition-all duration-300 ${
                          isActive ? "text-5xl sm:text-6xl text-brand-blue" : "text-4xl sm:text-5xl text-brand-navy/20"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span
                        className={`font-display font-bold text-balance transition-all duration-300 ${
                          isActive ? "text-2xl sm:text-3xl text-brand-navy" : "text-xl sm:text-2xl text-neutral-500"
                        }`}
                      >
                        {service.title}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <p className="mt-8 text-neutral-600 leading-relaxed max-w-sm text-balance">
              {locale === "de" ? (
                <>
                  Entdecken Sie unser
                  <br />
                  komplettes Leistungsspektrum
                </>
              ) : locale === "fr" ? (
                <>
                  Découvrez toute notre
                  <br />
                  gamme de prestations
                </>
              ) : (
                <>
                  Discover our
                  <br />
                  full range of services
                </>
              )}
            </p>
            <Link
              href={localizeHref("/leistungen", locale)}
              className="mt-5 inline-flex items-center justify-center rounded-full border border-brand-navy/20 px-7 py-3 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white cursor-pointer"
            >
              {t.viewAll}
            </Link>
          </Reveal>

          {/* Active service image panel */}
          <Reveal direction="scale" key={active.title}>
            <Link
              href={localizeHref(active.href, locale)}
              className="group relative block aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-3xl cursor-pointer"
            >
              <Image
                src={active.image || "/placeholder.svg"}
                alt={active.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={activeIndex === 0}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
              <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-brand-navy">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">{active.title}</h3>
                <span className="mt-3 mb-4 block h-0.5 w-14 bg-brand-sky" />
                <ul className="space-y-1.5">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="text-white/85 text-sm sm:text-base">
                      • {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
