const steps = [
  {
    number: "01",
    title: "Kontakt aufnehmen",
    description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden zuruck.",
  },
  {
    number: "02",
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen Ihre Raumlichkeiten vor Ort und erstellen ein massgeschneidertes Angebot.",
  },
  {
    number: "03",
    title: "Professionelle Reinigung",
    description: "Unser geschultes Team fuhrt die Reinigung nach hochsten Standards durch - termingerecht und grundlich.",
  },
  {
    number: "04",
    title: "Ihre Zufriedenheit",
    description: "Nach Abschluss prufen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Massstab.",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-neutral-900">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#4AADE4] mb-3">Ablauf</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-white max-w-lg mx-auto">
            In vier Schritten zur makellosen Sauberkeit
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="group">
              <div className="border-t-2 border-neutral-700 group-hover:border-[#4AADE4] transition-colors pt-6">
                <p className="text-4xl font-light text-[#4AADE4] mb-4">{step.number}</p>
                <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
