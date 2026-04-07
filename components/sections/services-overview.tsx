import Link from "next/link"
import { ArrowRight, Building2, Droplets, Wind, Gem, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Building2,
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen.",
    href: "/leistungen/industriereinigung",
  },
  {
    icon: Droplets,
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung fur Burogebaude und Geschafte jeder Grosse.",
    href: "/leistungen/fensterreinigung",
  },
  {
    icon: Wind,
    title: "Trockeneisreinigung",
    description: "Schonende Reinigung ohne Chemie oder Wasser fur empfindliche Oberflachen.",
    href: "/leistungen/trockeneisreinigung",
  },
  {
    icon: Gem,
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Aussenanlagen.",
    href: "/leistungen/steinreinigung",
  },
  {
    icon: Building,
    title: "Fassadenreinigung",
    description: "Professionelle Aussenreinigung fur Gebaudefassaden aller Art.",
    href: "/leistungen/fassadenreinigung",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professionelle Reinigungslosungen fur jeden Bedarf - von der Industrie bis zum Privatobjekt.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card key={service.title} className="group relative overflow-hidden border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 cursor-pointer"
                  >
                    Mehr erfahren
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary cursor-pointer"
          >
            Alle Leistungen ansehen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
