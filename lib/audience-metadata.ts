import type { Metadata } from "next"
import { AUDIENCE_PATHS } from "@/lib/audience"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"
import { OG_IMAGE, OG_LOCALE, SITE_NAME, SITE_URL as SITE } from "@/lib/seo"

const COPY: Record<Locale, Record<Audience, { title: string; description: string; keywords: string[] }>> = {
  de: {
    privat: {
      title: "Reinigung für Privatkunden in Luxemburg | Blitzeblank",
      description:
        "Fenster-, Fassaden- und Steinreinigung für Ihr Zuhause in Luxemburg, Trier und Bitburg. Kostenlose Besichtigung und persönlicher Ansprechpartner.",
      keywords: ["Reinigung Privatkunden", "Fensterreinigung Privat", "Fassadenreinigung Haus", "Terrassenreinigung", "Treppenhausreinigung"],
    },
    gewerbe: {
      title: "Reinigung für Gewerbekunden in Luxemburg | Blitzeblank",
      description:
        "Unterhalts-, Fenster-, Fassaden- und Industriereinigung für Büros, Praxen und Betriebe in Luxemburg, Trier und Bitburg. Jetzt Besichtigung anfragen.",
      keywords: ["Reinigung Gewerbe", "Unterhaltsreinigung Büro", "Industriereinigung", "Gebäudereinigung Luxemburg", "Reinigungsnotdienst"],
    },
  },
  en: {
    privat: {
      title: "Cleaning for Private Customers | Blitzeblank Luxembourg",
      description:
        "Window, facade and stone cleaning for your home in Luxembourg, Trier and Bitburg. Free on-site visit, fair prices and a personal contact.",
      keywords: ["home cleaning", "window cleaning Luxembourg", "facade cleaning house", "terrace cleaning", "stairwell cleaning"],
    },
    gewerbe: {
      title: "Cleaning for Business Customers | Blitzeblank Luxembourg",
      description:
        "Maintenance, window, facade and industrial cleaning for offices, practices and companies in Luxembourg, Trier and Bitburg. Free on-site visit.",
      keywords: ["commercial cleaning Luxembourg", "office cleaning", "industrial cleaning", "emergency cleaning"],
    },
  },
  fr: {
    privat: {
      title: "Nettoyage pour particuliers | Blitzeblank Luxembourg",
      description:
        "Nettoyage de vitres, de façades et de pierre pour votre domicile à Luxembourg, Trèves et Bitburg. Visite gratuite et interlocuteur personnel.",
      keywords: ["nettoyage particuliers", "nettoyage de vitres Luxembourg", "nettoyage de façade maison", "nettoyage de terrasse"],
    },
    gewerbe: {
      title: "Nettoyage pour entreprises | Blitzeblank Luxembourg",
      description:
        "Nettoyage d'entretien, de vitres, de façades et industriel pour bureaux et entreprises à Luxembourg, Trèves et Bitburg. Visite gratuite.",
      keywords: ["nettoyage entreprises Luxembourg", "nettoyage de bureaux", "nettoyage industriel", "service de nettoyage d'urgence"],
    },
  },
}

/** Metadaten einer Zielgruppen-Seite inkl. Canonical und hreflang für alle drei Sprachen. */
export function audienceMetadata(audience: Audience, locale: Locale): Metadata {
  const copy = COPY[locale][audience]
  const path = AUDIENCE_PATHS[audience]
  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `${SITE}${localizeHref(path, locale)}`,
      siteName: SITE_NAME,
      type: "website",
      locale: OG_LOCALE[locale],
      images: [OG_IMAGE],
    },
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
