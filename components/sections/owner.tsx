import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Quote, ArrowRight } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    eyebrow: "Ihr Ansprechpartner",
    role: "Gründer & Geschäftsführer",
    portraitAlt:
      "Mustapha El-Ali, Gründer und Geschäftsführer von Blitzeblank, im schwarzen Firmen-Shirt mit ausgestreckter Hand zur Begrüßung",
    quote: "Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft.",
    paragraph1:
      "Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Mit langjähriger Erfahrung in der professionellen Reinigung betreue ich Kunden aus dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche Arbeit, feste Abläufe und absolute Zuverlässigkeit.",
    paragraph2:
      "Jedes Objekt wird persönlich geplant und regelmäßig überprüft, unterstützt von einem erfahrenen Team, das nach klaren Qualitätsstandards arbeitet. So entsteht Sauberkeit, auf die Sie sich verlassen können.",
    cta: "Lernen Sie mich persönlich kennen",
  },
  en: {
    eyebrow: "Your Point of Contact",
    role: "Founder & Managing Director",
    portraitAlt:
      "Mustapha El-Ali, founder and managing director of Blitzeblank, in a black company shirt with an outstretched hand in greeting",
    quote: "Cleanliness is not just a profession for me, but a passion.",
    paragraph1:
      "My name is Mustapha El-Ali, founder and owner of Blitzeblank. With years of experience in professional cleaning, I look after commercial and private customers with a clear standard: thorough work, established processes and absolute reliability.",
    paragraph2:
      "Every property is planned personally and checked regularly, supported by an experienced team that works to clear quality standards. That's how we create cleanliness you can rely on.",
    cta: "Get to Know Me Personally",
  },
}

export function OwnerSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Portrait */}
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 h-56 w-56 rounded-full bg-brand-sky/30 blur-2xl" />
            <div className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-navy/10">
              <Image
                src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                alt={t.portraitAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              {/* Verlauf für den Namenszug unten */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-brand-navy/85 via-brand-navy/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="font-display text-xl font-bold text-white">Mustapha El-Ali</p>
                <p className="text-sm text-white/80">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">{t.eyebrow}</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy mb-2 tracking-tight">
              Mustapha El-Ali
            </h2>
            <p className="text-neutral-500 mb-8">{t.role}</p>

            <div className="relative rounded-2xl bg-white p-6 mb-8 shadow-sm">
              <Quote className="absolute -top-3 left-6 h-7 w-7 text-brand-blue" />
              <blockquote className="text-lg text-brand-navy font-medium italic pt-2">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>

            <Button
              asChild
              size="lg"
              className="group mt-8 rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal"
            >
              <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
