import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"

export const metadata: Metadata = {
  title: "Nettoyage de vitres pour entreprises | Blitzeblank Luxembourg",
  description:
    "Nettoyage de vitres professionnel pour bureaux, commerces et sites professionnels au Luxembourg et dans la région. Visite gratuite, devis ferme clair, rendez-vous fiables.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
      fr: "/fr/leistungen/fensterreinigung",
    },
  },
}

export default function FensterreinigungFrPage() {
  return <WindowCleaningB2BPage locale="fr" />
}
