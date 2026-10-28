import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"

export const metadata: Metadata = {
  title: "Prestations | Blitzeblank Luxembourg",
  description:
    "Découvrez nos prestations de nettoyage professionnelles : nettoyage industriel, de vitres, de pierre et de façades.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/leistungen",
    languages: {
      de: "/leistungen",
      en: "/en/leistungen",
      fr: "/fr/leistungen",
    },
  },
}

export default function LeistungenFrPage() {
  return <LeistungenContent locale="fr" />
}
