import { Card, CardContent } from "@/components/ui/card"

export function OwnerSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Placeholder */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/5] bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-primary">ME</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mustapha El-Ali</p>
                  <p className="text-xs text-muted-foreground">Grunder & Geschaftsfuhrer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
              Mustapha El-Ali
            </h2>
            <p className="text-lg text-primary mb-6">
              Grunder & Geschaftsfuhrer
            </p>
            
            <blockquote className="text-xl text-foreground italic border-l-4 border-primary pl-4 mb-6">
              Sauberkeit ist fur mich nicht nur ein Beruf, sondern eine Leidenschaft.
            </blockquote>

            <div className="space-y-4 text-muted-foreground">
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
