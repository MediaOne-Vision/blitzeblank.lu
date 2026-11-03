import {
  Building2,
  Factory,
  Grid3X3,
  Layers,
  Mountain,
  Siren,
  Sparkles,
  SprayCan,
  SunMedium,
  type LucideIcon,
} from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience, LocationId } from "@/lib/locations"

type Localized = Record<Locale, string>

/** Ein Unterpunkt einer Leistung, optional mit eigener Seite und eigener Einschränkung auf ein Land. */
export interface ServiceSubItem {
  label: Localized
  href?: string
  locations?: LocationId[]
}

export interface ServiceItem {
  slug: string
  title: string
  titleEn: string
  titleFr: string
  shortDescription: string
  shortDescriptionEn: string
  shortDescriptionFr: string
  href: string
  icon: LucideIcon
  imageQuery: string
  /** Unterpunkte, genau wie in der Leistungsübersicht. */
  items: ServiceSubItem[]
  /** Für welche Kundengruppen die Leistung angeboten wird. */
  audiences: Audience[]
  /** In welchen Ländern die Leistung angeboten wird. */
  locations: LocationId[]
  /** false = eigene Seite, aber nicht als eigener Hauptbereich in Listen (z. B. Unterseite von Spezialreinigung). */
  listed?: boolean
}

const s = (de: string, en: string, fr: string, extra?: Pick<ServiceSubItem, "href" | "locations">): ServiceSubItem => ({
  label: { de, en, fr },
  ...extra,
})

// Reihenfolge entspricht der Leistungsübersicht von Blitzeblank.
export const services: ServiceItem[] = [
  {
    slug: "fensterreinigung",
    title: "Fenster- & Glasreinigung",
    titleEn: "Window & Glass Cleaning",
    titleFr: "Nettoyage de vitres et de verre",
    shortDescription:
      "Streifenfreie Reinigung von Fenstern, Glasflächen und Zubehör - für Wohnhäuser, Büros, Geschäfte und Industrieanlagen.",
    shortDescriptionEn:
      "Streak-free cleaning of windows, glass surfaces and accessories - for homes, offices, shops and industrial sites.",
    shortDescriptionFr:
      "Nettoyage sans traces des fenêtres, surfaces vitrées et accessoires - pour maisons, bureaux, commerces et sites industriels.",
    href: "/leistungen/fensterreinigung",
    icon: Grid3X3,
    imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
    items: [
      s("Fenster und Rahmen", "Windows and frames", "Fenêtres et cadres"),
      s("Pergolen und Wintergärten", "Pergolas and conservatories", "Pergolas et vérandas"),
      s("Glasüberdachungen und Vordächer", "Glass roofs and canopies", "Toitures vitrées et auvents"),
      s("Rollläden, Jalousien und Raffstores", "Roller shutters, blinds and venetian blinds", "Volets roulants, stores et brise-soleil"),
      s("Fliegengitter", "Insect screens", "Moustiquaires"),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "fassadenreinigung",
    title: "Fassaden- & Dachrinnenreinigung",
    titleEn: "Facade & Gutter Cleaning",
    titleFr: "Nettoyage de façades et de gouttières",
    shortDescription:
      "Professionelle Außenreinigung für Fassaden aller Art sowie Reinigung und Kontrolle Ihrer Dachrinnen.",
    shortDescriptionEn:
      "Professional exterior cleaning for facades of all kinds, plus cleaning and inspection of your gutters.",
    shortDescriptionFr:
      "Nettoyage extérieur professionnel pour tous types de façades, ainsi que nettoyage et contrôle de vos gouttières.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    imageQuery: "modern+building+facade+exterior+cleaning+architecture",
    items: [
      s("Fassadenreinigung", "Facade cleaning", "Nettoyage de façades"),
      s("Dachrinnenreinigung", "Gutter cleaning", "Nettoyage de gouttières"),
      s("Dachrinneninspektion", "Gutter inspection", "Inspection de gouttières"),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "industriereinigung",
    title: "Industriereinigung",
    titleEn: "Industrial Cleaning",
    titleFr: "Nettoyage industriel",
    shortDescription:
      "Reinigung von Reinräumen, Produktionshallen und Maschinen nach hohen Standards - für Gewerbe und Industrie.",
    shortDescriptionEn:
      "Cleaning of cleanrooms, production halls and machinery to high standards - for business and industry.",
    shortDescriptionFr:
      "Nettoyage de salles blanches, halls de production et machines selon des normes élevées - pour entreprises et industrie.",
    href: "/leistungen/industriereinigung",
    icon: Factory,
    imageQuery: "industrial+factory+production+hall+clean+polished+floor",
    items: [
      s("Zertifizierte Reinraumreinigung", "Certified cleanroom cleaning", "Nettoyage certifié de salles blanches"),
      s(
        "Reinigung von Produktionshallen und Industrieflächen",
        "Cleaning of production halls and industrial areas",
        "Nettoyage de halls de production et de surfaces industrielles",
      ),
      s("Maschinenreinigung", "Machine cleaning", "Nettoyage de machines"),
    ],
    audiences: ["gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    titleEn: "Maintenance Cleaning",
    titleFr: "Nettoyage d'entretien",
    shortDescription:
      "Regelmäßige Reinigung zu festen Terminen - für Büros, Geschäfte, Einrichtungen und Privathaushalte.",
    shortDescriptionEn:
      "Regular cleaning on fixed schedules - for offices, shops, institutions and private households.",
    shortDescriptionFr:
      "Nettoyage régulier à dates fixes - pour bureaux, commerces, établissements et ménages privés.",
    href: "/leistungen/unterhaltsreinigung",
    icon: Sparkles,
    imageQuery: "clean+modern+office+interior+cleaning+maintenance",
    items: [
      s("Bürogebäude", "Office buildings", "Bâtiments de bureaux"),
      s(
        "Bildungs- und Gesundheitseinrichtungen",
        "Educational and healthcare facilities",
        "Établissements d'enseignement et de santé",
      ),
      s("Gastronomiebetriebe", "Restaurants and catering businesses", "Établissements de restauration"),
      s("Geschäfte und Verkaufsflächen", "Shops and retail spaces", "Commerces et surfaces de vente"),
      s("Kindergärten und Schulen", "Kindergartens and schools", "Crèches et écoles"),
      s("Privathaushalte", "Private households", "Ménages privés"),
      s("Individuell vereinbarte Reinigungsintervalle", "Individually agreed cleaning intervals", "Intervalles de nettoyage convenus individuellement"),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "spezialreinigung",
    title: "Spezialreinigung & ergänzende Dienstleistungen",
    titleEn: "Special Cleaning & Additional Services",
    titleFr: "Nettoyage spécial et prestations complémentaires",
    shortDescription:
      "Von der Grundreinigung bis zur Entrümpelung: Zusatzleistungen für besondere Anlässe und einmalige Einsätze.",
    shortDescriptionEn:
      "From deep cleaning to clearance: additional services for special occasions and one-off jobs.",
    shortDescriptionFr:
      "Du nettoyage en profondeur au débarras : prestations complémentaires pour occasions spéciales et interventions ponctuelles.",
    href: "/leistungen/spezialreinigung",
    icon: SprayCan,
    imageQuery: "deep+cleaning+living+room+sofa+upholstery",
    items: [
      s("Treppenhausreinigung", "Stairwell cleaning", "Nettoyage de cages d'escalier", {
        href: "/leistungen/treppenhausreinigung",
        locations: ["de"],
      }),
      s("Grundreinigung", "Deep cleaning", "Nettoyage en profondeur"),
      s("Bauendreinigung", "Post-construction cleaning", "Nettoyage de fin de chantier"),
      s("Polsterreinigung", "Upholstery cleaning", "Nettoyage de rembourrés"),
      s("Entrümpelung", "Clearance", "Débarras"),
      s(
        "Reinigung nach Veranstaltungen und Feiern",
        "Cleaning after events and celebrations",
        "Nettoyage après événements et fêtes",
      ),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "steinreinigung",
    title: "Stein- & Terrassenreinigung",
    titleEn: "Stone & Terrace Cleaning",
    titleFr: "Nettoyage de pierre et de terrasses",
    shortDescription:
      "Fachgerechte Reinigung von Naturstein, Pflaster, Mauern und Terrassen - für Haus, Garten und Firmengelände.",
    shortDescriptionEn:
      "Expert cleaning of natural stone, paving, walls and terraces - for homes, gardens and company grounds.",
    shortDescriptionFr:
      "Nettoyage professionnel de la pierre naturelle, des pavés, des murs et des terrasses - pour la maison, le jardin et les sites d'entreprise.",
    href: "/leistungen/steinreinigung",
    icon: Mountain,
    imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
    items: [
      s("Naturstein- und Pflastersteinreinigung", "Natural stone and paving cleaning", "Nettoyage de pierre naturelle et de pavés"),
      s("Reinigung von Steinmauern", "Cleaning of stone walls", "Nettoyage de murs en pierre"),
      s("Terrassenreinigung", "Terrace cleaning", "Nettoyage de terrasses"),
      s(
        "Entfernung von Ölflecken auf geeigneten Steinflächen",
        "Removal of oil stains on suitable stone surfaces",
        "Élimination de taches d'huile sur surfaces en pierre adaptées",
      ),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "solarreinigung",
    title: "Solar- & Photovoltaikreinigung",
    titleEn: "Solar & Photovoltaic Cleaning",
    titleFr: "Nettoyage solaire et photovoltaïque",
    shortDescription:
      "Schonende Reinigung von Solar- und Photovoltaikanlagen auf Dächern und Freiflächen.",
    shortDescriptionEn:
      "Gentle cleaning of solar and photovoltaic systems on roofs and open sites.",
    shortDescriptionFr:
      "Nettoyage en douceur des installations solaires et photovoltaïques sur toitures et terrains.",
    href: "/leistungen/solarreinigung",
    icon: SunMedium,
    imageQuery: "clean+solar+panels+roof+photovoltaic+blue+sky",
    items: [
      s("Reinigung von Solaranlagen", "Cleaning of solar systems", "Nettoyage d'installations solaires"),
      s("Reinigung von Photovoltaikanlagen", "Cleaning of photovoltaic systems", "Nettoyage d'installations photovoltaïques"),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "reinigungsnotdienst",
    title: "Reinigungsnotdienst",
    titleEn: "Emergency Cleaning Service",
    titleFr: "Service de nettoyage d'urgence",
    shortDescription:
      "Hilfe bei dringendem Reinigungsbedarf - kurzfristige Einsätze nach Verfügbarkeit.",
    shortDescriptionEn:
      "Help with urgent cleaning needs - short-notice jobs subject to availability.",
    shortDescriptionFr:
      "Aide en cas de besoin urgent de nettoyage - interventions à court terme selon disponibilité.",
    href: "/leistungen/reinigungsnotdienst",
    icon: Siren,
    imageQuery: "cleaning+team+urgent+emergency+service+building",
    items: [
      s("Hilfe bei dringendem Reinigungsbedarf", "Help with urgent cleaning needs", "Aide en cas de besoin urgent de nettoyage"),
      s("Kurzfristige Einsätze nach Verfügbarkeit", "Short-notice jobs subject to availability", "Interventions à court terme selon disponibilité"),
    ],
    audiences: ["privat", "gewerbe"],
    locations: ["lu", "de"],
  },
  {
    slug: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    titleEn: "Stairwell Cleaning",
    titleFr: "Nettoyage de cages d'escalier",
    shortDescription:
      "Regelmäßige Reinigung von Treppenhäusern, Eingangsbereichen und Fluren. Derzeit in Deutschland.",
    shortDescriptionEn:
      "Regular cleaning of stairwells, entrance areas and corridors. Currently in Germany.",
    shortDescriptionFr:
      "Nettoyage régulier des cages d'escalier, entrées et couloirs. Actuellement en Allemagne.",
    href: "/leistungen/treppenhausreinigung",
    icon: Layers,
    imageQuery: "clean+apartment+building+stairwell+staircase+entrance",
    items: [],
    audiences: ["privat", "gewerbe"],
    locations: ["de"],
    listed: false,
  },
]

export function getService(slug: string) {
  return services.find((item) => item.slug === slug)
}

/**
 * Liefert die Services mit lokalisiertem Titel, Beschreibung, Link und Unterpunkten.
 * Unterseiten (listed: false) sind standardmäßig ausgeblendet.
 */
export function getLocalizedServices(locale: Locale, options: { includeUnlisted?: boolean } = {}) {
  return services
    .filter((item) => options.includeUnlisted || item.listed !== false)
    .map((item) => ({
      ...item,
      title: locale === "en" ? item.titleEn : locale === "fr" ? item.titleFr : item.title,
      shortDescription:
        locale === "en" ? item.shortDescriptionEn : locale === "fr" ? item.shortDescriptionFr : item.shortDescription,
      href: localizeHref(item.href, locale),
      items: item.items.map((sub) => ({
        label: sub.label[locale],
        href: sub.href ? localizeHref(sub.href, locale) : undefined,
        locations: sub.locations,
      })),
    }))
}
