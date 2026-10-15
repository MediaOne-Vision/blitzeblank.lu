import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Phone, Home } from "lucide-react"
import { TrackLead } from "@/components/track-lead"
import { localizeHref, type Locale } from "@/lib/i18n"

const TEXT = {
  de: {
    title: "Vielen Dank für Ihre Nachricht!",
    body: "Wir haben Ihre Anfrage erhalten und Ihnen eine Bestätigung per E-Mail geschickt. Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    home: "Zur Startseite",
    call: "Dringend? Rufen Sie uns an",
  },
  en: {
    title: "Thank you for your message!",
    body: "We have received your request and sent you a confirmation by email. We will get back to you within 24 hours.",
    home: "Back to Home",
    call: "Urgent? Give us a call",
  },
} as const

export function ContactThankYou({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const homeHref = localizeHref("/", locale)

  return (
    <div className="mx-auto w-full max-w-2xl text-center">
      <TrackLead expected="contact" homeHref={homeHref} />

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10">
        <CheckCircle2 className="h-10 w-10 text-brand-blue" />
      </div>

      <h1 className="mt-6 text-balance font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
        {t.title}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-neutral-600">{t.body}</p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="rounded-full bg-brand-blue px-8 text-white hover:bg-brand-teal">
          <Link href={homeHref} className="cursor-pointer">
            <Home className="h-4 w-4" />
            {t.home}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-8">
          <a href="tel:+352661830493" className="cursor-pointer">
            <Phone className="h-4 w-4" />
            {t.call}
          </a>
        </Button>
      </div>
    </div>
  )
}
