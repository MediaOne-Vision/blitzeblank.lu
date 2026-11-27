import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/leistungen", "fr")

export default function LeistungenFrPage() {
  return <LeistungenContent locale="fr" />
}
