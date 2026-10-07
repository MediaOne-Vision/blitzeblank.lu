import { Metadata } from "next"
import { Building2 } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Fassadenreinigung | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Professionelle Fassadenreinigung in Luxemburg. Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
  alternates: {
    canonical: "https://blitzeblank.lu/leistungen/fassadenreinigung",
    languages: {
      de: "/leistungen/fassadenreinigung",
      en: "/en/leistungen/fassadenreinigung",
    },
  },
}

const features = [
  {
    title: "Putzfassaden",
    description: "Schonende Reinigung von verputzten Fassaden ohne Beschädigung der Oberfläche.",
  },
  {
    title: "Klinkerfassaden",
    description: "Gründliche Reinigung von Ziegelstein und Klinker mit Entfernung von Ausblühungen.",
  },
  {
    title: "Metallfassaden",
    description: "Professionelle Pflege von Metallfassaden und Verkleidungen.",
  },
  {
    title: "Glasfassaden",
    description: "Streifenfreie Reinigung von großflächigen Glasfassaden auch in großer Höhe.",
  },
  {
    title: "Betonfassaden",
    description: "Entfernung von Schmutz, Graffiti und Verfärbungen von Betonflächen.",
  },
  {
    title: "Graffiti-Entfernung",
    description: "Professionelle und schonende Entfernung von unerwünschten Graffiti.",
  },
]

const benefits = [
  "Aufwertung des Gebäudeerscheinungsbildes",
  "Werterhalt Ihrer Immobilie",
  "Verschiedene Techniken für jedes Fassadenmaterial",
  "Arbeit in großer Höhe durch geschultes Personal",
  "Hochwertige, materialschonende Reinigungsmittel",
  "Optionaler Fassadenschutz gegen erneute Verschmutzung",
]

const process = [
  { step: "Inspektion", description: "Analyse des Fassadentyps und der Verschmutzung" },
  { step: "Testfläche", description: "Probereinigung zur Methodenbestimmung" },
  { step: "Planung", description: "Detailliertes Angebot mit Zeitplan" },
  { step: "Reinigung", description: "Professionelle Fassadenreinigung" },
  { step: "Schutz", description: "Optional: Versiegelung und Graffitischutz" },
]

export default function FassadenreinigungPage() {
  return (
    <ServicePageTemplate
      slug="fassadenreinigung"
      title="Fassadenreinigung"
      subtitle="Wir entfernen Algen, Schmutz und Verfärbungen schonend und materialgerecht - für eine strahlende Fassade, die lange schön bleibt."
      description="Die Fassade ist das Gesicht Ihres Gebäudes. Umwelteinflüsse, Abgase und organische Ablagerungen hinterlassen im Laufe der Zeit ihre Spuren. Unsere professionelle Fassadenreinigung entfernt selbst hartnäckige Verschmutzungen schonend und effektiv. Wir arbeiten mit verschiedenen Techniken, die optimal auf Ihr Fassadenmaterial abgestimmt sind."
      icon={Building2}
      image="modern+building+facade+exterior+cleaning+architecture"
      features={features}
      benefits={benefits}
      process={process}
    />
  )
}
