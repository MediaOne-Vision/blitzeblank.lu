import type { Metadata } from "next"
import { Layers, Siren, Sparkles, SprayCan, SunMedium, type LucideIcon } from "lucide-react"
import { ServicePageTemplate } from "@/components/service-page-template"
import { extraServiceContent, type ExtraServiceSlug } from "@/lib/extra-service-content"
import { localizeHref, type Locale } from "@/lib/i18n"

const SITE_URL = "https://blitzeblank.lu"

const IMAGE_QUERY: Record<ExtraServiceSlug, string> = {
  unterhaltsreinigung: "clean+modern+office+interior+cleaning+maintenance",
  treppenhausreinigung: "clean+apartment+building+stairwell+staircase+entrance",
  spezialreinigung: "deep+cleaning+living+room+sofa+upholstery",
  solarreinigung: "clean+solar+panels+roof+photovoltaic+blue+sky",
  reinigungsnotdienst: "cleaning+team+urgent+emergency+service+building",
}

const ICONS: Record<ExtraServiceSlug, LucideIcon> = {
  unterhaltsreinigung: Sparkles,
  treppenhausreinigung: Layers,
  spezialreinigung: SprayCan,
  solarreinigung: SunMedium,
  reinigungsnotdienst: Siren,
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
      icon={ICONS[slug]}
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
