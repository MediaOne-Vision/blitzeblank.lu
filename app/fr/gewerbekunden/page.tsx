import { HomeContent } from "@/components/home-content"
import { audienceMetadata } from "@/lib/audience-metadata"

export const metadata = audienceMetadata("gewerbe", "fr")

export default function Page() {
  return <HomeContent locale="fr" audience="gewerbe" />
}
