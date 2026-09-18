import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"

export const metadata: Metadata = {
  title: "Services | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Discover our professional cleaning services: industrial cleaning, window cleaning, stone cleaning and facade cleaning.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/leistungen",
    languages: {
      de: "/leistungen",
      en: "/en/leistungen",
    },
  },
}

export default function LeistungenEnPage() {
  return <LeistungenContent locale="en" />
}
