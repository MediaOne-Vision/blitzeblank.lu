const testimonials = [
  {
    quote: "Blitzeblank reinigt unsere Produktionshalle seit über 3 Jahren. Die Zuverlässigkeit und Qualität sind hervorragend.",
    author: "Thomas Müller",
    role: "Geschäftsführer, Müller Metallbau GmbH",
  },
  {
    quote: "Die Fensterreinigung unseres Bürogebäudes wird stets termingerecht und in höchster Qualität durchgeführt. Sehr professionelles Team.",
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
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Kundenstimmen
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground max-w-3xl">
            Was unsere Kunden sagen
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col">
              <blockquote className="text-xl lg:text-2xl font-serif text-foreground leading-relaxed mb-8 flex-1">
                {`"${testimonial.quote}"`}
              </blockquote>
              <div className="pt-6 border-t border-border">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
