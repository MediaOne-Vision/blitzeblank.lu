import { Metadata } from "next"
import { Grid3X3 } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Fensterreinigung | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Professionelle Fensterreinigung in Luxemburg. Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
  alternates: {
    canonical: "https://blitzeblank.lu/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
    },
  },
}

const features = [
  {
    title: "Bürofenster",
    description: "Regelmäßige Reinigung von Fenstern in Bürogebäuden für ein angenehmes Arbeitsumfeld.",
  },
  {
    title: "Schaufenster",
    description: "Makellose Präsentation Ihrer Waren durch streifenfreie Schaufensterreinigung.",
  },
  {
    title: "Glasfassaden",
    description: "Professionelle Reinigung von Glasfassaden auch in großer Höhe.",
  },
  {
    title: "Industrieverglasung",
    description: "Effiziente Reinigung großflächiger Industrieverglasungen und Oberlichter.",
  },
  {
    title: "Rahmenreinigung",
    description: "Gründliche Reinigung von Fensterrahmen, Bänken und Fensterbrettern.",
  },
  {
    title: "Spezialverglasung",
    description: "Schonende Reinigung von Sicherheitsglas, Sonnenschutzglas und Spezialverglasungen.",
  },
]

const benefits = [
  "Streifenfreies Ergebnis durch professionelle Techniken",
  "Flexible Intervalle von wöchentlich bis quartalsweise",
  "Erfahrung mit Arbeiten in großer Höhe",
  "Verwendung von umweltfreundlichen Reinigungsmitteln",
  "Reinigung auch bei schwer zugänglichen Fenstern",
  "Rahmen und Beschläge werden auf Wunsch mitgereinigt (optional)",
]

const process = [
  { step: "Besichtigung", description: "Kostenlose Begutachtung aller Glasflächen" },
  { step: "Angebot", description: "Transparentes Angebot nach Fläche und Häufigkeit" },
  { step: "Terminvereinbarung", description: "Regelmäßige Termine nach Ihrem Wunsch" },
  { step: "Reinigung", description: "Streifenfreie Glasreinigung durch Profis" },
  { step: "Kontrolle", description: "Qualitätsprüfung nach jedem Einsatz" },
]

export default function FensterreinigungPage() {
  return (
    <ServicePageTemplate
      slug="fensterreinigung"
      title="Fensterreinigung"
      subtitle="Streifenfreier Durchblick vom einzelnen Schaufenster bis zur kompletten Glasfassade - mit moderner Technik und viel Erfahrung."
      description="Saubere Fenster sind die Visitenkarte Ihres Unternehmens. Unsere professionelle Fensterreinigung sorgt für streifenfreie Ergebnisse an allen Glasflächen - vom Schaufenster bis zur Glasfassade. Mit modernen Techniken und umweltfreundlichen Mitteln garantieren wir eine effiziente und gründliche Reinigung, die Ihre Räume in bestem Licht erscheinen lässt."
      icon={Grid3X3}
      image="clean+modern+glass+office+windows+reflection+blue+sky"
      features={features}
      benefits={benefits}
      process={process}
    />
  )
}
