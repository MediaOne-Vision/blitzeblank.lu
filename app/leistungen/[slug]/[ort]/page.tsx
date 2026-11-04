import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocalServicePage } from "@/components/local-service-page"
import { audienceText, getLocalLanding, getLocalLandingParams, getLocalLandingPath } from "@/lib/local-landing"

const SITE_URL = "https://blitzeblank.lu"

type Params = Promise<{ slug: string; ort: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return getLocalLandingParams().map(({ slug, ort }) => ({ slug, ort }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, ort } = await params
  const landing = getLocalLanding(slug, ort)
  if (!landing) return {}
  const { service, city } = landing
  const keywordCity = `${service.keyword} ${city.name}`
  return {
    title: `${keywordCity} | Blitzeblank`,
    description: `${keywordCity} für ${audienceText(service.audiences)}: ${service.topics.slice(0, 3).join(", ")}. Kostenlose Besichtigung, klares Angebot, feste Termine.`,
    alternates: {
      canonical: `${SITE_URL}${getLocalLandingPath(service.slug, city.id)}`,
    },
  }
}

export default async function LocalLandingRoute({ params }: { params: Params }) {
  const { slug, ort } = await params
  const landing = getLocalLanding(slug, ort)
  if (!landing) notFound()
  return <LocalServicePage {...landing} />
}
