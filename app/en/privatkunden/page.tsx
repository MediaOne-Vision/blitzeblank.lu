import { HomeContent } from "@/components/home-content"
import { audienceMetadata } from "@/lib/audience-metadata"

export const metadata = audienceMetadata("privat", "en")

export default function Page() {
  return <HomeContent locale="en" audience="privat" />
}
