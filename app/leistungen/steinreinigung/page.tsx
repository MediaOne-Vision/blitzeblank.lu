import { Metadata } from "next"
import { Mountain } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Steinreinigung | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Professionelle Steinreinigung in Luxemburg. Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
  alternates: {
    canonical: "/leistungen/steinreinigung",
    languages: {
      de: "/leistungen/steinreinigung",
      en: "/en/leistungen/steinreinigung",
    },
  },
}

const features = [
  {
    title: "Natursteinreinigung",
    description: "Schonende Reinigung von Marmor, Granit, Sandstein und anderen Natursteinen.",
  },
  {
    title: "Pflasterreinigung",
    description: "Gründliche Reinigung von Pflasterflächen mit Entfernung von Moos und Unkraut.",
  },
  {
    title: "Terrassenreinigung",
    description: "Professionelle Reinigung und Pflege von Terrassen aus Stein oder Beton.",
  },
  {
    title: "Treppenreinigung",
    description: "Sichere und gründliche Reinigung von Außentreppen und Eingangsbereichen.",
  },
  {
    title: "Mauerwerkssanierung",
    description: "Reinigung und Aufarbeitung von alten Mauern und Steinwänden.",
  },
  {
    title: "Versiegelung",
    description: "Optionaler Schutz der gereinigten Flächen durch professionelle Versiegelung.",
  },
]

const benefits = [
  "Fachgerechte Behandlung verschiedener Steinarten",
  "Hochdruckreinigung mit angepasstem Druck",
  "Umweltfreundliche Reinigungsmittel",
  "Entfernung von Moos, Algen und Verfärbungen",
  "Optionale Imprägnierung für langanhaltenden Schutz",
  "Aufwertung des Erscheinungsbildes Ihrer Immobilie",
]

const process = [
  { step: "Besichtigung", description: "Analyse der Steinart und des Verschmutzungsgrads" },
  { step: "Testfläche", description: "Probereinigung an unauffälliger Stelle" },
  { step: "Angebot", description: "Individuelles Angebot mit optionaler Versiegelung" },
  { step: "Reinigung", description: "Fachgerechte Reinigung mit angepasster Technik" },
  { step: "Versiegelung", description: "Optional: Schutzbehandlung für dauerhafte Sauberkeit" },
]

export default function SteinreinigungPage() {
  return (
    <ServicePageTemplate
      slug="steinreinigung"
      title="Steinreinigung"
      subtitle="Wir befreien Naturstein, Pflaster und Terrassen materialschonend von Moos, Algen und Witterungsspuren - für neuen, natürlichen Glanz."
      description="Steinoberflächen werden im Laufe der Zeit durch Witterung, Moos, Algen und Verschmutzungen unansehnlich. Unsere professionelle Steinreinigung bringt Ihre Außenflächen wieder zum Strahlen. Mit angepassten Techniken für jede Steinart sorgen wir für eine schonende und gründliche Reinigung, die den natürlichen Charakter Ihrer Steinoberflächen bewahrt."
      icon={Mountain}
      image="clean+natural+stone+pavement+terrace+outdoor+pressure+washing"
      features={features}
      benefits={benefits}
      process={process}
    />
  )
}
