import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("spezialreinigung", "de")

export default function SpezialreinigungPage() {
  return <ExtraServicePage slug="spezialreinigung" locale="de" />
}
