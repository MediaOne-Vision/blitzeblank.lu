import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/", "de")

export default function HomePage() {
  return <HomeContent locale="de" />
}
