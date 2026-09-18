import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://blitzeblank.lu/",
    languages: {
      de: "/",
      en: "/en",
    },
  },
}

export default function HomePage() {
  return <HomeContent locale="de" />
}
