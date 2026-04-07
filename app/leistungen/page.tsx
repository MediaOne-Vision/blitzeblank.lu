import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Grid3X3, Snowflake, Mountain, Building2, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Leistungen | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Entdecken Sie unsere professionellen Reinigungsdienstleistungen: Industriereinigung, Fensterreinigung, Trockeneisreinigung, Steinreinigung und Fassadenreinigung.",
}

const services = [
  {
    icon: Factory,
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    features: ["Produktionshallen", "Lagerräume", "Werkstätten", "Maschinen & Anlagen"],
    href: "/leistungen/industriereinigung",
  },
  {
    icon: Grid3X3,
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
    features: ["Bürogebäude", "Schaufenster", "Glasfassaden", "Industrieverglasung"],
    href: "/leistungen/fensterreinigung",
  },
  {
    icon: Snowflake,
    title: "Trockeneisreinigung",
    description: "Schonende und effektive Reinigung ohne Chemie oder Wasser - ideal für empfindliche Oberflächen.",
    features: ["Maschinen", "Elektronik", "Oberflächen", "Produktionsanlagen"],
    href: "/leistungen/trockeneisreinigung",
  },
  {
    icon: Mountain,
    title: "Steinreinigung",
    description: "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    features: ["Naturstein", "Pflasterflächen", "Terrassen", "Außentreppen"],
    href: "/leistungen/steinreinigung",
  },
  {
    icon: Building2,
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
    features: ["Putzfassaden", "Klinkerfassaden", "Metallfassaden", "Glasfassaden"],
    href: "/leistungen/fassadenreinigung",
  },
]

export default function LeistungenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Unsere Leistungen
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Von der Industriereinigung bis zur Fassadenpflege - wir bieten professionelle 
                Reinigungslösungen für jeden Bedarf. Entdecken Sie unser umfassendes Angebot.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="space-y-8">
              {services.map((service, index) => (
                <Card key={index} className="overflow-hidden border-0 bg-card shadow-sm">
                  <div className="grid gap-6 p-6 lg:grid-cols-3 lg:gap-8 lg:p-8">
                    {/* Icon & Title */}
                    <div className="lg:col-span-1">
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">{service.title}</h2>
                    </div>

                    {/* Description & Features */}
                    <div className="lg:col-span-1">
                      <p className="mb-4 text-muted-foreground leading-relaxed">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center lg:col-span-1 lg:justify-end">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href={service.href} className="flex items-center gap-2">
                          Mehr erfahren
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground">
                Nicht sicher, welche Leistung Sie benötigen?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Kontaktieren Sie uns für eine kostenlose Beratung. Wir analysieren Ihre 
                Anforderungen und empfehlen die optimale Lösung für Sie.
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/kontakt" className="flex items-center gap-2">
                  Kostenlose Beratung anfragen
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
