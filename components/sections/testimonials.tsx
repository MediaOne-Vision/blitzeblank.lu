import { Card } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Blitzeblank reinigt unsere Produktionshalle seit über 3 Jahren. Die Zuverlässigkeit und Qualität sind hervorragend. Absolut empfehlenswert!",
    author: "Thomas Müller",
    role: "Geschäftsführer",
    company: "Müller Metallbau GmbH",
    rating: 5,
  },
  {
    quote: "Die Fensterreinigung unseres Bürogebäudes wird stets termingerecht und in höchster Qualität durchgeführt. Sehr professionelles Team.",
    author: "Sandra Klein",
    role: "Facility Managerin",
    company: "Klein & Partner",
    rating: 5,
  },
  {
    quote: "Die Trockeneisreinigung unserer Maschinen war beeindruckend. Schonend, effektiv und ohne lange Stillstandzeiten. Vielen Dank!",
    author: "Marc Weber",
    role: "Produktionsleiter",
    company: "Weber Industries",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
            Kundenstimmen
          </p>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Was unsere Kunden sagen
          </h2>
          <p className="text-pretty text-muted-foreground">
            Vertrauen Sie nicht nur uns - hören Sie, was unsere zufriedenen Kunden 
            über ihre Erfahrungen mit Blitzeblank berichten.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-0 bg-card p-6 shadow-sm">
              {/* Quote Icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-accent/10" />

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 text-pretty text-muted-foreground leading-relaxed">
                {`"${testimonial.quote}"`}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
