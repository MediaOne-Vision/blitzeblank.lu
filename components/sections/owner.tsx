export function OwnerSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="bg-neutral-200 rounded-2xl aspect-[4/5] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#4AADE4]/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-medium text-[#4AADE4]">ME</span>
              </div>
              <p className="text-sm text-neutral-500">Mustapha El-Ali</p>
              <p className="text-xs text-neutral-400">Grunder & Geschaftsfuhrer</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium text-[#4AADE4] mb-3">Ihr Ansprechpartner</p>
            <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-2">
              Mustapha El-Ali
            </h2>
            <p className="text-neutral-500 mb-8">
              Grunder & Geschaftsfuhrer
            </p>
            
            <blockquote className="text-xl text-neutral-700 border-l-2 border-[#4AADE4] pl-6 mb-8 italic">
              &ldquo;Sauberkeit ist fur mich nicht nur ein Beruf, sondern eine Leidenschaft.&rdquo;
            </blockquote>

            <div className="space-y-4 text-neutral-600">
              <p>
                Mit uber 15 Jahren Erfahrung in der professionellen Reinigungsbranche habe ich 
                Blitzeblank mit einer klaren Vision gegrundet: Reinigungsdienstleistungen, die 
                echten Mehrwert fur unsere Kunden schaffen.
              </p>
              <p>
                Als Ihr direkter Ansprechpartner bin ich personlich fur die Qualitat unserer 
                Arbeit verantwortlich. Von der ersten Besichtigung bis zur finalen Abnahme - 
                ich begleite Sie durch den gesamten Prozess.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
