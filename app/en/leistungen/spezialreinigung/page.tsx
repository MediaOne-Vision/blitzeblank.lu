import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("spezialreinigung", "en")

export default function SpezialreinigungPage() {
  return <ExtraServicePage slug="spezialreinigung" locale="en" />
}
