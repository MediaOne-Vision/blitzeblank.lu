import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/leistungen", "en")

export default function LeistungenEnPage() {
  return <LeistungenContent locale="en" />
}
