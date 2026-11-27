import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/treppenhausreinigung", "fr")

export default function TreppenhausreinigungPage() {
  return <ExtraServicePage slug="treppenhausreinigung" locale="fr" />
}
