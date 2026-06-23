import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Factory, GlassWater, Snowflake, Gem, Building2, ArrowRight } from "lucide-react"

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
    description: "Streifenfreie Glasreinigung für Bürogebäude und Geschäfte - auch in großen Höhen.",
    href: "/leistungen/fensterreinigung",
    icon: GlassWater,
    image: "/placeholder.svg?height=400&width=400&query=clean+modern+glass+office+windows+reflection",
  },
  {
    title: "Trockeneisreinigung",
    description: "Schonende, umweltfreundliche Reinigung ohne Chemie oder Wasser für empfindliche Oberflächen.",
    href: "/leistungen/trockeneisreinigung",
    icon: Snowflake,
    image: "/placeholder.svg?height=400&width=400&query=dry+ice+blasting+industrial+cleaning+machine",
  },
  {
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    href: "/leistungen/steinreinigung",
    icon: Gem,
    image: "/placeholder.svg?height=400&width=400&query=clean+natural+stone+pavement+terrace+outdoor",
  },
  {
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art und Materialien.",
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
              Reinigung für jeden Anspruch
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
            alt="Blitzeblank Waschbär Maskottchen"
            width={260}
            height={260}
            className="relative hidden md:block h-44 lg:h-52 w-auto flex-shrink-0 transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Other Services - image top, readable white content below */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative flex flex-col rounded-3xl bg-white shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Image area */}
              <div className="relative h-40 overflow-hidden rounded-t-3xl">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
                {/* Icon badge - centered, larger, with gradient ring + hover lift */}
                <div className="absolute -bottom-7 left-5 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue shadow-lg shadow-brand-blue/40 ring-4 ring-white transition-all duration-300 group-hover:-translate-y-1 group-hover:rotate-3 group-hover:bg-brand-teal">
                  <service.icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
              </div>
              {/* Text on solid white - fully legible */}
              <div className="flex flex-1 flex-col p-5 pt-10">
                <h3 className="font-display text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 mb-4">
                  {service.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:gap-2.5 transition-all">
                  Mehr erfahren
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA below services */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-lg font-medium text-brand-navy text-balance">
            Entdecken Sie unser komplettes Leistungsspektrum
          </p>
          <Button
            asChild
            size="lg"
            className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/30"
          >
            <Link href="/leistungen" className="cursor-pointer">
              Alle Leistungen ansehen
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
