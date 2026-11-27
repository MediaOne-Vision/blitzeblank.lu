import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/solarreinigung", "de")

export default function SolarreinigungPage() {
  return <ExtraServicePage slug="solarreinigung" locale="de" />
}
