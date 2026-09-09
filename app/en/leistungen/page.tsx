import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"

export const metadata: Metadata = {
  title: "Services | Blitzeblank - Professional Cleaning in Luxembourg",
  description:
    "Discover our professional cleaning services: industrial cleaning, window cleaning, stone cleaning and facade cleaning.",
}

export default function LeistungenEnPage() {
  return <LeistungenContent locale="en" />
}
