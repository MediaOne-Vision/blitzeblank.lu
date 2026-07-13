import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { ArrowUpRight, Factory, GlassWater, Gem, Building2, ArrowRight } from "lucide-react"

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
    image: "/images/leistungen/fenster-sauber-nach-glasreinigung.avif",
    imageAlt: "Streifenfrei gereinigtes Fenster nach professioneller Glasreinigung",
  },
  {
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art und Materialien.",
    href: "/leistungen/fassadenreinigung",
    icon: Building2,
    image: "/images/leistungen/fassadenreinigung-mehrfamilienhaus-sauber-nachher.avif",
    imageAlt: "Saubere, helle Mehrfamilienhaus-Fassade nach der Fassadenreinigung",
  },
  {
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    href: "/leistungen/steinreinigung",
    icon: Gem,
    image: "/images/leistungen/steinreinigung-natursteinterrasse-polygonalplatten-sauber-nachher.avif",
    imageAlt: "Gereinigte Naturstein-Terrasse mit Polygonalplatten als Ergebnis der Steinreinigung",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
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
        </Reveal>

        {/* Featured Service - wide slim banner */}
        <Reveal direction="scale">
          <Link
            href={featured.href}
            className="group relative mb-6 flex items-center justify-between overflow-hidden rounded-3xl bg-brand-navy px-8 py-8 sm:px-10 cursor-pointer"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-blue/20 blur-2xl animate-float-slow" />
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
        </Reveal>

        {/* Other Services - compact clickable tiles: image, icon & name only */}
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} as="div" direction="up" delay={i * 100} className="h-full">
            <Link
              href={service.href}
              aria-label={`${service.title} - Details ansehen`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-navy shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Image fills the tile */}
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.imageAlt ?? service.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark gradient for legible title */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />

                {/* Icon badge top-left */}
                <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/90 shadow-lg shadow-brand-blue/30 ring-1 ring-white/20 backdrop-blur-sm transition-colors group-hover:bg-brand-teal">
                  <service.icon className="h-6 w-6 text-white" strokeWidth={2} />
                </div>

                {/* Click affordance top-right */}
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-brand-navy">
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </div>

                {/* Name + hint at the bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-base lg:text-lg font-bold text-white text-balance">
                    {service.title}
                  </h3>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-brand-sky opacity-90">
                    Details ansehen
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
            </Reveal>
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
