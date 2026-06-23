import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Quote, Shield, Heart, Target, Handshake, Compass } from "lucide-react"

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
        <section className="bg-primary pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Über Blitzeblank
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Blitzeblank steht für professionelle Reinigung mit Herz. 
                Lernen Sie uns und unsere Geschichte kennen.
              </p>
            </div>
          </div>
        </section>

        {/* Owner Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-40 h-40 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        <span className="text-5xl font-bold text-primary">ME</span>
                      </div>
                      <p className="text-lg font-semibold text-foreground">Mustapha El-Ali</p>
                      <p className="text-sm text-muted-foreground">Gründer & Geschäftsführer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
                  Ihr Ansprechpartner
                </p>
                <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Mustapha El-Ali
                </h2>
                <p className="text-xl font-medium text-foreground mb-6">
                  Gründer & Geschäftsführer
                </p>

                <div className="relative mb-8 pl-6 border-l-2 border-accent">
                  <Quote className="absolute -left-3 -top-1 h-6 w-6 text-accent bg-background" />
                  <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                    {`"Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft - 
                    auf die sich meine Kunden verlassen können."`}
                  </blockquote>
                </div>

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Ich betreue 
                    Kunden aus dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche 
                    Arbeit, feste Abläufe und absolute Zuverlässigkeit.
                  </p>
                  <p>
                    Jedes Objekt wird persönlich geplant und regelmäßig überprüft, unterstützt von 
                    einem erfahrenen Team, das nach klaren Qualitätsstandards arbeitet. So entsteht 
                    Sauberkeit, auf die Sie sich verlassen können.
                  </p>
                  <p>
                    Mit 3 Jahren Erfahrung in der professionellen Reinigungsbranche begleite ich 
                    Sie als Ihr direkter Ansprechpartner durch den gesamten Prozess - von der 
                    ersten Besichtigung bis zur finalen Abnahme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
                Unsere Werte
              </p>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Wofür Blitzeblank steht
              </h2>
              <p className="text-muted-foreground">
                Diese Werte leiten uns bei jeder Entscheidung und jedem Auftrag.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="border-0 bg-card p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <value.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
                Mission &amp; Vision
              </p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Was uns antreibt
              </h2>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <Card className="border-0 bg-card p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Target className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Unsere Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Mission ist es, für unsere Kunden dauerhaft saubere, gepflegte und 
                  hygienische Räume zu schaffen - zuverlässig, planbar und auf konstant hohem 
                  Qualitätsniveau. Wir setzen auf klare Abläufe, geschultes Personal und 
                  regelmäßige Qualitätskontrollen, um jede Reinigungsleistung effizient und 
                  gewissenhaft umzusetzen.
                </p>
              </Card>

              <Card className="border-0 bg-card p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Compass className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">Unsere Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Unsere Vision ist es, als vertrauensvoller Ansprechpartner für 
                  Gebäudereinigung bekannt zu sein. Mit festen Standards, persönlicher Betreuung 
                  und ehrlicher Arbeit möchten wir langfristige Partnerschaften aufbauen, bei 
                  denen sich unsere Kunden auf gleichbleibende Qualität, transparente 
                  Kommunikation und zuverlässige Ergebnisse verlassen können.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
                Lernen Sie uns persönlich kennen
              </h2>
              <p className="mb-8 text-primary-foreground/80">
                Vereinbaren Sie einen kostenlosen Besichtigungstermin und überzeugen Sie sich 
                selbst von unserer Professionalität.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/kontakt" className="flex items-center gap-2">
                  Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
