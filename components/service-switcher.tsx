import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLocalizedServices } from "@/lib/services"
import type { Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    eyebrow: "Weitere Leistungen",
    heading: "Entdecken Sie unser gesamtes Angebot",
    current: "Aktuelle Seite",
    view: "Ansehen",
  },
  en: {
    eyebrow: "More Services",
    heading: "Discover Our Full Range of Services",
    current: "Current Page",
    view: "View",
  },
  fr: {
    eyebrow: "Autres prestations",
    heading: "Découvrez toute notre offre",
    current: "Page actuelle",
    view: "Voir",
  },
}

export function ServiceSwitcher({ currentSlug, locale = "de" }: { currentSlug?: string; locale?: Locale }) {
  const services = getLocalizedServices(locale)
  const t = TEXT[locale]
  return (
    <section className="bg-brand-mint py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
          <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight text-balance">
            {t.heading}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service) => {
            const isCurrent = service.slug === currentSlug
            return (
              <Link
                key={service.slug}
                href={service.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "group flex flex-col items-center gap-3 rounded-2xl p-5 text-center transition-all",
                  isCurrent
                    ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30"
                    : "bg-white text-brand-navy ring-1 ring-brand-navy/5 hover:-translate-y-1 hover:shadow-xl",
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    isCurrent ? "bg-white/15" : "bg-brand-mint group-hover:bg-brand-blue",
                  )}
                >
                  <service.icon
                    className={cn(
                      "h-6 w-6 transition-colors",
                      isCurrent ? "text-white" : "text-brand-blue group-hover:text-white",
                    )}
                  />
                </div>
                <span className="font-display text-sm font-bold leading-tight">{service.title}</span>
                {isCurrent ? (
                  <span className="text-xs font-medium text-white/80">{t.current}</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue">
                    {t.view}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
