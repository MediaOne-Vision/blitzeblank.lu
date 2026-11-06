import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SUBPAGE_LOADERS } from "@/lib/audience-subpages"
import { AUDIENCE_PATHS } from "@/lib/audience"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const SITE = "https://blitzeblank.lu"

function toCanonicalPath(rest: string[]) {
  return `/${rest.join("/")}`
}

function audienceUrl(audience: Audience, canonicalPath: string, locale: Locale) {
  return `${SITE}${localizeHref(`${AUDIENCE_PATHS[audience]}${canonicalPath}`, locale)}`
}

export function audienceSubpageParams() {
  return Object.keys(SUBPAGE_LOADERS.de).map((path) => ({ rest: path.split("/").filter(Boolean) }))
}

export async function audienceSubpageMetadata(
  audience: Audience,
  locale: Locale,
  rest: string[],
): Promise<Metadata> {
  const path = toCanonicalPath(rest)
  const loader = SUBPAGE_LOADERS[locale][path]
  if (!loader) return {}
  const mod = await loader()
  const base = (mod.metadata ?? {}) as Metadata
  return {
    ...base,
    alternates: {
      canonical: audienceUrl(audience, path, locale),
      languages: {
        de: audienceUrl(audience, path, "de"),
        en: audienceUrl(audience, path, "en"),
        fr: audienceUrl(audience, path, "fr"),
      },
    },
  }
}

export async function renderAudienceSubpage(
  locale: Locale,
  rest: string[],
  searchParams: Promise<Record<string, string | string[] | undefined>>,
) {
  const loader = SUBPAGE_LOADERS[locale][toCanonicalPath(rest)]
  if (!loader) notFound()
  const { default: Page } = await loader()
  return <Page searchParams={searchParams} />
}
