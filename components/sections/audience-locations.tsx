import Link from "next/link"
import { ArrowRight, Building2, CheckCircle2, Home } from "lucide-react"
import { LocationsGrid } from "@/components/locations-grid"
import { getLocalizedServices } from "@/lib/services"
import { getLocationCountry, type Audience } from "@/lib/locations"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    eyebrow: "Für wen wir arbeiten",
    heading: "Leistungen für Privat- und Gewerbekunden",
    intro: "Auf einen Blick: Welche Leistungen es für Sie gibt - und in welchem Land wir sie anbieten.",
    audiences: {
      privat: {
        title: "Privatkunden",
        body: "Für Haus, Garten und Wohnanlage: Fenster, Fassade, Stein und Treppenhaus.",
      },
      gewerbe: {
        title: "Gewerbekunden",
        body: "Für Büros, Praxen, Geschäfte und Betriebe: alle Leistungen inklusive Unterhalts- und Industriereinigung.",
      },
    },
    onlyIn: "nur in",
    all: "Alle Leistungen ansehen",
    locEyebrow: "Wo wir arbeiten",
    locHeading: "Zwei Standorte: Luxemburg und Deutschland",
    locIntro:
      "Das Geschäft in Luxemburg läuft über die BLITZEBLANK S.à r.l. Zusätzlich sind wir in Deutschland rund um Trier und Bitburg für Sie im Einsatz.",
  },
  en: {
    eyebrow: "Who we work for",
    heading: "Services for Private and Business Customers",
    intro: "At a glance: which services are available to you - and in which country we offer them.",
    audiences: {
      privat: {
        title: "Private customers",
        body: "For your home, garden and residential property: windows, facade, stone and stairwells.",
      },
      gewerbe: {
        title: "Business customers",
        body: "For offices, practices, shops and companies: all services including maintenance and industrial cleaning.",
      },
    },
    onlyIn: "only in",
    all: "View all services",
    locEyebrow: "Where we work",
    locHeading: "Two Locations: Luxembourg and Germany",
    locIntro:
      "Our Luxembourg business is operated by BLITZEBLANK S.à r.l. We also serve customers in Germany around Trier and Bitburg.",
  },
  fr: {
    eyebrow: "Pour qui nous travaillons",
    heading: "Des prestations pour particuliers et entreprises",
    intro: "En un coup d'œil : quelles prestations sont disponibles pour vous - et dans quel pays nous les proposons.",
    audiences: {
      privat: {
        title: "Particuliers",
        body: "Pour votre maison, votre jardin et votre résidence : vitres, façade, pierre et cages d'escalier.",
      },
      gewerbe: {
        title: "Entreprises",
        body: "Pour bureaux, cabinets, commerces et sociétés : toutes les prestations, y compris le nettoyage d'entretien et industriel.",
      },
    },
    onlyIn: "uniquement en",
    all: "Voir toutes les prestations",
    locEyebrow: "Où nous intervenons",
    locHeading: "Deux sites : Luxembourg et Allemagne",
    locIntro:
      "Notre activité au Luxembourg est exploitée par BLITZEBLANK S.à r.l. Nous intervenons également en Allemagne, autour de Trèves et de Bitburg.",
  },
}

const AUDIENCES: { id: Audience; icon: typeof Home }[] = [
  { id: "privat", icon: Home },
  { id: "gewerbe", icon: Building2 },
]

export function AudienceLocationsSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const services = getLocalizedServices(locale)

  return (
    <section id="kundengruppen" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
          <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {t.heading}
          </h2>
          <p className="text-neutral-600 text-pretty">{t.intro}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {AUDIENCES.map(({ id, icon: Icon }) => {
            const copy = t.audiences[id]
            const list = services.filter((s) => s.audiences.includes(id))
            const dark = id === "gewerbe"
            return (
              <article
                key={id}
                id={id === "privat" ? "privatkunden" : "gewerbekunden"}
                className={`scroll-mt-24 flex flex-col rounded-3xl p-8 ${
                  dark ? "bg-brand-navy text-white" : "bg-brand-mint text-brand-navy"
                }`}
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold">{copy.title}</h3>
                </div>
                <p className={`mb-6 text-pretty ${dark ? "text-white/75" : "text-neutral-600"}`}>{copy.body}</p>
                <ul className="mb-8 space-y-3">
                  {list.map((service) => {
                    const restricted = service.locations.length === 1 ? service.locations[0] : null
                    return (
                      <li key={service.slug}>
                        <Link
                          href={service.href}
                          className={`group flex items-center gap-3 text-sm font-semibold transition-colors ${
                            dark ? "text-white hover:text-brand-sky" : "text-brand-navy hover:text-brand-blue"
                          }`}
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-blue" />
                          <span>
                            {service.title}
                            {restricted && (
                              <span className={`ml-2 text-xs font-medium ${dark ? "text-brand-sky" : "text-neutral-500"}`}>
                                ({t.onlyIn} {getLocationCountry(restricted, locale)})
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <Link
                  href={`${localizeHref("/leistungen", locale)}#${id === "privat" ? "privatkunden" : "gewerbekunden"}`}
                  className={`group mt-auto inline-flex items-center gap-2 text-sm font-semibold ${
                    dark ? "text-brand-sky" : "text-brand-blue"
                  }`}
                >
                  {t.all}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mb-10 mt-16 max-w-2xl text-center lg:mt-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.locEyebrow}</p>
          <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {t.locHeading}
          </h2>
          <p className="text-neutral-600 text-pretty">{t.locIntro}</p>
        </div>
        <LocationsGrid locale={locale} />
      </div>
    </section>
  )
}
