"use client"

import { useState, useTransition } from "react"
import { quoteServices, quoteFrequencies, windowTypes } from "@/lib/quote-data"
import {
  defaultPricingConfig,
  getSteinPricePerSqm,
  getFassadePricePerSqm,
  type PricingConfig,
} from "@/lib/pricing-config"
import { savePricingAction } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Check, RotateCcw, AlertCircle } from "lucide-react"

/** Kleines Eingabefeld für einen Zahlenwert mit Label und Suffix. */
function NumberField({
  label,
  sub,
  value,
  onChange,
  step = "0.01",
  suffix,
}: {
  label: string
  sub?: string
  value: number
  onChange: (v: number) => void
  step?: string
  suffix?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-brand-navy/10 bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-brand-navy">{label}</p>
        {sub && <p className="mt-0.5 text-xs font-light text-neutral-400">{sub}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Input
          type="number"
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number.parseFloat(e.target.value))}
          className="h-10 w-28 text-right"
        />
        {suffix && <span className="w-8 text-sm text-neutral-500">{suffix}</span>}
      </div>
    </div>
  )
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-brand-navy/10 bg-brand-mint/40 p-5">
      <h2 className="font-display text-lg font-bold text-brand-navy">{title}</h2>
      {description && <p className="mt-1 mb-4 text-sm text-neutral-500">{description}</p>}
      <div className="mt-4 space-y-2">{children}</div>
    </section>
  )
}

export function PricingEditor({ initialConfig }: { initialConfig: PricingConfig }) {
  const [config, setConfig] = useState<PricingConfig>(initialConfig)
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ ok?: boolean; error?: string } | null>(null)

  const num = (v: number) => (Number.isFinite(v) ? v : 0)

  const setWindowPrice = (key: string, v: number) =>
    setConfig((c) => ({ ...c, windowPrices: { ...c.windowPrices, [key]: num(v) } }))

  const setService = (slug: string, field: "basePrice" | "pricePerSqm", v: number) =>
    setConfig((c) => ({
      ...c,
      services: { ...c.services, [slug]: { ...c.services[slug], [field]: num(v) } },
    }))

  const setFrequency = (key: string, v: number) =>
    setConfig((c) => ({ ...c, frequencyMultipliers: { ...c.frequencyMultipliers, [key]: num(v) } }))

  const setStein = (field: keyof PricingConfig["stein"], v: number) =>
    setConfig((c) => ({ ...c, stein: { ...c.stein, [field]: num(v) } }))

  const setFassade = (field: keyof PricingConfig["fassade"], v: number) =>
    setConfig((c) => ({ ...c, fassade: { ...c.fassade, [field]: num(v) } }))

  const setTop = (field: keyof PricingConfig, v: number) =>
    setConfig((c) => ({ ...c, [field]: num(v) }))

  const save = () => {
    setResult(null)
    startTransition(async () => {
      const res = await savePricingAction(config)
      setResult(res)
    })
  }

  const resetDefaults = () => {
    setConfig(defaultPricingConfig)
    setResult(null)
  }

  // Prozentwerte als ganze Zahlen darstellen (0.15 -> 15).
  const pct = (v: number) => Math.round(v * 100)
  const fromPct = (v: number) => num(v) / 100

  return (
    <div className="space-y-6">
      <p className="rounded-xl border border-brand-navy/10 bg-white px-4 py-3 text-sm text-neutral-600">
        Änderungen wirken sich sofort auf den Angebotsrechner aus, sobald Sie speichern. Die Preise
        werden Kunden nie einzeln angezeigt – sie fließen nur in die geschätzte Preisspanne ein.
      </p>

      {/* Fensterpreise */}
      <Section title="Fensterpreise" description="Pauschalpreis je Fensterart (pro Stück, Rollladen pro m²).">
        {windowTypes.map((t) => (
          <NumberField
            key={t.value}
            label={t.label}
            sub={t.dimension}
            value={config.windowPrices[t.value] ?? t.price}
            onChange={(v) => setWindowPrice(t.value, v)}
            suffix={t.perSqm ? "€/m²" : "€"}
          />
        ))}
      </Section>

      {/* Leistungs-Grundpreise & m² */}
      <Section
        title="Leistungen: Grundpreis & Quadratmeterpreis"
        description="Gilt für alle flächenbasierten Leistungen. Steinreinigung nutzt zusätzlich das Flächenmodell unten."
      >
        {quoteServices.map((s) => (
          <div key={s.slug} className="rounded-xl border border-brand-navy/10 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-brand-navy">{s.label}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <NumberField
                label="Grundpreis"
                value={config.services[s.slug]?.basePrice ?? s.basePrice}
                onChange={(v) => setService(s.slug, "basePrice", v)}
                step="1"
                suffix="€"
              />
              <NumberField
                label="Preis pro m²"
                value={config.services[s.slug]?.pricePerSqm ?? s.pricePerSqm}
                onChange={(v) => setService(s.slug, "pricePerSqm", v)}
                suffix="€/m²"
              />
            </div>
            {s.slug === "steinreinigung" && (
              <p className="mt-2 text-xs font-light text-neutral-400">
                Hinweis: Für die Steinreinigung wird der m²-Preis über das Flächenmodell berechnet
                (siehe unten), der Grundpreis wird hier nicht verwendet.
              </p>
            )}
            {s.slug === "fassadenreinigung" && (
              <p className="mt-2 text-xs font-light text-neutral-400">
                Hinweis: Für die Fassadenreinigung wird der Preis über das Flächenmodell berechnet
                (siehe unten). Grundpreis und m²-Preis hier werden nicht verwendet.
              </p>
            )}
          </div>
        ))}
      </Section>

      {/* Turnus */}
      <Section
        title="Turnus-Multiplikatoren"
        description="Faktor auf den Gesamtpreis je Reinigungsintervall (1 = kein Rabatt, 0.9 = 10 % günstiger)."
      >
        {quoteFrequencies.map((f) => (
          <NumberField
            key={f.value}
            label={f.label}
            value={config.frequencyMultipliers[f.value] ?? f.multiplier}
            onChange={(v) => setFrequency(f.value, v)}
            step="0.01"
            suffix="×"
          />
        ))}
      </Section>

      {/* Steinreinigungs-Flächenmodell */}
      <Section
        title="Steinreinigung – Flächenmodell"
        description="Der m²-Preis sinkt linear von 'Preis bei kleiner Fläche' auf 'Preis bei großer Fläche'."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <NumberField
            label="Kleine Fläche bis"
            value={config.stein.minArea}
            onChange={(v) => setStein("minArea", v)}
            step="1"
            suffix="m²"
          />
          <NumberField
            label="Große Fläche ab"
            value={config.stein.maxArea}
            onChange={(v) => setStein("maxArea", v)}
            step="1"
            suffix="m²"
          />
          <NumberField
            label="Preis bei kleiner Fläche"
            value={config.stein.maxPrice}
            onChange={(v) => setStein("maxPrice", v)}
            suffix="€/m²"
          />
          <NumberField
            label="Preis bei großer Fläche"
            value={config.stein.minPrice}
            onChange={(v) => setStein("minPrice", v)}
            suffix="€/m²"
          />
        </div>
        <div className="mt-2 rounded-xl bg-white px-4 py-3 text-xs text-neutral-500">
          Beispiel: 50 m² ≈ {getSteinPricePerSqm(50, config).toFixed(2).replace(".", ",")} €/m² ·
          100 m² ≈ {getSteinPricePerSqm(100, config).toFixed(2).replace(".", ",")} €/m²
        </div>
      </Section>

      {/* Fassadenreinigung-Flächenmodell */}
      <Section
        title="Fassadenreinigung – Flächenmodell"
        description="Der m²-Preis sinkt linear von 'Preis bei kleiner Fläche' auf 'Preis bei großer Fläche'. Für sehr kleine Flächen gilt ein Mindestpreis."
      >
        <div className="grid gap-2 sm:grid-cols-2">
          <NumberField
            label="Kleine Fläche bis"
            value={config.fassade.minArea}
            onChange={(v) => setFassade("minArea", v)}
            step="1"
            suffix="m²"
          />
          <NumberField
            label="Große Fläche ab"
            value={config.fassade.maxArea}
            onChange={(v) => setFassade("maxArea", v)}
            step="1"
            suffix="m²"
          />
          <NumberField
            label="Preis bei kleiner Fläche"
            value={config.fassade.maxPrice}
            onChange={(v) => setFassade("maxPrice", v)}
            suffix="€/m²"
          />
          <NumberField
            label="Preis bei großer Fläche"
            value={config.fassade.minPrice}
            onChange={(v) => setFassade("minPrice", v)}
            suffix="€/m²"
          />
          <NumberField
            label="Mindestpreis"
            sub="Untergrenze für sehr kleine Flächen"
            value={config.fassade.minCharge}
            onChange={(v) => setFassade("minCharge", v)}
            step="1"
            suffix="€"
          />
        </div>
        <div className="mt-2 rounded-xl bg-white px-4 py-3 text-xs text-neutral-500">
          Beispiel: 50 m² ≈ {getFassadePricePerSqm(50, config).toFixed(2).replace(".", ",")} €/m² ·
          100 m² ≈ {getFassadePricePerSqm(100, config).toFixed(2).replace(".", ",")} €/m²
        </div>
      </Section>

      {/* Anfahrt & Auf-/Abschläge */}
      <Section title="Anfahrt & Auf-/Abschläge">
        <NumberField
          label="Anfahrtspauschale pro km"
          value={config.travelCostPerKm}
          onChange={(v) => setTop("travelCostPerKm", v)}
          suffix="€/km"
        />
        <NumberField
          label="Rabatt für Privatkunden"
          value={pct(config.privateDiscount)}
          onChange={(v) => setTop("privateDiscount", fromPct(v))}
          step="1"
          suffix="%"
        />
        <NumberField
          label="Aufschlag für Gewerbekunden"
          value={pct(config.commercialSurcharge)}
          onChange={(v) => setTop("commercialSurcharge", fromPct(v))}
          step="1"
          suffix="%"
        />
        <NumberField
          label="Aufschlag für Anfangspreis der Spanne"
          sub="Wird immer auf den (rabattierten) Basispreis addiert."
          value={pct(config.rangeStartMarkup)}
          onChange={(v) => setTop("rangeStartMarkup", fromPct(v))}
          step="1"
          suffix="%"
        />
        <NumberField
          label="Spielraum obere Grenze der Spanne"
          sub="Zusätzlicher Aufschlag vom Anfangspreis auf den Höchstpreis."
          value={pct(config.rangeSpread)}
          onChange={(v) => setTop("rangeSpread", fromPct(v))}
          step="1"
          suffix="%"
        />
      </Section>

      {/* Aktionen */}
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-lg">
        <Button onClick={save} disabled={isPending} className="bg-brand-blue text-white hover:bg-brand-blue/90">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Speichern…
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Preise speichern
            </>
          )}
        </Button>
        <Button onClick={resetDefaults} variant="outline" disabled={isPending}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Auf Standard zurücksetzen
        </Button>
        {result?.ok && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
            <Check className="h-4 w-4" />
            Gespeichert
          </span>
        )}
        {result?.error && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-red-700">
            <AlertCircle className="h-4 w-4" />
            {result.error}
          </span>
        )}
      </div>
    </div>
  )
}
