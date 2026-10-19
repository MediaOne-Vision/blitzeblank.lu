import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Blitzeblank - Cleaning Company in Luxembourg, Trier & Bitburg",
  description:
    "Get in touch with Blitzeblank: questions about industrial, window, stone or facade cleaning? We reply quickly and arrange a free on-site inspection.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/kontakt",
    languages: {
      de: "/kontakt",
      en: "/en/kontakt",
    },
  },
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
