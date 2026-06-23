import Link from "next/link"
import { ArrowUpRight, Factory, GlassWater, Snowflake, Gem, Building2 } from "lucide-react"

const services = [
  {
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen mit modernster Technik.",
    href: "/leistungen/industriereinigung",
    icon: Factory,
    color: "bg-brand-blue",
  },
  {
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung fur Burogebaude und Geschafte - auch in grossen Hohen.",
    href: "/leistungen/fensterreinigung",
    icon: GlassWater,
    color: "bg-brand-teal",
  },
  {
    title: "Trockeneisreinigung",
    description: "Schonende, umweltfreundliche Reinigung ohne Chemie oder Wasser fur empfindliche Oberflachen.",
    href: "/leistungen/trockeneisreinigung",
    icon: Snowflake,
    color: "bg-brand-blue",
  },
  {
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Aussenanlagen.",
    href: "/leistungen/steinreinigung",
    icon: Gem,
    color: "bg-brand-teal",
  },
  {
    title: "Fassadenreinigung",
    description: "Professionelle Aussenreinigung fur Gebaudefassaden aller Art und Materialien.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    color: "bg-brand-blue",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Leistungen</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy max-w-xl tracking-tight text-balance">
              Reinigung fur jeden Anspruch
            </h2>
          </div>
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-teal underline underline-offset-4 cursor-pointer"
          >
            Alle Leistungen ansehen
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Service */}
          <Link
            href={services[0].href}
            className="lg:col-span-2 lg:row-span-2 bg-brand-navy rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-blue/20 blur-2xl" />
            <div className="relative flex flex-col items-center">
              <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${services[0].color}`}>
                <Factory className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4">
                {services[0].title}
              </h3>
              <p className="text-white/70 max-w-md leading-relaxed mb-6">
                {services[0].description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-sky group-hover:gap-3 transition-all">
                Mehr erfahren
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Other Services */}
          {services.slice(1).map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center min-h-[180px] group hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer border border-brand-blue/10"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${service.color}`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
