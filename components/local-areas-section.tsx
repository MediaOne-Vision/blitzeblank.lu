import Link from "next/link"
import { MapPin } from "lucide-react"
import { cities, getLocalLandingPath, localCombos, localServices, type LocalServiceSlug } from "@/lib/local-landing"

/** Interne Verlinkung von einer Leistungsseite zu den lokalen Landingpages (nur Deutsch). */
export function LocalAreasSection({ slug }: { slug: string }) {
  const service = localServices[slug as LocalServiceSlug]
  if (!service) return null

  const available = service.cities.filter((id) => localCombos[service.slug][id])

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
          {service.keyword} in Trier, Bitburg und Luxemburg
        </h2>
        <p className="mb-8 max-w-3xl leading-relaxed text-neutral-600">
          Wir sind an zwei Standorten für Sie da: in Deutschland für Trier, Bitburg und Umgebung und in Luxemburg über die
          BLITZEBLANK S.à r.l. Wählen Sie Ihren Ort und erfahren Sie, was wir dort konkret für Sie tun.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {available.map((id) => (
            <li key={id}>
              <Link
                href={getLocalLandingPath(service.slug, id)}
                className="flex h-full items-center gap-3 rounded-2xl bg-brand-mint p-5 font-display text-lg font-bold text-brand-navy transition-colors hover:bg-brand-sky/30"
              >
                <MapPin className="h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                {service.keyword} in {cities[id].name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
