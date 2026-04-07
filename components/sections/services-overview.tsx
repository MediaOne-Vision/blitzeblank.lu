import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Factory, Grid3X3, Snowflake, Mountain, Building2 } from "lucide-react"

const services = [
  {
    icon: Factory,
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    href: "/leistungen/industriereinigung",
  },
  {
    icon: Grid3X3,
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
    href: "/leistungen/fensterreinigung",
  },
  {
    icon: Snowflake,
    title: "Trockeneisreinigung",
    description: "Schonende und effektive Reinigung ohne Chemie oder Wasser - ideal für empfindliche Oberflächen.",
    href: "/leistungen/trockeneisreinigung",
  },
  {
    icon: Mountain,
    title: "Steinreinigung",
    description: "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    href: "/leistungen/steinreinigung",
  },
  {
    icon: Building2,
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
    href: "/leistungen/fassadenreinigung",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            Unsere Leistungen
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Professionelle Reinigungslösungen für Ihr Unternehmen
          </h2>
          <p className="text-pretty text-muted-foreground">
            Von der Industriereinigung bis zur Fassadenpflege - wir bieten maßgeschneiderte 
            Lösungen für jede Anforderung.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 bg-card p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 transition-colors group-hover:bg-accent/10">
                <service.icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              <Link
                href={service.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                Mehr erfahren
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/leistungen" className="flex items-center gap-2">
              Alle Leistungen ansehen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
