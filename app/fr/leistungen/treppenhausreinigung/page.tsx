import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("treppenhausreinigung", "fr")

export default function TreppenhausreinigungPage() {
  return <ExtraServicePage slug="treppenhausreinigung" locale="fr" />
}
