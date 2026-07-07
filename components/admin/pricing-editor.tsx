"use client"

import { useState, useTransition } from "react"
import { quoteFrequencies, windowTypes } from "@/lib/quote-data"
import {
  defaultPricingConfig,
  getFassadePricePerSqm,
  getSteinPricePerSqm,
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
  disabled = false,
}: {
  label: string
  sub?: string
  value: number
  onChange: (v: number) => void
  step?: string
  suffix?: string
  disabled?: boolean
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
          disabled={disabled}
          className="h-10 w-28 text-right disabled:cursor-not-allowed disabled:opacity-60"
        />
        {suffix && <span className="w-8 text-sm text-neutral-500">{suffix}</span>}
      </div>
    </div>
  )
}

/**
 * Zeile eines Flächenmodells: zeigt die (feste) Quadratmeterzahl direkt neben
 * dem editierbaren m²-Preis, damit klar erkennbar ist, dass beide zusammengehören.
 */
function AreaPriceRow({
  area,
  price,
  onChange,
  disabled = false,
  hint,
}: {
  area: number
  price: number
  onChange: (v: number) => void
  disabled?: boolean
  hint?: string
}) {
  return (
    <div className="rounded-xl border border-brand-navy/10 bg-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="inline-flex items-center rounded-lg bg-brand-mint/60 px-3 py-1.5 text-sm font-semibold text-brand-navy">
            {area} m²
          </span>
          <span className="text-neutral-400" aria-hidden="true">
            →
          </span>
          <span className="text-sm text-neutral-500">kostet je m²</span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Input
            type="number"
            step="0.01"
            value={Number.isFinite(price) ? price : 0}
            onChange={(e) => onChange(Number.parseFloat(e.target.value))}
            disabled={disabled}
            aria-label={`Preis pro m² bei ${area} m²`}
            className="h-10 w-28 text-right disabled:cursor-not-allowed disabled:opacity-60"
          />
          <span className="w-10 text-sm text-neutral-500">€/m²</span>
        </div>
      </div>
      {hint && <p className="mt-2 text-xs font-light text-neutral-400">{hint}</p>}
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
  // Wenn aktiv, wird der Preis bei großer Fläche automatisch auf die Hälfte des
  // Preises bei kleiner Fläche gesetzt (z. B. 20 €/m² → 10 €/m²).
  const [autoAdjustFassade, setAutoAdjustFassade] = useState(true)

  const num = (v: number) => (Number.isFinite(v) ? v : 0)

  const setWindowPrice = (key: string, v: number) =>
    setConfig((c) => ({ ...c, windowPrices: { ...c.windowPrices, [key]: num(v) } }))

  const setFrequency = (key: string, v: number) =>
    setConfig((c) => ({ ...c, frequencyMultipliers: { ...c.frequencyMultipliers, [key]: num(v) } }))

  const setFassade = (field: keyof PricingConfig["fassade"], v: number) =>
    setConfig((c) => ({ ...c, fassade: { ...c.fassade, [field]: num(v) } }))

  const setStein = (field: keyof PricingConfig["stein"], v: number) =>
    setConfig((c) => ({ ...c, stein: { ...c.stein, [field]: num(v) } }))

  // Preis bei kleiner Fläche ändern – bei aktivem Auto-Modus wird der Preis bei
  // großer Fläche automatisch auf die Hälfte gesetzt.
  const setFassadeMaxPrice = (v: number) =>
    setConfig((c) => ({
      ...c,
      fassade: {
        ...c.fassade,
        maxPrice: num(v),
        ...(autoAdjustFassade ? { minPrice: num(v) / 2 } : {}),
      },
    }))

  const toggleAutoAdjust = (checked: boolean) => {
    setAutoAdjustFassade(checked)
    if (checked) {
      // Beim Aktivieren sofort angleichen.
      setConfig((c) => ({ ...c, fassade: { ...c.fassade, minPrice: c.fassade.maxPrice / 2 } }))
    }
  }

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

      {/* Fassadenreinigung-Flächenmodell */}
      <Section
        title="Fassadenreinigung – Flächenmodell"
        description="Der m²-Preis sinkt linear vom Preis bei kleiner Fläche auf den Preis bei großer Fläche. Sie legen nur die beiden Preise fest – die Flächen sind vorgegeben."
      >
        <AreaPriceRow
          area={config.fassade.minArea}
          price={config.fassade.maxPrice}
          onChange={(v) => setFassadeMaxPrice(v)}
        />
        <AreaPriceRow
          area={config.fassade.maxArea}
          price={config.fassade.minPrice}
          onChange={(v) => setFassade("minPrice", v)}
          disabled={autoAdjustFassade}
          hint={autoAdjustFassade ? "Automatisch = halber erster Preis" : undefined}
        />

        {/* Automatische Anpassung des zweiten Preises */}
        <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3">
          <input
            type="checkbox"
            checked={autoAdjustFassade}
            onChange={(e) => toggleAutoAdjust(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-blue"
          />
          <span className="text-sm text-brand-navy">
            Zweiten Preis automatisch anpassen
            <span className="mt-0.5 block text-xs font-light text-neutral-400">
              Der Preis bei großer Fläche wird automatisch auf die Hälfte des ersten Preises gesetzt
              (z. B. 20 €/m² → 10 €/m²).
            </span>
          </span>
        </label>

        <div className="mt-2 rounded-xl bg-white px-4 py-3 text-xs text-neutral-500">
          Beispiel: 50 m² ≈ {getFassadePricePerSqm(50, config).toFixed(2).replace(".", ",")} €/m² ·
          100 m² ≈ {getFassadePricePerSqm(100, config).toFixed(2).replace(".", ",")} €/m²
        </div>
      </Section>

      {/* Steinreinigung-Flächenmodell */}
      <Section
        title="Steinreinigung – Flächenmodell"
        description="Der m²-Preis sinkt linear vom Preis bei kleiner Fläche auf den Preis bei großer Fläche. Sie legen nur die beiden Preise fest – die Flächen sind vorgegeben."
      >
        <AreaPriceRow
          area={config.stein.minArea}
          price={config.stein.maxPrice}
          onChange={(v) => setStein("maxPrice", v)}
        />
        <AreaPriceRow
          area={config.stein.maxArea}
          price={config.stein.minPrice}
          onChange={(v) => setStein("minPrice", v)}
        />

        <div className="mt-2 rounded-xl bg-white px-4 py-3 text-xs text-neutral-500">
          Beispiel: 50 m² ≈ {getSteinPricePerSqm(50, config).toFixed(2).replace(".", ",")} €/m² ·
          100 m² ≈ {getSteinPricePerSqm(100, config).toFixed(2).replace(".", ",")} €/m²
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
          label="Aufschlag obere Grenze der Spanne"
          sub="Die untere Grenze ist der eigentliche Preis, die obere liegt um diesen Prozentsatz höher."
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
