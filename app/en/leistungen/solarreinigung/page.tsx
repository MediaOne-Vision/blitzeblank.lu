import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("solarreinigung", "en")

export default function SolarreinigungPage() {
  return <ExtraServicePage slug="solarreinigung" locale="en" />
}
