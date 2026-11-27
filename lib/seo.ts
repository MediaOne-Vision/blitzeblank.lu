import type { Metadata } from "next"
import { localizeHref, LOCALES, type Locale } from "@/lib/i18n"
import { SEO_COPY } from "@/lib/seo-copy"

export const SITE_URL = "https://blitzeblank.lu"
export const SITE_NAME = "Blitzeblank"

export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Blitzeblank – professionelle Reinigung in Luxemburg, Trier & Bitburg",
}

export const OG_LOCALE: Record<Locale, string> = { de: "de_DE", en: "en_US", fr: "fr_FR" }

/** Pfade, die es nur auf Deutsch gibt (kein hreflang für en/fr). */
const GERMAN_ONLY_PATHS = new Set(["/stein-angebot"])

export const BUSINESS = {
  name: "Blitzeblank",
  legalName: "BLITZEBLANK S.à r.l.",
  telephone: "+352661830493",
  email: "info@blitzeblank.lu",
  street: "6A Rue Michel Rodange",
  postalCode: "7681",
  city: "Waldbillig",
  country: "LU",
  facebook: "https://www.facebook.com/blitzeblank.lu/",
  instagram: "https://www.instagram.com/blitzeblank.lu/",
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  areaServed: ["Luxemburg", "Trier", "Bitburg"],
}

export function absoluteUrl(path: string, locale: Locale): string {
  const localized = localizeHref(path, locale)
  return `${SITE_URL}${localized === "/" ? "/" : localized}`
}

type PageMetadataOptions = {
  /** Eigener Title/Description statt des Eintrags in SEO_COPY. */
  copy?: { title: string; description: string }
  keywords?: string[]
  noindex?: boolean
}

/**
 * Vollständige Metadaten einer Seite: Title, Description, Canonical, hreflang und Open Graph
 * (inkl. og:url und og:image). Der kanonische Pfad ist der deutsche Pfad ohne Sprachpräfix.
 */
export function pageMetadata(path: string, locale: Locale, options: PageMetadataOptions = {}): Metadata {
  const copy = options.copy ?? SEO_COPY[path]?.[locale]
  if (!copy) throw new Error(`Kein SEO-Text für ${path} (${locale}) hinterlegt`)

  const url = absoluteUrl(path, locale)
  const translated = !GERMAN_ONLY_PATHS.has(path) && !/^\/leistungen\/[^/]+\/[^/]+$/.test(path)

  return {
    title: copy.title,
    description: copy.description,
    ...(options.keywords ? { keywords: options.keywords } : {}),
    ...(options.noindex ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: url,
      languages: translated
        ? Object.fromEntries(LOCALES.map((l) => [l, absoluteUrl(path, l)]))
        : { de: absoluteUrl(path, "de") },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: OG_LOCALE[locale],
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [OG_IMAGE.url],
    },
  }
}

/** LocalBusiness-Schema (unsichtbar im <head>/<body>, nur für Suchmaschinen und KI-Assistenten). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    description:
      "Professionelle Industrie-, Fenster-, Stein- und Fassadenreinigung in Luxemburg, Trier, Bitburg und der Region.",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/images/logo.png`,
    image: OG_IMAGE.url,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.street,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.city,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": name === "Luxemburg" ? "Country" : "City", name })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days,
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    sameAs: [BUSINESS.facebook, BUSINESS.instagram],
  }
}
