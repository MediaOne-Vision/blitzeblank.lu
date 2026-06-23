import Image from "next/image"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote: "Super Service! Nach einer Besichtigung wurde ein kurzfristiger Termin vereinbart. Die Arbeit wurde pünktlich und sehr ordentlich durchgeführt. Der Hof (ca. 250qm) war danach nicht mehr wiederzuerkennen. Und das alles in nicht mal 2 Tagen und zu einem super Preis! Sehr weiterzuempfehlen!",
    author: "Stefan Klein",
    accent: "text-brand-blue",
  },
  {
    quote: "Nach einer kostenlosen Testreinigung haben wir uns für diesen Service entschieden und sind mehr als begeistert. Mit unserem herkömmlichen Hochdruckreiniger hätten wir niemals dieses super Ergebnis erzielen können. Gutes Preis-Leistungs-Verhältnis und schneller Ausführungstermin.",
    author: "Anika Schwarz",
    accent: "text-brand-teal",
  },
  {
    quote: "Wir waren mit dem Service super zufrieden. Es wurden Holzdecken gereinigt und das Ergebnis ist super geworden. Auf meine Anfrage hin haben wir einen schnellen Vor-Ort-Termin bekommen mit einem entsprechend guten Angebot. Wir werden auf jeden Fall weitere Projekte an diese Firma vergeben.",
    author: "Bernd Goeblet",
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
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-brand-mint px-4 py-2">
            <Image src="/images/google-logo.svg" alt="Google" width={18} height={18} className="h-[18px] w-[18px]" />
            <span className="text-sm font-medium text-brand-navy">Echte Google-Rezensionen</span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-brand-blue text-brand-blue" />
              ))}
            </span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-brand-mint p-8 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-between mb-4">
                <Quote className={`h-8 w-8 ${testimonial.accent}`} />
                <Image src="/images/google-logo.svg" alt="Google Rezension" width={22} height={22} className="h-[22px] w-[22px]" />
              </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
