import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/reinigungsnotdienst", "en")

export default function ReinigungsnotdienstPage() {
  return <ExtraServicePage slug="reinigungsnotdienst" locale="en" />
}
