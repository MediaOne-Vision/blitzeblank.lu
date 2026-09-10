"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { loadConsent, saveConsent, loadGtm, type ConsentState } from "@/lib/cookie-consent"
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n"

const TEXT = {
  de: {
    titleSettings: "Cookie-Einstellungen",
    titleLead: "Wir nutzen Cookies für ein ",
    titleAccent: "besseres Erlebnis.",
    bodySettings:
      "Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für den Betrieb der Website erforderlich.",
    body: "Mit Ihrer Zustimmung helfen Sie uns, unsere Website zu verbessern und Ihnen relevante Inhalte anzuzeigen. Marketing- und Statistik-Tools (Google Tag Manager) werden erst nach Ihrer Einwilligung geladen.",
    necessary: "Notwendig",
    necessaryDesc: "Erforderlich für grundlegende Funktionen der Website. Immer aktiv.",
    necessaryAria: "Notwendige Cookies (immer aktiv)",
    statistics: "Statistik",
    statisticsDesc: "Hilft uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics via GTM).",
    statisticsAria: "Statistik-Cookies zulassen",
    marketing: "Marketing",
    marketingDesc: "Wird genutzt, um Werbung relevanter zu gestalten und deren Wirkung zu messen.",
    marketingAria: "Marketing-Cookies zulassen",
    save: "Auswahl speichern",
    acceptAll: "Akzeptieren",
    reject: "Ablehnen",
    settings: "Einstellungen",
    more: "Mehr Informationen in unserer",
    privacy: "Datenschutzerklärung",
    back: "Zurück",
  },
  en: {
    titleSettings: "Cookie Settings",
    titleLead: "We use cookies for a ",
    titleAccent: "better experience.",
    bodySettings:
      "Choose which cookies you want to allow. Necessary cookies are required for the website to function.",
    body: "With your consent, you help us improve our website and show you relevant content. Marketing and statistics tools (Google Tag Manager) are only loaded after your consent.",
    necessary: "Necessary",
    necessaryDesc: "Required for basic functionality of the website. Always active.",
    necessaryAria: "Necessary cookies (always active)",
    statistics: "Statistics",
    statisticsDesc: "Helps us understand how visitors use the website (e.g. Google Analytics via GTM).",
    statisticsAria: "Allow statistics cookies",
    marketing: "Marketing",
    marketingDesc: "Used to make advertising more relevant and to measure its effectiveness.",
    marketingAria: "Allow marketing cookies",
    save: "Save selection",
    acceptAll: "Accept",
    reject: "Reject",
    settings: "Settings",
    more: "More information in our",
    privacy: "Privacy Policy",
    back: "Back",
  },
}

export function CookieConsentBanner() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const t = TEXT[locale]
  const [open, setOpen] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  // Beim Laden: bestehende Zustimmung prüfen und ggf. GTM laden
  useEffect(() => {
    const existing = loadConsent()
    if (existing) {
      setStatistics(existing.statistics)
      setMarketing(existing.marketing)
      loadGtm(existing)
    } else {
      setOpen(true)
    }
  }, [])

  // Ermöglicht das erneute Öffnen der Einstellungen (z. B. über Footer-Link)
  useEffect(() => {
    const handler = () => {
      const existing = loadConsent()
      setStatistics(existing?.statistics ?? false)
      setMarketing(existing?.marketing ?? false)
      setShowSettings(true)
      setOpen(true)
    }
    window.addEventListener("open-cookie-settings", handler)
    return () => window.removeEventListener("open-cookie-settings", handler)
  }, [])

  // Hintergrund-Scroll sperren, solange der Banner offen ist
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const persist = (state: ConsentState) => {
    loadGtm(state)
    setOpen(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    const state = saveConsent({ statistics: true, marketing: true })
    persist(state)
  }

  const rejectAll = () => {
    const state = saveConsent({ statistics: false, marketing: false })
    persist(state)
  }

  const saveSelection = () => {
    const state = saveConsent({ statistics, marketing })
    persist(state)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-brand-navy/40 p-4 backdrop-blur-md">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="relative my-auto w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* CI-Kreise oben rechts: hellerer Kreis liegt unter dem kräftigen Kreis */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-24 h-64 w-64 rounded-full bg-brand-sky/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gradient-to-br from-brand-sky to-brand-blue opacity-90"
        />

        <div className="relative p-6 sm:p-8">
          {/* Blitzeblank-Logo oben links */}
          <Image
            src="/images/logo.png"
            alt="Blitzeblank"
            width={180}
            height={44}
            className="h-9 w-auto sm:h-10"
            priority
          />

          {showSettings ? (
            <>
              <h2
                id="cookie-title"
                className="mt-6 font-display text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl"
              >
                {t.titleSettings}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-brand-blue" />
              <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-600">{t.bodySettings}</p>

              <div className="mt-5 space-y-3">
                {/* Notwendig */}
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 bg-brand-mint/40 p-4">
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{t.necessary}</p>
                    <p className="mt-0.5 text-xs text-neutral-500">{t.necessaryDesc}</p>
                  </div>
                  <Switch checked disabled aria-label={t.necessaryAria} />
                </div>

                {/* Statistik */}
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 p-4">
                  <div>
                    <Label htmlFor="consent-statistics" className="text-sm font-semibold text-brand-navy">
                      {t.statistics}
                    </Label>
                    <p className="mt-0.5 text-xs text-neutral-500">{t.statisticsDesc}</p>
                  </div>
                  <Switch
                    id="consent-statistics"
                    checked={statistics}
                    onCheckedChange={setStatistics}
                    aria-label={t.statisticsAria}
                  />
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 p-4">
                  <div>
                    <Label htmlFor="consent-marketing" className="text-sm font-semibold text-brand-navy">
                      {t.marketing}
                    </Label>
                    <p className="mt-0.5 text-xs text-neutral-500">{t.marketingDesc}</p>
                  </div>
                  <Switch
                    id="consent-marketing"
                    checked={marketing}
                    onCheckedChange={setMarketing}
                    aria-label={t.marketingAria}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={saveSelection}
                  className="h-12 flex-1 rounded-full bg-brand-blue text-base font-semibold text-white hover:bg-brand-teal"
                >
                  {t.save}
                </Button>
                <Button
                  onClick={acceptAll}
                  variant="outline"
                  className="h-12 flex-1 rounded-full border-brand-navy/20 text-base font-semibold text-brand-navy hover:bg-brand-mint"
                >
                  {t.acceptAll}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-brand-navy transition-colors hover:bg-brand-mint cursor-pointer"
                aria-label={t.back}
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <h2
                id="cookie-title"
                className="mt-6 text-balance font-display text-2xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-3xl"
              >
                {t.titleLead}
                <span className="text-brand-blue">{t.titleAccent}</span>
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-brand-blue" />
              <p className="mt-4 text-pretty text-sm leading-relaxed text-neutral-600">{t.body}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={acceptAll}
                  className="h-12 flex-1 rounded-full bg-brand-blue text-base font-semibold text-white hover:bg-brand-teal"
                >
                  {t.acceptAll}
                </Button>
                <Button
                  onClick={rejectAll}
                  variant="outline"
                  className="h-12 flex-1 rounded-full border-brand-navy/20 text-base font-semibold text-brand-navy hover:bg-brand-mint"
                >
                  {t.reject}
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowSettings(true)}
                  className="text-sm font-medium text-neutral-500 underline underline-offset-4 transition-colors hover:text-brand-navy cursor-pointer"
                >
                  {t.settings}
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-neutral-400">
                {t.more}{" "}
                <Link
                  href={localizeHref("/datenschutz", locale)}
                  target="_blank"
                  className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-teal"
                >
                  {t.privacy}
                </Link>
                .
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
