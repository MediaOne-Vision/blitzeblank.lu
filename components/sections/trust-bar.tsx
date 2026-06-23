import { Clock, MapPinned, BadgeEuro, ShieldCheck } from "lucide-react"

const values = [
  {
    icon: Clock,
    title: "Schnelle Reaktion",
    text: "Antwort auf Ihre Anfrage innerhalb von 24 Stunden.",
    color: "bg-brand-blue",
  },
  {
    icon: MapPinned,
    title: "Kostenlose Besichtigung",
    text: "Vor-Ort-Termin für ein präzises Angebot - gratis.",
    color: "bg-brand-teal",
  },
  {
    icon: BadgeEuro,
    title: "Transparente Preise",
    text: "Faire Konditionen ohne versteckte Kosten.",
    color: "bg-brand-blue",
  },
  {
    icon: ShieldCheck,
    title: "Qualitätsgarantie",
    text: "Inklusive Probearbeit auf Wunsch.",
    color: "bg-brand-teal",
  },
]

export function TrustBar() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col items-center text-center rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${value.color}`}>
                <value.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-base font-bold text-brand-navy mb-1.5">{value.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
