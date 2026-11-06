import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LocationsGrid } from "@/components/locations-grid"
import type { Audience } from "@/lib/locations"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    heading: "Für Privat- und Gewerbekunden",
    audiences: {
      privat: {
        title: "Privatkunden",
        body: "Fenster, Fassade, Stein, Spezial- und Solarreinigung sowie Treppenhaus für Haus, Garten und Wohnanlage.",
      },
      gewerbe: {
        title: "Gewerbekunden",
        body: "Reinigung für Büros, Praxen, Geschäfte und Betriebe - inklusive Unterhalts-, Industriereinigung und Notdienst.",
      },
    },
    all: "Leistungen ansehen",
  },
  en: {
    heading: "For Private and Business Customers",
    audiences: {
      privat: {
        title: "Private customers",
        body: "Windows, facade, stone, specialist and solar cleaning and stairwells for your home, garden and residential property.",
      },
      gewerbe: {
        title: "Business customers",
        body: "Cleaning for offices, practices, shops and companies - including maintenance, industrial and emergency cleaning.",
      },
    },
    all: "View services",
  },
  fr: {
    heading: "Pour particuliers et entreprises",
    audiences: {
      privat: {
        title: "Particuliers",
        body: "Vitres, façade, pierre, nettoyage spécial et solaire et cages d'escalier pour votre maison, jardin et résidence.",
      },
      gewerbe: {
        title: "Entreprises",
        body: "Nettoyage pour bureaux, cabinets, commerces et sociétés - y compris entretien, industriel et urgence.",
      },
    },
    all: "Voir les prestations",
  },
}

const AUDIENCES: Audience[] = ["privat", "gewerbe"]

export function AudienceLocationsSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]

  return (
    <section id="kundengruppen" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-balance text-center font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
          {t.heading}
        </h2>

        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-brand-navy/10">
          {AUDIENCES.map((id) => {
            const copy = t.audiences[id]
            const anchor = id === "privat" ? "privatkunden" : "gewerbekunden"
            return (
              <article key={id} id={anchor} className="flex scroll-mt-24 flex-col gap-3 md:px-10 md:first:pl-0 md:last:pr-0">
                <h3 className="font-display text-2xl font-extrabold text-brand-navy">{copy.title}</h3>
                <p className="text-pretty leading-relaxed text-neutral-600">{copy.body}</p>
                <Link
                  href={`${localizeHref("/leistungen", locale)}#${anchor}`}
                  className="group mt-1 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue"
                >
                  {t.all}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            )
          })}
        </div>

        <div className="mt-16 border-t border-brand-navy/10 pt-16 lg:mt-20 lg:pt-20">
          <LocationsGrid locale={locale} />
        </div>
      </div>
    </section>
  )
}
