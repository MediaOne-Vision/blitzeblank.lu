import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getLocalizedServices } from "@/lib/services"
import { getServiceMedia } from "@/lib/service-media"
import { getLocationCountry, type Audience } from "@/lib/locations"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    privat: { eyebrow: "Für Privatkunden", heading: "Alles für Haus, Terrasse und Garten" },
    gewerbe: { eyebrow: "Für Gewerbekunden", heading: "Reinigung für Büro, Praxis und Betrieb" },
    onlyIn: "nur in",
    all: "Alle Leistungen im Überblick",
  },
  en: {
    privat: { eyebrow: "For private customers", heading: "Everything for your home, terrace and garden" },
    gewerbe: { eyebrow: "For business customers", heading: "Cleaning for offices, practices and companies" },
    onlyIn: "only in",
    all: "All services at a glance",
  },
  fr: {
    privat: { eyebrow: "Pour les particuliers", heading: "Tout pour votre maison, terrasse et jardin" },
    gewerbe: { eyebrow: "Pour les entreprises", heading: "Nettoyage pour bureaux, cabinets et sociétés" },
    onlyIn: "uniquement en",
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
          <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {copy.heading}
          </h2>
        </div>

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((service) => {
            const media = getServiceMedia(service.slug)
            const restricted = service.locations.length === 1 ? service.locations[0] : null
            return (
              <li key={service.slug}>
                <Link href={service.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-mint">
                    {media?.hero ? (
                      <Image
                        src={media.hero.src}
                        alt={media.hero.alt}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <service.icon className="h-10 w-10 text-brand-blue" />
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-extrabold text-brand-navy transition-colors group-hover:text-brand-blue">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-pretty text-sm leading-relaxed text-neutral-600">
                    {service.shortDescription}
                  </p>
                  {restricted && (
                    <p className="mt-2 text-xs font-medium text-neutral-500">
                      {t.onlyIn} {getLocationCountry(restricted, locale)}
                    </p>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href={localizeHref("/leistungen", locale)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
          >
            {t.all}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
