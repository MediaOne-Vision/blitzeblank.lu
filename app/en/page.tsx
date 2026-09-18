import type { Metadata } from "next"
import { HomeContent } from "@/components/home-content"

export const metadata: Metadata = {
  title: "Blitzeblank | Professional Cleaning Services in Luxembourg, Trier & Bitburg",
  description:
    "Blitzeblank offers professional industrial, window, stone and facade cleaning in Luxembourg, Trier, Bitburg and the surrounding region. Fast response times, free on-site assessment and transparent communication.",
  keywords: [
    "cleaning company Luxembourg",
    "cleaning company Trier",
    "cleaning company Bitburg",
    "industrial cleaning",
    "window cleaning",
    "stone cleaning",
    "facade cleaning",
    "commercial cleaning",
  ],
  openGraph: {
    title: "Blitzeblank | Professional Cleaning Services",
    description: "Your partner for professional cleaning in Luxembourg, Trier, Bitburg & the region",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "https://blitzeblank.lu/en",
    languages: {
      de: "/",
      en: "/en",
    },
  },
}

export default function HomeEnPage() {
  return <HomeContent locale="en" />
}
