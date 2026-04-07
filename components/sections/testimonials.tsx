import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Blitzeblank reinigt unsere Produktionshalle seit uber 3 Jahren. Die Zuverlassigkeit und Qualitat sind hervorragend.",
    author: "Thomas Muller",
    role: "Geschaftsfuhrer, Muller Metallbau GmbH",
  },
  {
    quote: "Die Fensterreinigung unseres Burogebaudes wird stets termingerecht und in hochster Qualitat durchgefuhrt. Sehr professionelles Team.",
    author: "Sandra Klein",
    role: "Facility Managerin, Klein & Partner",
  },
  {
    quote: "Die Trockeneisreinigung unserer Maschinen war beeindruckend. Schonend, effektiv und ohne lange Stillstandzeiten.",
    author: "Marc Weber",
    role: "Produktionsleiter, Weber Industries",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Was unsere Kunden sagen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vertrauen Sie auf die Erfahrungen zufriedener Kunden.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <blockquote className="text-foreground mb-6">
                  {testimonial.quote}
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
