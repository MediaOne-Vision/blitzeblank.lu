import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ServiceSwitcher } from "@/components/service-switcher"
import { QuoteBanner } from "@/components/quote-banner"
import { QuoteWizard } from "@/components/quote-wizard"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { getServiceMedia } from "@/lib/service-media"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, MapPin, type LucideIcon } from "lucide-react"

interface ServiceFeature {
  title: string
  description: string
}

interface ServicePageTemplateProps {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: LucideIcon
  image: string
  features: ServiceFeature[]
  benefits: string[]
  process: { step: string; description: string }[]
}

export function ServicePageTemplate({
  slug,
  title,
  subtitle,
  image,
  features,
  benefits,
  process,
}: ServicePageTemplateProps) {
  const media = getServiceMedia(slug)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />

          {/* Hero-Bild füllt die rechte Hälfte der Sektion (bündig oben, unten, rechts) */}
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src={media?.hero?.src ?? `/placeholder.svg?height=900&width=800&query=${image}`}
              alt={media?.hero?.alt ?? title}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            {/* Dunkelblau links, fließend ins Bild übergehend */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/50 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
                  <Link href="/leistungen" className="hover:text-brand-sky cursor-pointer">
                    Leistungen
                  </Link>
                  <span>/</span>
                  <span className="text-white/90">{title}</span>
                </nav>

                <h1 className="mb-4 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  {title}
                </h1>
                <p className="mb-4 text-lg text-white/75 text-pretty">{subtitle}</p>
                <div className="mb-8 flex items-center gap-2 text-base font-semibold text-brand-sky">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>Aktiv in Luxemburg, Trier, Bitburg &amp; Region</span>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105"
                  >
                    <Link href="/kontakt" className="cursor-pointer">
                      Kostenlose Beratung
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/5 text-white hover:bg-white/15 rounded-full px-8"
                  >
                    <Link href="#angebot" className="cursor-pointer">
                      Kostenloses Angebot
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Hero-Bild für Mobilgeräte: randvoll, Verlauf von oben */}
              <div className="relative -mx-6 -mb-16 mt-4 h-72 overflow-hidden lg:hidden">
                <Image
                  src={media?.hero?.src ?? `/placeholder.svg?height=640&width=800&query=${image}`}
                  alt={media?.hero?.alt ?? title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">Im Detail</p>
              <h2 className="text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy">
                Unsere Leistungen im Detail
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-navy/5 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-navy">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits + Process */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">Ihre Vorteile</p>
                <h2 className="mb-6 text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy">
                  Darauf können Sie sich verlassen
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                      <span className="text-neutral-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl bg-brand-navy p-8 shadow-lg">
                <h3 className="mb-6 font-display text-xl font-bold text-white">Unser Ablauf</h3>
                <div className="space-y-5">
                  {process.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-display font-extrabold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white">{item.step}</h4>
                        <p className="text-sm text-white/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ergebnisse: Zwei große Vorher-Nachher-Vergleiche + Karussell */}
        {media && (media.beforeAfter.length > 0 || media.gallery.length > 0) && (
          <section className="bg-brand-mint py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">Ergebnisse</p>
                <h2 className="text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-navy">
                  Sehen Sie den Unterschied
                </h2>
                {media.beforeAfter.length > 0 && (
                  <p className="mt-3 text-neutral-600 text-pretty">
                    Ziehen Sie den Regler, um das Vorher-Nachher-Ergebnis zu vergleichen.
                  </p>
                )}
              </div>

              {media.beforeAfter.length > 0 && (
                <div className="mb-16 grid gap-8 lg:grid-cols-2">
                  {media.beforeAfter.map((pair) => (
                    <BeforeAfterSlider
                      key={pair.afterSrc}
                      beforeSrc={pair.beforeSrc}
                      afterSrc={pair.afterSrc}
                      beforeAlt={pair.beforeAlt}
                      afterAlt={pair.afterAlt}
                      caption={pair.caption}
                    />
                  ))}
                </div>
              )}

              {media.gallery.length > 0 && (
                <div className="mx-auto max-w-4xl">
                  <h3 className="mb-6 text-center font-display text-xl font-bold text-brand-navy">
                    Weitere Eindrücke
                  </h3>
                  <GalleryCarousel images={media.gallery} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Kostenloses Angebot Banner */}
        <QuoteBanner slug={slug} serviceTitle={title} ctaHref="#angebot" />

        {/* Service Switcher */}
        <ServiceSwitcher currentSlug={slug} />

        {/* Eingebettetes Angebots-Tool - direkt auf der Seite, ohne Weiterleitung */}
        <section id="angebot" className="scroll-mt-24 bg-brand-navy py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-sky">
                Kostenloses Angebot
              </p>
              <h2 className="text-balance font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Ihr Richtpreis für <span className="text-brand-sky">{title}</span> - in 2 Minuten
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/75 text-pretty">
                Füllen Sie das Formular direkt hier aus - unverbindlich, kostenlos und ohne
                Weiterleitung. Sie erhalten sofort eine Preisschätzung.
              </p>
            </div>
            <QuoteWizard initialSlug={slug} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
