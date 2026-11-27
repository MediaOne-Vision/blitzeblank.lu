import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/kontakt", "de")

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
