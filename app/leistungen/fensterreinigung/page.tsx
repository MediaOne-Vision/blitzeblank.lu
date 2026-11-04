import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"

export const metadata: Metadata = {
  title: "Fensterreinigung Trier, Bitburg & Luxemburg | Blitzeblank",
  description:
    "Professionelle Fensterreinigung in Trier, Bitburg und Luxemburg für Privat- und Gewerbekunden. Kostenlose Besichtigung, klares Festangebot, zuverlässige Termine.",
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
