import type { MetadataRoute } from "next"

const SITE_URL = "https://blitzeblank.lu"

type RouteEntry = {
  path: string
  priority: number
  changeFrequency: "weekly" | "monthly" | "yearly"
  hasEnglish?: boolean
}

const routes: RouteEntry[] = [
  { path: "", priority: 1, changeFrequency: "weekly", hasEnglish: true },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly", hasEnglish: true },
  { path: "/leistungen/industriereinigung", priority: 0.8, changeFrequency: "monthly", hasEnglish: true },
  { path: "/leistungen/fensterreinigung", priority: 0.8, changeFrequency: "monthly", hasEnglish: true },
  { path: "/leistungen/steinreinigung", priority: 0.8, changeFrequency: "monthly", hasEnglish: true },
  { path: "/leistungen/fassadenreinigung", priority: 0.8, changeFrequency: "monthly", hasEnglish: true },
  { path: "/ueber-uns", priority: 0.6, changeFrequency: "yearly", hasEnglish: true },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly", hasEnglish: true },
  { path: "/angebot", priority: 0.7, changeFrequency: "monthly", hasEnglish: true },
  { path: "/stein-angebot", priority: 0.5, changeFrequency: "monthly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly", hasEnglish: true },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly", hasEnglish: true },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap(({ path, priority, changeFrequency, hasEnglish }) => {
    const germanUrl = `${SITE_URL}${path || "/"}`
    const englishUrl = `${SITE_URL}/en${path}`
    const languages = hasEnglish ? { de: germanUrl, en: englishUrl } : undefined

    const entries: MetadataRoute.Sitemap = [
      {
        url: germanUrl,
        lastModified,
        changeFrequency,
        priority,
        ...(languages ? { alternates: { languages } } : {}),
      },
    ]

    if (hasEnglish) {
      entries.push({
        url: englishUrl,
        lastModified,
        changeFrequency,
        priority: Math.max(priority - 0.1, 0.1),
        alternates: { languages },
      })
    }

    return entries
  })
}
