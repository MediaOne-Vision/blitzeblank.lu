import Image from "next/image"

const stats = [
  { value: "500+", label: "Zufriedene Kunden" },
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "98%", label: "Weiterempfehlung" },
  { value: "24h", label: "Reaktionszeit" },
]

export function WhyUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-sm font-medium text-[#4AADE4] mb-3">Uber uns</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900">
              Warum Unternehmen auf Blitzeblank vertrauen
            </h2>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            Seit unserer Grundung steht Blitzeblank fur professionelle Reinigung mit Herz. 
            Wir verstehen, dass Sauberkeit mehr ist als nur Hygiene - sie schafft ein 
            angenehmes Arbeitsumfeld und hinterlasst bei Ihren Kunden einen bleibenden Eindruck.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-neutral-50 rounded-xl p-6 text-center">
              <p className="text-3xl lg:text-4xl font-medium text-[#4AADE4] mb-2">{stat.value}</p>
              <p className="text-sm text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="border-l-2 border-neutral-200 pl-6 hover:border-[#4AADE4] transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Zuverlassigkeit</h3>
              <p className="text-sm text-neutral-600">
                Termingerechte Ausfuhrung und konstant hohe Qualitat sind fur uns selbstverstandlich.
              </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-6 hover:border-[#4AADE4] transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Flexibilitat</h3>
              <p className="text-sm text-neutral-600">
                Kurzfristige Terminvergabe und schnelle Reaktionszeiten - wir passen uns Ihrem Zeitplan an.
              </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-6 hover:border-[#4AADE4] transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Personlicher Kontakt</h3>
              <p className="text-sm text-neutral-600">
                Ein fester Ansprechpartner fur alle Ihre Anliegen. Direkte Kommunikation ohne Umwege.
              </p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-6 hover:border-[#4AADE4] transition-colors">
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Qualitatsgarantie</h3>
              <p className="text-sm text-neutral-600">
                Unsere Arbeit wird erst abgeschlossen, wenn Sie vollstandig zufrieden sind.
              </p>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4AADE4]/10 to-transparent rounded-3xl" />
            <Image
              src="/images/mascot.png"
              alt="Blitzeblank Maskottchen"
              width={350}
              height={350}
              className="relative h-auto w-full max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
