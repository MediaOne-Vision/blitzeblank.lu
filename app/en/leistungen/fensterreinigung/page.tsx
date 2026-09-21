import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"

export const metadata: Metadata = {
  title: "Window Cleaning for Businesses | Blitzeblank Luxembourg",
  description:
    "Professional window cleaning for offices, shops & commercial properties in Luxembourg and the region. Free on-site visit, clear fixed quote, reliable appointments.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
    },
  },
}

export default function FensterreinigungEnPage() {
  return <WindowCleaningB2BPage locale="en" />
}
