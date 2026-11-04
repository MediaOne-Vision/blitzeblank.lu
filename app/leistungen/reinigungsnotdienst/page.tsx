import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("reinigungsnotdienst", "de")

export default function ReinigungsnotdienstPage() {
  return <ExtraServicePage slug="reinigungsnotdienst" locale="de" />
}
