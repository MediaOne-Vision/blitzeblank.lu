import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/solarreinigung", "fr")

export default function SolarreinigungPage() {
  return <ExtraServicePage slug="solarreinigung" locale="fr" />
}
