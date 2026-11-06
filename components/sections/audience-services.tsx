import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { getLocalizedServices } from "@/lib/services"
import { getServiceMedia } from "@/lib/service-media"
import { getLocationCountry, type Audience } from "@/lib/locations"
import { withAudienceQuery } from "@/lib/audience"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    privat: {
      eyebrow: "Leistungen für Privatkunden",
      heading: "Alles für Haus, Terrasse und Garten",
      intro: "Das sind die Leistungen, die wir für Privatkunden anbieten. Eine Besichtigung vor Ort ist kostenlos.",
    },
    gewerbe: {
      eyebrow: "Leistungen für Gewerbekunden",
      heading: "Reinigung für Büro, Praxis und Betrieb",
      intro: "Das sind die Leistungen für Unternehmen - einmalig, regelmäßig oder im Notfall.",
    },
    more: "Mehr erfahren",
    onlyIn: "nur in",
    quote: "Angebot anfragen",
    all: "Alle Leistungen im Überblick",
  },
  en: {
    privat: {
      eyebrow: "Services for private customers",
      heading: "Everything for your home, terrace and garden",
      intro: "These are the services we offer private customers. An on-site visit is free of charge.",
    },
    gewerbe: {
      eyebrow: "Services for business customers",
      heading: "Cleaning for offices, practices and companies",
      intro: "These are the services for businesses - one-off, regular or in an emergency.",
    },
    more: "Learn more",
    onlyIn: "only in",
    quote: "Request a quote",
    all: "All services at a glance",
  },
  fr: {
    privat: {
      eyebrow: "Prestations pour les particuliers",
      heading: "Tout pour votre maison, terrasse et jardin",
      intro: "Voici les prestations que nous proposons aux particuliers. La visite sur place est gratuite.",
    },
    gewerbe: {
      eyebrow: "Prestations pour les entreprises",
      heading: "Nettoyage pour bureaux, cabinets et sociétés",
      intro: "Voici les prestations pour les entreprises - ponctuelles, régulières ou en urgence.",
    },
    more: "En savoir plus",
    onlyIn: "uniquement en",
    quote: "Demander un devis",
    all: "Toutes les prestations en un coup d'œil",
  },
}

export function AudienceServicesSection({ locale = "de", audience }: { locale?: Locale; audience: Audience }) {
  const t = TEXT[locale]
  const copy = t[audience]
  const list = getLocalizedServices(locale).filter((service) => service.audiences.includes(audience))

  return (
    <section id="leistungen" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{copy.eyebrow}</p>
          <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {copy.heading}
          </h2>
          <p className="text-pretty text-neutral-600">{copy.intro}</p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => {
            const media = getServiceMedia(service.slug)
            const restricted = service.locations.length === 1 ? service.locations[0] : null
            return (
              <li key={service.slug} className="flex">
                <article className="group flex w-full flex-col overflow-hidden rounded-3xl bg-brand-mint transition-shadow hover:shadow-lg">
                  <Link href={service.href} className="relative block aspect-[16/10] overflow-hidden">
                    {media?.hero ? (
                      <Image
                        src={media.hero.src}
                        alt={media.hero.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-brand-blue/10">
                        <service.icon className="h-10 w-10 text-brand-blue" />
                      </div>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-xl font-extrabold text-brand-navy">
                      <Link href={service.href} className="hover:text-brand-blue">
                        {service.title}
                      </Link>
                    </h3>
                    {restricted && (
                      <p className="text-xs font-semibold text-brand-blue">
                        {t.onlyIn} {getLocationCountry(restricted, locale)}
                      </p>
                    )}
                    <p className="text-pretty text-sm leading-relaxed text-neutral-600">{service.shortDescription}</p>
                    <ul className="space-y-1.5 text-sm text-brand-navy">
                      {service.items.slice(0, 3).map((item) => (
                        <li key={item.label} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" aria-hidden="true" />
                          <span>{item.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <Link href={service.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                        {t.more}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={withAudienceQuery(localizeHref("/kontakt", locale), audience, { leistung: service.slug })}
                        className="text-sm font-semibold text-brand-navy underline-offset-4 hover:underline"
                      >
                        {t.quote}
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link href={`${localizeHref("/leistungen", locale)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
            {t.all}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
