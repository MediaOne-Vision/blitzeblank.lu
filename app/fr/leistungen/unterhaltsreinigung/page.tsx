import { ExtraServicePage, getExtraServiceMetadata } from "@/components/extra-service-page"

export const metadata = getExtraServiceMetadata("unterhaltsreinigung", "fr")

export default function UnterhaltsreinigungPage() {
  return <ExtraServicePage slug="unterhaltsreinigung" locale="fr" />
}
