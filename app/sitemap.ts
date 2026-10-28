import type { MetadataRoute } from "next"

const SITE_URL = "https://blitzeblank.lu"

type RouteEntry = {
  path: string
  priority: number
  changeFrequency: "weekly" | "monthly" | "yearly"
  translated?: boolean
}

const routes: RouteEntry[] = [
  { path: "", priority: 1, changeFrequency: "weekly", translated: true },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly", translated: true },
  { path: "/leistungen/industriereinigung", priority: 0.8, changeFrequency: "monthly", translated: true },
  { path: "/leistungen/fensterreinigung", priority: 0.8, changeFrequency: "monthly", translated: true },
  { path: "/leistungen/steinreinigung", priority: 0.8, changeFrequency: "monthly", translated: true },
  { path: "/leistungen/fassadenreinigung", priority: 0.8, changeFrequency: "monthly", translated: true },
  { path: "/ueber-uns", priority: 0.6, changeFrequency: "yearly", translated: true },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly", translated: true },
  { path: "/angebot", priority: 0.7, changeFrequency: "monthly", translated: true },
  { path: "/stein-angebot", priority: 0.5, changeFrequency: "monthly" },
  { path: "/impressum", priority: 0.2, changeFrequency: "yearly", translated: true },
  { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly", translated: true },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.flatMap(({ path, priority, changeFrequency, translated }) => {
    const germanUrl = `${SITE_URL}${path || "/"}`
    const englishUrl = `${SITE_URL}/en${path}`
    const frenchUrl = `${SITE_URL}/fr${path}`
    const languages = translated ? { de: germanUrl, en: englishUrl, fr: frenchUrl } : undefined

    const entries: MetadataRoute.Sitemap = [
      {
        url: germanUrl,
        lastModified,
        changeFrequency,
        priority,
        ...(languages ? { alternates: { languages } } : {}),
      },
    ]

    if (translated) {
      for (const url of [englishUrl, frenchUrl]) {
        entries.push({
          url,
          lastModified,
          changeFrequency,
          priority: Math.max(priority - 0.1, 0.1),
          alternates: { languages },
        })
      }
    }

    return entries
  })
}
