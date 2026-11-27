import { Metadata } from "next"
import { LeistungenContent } from "@/components/leistungen-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/leistungen", "de")

export default function LeistungenPage() {
  return <LeistungenContent locale="de" />
}
