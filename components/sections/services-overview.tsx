import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Factory, GlassWater, Snowflake, Gem, Building2 } from "lucide-react"

const featured = {
  title: "Industriereinigung",
  description:
    "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen mit modernster Technik.",
  href: "/leistungen/industriereinigung",
  icon: Factory,
}

const services = [
  {
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung fur Burogebaude und Geschafte - auch in grossen Hohen.",
    href: "/leistungen/fensterreinigung",
    icon: GlassWater,
    image: "/placeholder.svg?height=400&width=400&query=clean+modern+glass+office+windows+reflection",
  },
  {
    title: "Trockeneisreinigung",
    description: "Schonende, umweltfreundliche Reinigung ohne Chemie oder Wasser fur empfindliche Oberflachen.",
    href: "/leistungen/trockeneisreinigung",
    icon: Snowflake,
    image: "/placeholder.svg?height=400&width=400&query=dry+ice+blasting+industrial+cleaning+machine",
  },
  {
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Aussenanlagen.",
    href: "/leistungen/steinreinigung",
    icon: Gem,
    image: "/placeholder.svg?height=400&width=400&query=clean+natural+stone+pavement+terrace+outdoor",
  },
  {
    title: "Fassadenreinigung",
    description: "Professionelle Aussenreinigung fur Gebaudefassaden aller Art und Materialien.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    image: "/placeholder.svg?height=400&width=400&query=modern+building+facade+exterior+cleaning",
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

        {/* Featured Service - wide slim banner */}
        <Link
          href={featured.href}
          className="group relative mb-6 flex items-center justify-between overflow-hidden rounded-3xl bg-brand-navy px-8 py-8 sm:px-10 cursor-pointer"
        >
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-blue/20 blur-2xl" />
          <div className="relative max-w-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue">
              <featured.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
              {featured.title}
            </h3>
            <p className="text-white/70 leading-relaxed mb-5">
              {featured.description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-brand-sky group-hover:gap-3 transition-all">
              Mehr erfahren
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <Image
            src="/images/mascot.png"
            alt="Blitzeblank Waschbar Maskottchen"
            width={260}
            height={260}
            className="relative hidden md:block h-44 lg:h-52 w-auto flex-shrink-0 transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Other Services - row of image cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl cursor-pointer"
            >
              {/* Background image */}
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay to keep text legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/70 to-brand-navy/10" />
              {/* Content in foreground */}
              <div className="relative p-5">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue">
                  <service.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">
                  {service.title}
                </h3>
                <p className="text-sm text-white/75 line-clamp-2">
                  {service.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-sky group-hover:gap-2.5 transition-all">
                  Mehr erfahren
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
