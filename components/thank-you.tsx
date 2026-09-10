import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Phone, Home, Calculator, ArrowRight } from "lucide-react"
import { TrackLead } from "@/components/track-lead"
import { localizeHref, type Locale } from "@/lib/i18n"

const SERVICE_LINKS = {
  de: [
    { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
    { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
    { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
    { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
  ],
  en: [
    { href: "/leistungen/industriereinigung", label: "Industrial Cleaning" },
    { href: "/leistungen/fensterreinigung", label: "Window Cleaning" },
    { href: "/leistungen/steinreinigung", label: "Stone Cleaning" },
    { href: "/leistungen/fassadenreinigung", label: "Facade Cleaning" },
  ],
}

const TEXT = {
  de: {
    titleAccepted: "Vielen Dank für Ihr Vertrauen!",
    titleDeclined: "Schade – bleiben wir im Gespräch?",
    bodyAccepted: (
      <>
        Ihre Anfrage ist bei uns eingegangen. Eine Bestätigung mit der Zusammenfassung haben wir
        Ihnen per E-Mail geschickt. Wir melden uns in Kürze bei Ihnen, um einen Termin für die
        kostenlose Besichtigung zu vereinbaren.
      </>
    ),
    bodyDeclined: (
      <>
        Wir haben Ihre Anfrage erhalten. Unser Online-Richtpreis ist bewusst vorsichtig
        kalkuliert &ndash; vor Ort lässt sich oft ein faireres, passenderes Angebot finden. Rufen
        Sie uns einfach an, wir schauen gemeinsam nach einer Lösung.
      </>
    ),
    home: "Zur Startseite",
    moreServices: "Weitere Leistung anfragen",
    ourServices: "Unsere Leistungen",
  },
  en: {
    titleAccepted: "Thank you for your trust!",
    titleDeclined: "Too bad – shall we stay in touch?",
    bodyAccepted: (
      <>
        We&apos;ve received your request. We&apos;ve sent you a confirmation with a summary by
        email. We will get in touch with you shortly to arrange a free on-site visit.
      </>
    ),
    bodyDeclined: (
      <>
        We&apos;ve received your request. Our online estimate is deliberately calculated on the
        cautious side &ndash; on site we can often find a fairer, better-suited offer. Just give
        us a call and we&apos;ll find a solution together.
      </>
    ),
    home: "Back to Home",
    moreServices: "Request Another Service",
    ourServices: "Our Services",
  },
}

/**
 * Inhalt der Danke-Seiten. `variant` steuert Text/Icon. Die Tracking-Daten
 * kommen aus dem sessionStorage-Handoff des Formulars (siehe TrackLead).
 */
export function ThankYou({ variant, locale = "de" }: { variant: "accepted" | "declined"; locale?: Locale }) {
  const accepted = variant === "accepted"
  const t = TEXT[locale]
  const serviceLinks = SERVICE_LINKS[locale].map((s) => ({ ...s, href: localizeHref(s.href, locale) }))

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      {/* Feuert das lead_submitted-Event (nur nach Formular-Submit & Cookie-Zustimmung) */}
      <TrackLead expectedStatus={accepted ? "accepted" : "price_rejected"} />

      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
          accepted ? "bg-brand-blue/10" : "bg-brand-teal/10"
        }`}
      >
        {accepted ? (
          <CheckCircle2 className="h-10 w-10 text-brand-blue" />
        ) : (
          <Phone className="h-10 w-10 text-brand-teal" />
        )}
      </div>

      <h1 className="mt-6 text-balance font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
        {accepted ? t.titleAccepted : t.titleDeclined}
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-neutral-600">
        {accepted ? t.bodyAccepted : t.bodyDeclined}
      </p>

      {/* Telefon-CTA (bei Absage prominent, sonst zurück zur Startseite) */}
      {accepted ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group w-full rounded-full bg-brand-blue text-white shadow-md shadow-brand-blue/30 transition-transform hover:scale-105 hover:bg-brand-teal sm:w-auto"
          >
            <Link href={localizeHref("/", locale)} className="cursor-pointer">
              <Home className="h-4 w-4" />
              {t.home}
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-brand-blue/30 text-brand-blue hover:bg-brand-mint hover:text-brand-blue sm:w-auto"
          >
            <Link href={localizeHref("/leistungen/fensterreinigung", locale)} className="cursor-pointer">
              <Calculator className="h-4 w-4" />
              {t.moreServices}
            </Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group w-full rounded-full bg-brand-blue px-8 text-lg font-bold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:scale-105 hover:bg-brand-teal sm:w-auto"
          >
            <a href="tel:+352661830493" className="cursor-pointer">
              <Phone className="h-5 w-5" />
              +352 661 830 493
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="w-full rounded-full text-neutral-500 hover:bg-brand-mint hover:text-brand-navy sm:w-auto"
          >
            <Link href={localizeHref("/", locale)} className="cursor-pointer">
              {t.home}
            </Link>
          </Button>
        </div>
      )}

      {/* Weitere Leistungen */}
      <div className="mt-12 rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm shadow-brand-navy/5 sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">{t.ourServices}</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {serviceLinks.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-center justify-between rounded-lg px-4 py-3 text-left text-brand-navy transition-colors hover:bg-brand-mint hover:text-brand-blue cursor-pointer"
            >
              <span className="font-medium">{s.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-blue/50 transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
