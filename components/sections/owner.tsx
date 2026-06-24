import Image from "next/image"
import { Quote } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 h-56 w-56 rounded-full bg-brand-sky/30 blur-2xl" />
            <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
              <Image
                src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                alt="Mustapha El-Ali, Gründer und Geschäftsführer von Blitzeblank, im schwarzen Firmen-Shirt mit ausgestreckter Hand zur Begrüßung"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              {/* Verlauf für den Namenszug unten */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-navy/85 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-display text-xl font-bold text-white">Mustapha El-Ali</p>
                <p className="text-sm text-white/80">Gründer &amp; Geschäftsführer</p>
              </div>
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
                Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Mit 
                3 Jahren Erfahrung in der professionellen Reinigung betreue ich Kunden aus 
                dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche Arbeit, 
                feste Abläufe und absolute Zuverlässigkeit.
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
