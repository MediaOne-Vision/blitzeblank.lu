import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"
import type { B2BCustomerType } from "@/lib/b2b-inquiry-email"

export const metadata: Metadata = {
  title: "Fensterreinigung Trier, Bitburg & Luxemburg | Blitzeblank",
  description:
    "Professionelle Fensterreinigung in Trier, Bitburg und Luxemburg für Privat- und Gewerbekunden. Kostenlose Besichtigung, klares Festangebot, zuverlässige Termine.",
  alternates: {
    canonical: "https://blitzeblank.lu/leistungen/fensterreinigung",
    languages: {
      de: "/leistungen/fensterreinigung",
      en: "/en/leistungen/fensterreinigung",
    },
  },
}

type Props = {
  audience?: B2BCustomerType | null
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function FensterreinigungPage({ audience = null, searchParams }: Props) {
  const query = searchParams ? await searchParams : {}
  const kunde = Array.isArray(query.kunde) ? query.kunde[0] : query.kunde
  const initialCustomerType: B2BCustomerType | null = kunde === "privat" || kunde === "gewerbe" ? kunde : null
  return <WindowCleaningB2BPage locale="de" audience={audience} initialCustomerType={initialCustomerType} />
}
