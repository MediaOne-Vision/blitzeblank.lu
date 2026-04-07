const testimonials = [
  {
    quote: "Blitzeblank reinigt unsere Produktionshalle seit uber 3 Jahren. Die Zuverlassigkeit und Qualitat sind hervorragend.",
    author: "Thomas Muller",
    company: "Muller Metallbau GmbH",
  },
  {
    quote: "Die Fensterreinigung unseres Burogebaudes wird stets termingerecht und in hochster Qualitat durchgefuhrt.",
    author: "Sandra Klein",
    company: "Klein & Partner",
  },
  {
    quote: "Die Trockeneisreinigung unserer Maschinen war beeindruckend. Schonend, effektiv und ohne lange Stillstandzeiten.",
    author: "Marc Weber",
    company: "Weber Industries",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-[#4AADE4] mb-3">Referenzen</p>
          <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900">
            Was unsere Kunden sagen
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 border border-neutral-100 hover:border-neutral-200 transition-colors"
            >
              <blockquote className="text-neutral-700 leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-neutral-100">
                <p className="font-medium text-neutral-900">{testimonial.author}</p>
                <p className="text-sm text-neutral-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
