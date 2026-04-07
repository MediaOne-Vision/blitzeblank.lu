import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen.",
    href: "/leistungen/industriereinigung",
  },
  {
    number: "02",
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung für Bürogebäude und Geschäfte jeder Größe.",
    href: "/leistungen/fensterreinigung",
  },
  {
    number: "03",
    title: "Trockeneisreinigung",
    description: "Schonende Reinigung ohne Chemie oder Wasser für empfindliche Oberflächen.",
    href: "/leistungen/trockeneisreinigung",
  },
  {
    number: "04",
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    href: "/leistungen/steinreinigung",
  },
  {
    number: "05",
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art.",
    href: "/leistungen/fassadenreinigung",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Unsere Leistungen
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground max-w-3xl">
            Professionelle Lösungen für jede Anforderung
          </h2>
        </div>

        {/* Services List */}
        <div className="border-t border-border">
          {services.map((service) => (
            <Link
              key={service.number}
              href={service.href}
              className="group flex items-start lg:items-center gap-6 lg:gap-12 py-8 border-b border-border cursor-pointer transition-colors hover:bg-muted/30"
            >
              <span className="text-sm text-muted-foreground font-mono">{service.number}</span>
              
              <div className="flex-1 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground lg:max-w-md lg:text-right">
                  {service.description}
                </p>
              </div>
              
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border group-hover:bg-primary group-hover:border-primary transition-all">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
