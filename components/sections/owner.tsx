export function OwnerSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-muted overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-4xl font-serif font-medium text-primary">ME</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mustapha El-Ali</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Ihr Ansprechpartner
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground mb-6">
              Mustapha El-Ali
            </h2>
            <p className="text-lg text-primary mb-8">
              Gründer & Geschäftsführer
            </p>
            
            <blockquote className="text-2xl lg:text-3xl font-serif text-foreground leading-relaxed mb-8">
              {`"Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft."`}
            </blockquote>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Mit über 15 Jahren Erfahrung in der professionellen Reinigungsbranche habe ich 
                Blitzeblank mit einer klaren Vision gegründet: Reinigungsdienstleistungen, die 
                echten Mehrwert für unsere Kunden schaffen.
              </p>
              <p>
                Als Ihr direkter Ansprechpartner bin ich persönlich für die Qualität unserer 
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
