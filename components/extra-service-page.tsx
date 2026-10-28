import type { Metadata } from "next"
import { Layers, Sparkles } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"
import { extraServiceContent, type ExtraServiceSlug } from "@/lib/extra-service-content"
import { localizeHref, type Locale } from "@/lib/i18n"

const SITE_URL = "https://blitzeblank.lu"

const IMAGE_QUERY: Record<ExtraServiceSlug, string> = {
  unterhaltsreinigung: "clean+modern+office+interior+cleaning+maintenance",
  treppenhausreinigung: "clean+apartment+building+stairwell+staircase+entrance",
}

export function getExtraServiceMetadata(slug: ExtraServiceSlug, locale: Locale): Metadata {
  const content = extraServiceContent[slug][locale]
  const path = `/leistungen/${slug}`
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${localizeHref(path, locale)}`,
      languages: {
        de: localizeHref(path, "de"),
        en: localizeHref(path, "en"),
        fr: localizeHref(path, "fr"),
      },
    },
  }
}

export function ExtraServicePage({ slug, locale }: { slug: ExtraServiceSlug; locale: Locale }) {
  const content = extraServiceContent[slug][locale]
  return (
    <ServicePageTemplate
      slug={slug}
      title={content.title}
      heading={content.heading}
      subtitle={content.subtitle}
      description={content.metaDescription}
      icon={slug === "unterhaltsreinigung" ? Sparkles : Layers}
      image={IMAGE_QUERY[slug]}
      features={content.features}
      benefits={content.benefits}
      process={content.process}
      showResults={false}
      showQuote={false}
      locale={locale}
    />
  )
}
