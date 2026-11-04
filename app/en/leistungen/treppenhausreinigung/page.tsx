import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("treppenhausreinigung", "en")

export default function TreppenhausreinigungPage() {
  return <ExtraServicePage slug="treppenhausreinigung" locale="en" />
}
