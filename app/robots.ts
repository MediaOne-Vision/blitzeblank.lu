import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/", "/danke", "/en/danke", "/kontakt/danke", "/en/kontakt/danke", "/stein-angebot/danke", "/preisabsage-danke", "/en/preisabsage-danke"],
    },
    sitemap: "https://blitzeblank.lu/sitemap.xml",
  }
}
