import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/", "fr")

export default function HomeFrPage() {
  return <HomeContent locale="fr" />
}
