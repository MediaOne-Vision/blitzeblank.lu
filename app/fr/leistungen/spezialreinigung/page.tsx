import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("spezialreinigung", "fr")

export default function SpezialreinigungPage() {
  return <ExtraServicePage slug="spezialreinigung" locale="fr" />
}
