import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    heading: "Sprechen Sie mit uns über Ihr Projekt",
    body: "Kontaktieren Sie uns für eine kostenlose und unverbindliche Beratung in Luxemburg, Trier, Bitburg und der Region. Wir erstellen Ihnen ein maßgeschneidertes Angebot.",
    cta: "Kontakt aufnehmen",
  },
  en: {
    heading: "Talk to Us About Your Project",
    body: "Contact us for a free, no-obligation consultation in Luxembourg, Trier, Bitburg and the surrounding region. We'll create a tailored quote for you.",
    cta: "Get in Touch",
  },
}

export function CtaSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue to-brand-teal px-8 py-16 lg:px-16 text-center">
          <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-navy/20 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight text-balance">
              {t.heading}
            </h2>
            <p className="text-white/85 max-w-xl mx-auto mb-8 leading-relaxed">{t.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group bg-white text-brand-navy hover:bg-brand-mint rounded-full px-8 shadow-lg transition-transform hover:scale-105">
                <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                  {t.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 rounded-full px-8">
                <a href="tel:+352661830493" className="cursor-pointer">
                  <Phone className="h-4 w-4" />
                  +352 661 830 493
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
