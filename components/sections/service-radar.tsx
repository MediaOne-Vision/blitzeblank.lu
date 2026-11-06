import Link from "@/components/audience-link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { localizeHref, type Locale } from "@/lib/i18n"
import { radarFont } from "@/lib/radar-font"

/** Standort: Waldbillig (Luxemburg). Alle Entfernungen werden aus echten Koordinaten berechnet. */
const ORIGIN = { lat: 49.7936, lon: 6.3342 }
const KM_PER_DEG_LAT = 111.2
const KM_PER_DEG_LON = 71.9

const VIEW = 1000
const CENTER = VIEW / 2
const RADIUS = 400
const MAX_KM = 100
const RING_KM = [25, 50, 100] as const
const SWEEP_SECONDS = 10

type Names = Record<Locale, string>

interface City {
  names: Names
  lat: number
  lon: number
  /** Wichtige Orte bleiben auch auf kleinen Bildschirmen beschriftet. */
  major?: boolean
  /** Seite, auf der das Label steht (Standard: nach außen). */
  side?: "left" | "right"
}

const same = (n: string): Names => ({ de: n, en: n, fr: n })

const CITIES: City[] = [
  { names: { de: "Luxemburg", en: "Luxembourg", fr: "Luxembourg" }, lat: 49.6116, lon: 6.1319, major: true },
  { names: { de: "Trier", en: "Trier", fr: "Trèves" }, lat: 49.7499, lon: 6.6371, major: true },
  { names: same("Bitburg"), lat: 49.9741, lon: 6.5226, major: true },
  { names: same("Echternach"), lat: 49.8119, lon: 6.4204, side: "right" },
  { names: same("Diekirch"), lat: 49.8683, lon: 6.1594, side: "left" },
  { names: same("Mersch"), lat: 49.7489, lon: 6.1058, side: "left" },
  { names: same("Saarburg"), lat: 49.6089, lon: 6.5492, side: "right" },
  { names: same("Wiltz"), lat: 49.9656, lon: 5.9331, side: "left" },
  { names: same("Wittlich"), lat: 49.9855, lon: 6.8916, side: "right" },
  { names: same("Arlon"), lat: 49.6833, lon: 5.8167, side: "left" },
  { names: same("Esch-sur-Alzette"), lat: 49.4958, lon: 5.9806, side: "left" },
  { names: same("Merzig"), lat: 49.4428, lon: 6.6372, side: "right" },
  { names: same("Prüm"), lat: 50.2085, lon: 6.4248, side: "right" },
  { names: same("Thionville"), lat: 49.358, lon: 6.168, side: "left" },
  { names: same("Bernkastel-Kues"), lat: 49.9167, lon: 7.0667, side: "right" },
  { names: same("Metz"), lat: 49.1193, lon: 6.1757, side: "left", major: true },
  { names: { de: "Saarbrücken", en: "Saarbrücken", fr: "Sarrebruck" }, lat: 49.2402, lon: 6.9969, side: "right", major: true },
]

interface Placed {
  key: string
  name: string
  km: number
  x: number
  y: number
  bearing: number
  major: boolean
  side: "left" | "right"
}

function place(city: City, locale: Locale): Placed {
  const dx = (city.lon - ORIGIN.lon) * KM_PER_DEG_LON
  const dy = -(city.lat - ORIGIN.lat) * KM_PER_DEG_LAT
  const km = Math.hypot(dx, dy)
  // Wurzel-Skala: Orte in der Nähe bleiben lesbar, der 100-km-Rand passt trotzdem ins Bild.
  const r = RADIUS * Math.sqrt(km / MAX_KM)
  const x = CENTER + (r * dx) / km
  const y = CENTER + (r * dy) / km
  const bearing = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360
  return {
    key: city.names.de,
    name: city.names[locale],
    km,
    x,
    y,
    bearing,
    major: Boolean(city.major),
    side: city.side ?? (x >= CENTER ? "right" : "left"),
  }
}

const ringRadius = (km: number) => RADIUS * Math.sqrt(km / MAX_KM)
const pct = (value: number) => `${(value / VIEW) * 100}%`

const TEXT = {
  de: {
    eyebrow: "Einsatzgebiet",
    heading: "Von Waldbillig aus für Sie unterwegs",
    body: "Wir reinigen in Luxemburg, rund um Trier und Bitburg und in der gesamten Grenzregion. Auch kleinere Orte dazwischen fahren wir regelmäßig an.",
    home: "Unser Standort",
    rings: [
      { km: 25, label: "Kerngebiet" },
      { km: 50, label: "Erweitertes Gebiet" },
      { km: 100, label: "Auf Anfrage" },
    ],
    upTo: "bis",
    cta: "Einsatz an Ihrem Ort anfragen",
    aria: "Radar mit dem Einsatzgebiet von Blitzeblank rund um Waldbillig, Luxemburg, Trier und Bitburg",
  },
  en: {
    eyebrow: "Service area",
    heading: "On the road for you from Waldbillig",
    body: "We clean across Luxembourg, around Trier and Bitburg and throughout the border region. We also visit the smaller towns in between on a regular basis.",
    home: "Our base",
    rings: [
      { km: 25, label: "Core area" },
      { km: 50, label: "Extended area" },
      { km: 100, label: "On request" },
    ],
    upTo: "up to",
    cta: "Ask about service at your location",
    aria: "Radar showing the Blitzeblank service area around Waldbillig, Luxembourg, Trier and Bitburg",
  },
  fr: {
    eyebrow: "Zone d'intervention",
    heading: "Au départ de Waldbillig, à votre service",
    body: "Nous intervenons au Luxembourg, autour de Trèves et de Bitburg et dans toute la région frontalière. Nous desservons aussi régulièrement les petites localités entre ces villes.",
    home: "Notre siège",
    rings: [
      { km: 25, label: "Zone principale" },
      { km: 50, label: "Zone élargie" },
      { km: 100, label: "Sur demande" },
    ],
    upTo: "jusqu'à",
    cta: "Demander une intervention chez vous",
    aria: "Radar de la zone d'intervention de Blitzeblank autour de Waldbillig, Luxembourg, Trèves et Bitburg",
  },
}

const RING_STYLES = ["solid", "dashed", "dotted"] as const

export function ServiceRadar({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const placed = CITIES.map((city) => place(city, locale))

  const groups = RING_KM.map((limit, index) => {
    const lower = index === 0 ? 0 : RING_KM[index - 1]
    return {
      limit,
      label: t.rings[index].label,
      style: RING_STYLES[index],
      cities: placed.filter((c) => c.km > lower && c.km <= limit).sort((a, b) => a.km - b.km),
    }
  })

  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 text-white lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sky">{t.eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-balance sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70 text-pretty">{t.body}</p>

          <dl className="mt-10 max-w-xl divide-y divide-white/10 border-y border-white/10">
            {groups.map((group) => (
              <div key={group.limit} className="flex gap-4 py-4">
                <span
                  aria-hidden="true"
                  className="mt-1 h-4 w-4 shrink-0 rounded-full border-2 border-brand-blue"
                  style={{ borderStyle: group.style }}
                />
                <div>
                  <dt className="font-display text-base font-bold">
                    {group.label}
                    <span className="ml-2 font-sans text-sm font-normal text-white/50">
                      {t.upTo} {group.limit} km
                    </span>
                  </dt>
                  {group.cities.length > 0 && (
                    <dd className="mt-1 text-sm leading-relaxed text-white/65">
                      {group.cities.map((c) => c.name).join(", ")}
                    </dd>
                  )}
                </div>
              </div>
            ))}
          </dl>

          <Button
            asChild
            size="lg"
            className="group mt-10 rounded-full bg-brand-blue px-8 text-white hover:bg-brand-sky hover:text-brand-navy"
          >
            <Link href={localizeHref("/kontakt", locale)}>
              {t.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div
          role="img"
          aria-label={t.aria}
          className={`${radarFont.className} relative mx-auto aspect-square w-full max-w-[640px]`}
          style={{ "--radar-period": `${SWEEP_SECONDS}s` } as React.CSSProperties}
        >
          <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <radialGradient id="radar-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4AADE4" stopOpacity="0.28" />
                <stop offset="55%" stopColor="#4AADE4" stopOpacity="0.07" />
                <stop offset="100%" stopColor="#4AADE4" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="url(#radar-glow)" />
            <line x1={CENTER} y1={CENTER - RADIUS - 30} x2={CENTER} y2={CENTER + RADIUS + 30} stroke="white" strokeOpacity="0.1" />
            <line x1={CENTER - RADIUS - 30} y1={CENTER} x2={CENTER + RADIUS + 30} y2={CENTER} stroke="white" strokeOpacity="0.1" />
            {RING_KM.map((km, index) => (
              <circle
                key={km}
                cx={CENTER}
                cy={CENTER}
                r={ringRadius(km)}
                fill="none"
                stroke="#7FCDEE"
                strokeOpacity={index === 0 ? 0.55 : 0.35}
                strokeWidth={index === 0 ? 2 : 1.5}
                strokeDasharray={index === 1 ? "10 8" : index === 2 ? "2 8" : undefined}
                strokeLinecap="round"
              />
            ))}
          </svg>

          <div className="absolute inset-[10%] rounded-full">
            <div className="radar-sweep absolute inset-0 rounded-full">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from -70deg, rgba(74,173,228,0) 0deg, rgba(74,173,228,0.5) 70deg, rgba(74,173,228,0) 70deg)",
                }}
              />
              <div className="absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-sky to-transparent" />
            </div>
          </div>

          <div className="absolute inset-0">
            {RING_KM.map((km) => (
              <span
                key={km}
                className="absolute -translate-x-full -translate-y-1/2 bg-brand-navy px-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-xs"
                style={{ left: pct(CENTER - 6), top: pct(CENTER - ringRadius(km)) }}
              >
                {km} km
              </span>
            ))}

            {placed.map((city) => {
              const delay = `${((city.bearing / 360) * SWEEP_SECONDS - SWEEP_SECONDS).toFixed(2)}s`
              return (
                <div
                  key={city.key}
                  className={`absolute ${city.major ? "" : "max-sm:hidden"}`}
                  style={{ left: pct(city.x), top: pct(city.y) }}
                >
                  <span
                    aria-hidden="true"
                    className={`radar-ping absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sky ${
                      city.major ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-2.5 w-2.5"
                    }`}
                    style={{ animationDelay: delay }}
                  />
                  <span
                    aria-hidden="true"
                    className={`radar-blip absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      city.major ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-2 w-2"
                    }`}
                    style={{ animationDelay: delay }}
                  />
                  <span
                    className={`radar-label absolute top-0 -translate-y-1/2 whitespace-nowrap ${
                      city.side === "right" ? "left-0 ml-3.5" : "right-0 mr-3.5"
                    } ${city.major ? "text-xs font-semibold tracking-wide sm:text-base" : "text-[13px] font-medium tracking-wide"}`}
                    style={{ animationDelay: delay }}
                  >
                    {city.name}
                  </span>
                </div>
              )
            })}

            <div className="absolute" style={{ left: "50%", top: "50%" }}>
              <span
                aria-hidden="true"
                className="radar-home-pulse absolute left-0 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-sky sm:h-10 sm:w-10"
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-sky shadow-[0_0_24px_6px_rgba(74,173,228,0.7)] ring-[6px] ring-brand-sky/30 sm:h-6 sm:w-6"
              />
              <span className="absolute left-0 top-0 mt-5 -translate-x-1/2 whitespace-nowrap text-sm font-bold uppercase tracking-[0.2em] text-white sm:mt-6 sm:text-lg">
                Waldbillig
              </span>
              <span className="sr-only">{t.home}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
