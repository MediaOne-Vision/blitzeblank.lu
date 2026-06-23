import { Metadata } from "next"
import { Factory } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Industriereinigung | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Professionelle Industriereinigung in Luxemburg. Wir reinigen Produktionshallen, Lager, Werkstätten und Industrieanlagen nach höchsten Standards.",
}

const features = [
  {
    title: "Hallenboden-Reinigung",
    description: "Gründliche Reinigung von Industrieböden aller Art - Beton, Epoxid, Fliesen oder beschichtete Oberflächen.",
  },
  {
    title: "Maschinenreinigung",
    description: "Schonende und effektive Reinigung von Produktionsmaschinen ohne Betriebsunterbrechung.",
  },
  {
    title: "Lagerreinigung",
    description: "Systematische Reinigung von Lagerräumen und Regalsystemen für optimale Hygiene.",
  },
  {
    title: "Decken- & Wandreinigung",
    description: "Entfernung von Staub, Spinnweben und Ablagerungen in schwer zugänglichen Bereichen.",
  },
  {
    title: "Lüftungsreinigung",
    description: "Professionelle Reinigung von Lüftungsanlagen und Klimasystemen für bessere Luftqualität.",
  },
  {
    title: "Sonderreinigung",
    description: "Individuelle Reinigungslösungen für spezielle Anforderungen und Branchen.",
  },
]

const benefits = [
  "Minimale Betriebsunterbrechung durch flexible Arbeitszeiten",
  "Erfahrung mit allen gängigen Industrieumgebungen",
  "Einhaltung aller Sicherheits- und Hygienevorschriften",
  "Regelmäßige Reinigung oder einmalige Grundreinigung",
  "Moderne Reinigungstechniken und umweltfreundliche Mittel",
  "Dokumentierte Qualitätskontrolle nach jedem Einsatz",
]

const process = [
  { step: "Besichtigung", description: "Kostenlose Vor-Ort-Analyse Ihrer Anforderungen" },
  { step: "Angebot", description: "Individuelles und transparentes Angebot" },
  { step: "Terminplanung", description: "Flexibler Zeitplan nach Ihren Wünschen" },
  { step: "Durchführung", description: "Professionelle Reinigung durch geschultes Personal" },
  { step: "Abnahme", description: "Gemeinsame Qualitätskontrolle" },
]

export default function IndustriereinigungPage() {
  return (
    <ServicePageTemplate
      slug="industriereinigung"
      title="Industriereinigung"
      subtitle="Sauberkeit für Ihre Produktionsstätte"
      description="Die Industriereinigung erfordert spezielles Know-how und Erfahrung. Unsere geschulten Mitarbeiter kennen die Anforderungen verschiedener Branchen und sorgen für hygienische Arbeitsbedingungen in Ihren Produktionshallen, Lagern und Werkstätten. Wir arbeiten effizient und mit minimalem Einfluss auf Ihren Betriebsablauf."
      icon={Factory}
      image="industrial+factory+production+hall+clean+polished+floor"
      features={features}
      benefits={benefits}
      process={process}
    />
  )
}
