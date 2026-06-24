import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getServiceMedia } from "@/lib/service-media"
import { ArrowRight, ArrowUpRight, Factory, Grid3X3, Snowflake, Mountain, Building2, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Leistungen | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description:
    "Entdecken Sie unsere professionellen Reinigungsdienstleistungen: Industriereinigung, Fensterreinigung, Trockeneisreinigung, Steinreinigung und Fassadenreinigung.",
}

const services = [
  {
    icon: Factory,
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen nach höchsten Standards.",
    features: ["Produktionshallen", "Lagerräume", "Werkstätten", "Maschinen & Anlagen"],
    href: "/leistungen/industriereinigung",
    slug: "industriereinigung",
    imageQuery: "industrial+factory+production+hall+clean+polished+floor",
  },
  {
    icon: Grid3X3,
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung für Bürogebäude, Geschäfte und Industrieanlagen jeder Größe.",
    features: ["Bürogebäude", "Schaufenster", "Glasfassaden", "Industrieverglasung"],
    href: "/leistungen/fensterreinigung",
    slug: "fensterreinigung",
    imageQuery: "clean+modern+glass+office+windows+reflection+blue+sky",
  },
  {
    icon: Building2,
    title: "Fassadenreinigung",
    description: "Professionelle Außenreinigung für Gebäudefassaden aller Art - vom Bürogebäude bis zur Industrieanlage.",
    features: ["Putzfassaden", "Klinkerfassaden", "Metallfassaden", "Glasfassaden"],
    href: "/leistungen/fassadenreinigung",
    slug: "fassadenreinigung",
    imageQuery: "modern+building+facade+exterior+cleaning+architecture",
  },
  {
    icon: Mountain,
    title: "Steinreinigung",
    description: "Fachgerechte Pflege und Reinigung von Naturstein, Pflaster, Terrassen und Außenanlagen.",
    features: ["Naturstein", "Pflasterflächen", "Terrassen", "Außentreppen"],
    href: "/leistungen/steinreinigung",
    slug: "steinreinigung",
    imageQuery: "clean+natural+stone+pavement+terrace+outdoor+pressure+washing",
  },
  {
    icon: Snowflake,
    title: "Trockeneisreinigung",
    description: "Schonende und effektive Reinigung ohne Chemie oder Wasser - ideal für empfindliche Oberflächen.",
    features: ["Maschinen", "Elektronik", "Oberflächen", "Produktionsanlagen"],
    href: "/leistungen/trockeneisreinigung",
    slug: "trockeneisreinigung",
    imageQuery: "dry+ice+blasting+industrial+cleaning+machine+vapor",
  },
]

export default function LeistungenPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-sky">Leistungen</p>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Reinigung für jeden Anspruch
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Von der Industriereinigung bis zur Fassadenpflege - wir bieten professionelle
              Reinigungslösungen für jeden Bedarf. Entdecken Sie unser umfassendes Angebot.
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-8">
              {services.map((service, index) => {
                const media = getServiceMedia(service.slug)
                return (
                <div
                  key={index}
                  className="group grid overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-brand-navy/5 transition-all hover:shadow-xl lg:grid-cols-2"
                >
                  {/* Image */}
                  <div
                    className={`relative h-56 overflow-hidden lg:h-auto ${index % 2 === 1 ? "lg:order-last" : ""}`}
                  >
                    <Image
                      src={media?.hero?.src ?? `/placeholder.svg?height=600&width=800&query=${service.imageQuery}`}
                      alt={media?.hero?.alt ?? service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue shadow-lg">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-10">
                    <h2 className="mb-3 font-display text-2xl font-extrabold text-brand-navy lg:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mb-5 leading-relaxed text-neutral-600 text-pretty">{service.description}</p>
                    <ul className="mb-6 grid grid-cols-2 gap-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-blue" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="group/btn w-fit bg-brand-blue text-white hover:bg-brand-teal rounded-full px-6 shadow-lg shadow-brand-blue/30"
                    >
                      <Link href={service.href} className="cursor-pointer">
                        Mehr erfahren
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <h2 className="mb-4 text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy">
              Nicht sicher, welche Leistung Sie benötigen?
            </h2>
            <p className="mb-8 text-neutral-600 text-pretty">
              Kontaktieren Sie uns für eine kostenlose Beratung. Wir analysieren Ihre Anforderungen
              und empfehlen die optimale Lösung für Sie.
            </p>
            <Button
              asChild
              size="lg"
              className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/30"
            >
              <Link href="/kontakt" className="cursor-pointer">
                Kostenlose Beratung anfragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
