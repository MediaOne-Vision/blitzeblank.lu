import type { Metadata } from "next"
import { AUDIENCE_PATHS } from "@/lib/audience"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const SITE = "https://blitzeblank.lu"

const COPY: Record<Locale, Record<Audience, { title: string; description: string; keywords: string[] }>> = {
  de: {
    privat: {
      title: "Reinigung für Privatkunden | Blitzeblank Luxemburg, Trier & Bitburg",
      description:
        "Fensterreinigung, Fassadenreinigung, Steinreinigung und mehr für Ihr Zuhause in Luxemburg, Trier und Bitburg. Kostenlose Besichtigung, faire Preise, persönlicher Ansprechpartner.",
      keywords: ["Reinigung Privatkunden", "Fensterreinigung Privat", "Fassadenreinigung Haus", "Terrassenreinigung", "Treppenhausreinigung"],
    },
    gewerbe: {
      title: "Reinigung für Gewerbekunden | Blitzeblank Luxemburg, Trier & Bitburg",
      description:
        "Unterhaltsreinigung, Fensterreinigung, Fassaden- und Industriereinigung für Büros, Praxen und Betriebe in Luxemburg, Trier und Bitburg. Feste Ansprechpartner, kostenlose Besichtigung.",
      keywords: ["Reinigung Gewerbe", "Unterhaltsreinigung Büro", "Industriereinigung", "Gebäudereinigung Luxemburg", "Reinigungsnotdienst"],
    },
  },
  en: {
    privat: {
      title: "Cleaning for Private Customers | Blitzeblank Luxembourg, Trier & Bitburg",
      description:
        "Window, facade and stone cleaning and more for your home in Luxembourg, Trier and Bitburg. Free on-site visit, fair prices, a personal contact.",
      keywords: ["home cleaning", "window cleaning Luxembourg", "facade cleaning house", "terrace cleaning", "stairwell cleaning"],
    },
    gewerbe: {
      title: "Cleaning for Business Customers | Blitzeblank Luxembourg, Trier & Bitburg",
      description:
        "Maintenance, window, facade and industrial cleaning for offices, practices and companies in Luxembourg, Trier and Bitburg. Fixed contacts, free on-site visit.",
      keywords: ["commercial cleaning Luxembourg", "office cleaning", "industrial cleaning", "emergency cleaning"],
    },
  },
  fr: {
    privat: {
      title: "Nettoyage pour particuliers | Blitzeblank Luxembourg, Trèves & Bitburg",
      description:
        "Nettoyage de vitres, de façades, de pierre et plus encore pour votre domicile à Luxembourg, Trèves et Bitburg. Visite gratuite, prix équitables, interlocuteur personnel.",
      keywords: ["nettoyage particuliers", "nettoyage de vitres Luxembourg", "nettoyage de façade maison", "nettoyage de terrasse"],
    },
    gewerbe: {
      title: "Nettoyage pour entreprises | Blitzeblank Luxembourg, Trèves & Bitburg",
      description:
        "Nettoyage d'entretien, de vitres, de façades et industriel pour bureaux, cabinets et sociétés à Luxembourg, Trèves et Bitburg. Interlocuteurs fixes, visite gratuite.",
      keywords: ["nettoyage entreprises Luxembourg", "nettoyage de bureaux", "nettoyage industriel", "service de nettoyage d'urgence"],
    },
  },
}

const OG_LOCALE: Record<Locale, string> = { de: "de_DE", en: "en_US", fr: "fr_FR" }

/** Metadaten einer Zielgruppen-Seite inkl. Canonical und hreflang für alle drei Sprachen. */
export function audienceMetadata(audience: Audience, locale: Locale): Metadata {
  const copy = COPY[locale][audience]
  const path = AUDIENCE_PATHS[audience]
  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    openGraph: { title: copy.title, description: copy.description, type: "website", locale: OG_LOCALE[locale] },
    alternates: {
      canonical: `${SITE}${localizeHref(path, locale)}`,
      languages: {
        de: localizeHref(path, "de"),
        en: localizeHref(path, "en"),
        fr: localizeHref(path, "fr"),
      },
    },
  }
}
