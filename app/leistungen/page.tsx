import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"

export const metadata: Metadata = {
  title: "Leistungen | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description:
    "Entdecken Sie unsere professionellen Reinigungsdienstleistungen: Industriereinigung, Fensterreinigung, Steinreinigung und Fassadenreinigung.",
  alternates: {
    canonical: "https://blitzeblank.lu/leistungen",
    languages: {
      de: "/leistungen",
      en: "/en/leistungen",
    },
  },
}

export default function LeistungenPage() {
  return <LeistungenContent locale="de" />
}
