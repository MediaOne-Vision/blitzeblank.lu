import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("reinigungsnotdienst", "en")

export default function ReinigungsnotdienstPage() {
  return <ExtraServicePage slug="reinigungsnotdienst" locale="en" />
}
