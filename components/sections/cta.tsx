import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, Calculator, Facebook, Instagram } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    heading: "Sprechen Sie mit uns über Ihr Projekt",
    body: "Kontaktieren Sie uns für eine kostenlose und unverbindliche Beratung in Luxemburg, Trier, Bitburg und der Region. Wir erstellen Ihnen ein maßgeschneidertes Angebot.",
    cta: "Kontakt aufnehmen",
    calcCta: "Angebot online erstellen",
    followLabel: "Folgen Sie uns",
    facebookAria: "Blitzeblank auf Facebook",
    instagramAria: "Blitzeblank auf Instagram",
  },
  en: {
    heading: "Talk to Us About Your Project",
    body: "Contact us for a free, no-obligation consultation in Luxembourg, Trier, Bitburg and the surrounding region. We'll create a tailored quote for you.",
    cta: "Get in Touch",
    calcCta: "Create an Offer Online",
    followLabel: "Follow us",
    facebookAria: "Blitzeblank on Facebook",
    instagramAria: "Blitzeblank on Instagram",
  },
}

export function CtaSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="bg-brand-mint">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 lg:flex-row lg:justify-between lg:gap-16 lg:py-20">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy text-balance lg:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-600 text-pretty">{t.body}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="group rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-navy/10 hover:bg-brand-teal">
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-brand-navy/20 bg-transparent text-brand-navy hover:bg-brand-navy/5">
              <Link href={localizeHref("/angebot", locale)} className="cursor-pointer">
                <Calculator className="h-4 w-4" />
                {t.calcCta}
              </Link>
            </Button>
          </div>

          <a
            href="tel:+352661830493"
            className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-blue lg:justify-start"
          >
            <Phone className="h-4 w-4" />
            +352 661 830 493
          </a>

          <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
            <span className="text-sm text-neutral-500">{t.followLabel}</span>
            <div className="flex items-center gap-2">
              <Link
                href="https://www.facebook.com/blitzeblank.lu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.facebookAria}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white transition-transform hover:scale-110 hover:bg-brand-blue"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/blitzeblank.lu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.instagramAria}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-white transition-transform hover:scale-110 hover:bg-brand-blue"
              >
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
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
