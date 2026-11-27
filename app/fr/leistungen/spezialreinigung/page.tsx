import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/spezialreinigung", "fr")

export default function SpezialreinigungPage() {
  return <ExtraServicePage slug="spezialreinigung" locale="fr" />
}
