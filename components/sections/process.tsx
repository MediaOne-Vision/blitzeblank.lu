import { Phone, ClipboardCheck, Sparkles, ThumbsUp } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden zurück.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen Ihre Räumlichkeiten vor Ort und erstellen ein maßgeschneidertes Angebot.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Professionelle Reinigung",
    description: "Unser geschultes Team führt die Reinigung nach höchsten Standards durch - termingerecht und gründlich.",
  },
  {
    number: "04",
    icon: ThumbsUp,
    title: "Ihre Zufriedenheit",
    description: "Nach Abschluss prüfen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Maßstab.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-sky mb-3">Ablauf</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white max-w-xl mx-auto tracking-tight text-balance">
            In vier Schritten zur Sauberkeit
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 hover:bg-white/10 transition-colors"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue">
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-display text-4xl font-extrabold text-white/15">{step.number}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
