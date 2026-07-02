import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Quote, Shield, Heart, Target, Handshake, Compass, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Über uns | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Lernen Sie Blitzeblank kennen. Erfahren Sie mehr über unseren Gründer Mustapha El-Ali und unsere Werte für professionelle Reinigungsdienstleistungen.",
}

const values = [
  {
    icon: Shield,
    title: "Zuverlässigkeit",
    description: "Wir halten unsere Versprechen. Pünktlichkeit und Verbindlichkeit sind für uns selbstverständlich.",
  },
  {
    icon: Heart,
    title: "Leidenschaft",
    description: "Reinigung ist für uns nicht nur ein Beruf, sondern eine Berufung. Wir lieben, was wir tun.",
  },
  {
    icon: Target,
    title: "Qualität",
    description: "Unsere Arbeit ist erst abgeschlossen, wenn Sie vollständig zufrieden sind. Kompromisse gibt es nicht.",
  },
  {
    icon: Handshake,
    title: "Partnerschaft",
    description: "Wir sehen uns als Partner unserer Kunden. Langfristige Beziehungen sind unser Ziel.",
  },
]

export default function UeberUnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <Sparkles className="h-4 w-4" />
              Über Blitzeblank
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Professionelle Reinigung mit Herz
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Blitzeblank steht für Sauberkeit, auf die Sie sich verlassen können. 
              Lernen Sie uns, unsere Werte und unsere Geschichte kennen.
            </p>
          </div>
        </section>

        {/* Owner Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-blue/15 to-brand-teal/10" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl ring-1 ring-brand-navy/10">
                    <Image
                      src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                      alt="Mustapha El-Ali, Gründer und Geschäftsführer von Blitzeblank, im schwarzen Firmen-Shirt mit ausgestreckter Hand zur Begrüßung"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                  Ihr Ansprechpartner
                </p>
                <h2 className="mb-2 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                  Mustapha El-Ali
                </h2>
                <p className="text-lg font-medium text-neutral-500 mb-6">
                  Gründer &amp; Inhaber
                </p>

                <div className="relative mb-8 rounded-2xl bg-brand-mint p-6">
                  <Quote className="mb-2 h-7 w-7 text-brand-blue" />
                  <blockquote className="text-lg text-brand-navy font-medium leading-relaxed text-pretty">
                    {`"Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft - 
                    auf die sich meine Kunden verlassen können."`}
                  </blockquote>
                </div>

                <div className="space-y-4 text-neutral-600 leading-relaxed">
                  <p>
                Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Mit
                langjähriger Erfahrung in der professionellen Reinigung betreue ich Kunden aus
                    dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche Arbeit, 
                    feste Abläufe und absolute Zuverlässigkeit.
                  </p>
                  <p>
                    Jedes Objekt wird persönlich geplant und regelmäßig überprüft, unterstützt von 
                    einem erfahrenen Team, das nach klaren Qualitätsstandards arbeitet. So entsteht 
                    Sauberkeit, auf die Sie sich verlassen können.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Unsere Werte
              </p>
              <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                Wofür Blitzeblank steht
              </h2>
              <p className="text-neutral-600 text-pretty">
                Diese Werte leiten uns bei jeder Entscheidung und jedem Auftrag.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue transition-transform group-hover:scale-110">
                    <value.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-navy">{value.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                Mission &amp; Vision
              </p>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
                Was uns antreibt
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-brand-navy p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Unsere Mission</h3>
                <p className="text-white/75 leading-relaxed text-pretty">
                  Unsere Mission ist es, für unsere Kunden dauerhaft saubere, gepflegte und 
                  hygienische Räume zu schaffen - zuverlässig, planbar und auf konstant hohem 
                  Qualitätsniveau. Wir setzen auf klare Abläufe, geschultes Personal und 
                  regelmäßige Qualitätskontrollen, um jede Reinigungsleistung effizient und 
                  gewissenhaft umzusetzen.
                </p>
              </div>

              <div className="rounded-3xl bg-brand-teal p-8 text-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Compass className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold">Unsere Vision</h3>
                <p className="text-white/80 leading-relaxed text-pretty">
                  Unsere Vision ist es, als vertrauensvoller Ansprechpartner für 
                  Gebäudereinigung bekannt zu sein. Mit festen Standards, persönlicher Betreuung 
                  und ehrlicher Arbeit möchten wir langfristige Partnerschaften aufbauen, bei 
                  denen sich unsere Kunden auf gleichbleibende Qualität, transparente 
                  Kommunikation und zuverlässige Ergebnisse verlassen können.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 lg:pb-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center lg:py-20">
              <div className="absolute -top-20 -right-16 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
              <div className="relative mx-auto max-w-2xl">
                <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  Lernen Sie uns persönlich kennen
                </h2>
                <p className="mb-8 text-white/75 text-pretty">
                  Vereinbaren Sie einen kostenlosen Besichtigungstermin und überzeugen Sie sich 
                  selbst von unserer Professionalität.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105"
                >
                  <Link href="/kontakt" className="cursor-pointer">
                    Kontakt aufnehmen
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
