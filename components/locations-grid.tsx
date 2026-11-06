import Link from "next/link"
import { LOCATION_IDS, locations } from "@/lib/locations"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    eyebrow: "Wo wir arbeiten",
    heading: "Luxemburg und Deutschland",
    region: "Einsatzgebiet",
    contact: "Anfrage für diesen Standort",
  },
  en: {
    eyebrow: "Where we work",
    heading: "Luxembourg and Germany",
    region: "Service area",
    contact: "Request for this location",
  },
  fr: {
    eyebrow: "Où nous intervenons",
    heading: "Luxembourg et Allemagne",
    region: "Zone d'intervention",
    contact: "Demande pour ce site",
  },
}

export function LocationsGrid({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]

  return (
    <div>
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
        <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
          {t.heading}
        </h2>
      </div>

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-brand-navy/10">
        {LOCATION_IDS.map((id) => {
          const location = locations[id]
          return (
            <article key={id} className="flex flex-col gap-3 md:px-10 md:first:pl-0 md:last:pr-0">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-brand-navy">{location.country[locale]}</h3>
                {location.entity && <p className="text-sm text-neutral-500">{location.entity}</p>}
              </div>
              <p className="text-neutral-600">
                <span className="font-medium text-brand-navy">{t.region}: </span>
                {location.regions[locale]}
              </p>
              {location.address && (
                <address className="text-sm not-italic leading-relaxed text-neutral-600">
                  {location.address.join(", ")}
                  <br />
                  <a href="tel:+352661830493" className="font-medium text-brand-blue hover:underline">
                    +352 661 830 493
                  </a>
                </address>
              )}
              <Link
                href={localizeHref("/kontakt", locale)}
                className="mt-1 text-sm font-semibold text-brand-blue hover:underline"
              >
                {t.contact}
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
