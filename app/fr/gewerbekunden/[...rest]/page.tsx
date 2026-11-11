import {
  audienceSubpageMetadata,
  audienceSubpageParams,
  renderAudienceSubpage,
} from "@/lib/audience-subpage-route"

type Props = {
  params: Promise<{ rest: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export function generateStaticParams() {
  return audienceSubpageParams()
}

export async function generateMetadata({ params }: Props) {
  const { rest } = await params
  return audienceSubpageMetadata("gewerbe", "fr", rest)
}

export default async function Page({ params, searchParams }: Props) {
  const { rest } = await params
  return renderAudienceSubpage("gewerbe", "fr", rest, searchParams)
}
