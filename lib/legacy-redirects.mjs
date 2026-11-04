const services = [
  "fensterreinigung",
  "fassadenreinigung",
  "steinreinigung",
  "industriereinigung",
  "unterhaltsreinigung",
  "spezialreinigung",
  "solarreinigung",
  "reinigungsnotdienst",
  "treppenhausreinigung",
]

const cities = ["trier", "bitburg", "luxemburg"]

const permanent = (source, destination, extra = {}) => ({ source, destination, permanent: true, ...extra })

// Alte Blog-Beiträge: Es gibt keinen Blog mehr, daher Weiterleitung auf die thematisch passende Leistungsseite.
// Reihenfolge ist wichtig: Die erste passende Regel gewinnt.
const blogRules = [
  { match: "glasreinigung-trier", to: "/leistungen/fensterreinigung/trier" },
  { match: "fensterreinigung-luxemburg", to: "/leistungen/fensterreinigung/luxemburg" },
  { match: "industriereinigung-luxemburg.*", to: "/leistungen/industriereinigung/luxemburg" },
  { match: ".*(solar|photovoltaik).*", to: "/leistungen/solarreinigung" },
  { match: ".*(glas|[Ff]enster|osmose|window).*", to: "/leistungen/fensterreinigung" },
  { match: ".*fassade.*", to: "/leistungen/fassadenreinigung" },
  { match: ".*(stein|stone|terrasse|pflaster|einfahrt|moos|alge|aussenfl).*", to: "/leistungen/steinreinigung" },
  { match: ".*trockeneis.*", to: "/leistungen/spezialreinigung" },
  { match: ".*(industrie|hallen|industriehalle).*", to: "/leistungen/industriereinigung" },
  { match: ".*(praxis|qualitaetskontrolle|reinigung-mit-plan).*", to: "/leistungen/unterhaltsreinigung" },
  { match: ".*(festpreis|erstbesichtigung|pricing|calculator).*", to: "/angebot" },
]

export function resolveBlogDestination(post) {
  if (!post) return "/leistungen"
  const rule = blogRules.find(({ match }) => new RegExp(`^${match}$`).test(post))
  return rule ? rule.to : "/leistungen"
}

const postRedirects = [
  permanent("/post/:slug(.*fenster.*)", "/leistungen/fensterreinigung"),
  permanent("/post/:slug(.*trockeneis.*)", "/leistungen/spezialreinigung"),
  permanent("/post/:slug(.*stein.*)", "/leistungen/steinreinigung"),
  permanent("/post/:path*", "/leistungen"),
]

// Alte Struktur /leistungen-gewerbe/... und /leistungen-privat/... gibt es nicht mehr, alle Leistungen stehen unter /leistungen.
const audienceRedirects = ["gewerbe", "privat"].flatMap((audience) => [
  permanent(`/leistungen-${audience}`, "/leistungen"),
  permanent(`/leistungen-${audience}/trockeneisreinigung`, "/leistungen/spezialreinigung"),
  ...services.map((slug) => permanent(`/leistungen-${audience}/${slug}`, `/leistungen/${slug}`)),
  permanent(`/leistungen-${audience}/:path*`, "/leistungen"),
])

const localRedirects = cities.flatMap((city) => [
  permanent(`/fensterreinigung-in-${city}`, `/leistungen/fensterreinigung/${city}`),
  permanent(`/terrassenreinigung-${city}`, `/leistungen/steinreinigung/${city}`),
])

const pageRedirects = [
  permanent("/fassadenreinigung", "/leistungen/fassadenreinigung"),
  permanent("/gebauedepflege", "/leistungen/unterhaltsreinigung"),
  permanent("/reinigungsfirma", "/"),
  permanent("/referenzen-gebaeudereinigung", "/"),
  permanent("/haeufig-gestellte-fragen", "/#faq"),
  permanent("/faq-reinigungsdienst-in-bitburg-luxemburg", "/#faq"),
  permanent("/lb", "/"),
  permanent("/lb/angebot-anfordern", "/angebot"),
  permanent("/lb/faq-reinigungsdienst-in-bitburg-luxemburg", "/#faq"),
  permanent("/lb/:path*", "/"),
]

export const legacyRedirects = [
  ...postRedirects,
  ...audienceRedirects,
  ...localRedirects,
  ...pageRedirects,
]
