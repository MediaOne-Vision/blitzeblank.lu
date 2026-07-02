import { Metadata } from "next"
import { Snowflake } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Trockeneisreinigung | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Professionelle Trockeneisreinigung in Luxemburg. Schonende und effektive Reinigung ohne Chemie oder Wasser - ideal für empfindliche Oberflächen.",
}

const features = [
  {
    title: "Maschinenreinigung",
    description: "Schonende Reinigung von Produktionsmaschinen ohne Demontage und Stillstandzeit.",
  },
  {
    title: "Elektronikreinigung",
    description: "Sichere Reinigung von elektrischen Anlagen und Schaltschränken ohne Feuchtigkeit.",
  },
  {
    title: "Oberflächenreinigung",
    description: "Entfernung von Lack, Rost, Öl und anderen Verunreinigungen ohne Beschädigung.",
  },
  {
    title: "Werkzeugreinigung",
    description: "Gründliche Reinigung von Werkzeugen und Formen ohne Verschleiß.",
  },
  {
    title: "Fahrzeugreinigung",
    description: "Effektive Reinigung von Motoren, Unterböden und schwer zugänglichen Stellen.",
  },
  {
    title: "Denkmalpflege",
    description: "Behutsame Reinigung von historischen Oberflächen und Fassaden.",
  },
]

const benefits = [
  "Keine Chemikalien - umweltfreundlich und sicher",
  "Keine Feuchtigkeit - ideal für elektrische Anlagen",
  "Kein Abrieb - schont empfindliche Oberflächen",
  "Minimale Stillstandzeiten - sofortige Wiederinbetriebnahme",
  "Rückstandsfrei - das Trockeneis verdampft vollständig",
  "Vielseitig einsetzbar in verschiedenen Branchen",
]

const process = [
  { step: "Analyse", description: "Prüfung der zu reinigenden Oberflächen und Materialien" },
  { step: "Beratung", description: "Empfehlung der optimalen Reinigungsparameter" },
  { step: "Vorbereitung", description: "Abdeckung und Schutz empfindlicher Bereiche" },
  { step: "Trockeneisreinigung", description: "Präzise Reinigung mit modernster Technik" },
  { step: "Nachkontrolle", description: "Dokumentierte Qualitätsprüfung" },
]

export default function TrockeneisreinigungPage() {
  return (
    <ServicePageTemplate
      slug="trockeneisreinigung"
      title="Trockeneisreinigung"
      subtitle="Mit gefrorenen CO2-Pellets entfernen wir selbst hartnäckige Verschmutzungen völlig ohne Chemie, Wasser oder Abrieb. Diese innovative Methode eignet sich ideal für empfindliche Oberflächen, Elektronik und Maschinen, die schonend und rückstandsfrei gereinigt werden müssen."
      description="Die Trockeneisreinigung ist eine revolutionäre Methode zur schonenden Entfernung von Verschmutzungen aller Art. Durch den Einsatz von gefrorenen CO2-Pellets wird der Schmutz durch thermischen Schock und kinetische Energie abgetragen - ohne Chemikalien, Wasser oder Abrieb. Ideal für empfindliche Oberflächen, Elektronik und Produktionsanlagen."
      icon={Snowflake}
      image="dry+ice+blasting+industrial+cleaning+machine+vapor"
      features={features}
      benefits={benefits}
      process={process}
    />
  )
}
