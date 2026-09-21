import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"

export const metadata: Metadata = {
  title: "Fensterreinigung für Unternehmen | Blitzeblank Luxemburg",
  description:
    "Professionelle Fensterreinigung für Büros, Geschäfte & Gewerbe in Luxemburg und Region. Kostenlose Objektbesichtigung, klares Festangebot, zuverlässige Termine.",
  alternates: {
    canonical: "https://blitzeblank.lu/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
    },
  },
}

export default function FensterreinigungPage() {
  return <WindowCleaningB2BPage locale="de" />
}
