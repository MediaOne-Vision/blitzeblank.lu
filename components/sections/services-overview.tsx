import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    title: "Industriereinigung",
    description: "Professionelle Reinigung von Produktionshallen, Lagern und Industrieanlagen mit modernster Technik.",
    href: "/leistungen/industriereinigung",
  },
  {
    title: "Fensterreinigung",
    description: "Streifenfreie Glasreinigung fur Burogebaude und Geschafte - auch in grossen Hohen.",
    href: "/leistungen/fensterreinigung",
  },
  {
    title: "Trockeneisreinigung",
    description: "Schonende und umweltfreundliche Reinigung ohne Chemie oder Wasser fur empfindliche Oberflachen.",
    href: "/leistungen/trockeneisreinigung",
  },
  {
    title: "Steinreinigung",
    description: "Fachgerechte Pflege von Naturstein, Pflaster, Terrassen und Aussenanlagen.",
    href: "/leistungen/steinreinigung",
  },
  {
    title: "Fassadenreinigung",
    description: "Professionelle Aussenreinigung fur Gebaudefassaden aller Art und Materialien.",
    href: "/leistungen/fassadenreinigung",
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <p className="text-sm font-medium text-[#4AADE4] mb-3">Leistungen</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900 max-w-lg">
              Professionelle Reinigung fur jeden Anspruch
            </h2>
          </div>
          <Link
            href="/leistungen"
            className="text-sm text-neutral-600 hover:text-neutral-900 underline underline-offset-4 cursor-pointer"
          >
            Alle Leistungen ansehen
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured Service with Image */}
          <div className="lg:col-span-2 lg:row-span-2 bg-white rounded-2xl p-8 flex flex-col justify-between min-h-[400px] group hover:shadow-lg transition-shadow">
            <div>
              <p className="text-sm text-neutral-400 mb-4">01</p>
              <h3 className="text-2xl font-medium text-neutral-900 mb-4">
                {services[0].title}
              </h3>
              <p className="text-neutral-600 max-w-md">
                {services[0].description}
              </p>
            </div>
            <div className="flex items-end justify-between mt-8">
              <Link
                href={services[0].href}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-[#4AADE4] cursor-pointer"
              >
                Mehr erfahren
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Image
                src="/images/mascot.png"
                alt=""
                width={120}
                height={120}
                className="h-24 w-auto opacity-30 group-hover:opacity-50 transition-opacity"
              />
            </div>
          </div>

          {/* Other Services */}
          {services.slice(1).map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[180px] group hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div>
                <p className="text-sm text-neutral-400 mb-3">0{index + 2}</p>
                <h3 className="text-lg font-medium text-neutral-900 mb-2 group-hover:text-[#4AADE4] transition-colors">
                  {service.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-500 line-clamp-2">
                  {service.description}
                </p>
                <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-[#4AADE4] flex-shrink-0 ml-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
