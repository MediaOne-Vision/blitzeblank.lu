import Link from "next/link"
import { MapPin, Phone } from "lucide-react"
import { getLocalizedServices } from "@/lib/services"
import { LOCATION_IDS, locations } from "@/lib/locations"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    services: "Leistungen vor Ort",
    region: "Einsatzgebiet",
    contact: "Anfrage für diesen Standort",
  },
  en: {
    services: "Services on site",
    region: "Service area",
    contact: "Request for this location",
  },
  fr: {
    services: "Prestations sur place",
    region: "Zone d'intervention",
    contact: "Demande pour ce site",
  },
}

export function LocationsGrid({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const services = getLocalizedServices(locale)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {LOCATION_IDS.map((id) => {
        const location = locations[id]
        const available = services.filter((s) => s.locations.includes(id))
        return (
          <article key={id} className="flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-navy/10">
            <div className="mb-5 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-extrabold text-brand-navy">{location.country[locale]}</h3>
                {location.entity && <p className="text-sm font-medium text-neutral-500">{location.entity}</p>}
              </div>
            </div>

            <dl className="mb-5 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-brand-navy">{t.region}</dt>
                <dd className="text-neutral-600">{location.regions[locale]}</dd>
              </div>
              {location.address && (
                <div className="flex items-start gap-2 text-neutral-600">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <address className="not-italic">
                    {location.address.join(", ")}
                    <br />
                    <a href="tel:+352661830493" className="font-medium text-brand-blue hover:underline">
                      +352 661 830 493
                    </a>
                  </address>
                </div>
              )}
            </dl>

            <p className="mb-2 text-sm font-semibold text-brand-navy">{t.services}</p>
            <ul className="mb-6 flex flex-wrap gap-2">
              {available.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="inline-flex rounded-full bg-brand-mint px-3 py-1.5 text-sm font-medium text-brand-navy transition-colors hover:bg-brand-blue hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={localizeHref("/kontakt", locale)}
              className="mt-auto text-sm font-semibold text-brand-blue hover:underline"
            >
              {t.contact}
            </Link>
          </article>
        )
      })}
    </div>
  )
}
