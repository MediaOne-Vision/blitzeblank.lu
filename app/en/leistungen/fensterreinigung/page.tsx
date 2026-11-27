import { Metadata } from "next"
import { WindowCleaningB2BPage } from "@/components/window-cleaning-b2b-page"
import type { B2BCustomerType } from "@/lib/b2b-inquiry-email"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata("/leistungen/fensterreinigung", "en")

type Props = {
  audience?: B2BCustomerType | null
  searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export default async function FensterreinigungEnPage({ audience = null, searchParams }: Props) {
  const query = searchParams ? await searchParams : {}
  const kunde = Array.isArray(query.kunde) ? query.kunde[0] : query.kunde
  const initialCustomerType: B2BCustomerType | null = kunde === "privat" || kunde === "gewerbe" ? kunde : null
  return <WindowCleaningB2BPage locale="en" audience={audience} initialCustomerType={initialCustomerType} />
}
