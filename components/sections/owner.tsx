import { Quote } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <div className="relative rounded-3xl bg-gradient-to-br from-brand-navy to-brand-teal aspect-[4/5] flex items-center justify-center overflow-hidden">
            <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-brand-sky/30 blur-2xl" />
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-white/15 backdrop-blur flex items-center justify-center mb-4 ring-2 ring-white/20">
                <span className="font-display text-3xl font-bold text-white">ME</span>
              </div>
              <p className="text-white font-medium">Mustapha El-Ali</p>
              <p className="text-sm text-white/70">Gründer &amp; Geschäftsführer</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Ihr Ansprechpartner</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy mb-2 tracking-tight">
              Mustapha El-Ali
            </h2>
            <p className="text-neutral-500 mb-8">Gründer &amp; Geschäftsführer</p>

            <div className="relative rounded-2xl bg-white p-6 mb-8 shadow-sm">
              <Quote className="absolute -top-3 left-6 h-7 w-7 text-brand-blue" />
              <blockquote className="text-lg text-brand-navy font-medium italic pt-2">
                &ldquo;Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft.&rdquo;
              </blockquote>
            </div>

            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Ich betreue 
                Kunden aus dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche 
                Arbeit, feste Abläufe und absolute Zuverlässigkeit.
              </p>
              <p>
                Jedes Objekt wird persönlich geplant und regelmäßig überprüft, unterstützt von 
                einem erfahrenen Team, das nach klaren Qualitätsstandards arbeitet. So entsteht 
                Sauberkeit, auf die Sie sich verlassen können.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
