"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { loadConsent, saveConsent, loadGtm, type ConsentState } from "@/lib/cookie-consent"

export function CookieConsentBanner() {
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
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex justify-center p-4 sm:justify-end sm:p-6">
      <div
        role="dialog"
        aria-labelledby="cookie-title"
        className="pointer-events-auto relative w-full max-w-lg rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-2xl sm:p-7"
      >
        <div className="mb-4 flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-mint">
            <Cookie className="h-5 w-5 text-brand-blue" />
          </div>
          <div className="flex-1">
            <h2
              id="cookie-title"
              className="font-display text-lg font-extrabold text-brand-navy"
            >
              {showSettings ? "Cookie-Einstellungen" : "Wir verwenden Cookies"}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">
              {showSettings
                ? "Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies sind für den Betrieb der Website erforderlich."
                : "Wir nutzen Cookies, um unsere Website zu verbessern und – mit Ihrer Zustimmung – die Nutzung zu analysieren. Marketing- und Statistik-Tools (Google Tag Manager) werden erst nach Ihrer Einwilligung geladen."}
            </p>
          </div>
        </div>

        {showSettings && (
          <div className="mb-5 space-y-3">
            {/* Notwendig */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 bg-brand-mint/40 p-4">
              <div>
                <p className="text-sm font-semibold text-brand-navy">Notwendig</p>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Erforderlich für grundlegende Funktionen der Website. Immer aktiv.
                </p>
              </div>
              <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)" />
            </div>

            {/* Statistik */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 p-4">
              <div>
                <Label htmlFor="consent-statistics" className="text-sm font-semibold text-brand-navy">
                  Statistik
                </Label>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Hilft uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics via GTM).
                </p>
              </div>
              <Switch
                id="consent-statistics"
                checked={statistics}
                onCheckedChange={setStatistics}
                aria-label="Statistik-Cookies zulassen"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-navy/10 p-4">
              <div>
                <Label htmlFor="consent-marketing" className="text-sm font-semibold text-brand-navy">
                  Marketing
                </Label>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Wird genutzt, um Werbung relevanter zu gestalten und deren Wirkung zu messen.
                </p>
              </div>
              <Switch
                id="consent-marketing"
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Marketing-Cookies zulassen"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          {showSettings ? (
            <>
              <Button
                onClick={saveSelection}
                className="flex-1 rounded-full bg-brand-blue font-semibold text-white hover:bg-brand-teal"
              >
                Auswahl speichern
              </Button>
              <Button
                onClick={acceptAll}
                variant="outline"
                className="flex-1 rounded-full border-brand-navy/15 font-semibold text-brand-navy hover:bg-brand-mint"
              >
                Alle akzeptieren
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={acceptAll}
                className="flex-1 rounded-full bg-brand-blue font-semibold text-white hover:bg-brand-teal"
              >
                Alle akzeptieren
              </Button>
              <Button
                onClick={rejectAll}
                variant="outline"
                className="flex-1 rounded-full border-brand-navy/15 font-semibold text-brand-navy hover:bg-brand-mint"
              >
                Ablehnen
              </Button>
              <Button
                onClick={() => setShowSettings(true)}
                variant="ghost"
                className="flex-1 rounded-full font-semibold text-neutral-500 hover:bg-brand-mint hover:text-brand-navy"
              >
                Einstellungen
              </Button>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-neutral-400">
          Mehr Informationen in unserer{" "}
          <Link
            href="/datenschutz"
            target="_blank"
            className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-teal"
          >
            Datenschutzerklärung
          </Link>
          .
        </p>

        {showSettings && (
          <button
            type="button"
            onClick={() => setShowSettings(false)}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-brand-mint hover:text-brand-navy cursor-pointer"
            aria-label="Zurück"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
