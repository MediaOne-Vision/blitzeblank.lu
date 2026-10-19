import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt | Blitzeblank - Reinigungsfirma in Luxemburg, Trier & Bitburg",
  description:
    "Nehmen Sie Kontakt mit Blitzeblank auf: Fragen zu Industrie-, Fenster-, Stein- oder Fassadenreinigung? Wir melden uns schnell und vereinbaren einen kostenlosen Besichtigungstermin.",
  alternates: {
    canonical: "https://blitzeblank.lu/kontakt",
    languages: {
      de: "/kontakt",
      en: "/en/kontakt",
    },
  },
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
