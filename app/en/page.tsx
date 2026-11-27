import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/", "en")

export default function HomeEnPage() {
  return <HomeContent locale="en" />
}
