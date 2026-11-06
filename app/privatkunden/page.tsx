import { HomeContent } from "@/components/home-content"
import { audienceMetadata } from "@/lib/audience-metadata"

export const metadata = audienceMetadata("privat", "de")

export default function Page() {
  return <HomeContent locale="de" audience="privat" />
}
