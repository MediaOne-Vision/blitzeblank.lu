"use client"

import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OwnerSection } from "@/components/sections/owner"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FaqSection } from "@/components/sections/faq"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { GalleryCarousel } from "@/components/gallery-carousel"
import { WindowB2BForm } from "@/components/window-b2b-form"
import { getServiceMedia } from "@/lib/service-media"
import { pushDataLayerEvent } from "@/lib/tracking"
import { type Locale } from "@/lib/i18n"
import {
  ArrowRight,
  Phone,
  MapPin,
  ShieldCheck,
  Sparkles,
  CalendarClock,
  Building2,
  Droplets,
  UserCheck,
  Clock,
} from "lucide-react"

const CONTACT = { phone: "+352 661 830 493", phoneHref: "tel:+352661830493" }
const FORM_ANCHOR = "anfrage"

const TEXT = {
  de: {
    eyebrow: "Fensterreinigung für Unternehmen",
    h1: "Streifenfreie Fenster – ohne Aufwand für Ihr Team",
    sub: "Professionelle Fensterreinigung für Büros, Geschäfte und Gewerbeobjekte in Luxemburg und der Region. Kostenlose Besichtigung, klares Festangebot, zuverlässige Termine.",
    heroPoints: ["Kostenlose Objektbesichtigung", "Für Büros, Geschäfte & Gewerbe", "Antwort i. d. R. in 24 Std."],
    ctaPrimary: "Kostenlose Besichtigung anfragen",
    ctaCall: "Direkt anrufen",
    region: "Aktiv in Luxemburg, Trier, Bitburg & Region",
    heroImageAlt: "Streifenfrei gereinigte Glasflächen eines Gewerbeobjekts nach der Fensterreinigung",
    benefitsEyebrow: "Warum Blitzeblank",
    benefitsHeading: "Fensterreinigung, auf die Sie sich verlassen können",
    benefits: [
      {
        icon: Droplets,
        title: "Moderne Reinstwasser-Technik",
        text: "Streifenfreie Ergebnisse – mit Teleskoptechnik auch in großer Höhe und an schwer erreichbaren Glasflächen.",
      },
      {
        icon: UserCheck,
        title: "Feste Ansprechperson",
        text: "Ein Team, das Ihr Objekt kennt, mit klaren Abläufen und verlässlich eingehaltenen Terminen.",
      },
      {
        icon: ShieldCheck,
        title: "Versichert & diskret",
        text: "Auf Wunsch außerhalb Ihrer Öffnungszeiten – ohne Störung Ihres Betriebs.",
      },
      {
        icon: CalendarClock,
        title: "Flexible Intervalle",
        text: "Einmalig oder regelmäßig – vom Schaufenster bis zur kompletten Glasfassade.",
      },
      {
        icon: Sparkles,
        title: "Dokumentierte Qualität",
        text: "Kontrolle nach jedem Einsatz, damit das Ergebnis dauerhaft stimmt.",
      },
      {
        icon: Building2,
        title: "Für jedes Objekt",
        text: "Büro, Ladenlokal, Praxis oder Industrieverglasung – wir kalkulieren passend zu Ihrem Bedarf.",
      },
    ],
    resultsEyebrow: "Ergebnisse",
    resultsHeading: "Sehen Sie den Unterschied",
    resultsBody: "Ziehen Sie den Regler, um das Vorher-Nachher-Ergebnis zu vergleichen.",
    moreImpressions: "Weitere Eindrücke",
    asideHeading: "In 3 Schritten zum sauberen Objekt",
    asideSteps: [
      "Anfrage senden – kostenlos & unverbindlich",
      "Wir vereinbaren die Objektbesichtigung",
      "Sie erhalten Ihr transparentes Festangebot",
    ],
    asideCallTitle: "Lieber direkt sprechen?",
    asideCallBody: "Wir sind telefonisch für Sie da und beraten Sie unverbindlich.",
    stickyCta: "Besichtigung anfragen",
  },
  en: {
    eyebrow: "Window cleaning for businesses",
    h1: "Streak-free windows – with zero effort for your team",
    sub: "Professional window cleaning for offices, shops and commercial properties in Luxembourg and the region. Free site visit, clear fixed quote, reliable appointments.",
    heroPoints: ["Free on-site visit", "For offices, shops & commercial", "Reply usually within 24 hrs"],
    ctaPrimary: "Request free site visit",
    ctaCall: "Call us directly",
    region: "Active in Luxembourg, Trier, Bitburg & the region",
    heroImageAlt: "Streak-free cleaned glass surfaces of a commercial property after window cleaning",
    benefitsEyebrow: "Why Blitzeblank",
    benefitsHeading: "Window cleaning you can rely on",
    benefits: [
      {
        icon: Droplets,
        title: "Modern pure-water technology",
        text: "Streak-free results – reaching great heights and hard-to-access glass with telescopic equipment.",
      },
      {
        icon: UserCheck,
        title: "A dedicated contact",
        text: "A team that knows your property, with clear processes and reliably kept appointments.",
      },
      {
        icon: ShieldCheck,
        title: "Insured & discreet",
        text: "Outside your opening hours on request – without disrupting your business.",
      },
      {
        icon: CalendarClock,
        title: "Flexible intervals",
        text: "One-time or recurring – from a shop window to a full glass facade.",
      },
      {
        icon: Sparkles,
        title: "Documented quality",
        text: "A check after every visit, so the result stays right long term.",
      },
      {
        icon: Building2,
        title: "For every property",
        text: "Office, shop, practice or industrial glazing – we calculate to suit your needs.",
      },
    ],
    resultsEyebrow: "Results",
    resultsHeading: "See the difference",
    resultsBody: "Drag the slider to compare the before-and-after result.",
    moreImpressions: "More impressions",
    asideHeading: "A clean property in 3 steps",
    asideSteps: [
      "Send your request – free & non-binding",
      "We arrange the on-site visit",
      "You receive your transparent fixed quote",
    ],
    asideCallTitle: "Prefer to talk directly?",
    asideCallBody: "We're available by phone and happy to advise you without obligation.",
    stickyCta: "Request site visit",
  },
  fr: {
    eyebrow: "Nettoyage de vitres pour entreprises",
    h1: "Des vitres sans traces – sans effort pour votre équipe",
    sub: "Nettoyage de vitres professionnel pour bureaux, commerces et locaux professionnels au Luxembourg et dans la région. Visite gratuite, offre ferme claire, rendez-vous fiables.",
    heroPoints: ["Visite gratuite du site", "Pour bureaux, commerces et entreprises", "Réponse généralement sous 24 h"],
    ctaPrimary: "Demander une visite gratuite",
    ctaCall: "Appeler directement",
    region: "Actif à Luxembourg, Trèves, Bitburg et dans la région",
    heroImageAlt: "Surfaces vitrées d'un local professionnel nettoyées sans traces après le nettoyage de vitres",
    benefitsEyebrow: "Pourquoi Blitzeblank",
    benefitsHeading: "Un nettoyage de vitres sur lequel vous pouvez compter",
    benefits: [
      {
        icon: Droplets,
        title: "Technique moderne à l'eau pure",
        text: "Des résultats sans traces – même en hauteur et sur les surfaces vitrées difficiles d'accès grâce à la technique télescopique.",
      },
      {
        icon: UserCheck,
        title: "Un interlocuteur attitré",
        text: "Une équipe qui connaît votre site, avec des processus clairs et des rendez-vous respectés.",
      },
      {
        icon: ShieldCheck,
        title: "Assuré et discret",
        text: "Sur demande en dehors de vos heures d'ouverture – sans perturber votre activité.",
      },
      {
        icon: CalendarClock,
        title: "Intervalles flexibles",
        text: "Ponctuel ou régulier – de la vitrine à la façade vitrée complète.",
      },
      {
        icon: Sparkles,
        title: "Qualité documentée",
        text: "Un contrôle après chaque intervention pour un résultat durable.",
      },
      {
        icon: Building2,
        title: "Pour chaque site",
        text: "Bureau, commerce, cabinet ou vitrage industriel – nous calculons selon vos besoins.",
      },
    ],
    resultsEyebrow: "Résultats",
    resultsHeading: "Voyez la différence",
    resultsBody: "Faites glisser le curseur pour comparer le résultat avant et après.",
    moreImpressions: "Plus d'aperçus",
    asideHeading: "Un site propre en 3 étapes",
    asideSteps: [
      "Envoyez votre demande – gratuite et sans engagement",
      "Nous convenons de la visite du site",
      "Vous recevez votre offre ferme transparente",
    ],
    asideCallTitle: "Vous préférez parler directement ?",
    asideCallBody: "Nous sommes joignables par téléphone et vous conseillons sans engagement.",
    stickyCta: "Demander une visite",
  },
}

export function WindowCleaningB2BPage({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const media = getServiceMedia("fensterreinigung")

  const scrollToForm = (source: string) => {
    pushDataLayerEvent("b2b_cta_click", { service: "window_cleaning", cta_location: source })
    const el = document.getElementById(FORM_ANCHOR)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handlePhoneClick = (source: string) => {
    pushDataLayerEvent("phone_click", { service: "window_cleaning", cta_location: source })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />

          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              src={media?.hero?.src ?? "/placeholder.svg"}
              alt={media?.hero?.alt ?? t.heroImageAlt}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/50 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-brand-sky">
                  <Sparkles className="h-4 w-4" />
                  {t.eyebrow}
                </p>
                <h1 className="mb-4 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                  {t.h1}
                </h1>
                <p className="mb-6 max-w-lg text-lg text-white/75 text-pretty">{t.sub}</p>

                <ul className="mb-8 flex flex-col gap-2.5">
                  {t.heroPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-white/90">
                      <ShieldCheck className="h-5 w-5 shrink-0 text-brand-sky" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => scrollToForm("hero")}
                    className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-blue px-8 font-semibold text-white shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105 hover:bg-brand-teal"
                  >
                    {t.ctaPrimary}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <a
                    href={CONTACT.phoneHref}
                    onClick={() => handlePhoneClick("hero")}
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/5 px-8 font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4" />
                    {t.ctaCall}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-brand-sky">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{t.region}</span>
                </div>
              </div>

              {/* Mobile hero image */}
              <div className="relative -mx-6 -mb-16 mt-4 h-64 overflow-hidden lg:hidden">
                <Image
                  src={media?.hero?.src ?? "/placeholder.svg"}
                  alt={media?.hero?.alt ?? t.heroImageAlt}
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

        {/* Benefits */}
        <section className="bg-brand-mint py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.benefitsEyebrow}</p>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
                {t.benefitsHeading}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {t.benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-navy/5 transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue">
                    <b.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-bold text-brand-navy">{b.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        {media && (media.beforeAfter.length > 0 || media.gallery.length > 0) && (
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-6xl px-6">
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.resultsEyebrow}</p>
                <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
                  {t.resultsHeading}
                </h2>
                {media.beforeAfter.length > 0 && <p className="mt-3 text-pretty text-neutral-600">{t.resultsBody}</p>}
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
                    {t.moreImpressions}
                  </h3>
                  <GalleryCarousel images={media.gallery} />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Anfrageformular */}
        <section className="scroll-mt-24 bg-brand-navy py-16 lg:py-24" id={FORM_ANCHOR}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
              {/* Formular */}
              <div className="lg:col-span-3">
                <WindowB2BForm locale={locale} />
              </div>

              {/* Trust-Aside */}
              <aside className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <h3 className="font-display text-xl font-bold text-white">{t.asideHeading}</h3>
                  <ol className="mt-5 space-y-4">
                    {t.asideSteps.map((s, i) => (
                      <li key={s} className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-display font-extrabold text-white">
                          {i + 1}
                        </span>
                        <span className="pt-1 text-sm leading-relaxed text-white/80">{s}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-7 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                    <div className="flex items-center gap-2 text-brand-sky">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-semibold">{t.asideCallTitle}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{t.asideCallBody}</p>
                    <a
                      href={CONTACT.phoneHref}
                      onClick={() => handlePhoneClick("form_aside")}
                      className="mt-4 inline-flex items-center gap-2 font-display text-lg font-bold text-white hover:text-brand-sky"
                    >
                      <Phone className="h-5 w-5 text-brand-blue" />
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <OwnerSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <FaqSection locale={locale} />
      </main>

      <Footer locale={locale} />

      {/* Sticky Mobile CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-blue/10 bg-white/95 p-3 backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => scrollToForm("sticky_mobile")}
          className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-blue font-semibold text-white shadow-lg shadow-brand-blue/30"
        >
          <ArrowRight className="h-4 w-4" />
          {t.stickyCta}
        </button>
      </div>
    </div>
  )
}
