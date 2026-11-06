import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react"
import { EmbeddedContactForm } from "@/components/embedded-contact-form"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getServiceMedia } from "@/lib/service-media"
import { getAudienceLabel } from "@/lib/locations"
import {
  audienceText,
  cities,
  getLocalLandingPath,
  localCombos,
  localServices,
  CITY_IDS,
  type City,
  type LocalCombo,
  type LocalService,
  type LocalServiceSlug,
} from "@/lib/local-landing"

const SITE_URL = "https://blitzeblank.lu"

const PROCESS_STEPS = [
  {
    title: "Kostenlose Besichtigung",
    text: "Wir schauen uns Ihr Objekt vor Ort an, klären Wünsche und Besonderheiten und nehmen Maße und Zustand auf.",
  },
  {
    title: "Klares Angebot",
    text: "Sie erhalten ein transparentes Angebot mit festem Leistungsumfang, damit Sie vorab wissen, was auf Sie zukommt.",
  },
  {
    title: "Termin nach Absprache",
    text: "Wir vereinbaren einen Termin, der zu Ihrem Alltag oder Betrieb passt, einmalig oder in festen Intervallen.",
  },
  {
    title: "Durchführung und Abnahme",
    text: "Unser Team führt die Arbeiten sorgfältig aus. Anschließend prüfen wir das Ergebnis gemeinsam mit Ihnen.",
  },
]

function fill(text: string, city: City) {
  return text.replaceAll("{city}", city.name)
}

function buildJsonLd(service: LocalService, city: City, combo: LocalCombo, faq: { question: string; answer: string }[]) {
  const url = `${SITE_URL}${getLocalLandingPath(service.slug, city.id)}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `${service.keyword} ${city.name}`,
        description: combo.lead,
        url,
        serviceType: service.keyword,
        provider: { "@type": "LocalBusiness", name: "Blitzeblank", url: SITE_URL },
        areaServed: [{ "@type": "City", name: city.name }, ...city.nearby.map((name) => ({ "@type": "Place", name }))],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  }
}

export function LocalServicePage({ service, city, combo }: { service: LocalService; city: City; combo: LocalCombo }) {
  const media = getServiceMedia(service.slug)
  const audience = audienceText(service.audiences)
  const keywordCity = `${service.keyword} ${city.name}`

  const faq = [
    { question: service.faq.question, answer: fill(service.faq.answer, city) },
    {
      question: `Ist die Besichtigung für ${service.keyword} in ${city.name} kostenlos?`,
      answer: `Ja. Wir besichtigen Ihr Objekt in ${city.name} unverbindlich und kostenlos und erstellen Ihnen anschließend ein klares Angebot mit festem Leistungsumfang.`,
    },
    {
      question: `Welche Orte rund um ${city.name} bedienen Sie?`,
      answer: `Neben ${city.name} sind wir unter anderem in ${city.nearby.join(", ")} im Einsatz. Fragen Sie uns gern auch für andere Orte in der Region an.`,
    },
  ]

  const otherServices = (Object.keys(localServices) as LocalServiceSlug[])
    .filter((slug) => slug !== service.slug && localServices[slug].cities.includes(city.id))
    .map((slug) => localServices[slug])

  const otherCities = CITY_IDS.filter((id) => id !== city.id && service.cities.includes(id) && localCombos[service.slug][id]).map(
    (id) => cities[id],
  )

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(service, city, combo, faq)) }}
      />
      <Navigation />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src={media?.hero?.src ?? "/placeholder.svg"}
              alt={`${keywordCity}: ${service.keyword} durch Blitzeblank`}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/50 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <nav aria-label="Brotkrumen" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
                <Link href="/leistungen" className="hover:text-brand-sky">
                  Leistungen
                </Link>
                <span>/</span>
                <Link href={`/leistungen/${service.slug}`} className="hover:text-brand-sky">
                  {service.keyword}
                </Link>
                <span>/</span>
                <span className="text-white/90">{city.name}</span>
              </nav>

              <h1 className="mb-4 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                {keywordCity}: für {audience}
              </h1>
              <p className="mb-5 text-lg leading-relaxed text-white/75 text-pretty">{combo.lead}</p>

              <ul className="mb-5 flex flex-wrap gap-2">
                {service.audiences.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20"
                  >
                    {getAudienceLabel(a, "de")}
                  </li>
                ))}
                <li className="flex items-center gap-1 rounded-full bg-brand-sky/15 px-3 py-1 text-xs font-semibold text-brand-sky ring-1 ring-brand-sky/30">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {city.name} und Umgebung
                </li>
              </ul>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal"
                >
                  <Link href="#kontakt">
                    Kostenlose Beratung
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-white/5 px-8 text-white hover:bg-white/15"
                >
                  <Link href={`/leistungen/${service.slug}`}>Alle Infos zur {service.keyword}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <h2 className="mb-5 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
                Professionelle {service.keyword} für {audience} in {city.name}
              </h2>
              <p className="mb-4 leading-relaxed text-neutral-600">{combo.local}</p>
              <p className="leading-relaxed text-neutral-600">{city.operatorNote}</p>
              {service.quoteLink && (
                <p className="mt-4">
                  <Link href={service.quoteLink.href} className="font-semibold text-brand-blue underline underline-offset-4">
                    {service.quoteLink.label}
                  </Link>
                </p>
              )}
            </div>
            <aside className="rounded-3xl bg-brand-mint p-8">
              <h3 className="mb-4 font-display text-xl font-bold text-brand-navy">
                Das gehört bei uns zur {service.keyword}
              </h3>
              <ul className="space-y-3">
                {service.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" aria-hidden="true" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="bg-brand-mint py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-5 max-w-3xl text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
              Unsere Leistungen im Bereich {service.keyword}
            </h2>
            <p className="mb-10 max-w-3xl leading-relaxed text-neutral-600">{service.block}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.topics.map((topic) => (
                <div key={topic} className="rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-brand-navy">{topic}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    Verfügbar in {city.name} und Umgebung, einmalig oder nach festem Plan.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-5 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
                {service.keyword} in {city.name} und Umgebung
              </h2>
              <p className="mb-4 leading-relaxed text-neutral-600">
                Wir sind für Sie in {city.name} und im Umland im Einsatz. Dazu zählen unter anderem{" "}
                {city.nearby.join(", ")}. Sie wohnen oder arbeiten woanders in der Region? Fragen Sie uns einfach an,
                wir prüfen gern, ob und wann ein Einsatz möglich ist.
              </p>
              <ul className="flex flex-wrap gap-2" aria-label={`Einsatzgebiete rund um ${city.name}`}>
                {[city.name, ...city.nearby].map((place) => (
                  <li key={place} className="rounded-full bg-brand-mint px-3 py-1 text-sm font-medium text-brand-navy">
                    {place}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-brand-navy p-8 shadow-lg">
              <h2 className="mb-6 font-display text-2xl font-bold text-white">
                So läuft die {service.keyword} in {city.name} ab
              </h2>
              <ol className="space-y-5">
                {PROCESS_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue font-display text-sm font-extrabold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-white">{step.title}</h3>
                      <p className="text-sm text-white/70">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-brand-mint py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="mb-8 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
              Häufige Fragen zur {service.keyword} in {city.name}
            </h2>
            <div className="space-y-3">
              {faq.map((item) => (
                <details key={item.question} className="group rounded-2xl bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none font-display text-lg font-bold text-brand-navy">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-relaxed text-neutral-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-brand-navy">
                Weitere Leistungen in {city.name}
              </h2>
              <ul className="space-y-2">
                {otherServices.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={getLocalLandingPath(other.slug, city.id)}
                      className="font-medium text-brand-blue underline-offset-4 hover:underline"
                    >
                      {other.keyword} in {city.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight text-brand-navy">
                {service.keyword} an weiteren Standorten
              </h2>
              <ul className="space-y-2">
                {otherCities.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={getLocalLandingPath(service.slug, other.id)}
                      className="font-medium text-brand-blue underline-offset-4 hover:underline"
                    >
                      {service.keyword} in {other.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/leistungen/${service.slug}`}
                    className="font-medium text-brand-blue underline-offset-4 hover:underline"
                  >
                    {service.keyword}: Überblick über alle Standorte
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <EmbeddedContactForm locale="de" service={service.slug} />
      </main>
      <Footer locale="de" />
    </div>
  )
}
