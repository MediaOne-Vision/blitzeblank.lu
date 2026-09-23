import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    eyebrow: "Ihr Ansprechpartner",
    nameLine1: "Mustapha El-Ali",
    nameLine2: "Gründer mit Anspruch.",
    portraitAlt:
      "Mustapha El-Ali, Gründer und Geschäftsführer von Blitzeblank, im schwarzen Firmen-Shirt mit ausgestreckter Hand zur Begrüßung",
    quote: "Sauberkeit ist für mich nicht nur ein Beruf, sondern eine Leidenschaft.",
    paragraph1:
      "Mein Name ist Mustapha El-Ali, Gründer und Inhaber von Blitzeblank. Mit langjähriger Erfahrung in der professionellen Reinigung betreue ich Kunden aus dem Gewerbe- und Privatbereich mit einem klaren Anspruch: gründliche Arbeit, feste Abläufe und absolute Zuverlässigkeit.",
    paragraph2:
      "Jedes Objekt wird persönlich geplant und regelmäßig überprüft, unterstützt von einem erfahrenen Team, das nach klaren Qualitätsstandards arbeitet. So entsteht Sauberkeit, auf die Sie sich verlassen können.",
    cta: "Lernen Sie mich kennen",
    badges: ["Persönliche Beratung", "Hoher Qualitätsanspruch", "Langfristige Zusammenarbeit"],
  },
  en: {
    eyebrow: "Your Point of Contact",
    nameLine1: "Mustapha El-Ali",
    nameLine2: "Founder with standards.",
    portraitAlt:
      "Mustapha El-Ali, founder and managing director of Blitzeblank, in a black company shirt with an outstretched hand in greeting",
    quote: "Cleanliness is not just a profession for me, but a passion.",
    paragraph1:
      "My name is Mustapha El-Ali, founder and owner of Blitzeblank. With years of experience in professional cleaning, I look after commercial and private customers with a clear standard: thorough work, established processes and absolute reliability.",
    paragraph2:
      "Every property is planned personally and checked regularly, supported by an experienced team that works to clear quality standards. That's how we create cleanliness you can rely on.",
    cta: "Get to Know Me",
    badges: ["Personal Advice", "High Quality Standards", "Long-Term Partnership"],
  },
}

export function OwnerSection({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Portrait */}
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:aspect-[9/10]">
              <Image
                src="/images/team/mustapha-el-ali-gruender-blitzeblank-handschlag.avif"
                alt={t.portraitAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={0.1}>
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-brand-navy sm:text-4xl lg:text-5xl">
                {t.nameLine1}
              </h2>
              <p className="font-display text-3xl font-extrabold tracking-tight text-balance text-brand-blue sm:text-4xl lg:text-5xl">
                {t.nameLine2}
              </p>

              <div className="mt-8 border-l-2 border-brand-blue pl-5">
                <span className="font-display text-4xl leading-none text-brand-blue">&ldquo;</span>
                <blockquote className="mt-1 text-lg font-medium italic text-brand-navy text-pretty leading-relaxed">
                  {t.quote}
                </blockquote>
              </div>

              <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
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
          </Reveal>
        </div>

        {/* Trust badges */}
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border pt-10 lg:justify-between">
            {t.badges.map((badge) => (
              <p key={badge} className="text-sm font-bold uppercase tracking-wide text-brand-blue text-center">
                {badge}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
