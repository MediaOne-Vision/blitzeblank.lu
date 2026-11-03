import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("solarreinigung", "fr")

export default function SolarreinigungPage() {
  return <ExtraServicePage slug="solarreinigung" locale="fr" />
}
