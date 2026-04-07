import { Quote } from "lucide-react"

export function OwnerSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                  <div className="text-center p-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <span className="text-4xl font-bold text-primary">ME</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Mustapha El-Ali</p>
                    <p className="text-xs text-muted-foreground">Gründer & Geschäftsführer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
                Ihr Ansprechpartner
              </p>
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Mustapha El-Ali
              </h2>
              <p className="text-lg font-medium text-foreground mb-4">
                Gründer & Geschäftsführer
              </p>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20" />
                <blockquote className="pl-8 text-pretty text-muted-foreground leading-relaxed italic">
                  {`"Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft. 
                  Jeder Kunde verdient einen Arbeitsplatz, der glänzt - und genau dafür 
                  stehe ich mit meinem Namen."`}
                </blockquote>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Mit über 15 Jahren Erfahrung in der professionellen Reinigungsbranche habe ich 
                Blitzeblank mit einer klaren Vision gegründet: Reinigungsdienstleistungen, die 
                nicht nur sauber machen, sondern echten Mehrwert für unsere Kunden schaffen.
              </p>

              <p className="text-muted-foreground leading-relaxed">
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
