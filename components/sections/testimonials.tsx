import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote: "Blitzeblank reinigt unsere Produktionshalle seit uber 3 Jahren. Die Zuverlassigkeit und Qualitat sind hervorragend.",
    author: "Thomas Muller",
    company: "Muller Metallbau GmbH",
    accent: "text-brand-blue",
  },
  {
    quote: "Die Fensterreinigung unseres Burogebaudes wird stets termingerecht und in hochster Qualitat durchgefuhrt.",
    author: "Sandra Klein",
    company: "Klein & Partner",
    accent: "text-brand-teal",
  },
  {
    quote: "Die Trockeneisreinigung unserer Maschinen war beeindruckend. Schonend, effektiv und ohne lange Stillstandzeiten.",
    author: "Marc Weber",
    company: "Weber Industries",
    accent: "text-brand-blue",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">Referenzen</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
            Was unsere Kunden sagen
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-brand-mint p-8 hover:-translate-y-1 transition-transform"
            >
              <Quote className={`h-8 w-8 mb-4 ${testimonial.accent}`} />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-blue text-brand-blue" />
                ))}
              </div>
              <blockquote className="text-neutral-700 leading-relaxed mb-6">
                {testimonial.quote}
              </blockquote>
              <div className="pt-4 border-t border-brand-blue/15">
                <p className="font-display font-bold text-brand-navy">{testimonial.author}</p>
                <p className="text-sm text-neutral-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
