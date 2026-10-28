import { Metadata } from "next"
import { Factory } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"

export const metadata: Metadata = {
  title: "Nettoyage industriel au Luxembourg | Blitzeblank",
  description:
    "Nettoyage industriel professionnel au Luxembourg. Nous nettoyons halls de production, entrepôts, ateliers et sites industriels selon les normes les plus exigeantes.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/leistungen/industriereinigung",
    languages: {
      de: "/leistungen/industriereinigung",
      en: "/en/leistungen/industriereinigung",
      fr: "/fr/leistungen/industriereinigung",
    },
  },
}

const features = [
  {
    title: "Nettoyage de sols de halls",
    description: "Nettoyage en profondeur de sols industriels en tous genres – béton, époxy, carrelage ou surfaces revêtues.",
  },
  {
    title: "Nettoyage de machines",
    description: "Nettoyage doux et efficace des machines de production sans interrompre l'exploitation.",
  },
  {
    title: "Nettoyage d'entrepôts",
    description: "Nettoyage systématique des zones de stockage et des rayonnages pour une hygiène optimale.",
  },
  {
    title: "Nettoyage de plafonds et murs",
    description: "Élimination de la poussière, des toiles d'araignée et des dépôts dans les zones difficiles d'accès.",
  },
  {
    title: "Nettoyage de ventilation",
    description: "Nettoyage professionnel des installations de ventilation et de climatisation pour une meilleure qualité de l'air.",
  },
  {
    title: "Nettoyages spéciaux",
    description: "Solutions de nettoyage sur mesure pour des exigences et secteurs particuliers.",
  },
]

const benefits = [
  "Perturbation minimale de l'exploitation grâce à des horaires flexibles",
  "Expérience dans tous les environnements industriels courants",
  "Respect de toutes les consignes de sécurité et d'hygiène",
  "Nettoyage régulier ou remise à neuf ponctuelle",
  "Techniques de nettoyage modernes",
  "Contrôle qualité documenté après chaque intervention",
]

const process = [
  { step: "Inspection", description: "Analyse gratuite de vos besoins sur place" },
  { step: "Devis", description: "Devis personnalisé et transparent" },
  { step: "Planification", description: "Horaires flexibles selon vos besoins" },
  { step: "Exécution", description: "Nettoyage professionnel par du personnel formé" },
  { step: "Réception", description: "Contrôle qualité commun" },
]

export default function IndustriereinigungFrPage() {
  return (
    <ServicePageTemplate
      slug="industriereinigung"
      title="Nettoyage industriel"
      heading="Nettoyage industriel au Luxembourg – halls, entrepôts et ateliers"
      subtitle="Nous nettoyons halls de production, entrepôts et ateliers selon les normes les plus exigeantes – efficacement et avec un impact minimal sur votre activité."
      description="Le nettoyage industriel exige un savoir-faire et une expérience spécifiques. Notre personnel formé connaît les exigences des différents secteurs et garantit des conditions de travail hygiéniques dans vos halls de production, entrepôts et ateliers. Nous travaillons efficacement et avec un impact minimal sur votre activité quotidienne."
      icon={Factory}
      image="industrial+factory+production+hall+clean+polished+floor"
      features={features}
      benefits={benefits}
      process={process}
      showResults={false}
      showQuote={false}
      locale="fr"
    />
  )
}
