import { Metadata } from "next"
import { Building2 } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Nettoyage de façades au Luxembourg | Blitzeblank",
  description:
    "Nettoyage de façades professionnel au Luxembourg. Nettoyage extérieur de façades en tous genres – des immeubles de bureaux aux sites industriels.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/leistungen/fassadenreinigung",
    languages: {
      de: "/leistungen/fassadenreinigung",
      en: "/en/leistungen/fassadenreinigung",
      fr: "/fr/leistungen/fassadenreinigung",
    },
  },
}

const features = [
  {
    title: "Façades crépies",
    description: "Nettoyage en douceur des façades crépies sans abîmer la surface.",
  },
  {
    title: "Façades en brique",
    description: "Nettoyage en profondeur de la brique et du clinker avec élimination des efflorescences.",
  },
  {
    title: "Façades métalliques",
    description: "Entretien professionnel des façades et bardages métalliques.",
  },
  {
    title: "Façades en verre",
    description: "Nettoyage sans traces des grandes façades vitrées, même en hauteur.",
  },
  {
    title: "Façades en béton",
    description: "Élimination des salissures, graffitis et décolorations sur les surfaces en béton.",
  },
  {
    title: "Retrait de graffitis",
    description: "Retrait professionnel et doux des graffitis indésirables.",
  },
]

const benefits = [
  "Valorise l'apparence de votre bâtiment",
  "Préserve la valeur de votre bien",
  "Des techniques adaptées à chaque matériau de façade",
  "Travaux en hauteur par du personnel formé",
  "Produits de nettoyage de qualité, respectueux des matériaux",
  "Protection de façade en option contre un nouvel encrassement",
]

const process = [
  { step: "Inspection", description: "Analyse du type de façade et du degré d'encrassement" },
  { step: "Zone d'essai", description: "Nettoyage test pour déterminer la méthode" },
  { step: "Planification", description: "Devis détaillé avec calendrier" },
  { step: "Nettoyage", description: "Nettoyage de façade professionnel" },
  { step: "Protection", description: "En option : imprégnation et revêtement anti-graffiti" },
]

export default function FassadenreinigungFrPage() {
  return (
    <ServicePageTemplate
      slug="fassadenreinigung"
      title="Nettoyage de façades"
      heading="Nettoyage de façades au Luxembourg – doux et adapté aux matériaux"
      subtitle="Nous éliminons algues, salissures et décolorations en douceur et dans le respect des matériaux – pour une façade éclatante qui reste belle plus longtemps."
      description="La façade est le visage de votre bâtiment. Avec le temps, les influences environnementales, les gaz d'échappement et les dépôts organiques laissent des traces. Notre nettoyage de façades professionnel élimine efficacement et en douceur même les salissures tenaces. Nous travaillons avec différentes techniques, parfaitement adaptées au matériau de votre façade."
      icon={Building2}
      image="modern+building+facade+exterior+cleaning+architecture"
      features={features}
      benefits={benefits}
      process={process}
      locale="fr"
    />
  )
}
