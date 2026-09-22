import { Clock, MapPinned, BadgeEuro, ShieldCheck } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const VALUES = {
  de: [
    { icon: Clock, title: "Schnelle Reaktion", text: "Antwort innerhalb von 24 Stunden." },
    { icon: MapPinned, title: "Kostenlose Besichtigung", text: "Vor-Ort-Termin, präzises Angebot." },
    { icon: BadgeEuro, title: "Transparente Preise", text: "Faire Konditionen, keine versteckten Kosten." },
    { icon: ShieldCheck, title: "Qualitätsgarantie", text: "Inklusive Testfläche auf Wunsch." },
  ],
  en: [
    { icon: Clock, title: "Fast Response", text: "We reply within 24 hours." },
    { icon: MapPinned, title: "Free Site Visit", text: "On-site appointment, precise quote." },
    { icon: BadgeEuro, title: "Transparent Pricing", text: "Fair terms, no hidden costs." },
    { icon: ShieldCheck, title: "Quality Guarantee", text: "Includes a test area on request." },
  ],
}

export function TrustBar({ locale = "de" }: { locale?: Locale }) {
  const values = VALUES[locale]
  return (
    <section className="border-b border-brand-navy/10 bg-white py-10 lg:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-brand-navy/10">
          {values.map((value) => (
            <div key={value.title} className="flex items-start gap-4 lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <value.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-brand-blue" strokeWidth={1.75} />
              <div>
                <h3 className="font-display text-sm font-bold text-brand-navy">{value.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
