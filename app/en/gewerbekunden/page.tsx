import { HomeContent } from "@/components/home-content"
import { audienceMetadata } from "@/lib/audience-metadata"

export const metadata = audienceMetadata("gewerbe", "en")

export default function Page() {
  return <HomeContent locale="en" audience="gewerbe" />
}
