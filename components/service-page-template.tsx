import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, CheckCircle, type LucideIcon } from "lucide-react"

interface ServiceFeature {
  title: string
  description: string
}

interface ServicePageTemplateProps {
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  features: ServiceFeature[]
  benefits: string[]
  process: { step: string; description: string }[]
}

export function ServicePageTemplate({
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  benefits,
  process,
}: ServicePageTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
                <Icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                {title}
              </h1>
              <p className="text-lg text-primary-foreground/80">{subtitle}</p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground">
                Unsere Leistungen im Detail
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 bg-card p-6">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground">
                  Ihre Vorteile mit Blitzeblank
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 mt-0.5 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-primary p-8">
                <h3 className="mb-6 text-xl font-semibold text-primary-foreground">Unser Ablauf</h3>
                <div className="space-y-4">
                  {process.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-foreground">{item.step}</h4>
                        <p className="text-sm text-primary-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground">
                Interesse an {title}?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Kontaktieren Sie uns für eine kostenlose Besichtigung und ein individuelles Angebot.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/kontakt" className="flex items-center gap-2">
                    Kostenlosen Termin anfragen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/leistungen">Alle Leistungen ansehen</Link>
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
