import Link from "next/link"
import Image from "next/image"
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
    <section className="bg-brand-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:justify-between lg:gap-16 lg:py-20">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white text-balance lg:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-white/70 text-pretty">{t.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="group rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-black/20 hover:bg-brand-teal">
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10">
              <a href="tel:+352661830493" className="cursor-pointer">
                <Phone className="h-4 w-4" />
                +352 661 830 493
              </a>
            </Button>
          </div>
        </div>
        <Image
          src="/images/mascot.png"
          alt="Blitzeblank Maskottchen"
          width={280}
          height={280}
          className="h-32 w-auto shrink-0 lg:h-44"
        />
      </div>
    </section>
  )
}
