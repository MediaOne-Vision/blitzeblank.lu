import { Metadata } from "next"
import { Mountain } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Nettoyage de pierre au Luxembourg | Blitzeblank",
  description:
    "Nettoyage de pierre professionnel au Luxembourg. Entretien et nettoyage experts de la pierre naturelle, des pavés, des terrasses et des espaces extérieurs.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/leistungen/steinreinigung",
    languages: {
      de: "/leistungen/steinreinigung",
      en: "/en/leistungen/steinreinigung",
      fr: "/fr/leistungen/steinreinigung",
    },
  },
}

const features = [
  {
    title: "Nettoyage de pierre naturelle",
    description: "Nettoyage en douceur du marbre, du granit, du grès et d'autres pierres naturelles.",
  },
  {
    title: "Nettoyage de pavés",
    description: "Nettoyage en profondeur des surfaces pavées, avec élimination de la mousse et des mauvaises herbes.",
  },
  {
    title: "Nettoyage de terrasses",
    description: "Nettoyage et entretien professionnels des terrasses en pierre ou en béton.",
  },
  {
    title: "Nettoyage d'escaliers",
    description: "Nettoyage sûr et minutieux des escaliers extérieurs et des entrées.",
  },
  {
    title: "Rénovation de maçonnerie",
    description: "Nettoyage et remise en état de vieux murs et de surfaces en pierre.",
  },
  {
    title: "Scellement",
    description: "Protection en option des surfaces nettoyées grâce à un scellement professionnel.",
  },
]

const benefits = [
  "Traitement expert des différents types de pierre",
  "Nettoyage haute pression à pression adaptée",
  "Produits de nettoyage de qualité, respectueux des matériaux",
  "Élimination de la mousse, des algues et des décolorations",
  "Imprégnation en option pour une protection durable",
  "Valorise l'apparence de votre bien",
]

const process = [
  { step: "Inspection", description: "Analyse du type de pierre et du degré d'encrassement" },
  { step: "Zone d'essai", description: "Nettoyage test à un endroit discret" },
  { step: "Devis", description: "Devis personnalisé avec scellement en option" },
  { step: "Nettoyage", description: "Nettoyage expert avec une technique adaptée" },
  { step: "Scellement", description: "En option : traitement protecteur pour une propreté durable" },
]

export default function SteinreinigungFrPage() {
  return (
    <ServicePageTemplate
      slug="steinreinigung"
      title="Nettoyage de pierre"
      heading="Nettoyage de pierre au Luxembourg – terrasses, pavés et pierre naturelle"
      subtitle="Nous débarrassons en douceur la pierre naturelle, les pavés et les terrasses de la mousse, des algues et des traces d'usure – pour leur redonner leur éclat naturel."
      description="Avec le temps, les surfaces en pierre s'abîment sous l'effet des intempéries, de la mousse, des algues et de la saleté. Notre nettoyage de pierre professionnel redonne vie à vos surfaces extérieures. Grâce à des techniques adaptées à chaque type de pierre, nous garantissons un nettoyage doux et minutieux qui préserve le caractère naturel de vos surfaces."
      icon={Mountain}
      image="clean+natural+stone+pavement+terrace+outdoor+pressure+washing"
      features={features}
      benefits={benefits}
      process={process}
      locale="fr"
    />
  )
}
