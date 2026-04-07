export function TrustBar() {
  return (
    <section className="py-16 bg-white border-b border-neutral-100">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-sm font-medium text-neutral-900 mb-8">
          Unsere Kernwerte
        </p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-l-2 border-[#4AADE4] pl-6">
            <p className="text-4xl font-light text-neutral-900 mb-2">1</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Schnelle Reaktionszeit innerhalb von 24 Stunden auf Ihre Anfrage.
            </p>
          </div>
          
          <div className="border-l-2 border-[#4AADE4] pl-6">
            <p className="text-4xl font-light text-neutral-900 mb-2">2</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Kostenlose Besichtigung vor Ort fur eine prazise Angebotserstellung.
            </p>
          </div>
          
          <div className="border-l-2 border-[#4AADE4] pl-6">
            <p className="text-4xl font-light text-neutral-900 mb-2">3</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Transparente Preise ohne versteckte Kosten oder Uberraschungen.
            </p>
          </div>
          
          <div className="border-l-2 border-[#4AADE4] pl-6">
            <p className="text-4xl font-light text-neutral-900 mb-2">4</p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Qualitatsgarantie mit der Moglichkeit einer Probearbeit.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
