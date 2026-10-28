import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Blitzeblank Nettoyage Luxembourg",
  description:
    "Contactez Blitzeblank : des questions sur le nettoyage industriel, de vitres, de pierre ou de façades ? Nous répondons rapidement et organisons une visite gratuite sur place.",
  alternates: {
    canonical: "https://blitzeblank.lu/fr/kontakt",
    languages: {
      de: "/kontakt",
      en: "/en/kontakt",
      fr: "/fr/kontakt",
    },
  },
}

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return children
}
