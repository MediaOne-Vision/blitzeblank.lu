import { ExtraServicePage } from "@/components/extra-service-page"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata("/leistungen/unterhaltsreinigung", "en")

export default function UnterhaltsreinigungPage() {
  return <ExtraServicePage slug="unterhaltsreinigung" locale="en" />
}
