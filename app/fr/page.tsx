import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"

export const metadata: Metadata = {
  title: "Blitzeblank | Services de nettoyage au Luxembourg",
  description:
    "Blitzeblank propose le nettoyage professionnel industriel, de vitres, de pierre et de façades au Luxembourg, à Trèves, Bitbourg et dans la région. Réactivité, visite gratuite sur place et communication transparente.",
  keywords: [
    "entreprise de nettoyage Luxembourg",
    "entreprise de nettoyage Trèves",
    "entreprise de nettoyage Bitbourg",
    "nettoyage industriel",
    "nettoyage de vitres",
    "nettoyage de pierre",
    "nettoyage de façades",
    "nettoyage professionnel",
  ],
  openGraph: {
    title: "Blitzeblank | Services de nettoyage professionnels",
    description:
      "Votre partenaire pour le nettoyage professionnel au Luxembourg, à Trèves, Bitbourg et dans la région",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://blitzeblank.lu/fr",
    languages: {
      de: "/",
      en: "/en",
      fr: "/fr",
    },
  },
}

export default function HomeFrPage() {
  return <HomeContent locale="fr" />
}
