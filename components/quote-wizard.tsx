"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  quoteServices,
  quoteFrequencies,
  windowTypes,
  getWindowType,
  type WindowRowEntry,
} from "@/lib/quote-data"
import {
  calculateQuotePrice,
  calculateWindowRowsPrice,
  defaultPricingConfig,
  type PricingConfig,
} from "@/lib/pricing-config"
import { computeTravel, type AddressSuggestion, type TravelInfo } from "@/lib/travel"
import { searchAddresses } from "@/app/actions/travel"
import { submitQuote, type QuoteSubmission } from "@/app/actions/submit-quote"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Phone,
} from "lucide-react"

const STEPS = ["Leistung", "Umfang", "Fotos", "Kontakt", "Angebot"]

interface UploadedPhoto {
  name: string
  url: string
}

export function QuoteWizard({
  initialSlug,
  pricingConfig = defaultPricingConfig,
}: {
  initialSlug?: string
  pricingConfig?: PricingConfig
}) {
  const [step, setStep] = useState(0)

  // Step 1 - Leistung
  const [serviceValue, setServiceValue] = useState(
    initialSlug ? quoteServices.find((s) => s.slug === initialSlug)?.value ?? "" : "",
  )
  const [details, setDetails] = useState<string[]>([])
  const [customDetail, setCustomDetail] = useState("")
  const [preferredDate, setPreferredDate] = useState("")

  // Adresse + Autocomplete (kostenloses OpenStreetMap-Nominatim + Haversine)
  const [address, setAddress] = useState("")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [travel, setTravel] = useState<TravelInfo | null>(null)
  const [travelLoading, setTravelLoading] = useState(false)
  const suggestTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Step 2 - Häufigkeit (Turnus) - nur bei Fensterreinigung
  const [frequencyValue, setFrequencyValue] = useState("")
  // Kundentyp - nur bei Fensterreinigung relevant
  const [customerType, setCustomerType] = useState<"privat" | "gewerbe">("privat")

  // Step 3 - Fläche (flächenbasierte Leistungen)
  const [area, setArea] = useState([100])

  // Fensterreinigung: Menge (Stück bzw. m²) je Fensterart, gekeyed nach type-Wert
  const [windowQuantities, setWindowQuantities] = useState<Record<string, string>>({})

  // Step 4 - Fotos
  const [photos, setPhotos] = useState<UploadedPhoto[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step 5 - Kontakt
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")

  // Step 6 - Angebot
  const [decision, setDecision] = useState<"accepted" | "declined" | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [privacyConsent, setPrivacyConsent] = useState(false)

  const selectedService = quoteServices.find((s) => s.value === serviceValue)
  const isWindow = serviceValue === "fenster"
  const isCommercial = isWindow && customerType === "gewerbe"

  // Turnus gibt es nur bei der Fensterreinigung, sonst immer "Einmalig".
  const effectiveFrequencyValue = isWindow ? frequencyValue : "einmalig"
  const selectedFrequency = quoteFrequencies.find((f) => f.value === effectiveFrequencyValue)

  // Mengen je Fensterart in numerische Zeilen für die Preisberechnung umwandeln
  const numericWindowRows: WindowRowEntry[] = windowTypes.map((t) => ({
    type: t.value,
    quantity: Number.parseFloat((windowQuantities[t.value] ?? "").replace(",", ".")) || 0,
  }))

  // Gesamtanzahl Fenster (Rollladen wird in m² gemessen und hier nicht mitgezählt)
  const assignedWindows = numericWindowRows
    .filter((row) => row.type && getWindowType(row.type)?.perSqm !== true)
    .reduce((sum, row) => sum + row.quantity, 0)

  const travelKm = travel?.billableKm ?? 0

  const price = isWindow
    ? calculateWindowRowsPrice(selectedService, selectedFrequency, numericWindowRows, pricingConfig, {
        travelKm,
        isCommercial,
      })
    : calculateQuotePrice(selectedService, selectedFrequency, area[0], pricingConfig, { travelKm })

  // Lesbare Auflistung der Fensterarten, z. B. "3× Fenster M (100×100)" oder "12 m² Rollladen"
  const windowBreakdown = numericWindowRows
    .filter((row) => row.quantity > 0 && row.type)
    .map((row) => {
      const type = getWindowType(row.type)
      if (!type) return ""
      const qty = Number.isInteger(row.quantity) ? row.quantity : row.quantity.toString().replace(".", ",")
      return type.perSqm ? `${qty} m² ${type.label.replace(" (pro m²)", "")}` : `${qty}× ${type.label}`
    })
    .filter(Boolean)

  const baseDetails = isWindow ? windowBreakdown : details
  const allDetails = customDetail.trim() ? [...baseDetails, customDetail.trim()] : baseDetails

  /* ---- Fenstermengen verwalten ---- */
  const updateWindowQuantity = (type: string, value: string) => {
    setWindowQuantities((prev) => ({ ...prev, [type]: value }))
  }

  const toggleDetail = (option: string) => {
    setDetails((prev) => (prev.includes(option) ? prev.filter((d) => d !== option) : [...prev, option]))
  }

  /* ---- Adress-Autocomplete (OpenStreetMap Nominatim, serverseitig) ---- */
  const handleAddressChange = (value: string) => {
    setAddress(value)
    // Bei manueller Änderung eine bereits ermittelte Entfernung verwerfen
    setTravel(null)

    if (suggestTimeout.current) clearTimeout(suggestTimeout.current)
    if (value.trim().length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    // Eingabe kurz entprellen, damit nicht bei jedem Tastendruck eine Anfrage läuft
    suggestTimeout.current = setTimeout(async () => {
      const results = await searchAddresses(value)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    }, 200)
  }

  const selectSuggestion = (suggestion: AddressSuggestion) => {
    setAddress(suggestion.description)
    setSuggestions([])
    setShowSuggestions(false)
    // Entfernung zur Firmenadresse per Haversine schätzen (fließt in den Preis ein)
    setTravelLoading(true)
    setTravel(computeTravel(suggestion))
    setTravelLoading(false)
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const newPhotos = Array.from(files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }))
    setPhotos((prev) => [...prev, ...newPhotos])
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return Boolean(serviceValue && address.trim())
      case 1:
        return isWindow ? numericWindowRows.some((row) => row.quantity > 0 && row.type) : true
      case 3:
        // Turnus nur bei Fensterreinigung verpflichtend
        return Boolean(name.trim() && email.trim() && privacyConsent && (!isWindow || frequencyValue))
      default:
        return true
    }
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleDecision = async (choice: "accepted" | "declined") => {
    setDecision(choice)
    setSubmitting(true)

    const submission: QuoteSubmission = {
      service: serviceValue,
      serviceLabel: selectedService?.label ?? "",
      details: allDetails,
      preferredDate,
      address,
      frequency: effectiveFrequencyValue,
      frequencyLabel: selectedFrequency?.label ?? "",
      area: isWindow ? 0 : area[0],
      windowCount: isWindow ? assignedWindows : undefined,
      windowBreakdown: isWindow ? windowBreakdown.join(", ") : undefined,
      customerType: isWindow ? customerType : undefined,
      distanceKm: travel?.distanceKm,
      photoCount: photos.length,
      name,
      email,
      phone,
      message,
      estimatedMin: price.min,
      estimatedMax: price.max,
      decision: choice,
    }

    try {
      await submitQuote(submission)
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-navy/5">
      {/* Progress header */}
      <div className="border-b border-brand-navy/5 bg-brand-mint/40 px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                <div
                  className={`hidden h-1 flex-1 rounded-full sm:block ${
                    i === 0 ? "opacity-0" : i <= step ? "bg-brand-blue" : "bg-brand-navy/10"
                  }`}
                />
                <div
                  className={`mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-display font-extrabold transition-colors ${
                    i < step
                      ? "bg-brand-blue text-white"
                      : i === step
                        ? "bg-brand-navy text-white ring-4 ring-brand-blue/20"
                        : "bg-brand-navy/10 text-brand-navy/50"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <div
                  className={`hidden h-1 flex-1 rounded-full sm:block ${
                    i === STEPS.length - 1 ? "opacity-0" : i < step ? "bg-brand-blue" : "bg-brand-navy/10"
                  }`}
                />
              </div>
              <span
                className={`text-center text-[11px] font-medium sm:text-xs ${
                  i === step ? "text-brand-navy" : "text-brand-navy/50"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 sm:px-10 sm:py-10">
        {/* STEP 1 - Leistung, Termin, Adresse, Detailauswahl */}
        {step === 0 && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                Welche Leistung benötigen Sie?
              </h3>
              <p className="text-sm text-neutral-500">Wählen Sie eine Reinigungsart aus.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quoteServices.map((s) => {
                const active = serviceValue === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      setServiceValue(s.value)
                      setDetails([])
                      setCustomDetail("")
                    }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                      active
                        ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                        : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active ? "bg-brand-blue" : "bg-brand-mint"
                      }`}
                    >
                      <s.icon className={`h-5 w-5 ${active ? "text-white" : "text-brand-blue"}`} />
                    </div>
                    <span className="text-sm font-semibold text-brand-navy">{s.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Optionale Detailauswahl (nicht für Fenster - dort erfolgt die Erfassung im Umfang-Schritt) */}
            {selectedService && !isWindow && (
              <div className="rounded-2xl bg-brand-mint/50 p-5">
                <Label className="text-sm font-semibold text-brand-navy">
                  {selectedService.detail.optionLabel}{" "}
                  <span className="font-normal text-neutral-400">(optional, Mehrfachauswahl)</span>
                </Label>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedService.detail.options.map((option) => {
                    const active = details.includes(option)
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleDetail(option)}
                        className={`rounded-full border px-4 py-1.5 text-sm transition-all cursor-pointer ${
                          active
                            ? "border-brand-blue bg-brand-blue text-white"
                            : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-blue/40"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 space-y-2">
                  <Label htmlFor="customDetail" className="text-sm font-normal text-neutral-600">
                    Sonstiges <span className="text-neutral-400">(optional)</span>
                  </Label>
                  <Input
                    id="customDetail"
                    placeholder="z. B. ein anderes Material oder besondere Anforderung"
                    value={customDetail}
                    onChange={(e) => setCustomDetail(e.target.value)}
                    className="bg-white font-light text-neutral-600 placeholder:text-neutral-400/70"
                  />
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-sm font-normal text-neutral-600">
                  <Calendar className="h-4 w-4 text-brand-blue" />
                  Wunschtermin <span className="text-neutral-400">(optional)</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="font-light text-neutral-600"
                />
              </div>
              {/* Adresse mit Autovervollständigung */}
              <div className="relative space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-normal text-neutral-600">
                  <MapPin className="h-4 w-4 text-brand-blue" />
                  Adresse *
                </Label>
                <Input
                  id="address"
                  autoComplete="off"
                  placeholder="Straße Hausnummer, PLZ Ort"
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-lg">
                    {suggestions.map((s) => (
                      <li key={`${s.lat},${s.lon}-${s.description}`}>
                        <button
                          type="button"
                          // onMouseDown statt onClick, damit die Auswahl vor dem Blur greift
                          onMouseDown={(e) => {
                            e.preventDefault()
                            selectSuggestion(s)
                          }}
                          className="flex w-full items-start gap-2 px-4 py-2.5 text-left text-sm text-brand-navy transition-colors hover:bg-brand-mint/60 cursor-pointer"
                        >
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                          <span>{s.description}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Live-Anzeige der berechneten Entfernung + Anfahrtskosten */}
                {travelLoading && (
                  <p className="flex items-center gap-2 text-xs font-light text-neutral-500">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-brand-blue" />
                    Entfernung wird berechnet…
                  </p>
                )}
                {!travelLoading && travel && (
                  <p className="text-xs font-light text-neutral-600">
                    ca. {travel.distanceKm.toLocaleString("de-DE")} km ab Wolsfeld · Anfahrt{" "}
                    <span className="font-semibold text-brand-navy">
                      {Math.round(travel.billableKm * pricingConfig.travelCostPerKm).toLocaleString("de-DE")} €
                    </span>{" "}
                    <span className="text-neutral-400">(Hin- und Rückweg, geschätzt)</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 - Umfang (Fensterarten bzw. Fläche) */}
        {step === 1 && (
          <div className="space-y-8">
            {isWindow ? (
              <>
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Welche Fenster sollen gereinigt werden?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Tragen Sie je Fenstertyp die Anzahl ein (Rollladen in m²). Sie müssen nicht alle
                    Felder ausfüllen – geben Sie nur an, was zutrifft.
                  </p>
                </div>

                {/* Kundentyp - beeinflusst die Preiskalkulation */}
                <div className="rounded-2xl bg-brand-mint/50 p-5">
                  <Label className="text-sm font-semibold text-brand-navy">Kundentyp</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      [
                        { value: "privat", label: "Privatkunde" },
                        { value: "gewerbe", label: "Gewerbekunde" },
                      ] as const
                    ).map((option) => {
                      const active = customerType === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setCustomerType(option.value)}
                          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                            active
                              ? "border-brand-blue bg-brand-blue text-white"
                              : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-blue/40"
                          }`}
                        >
                          {option.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Fensterart (Mehrfachauswahl), z. B. Dachfenster */}
                <div className="rounded-2xl bg-brand-mint/50 p-5">
                  <Label className="text-sm font-semibold text-brand-navy">
                    {selectedService?.detail.optionLabel}{" "}
                    <span className="font-normal text-neutral-400">(optional, Mehrfachauswahl)</span>
                  </Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedService?.detail.options.map((option) => {
                      const active = details.includes(option)
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleDetail(option)}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-all cursor-pointer ${
                            active
                              ? "border-brand-blue bg-brand-blue text-white"
                              : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-blue/40"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Fenstergrößen: alle Typen untereinander, Größe je Typ darunter */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-brand-navy">Fenstergrößen &amp; Anzahl</Label>
                  {windowTypes.map((t) => {
                    const qty = windowQuantities[t.value] ?? ""
                    const active = (Number.parseFloat(qty.replace(",", ".")) || 0) > 0
                    return (
                      <div
                        key={t.value}
                        className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors ${
                          active
                            ? "border-brand-blue bg-brand-blue/5"
                            : "border-brand-navy/10 bg-brand-mint/30"
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-brand-navy">{t.label}</p>
                          <p className="mt-0.5 text-xs font-light text-neutral-400">{t.dimension}</p>
                        </div>
                        <Input
                          type="number"
                          min={0}
                          step={t.perSqm ? "0.5" : "1"}
                          inputMode={t.perSqm ? "decimal" : "numeric"}
                          placeholder={t.perSqm ? "m²" : "0"}
                          value={qty}
                          onChange={(e) => updateWindowQuantity(t.value, e.target.value)}
                          className="h-11 w-24 shrink-0 bg-white text-center font-light text-neutral-600 placeholder:text-neutral-400/70"
                          aria-label={`${t.label} – ${t.perSqm ? "Quadratmeter" : "Anzahl"}`}
                        />
                      </div>
                    )
                  })}
                </div>

                {assignedWindows > 0 && (
                  <p className="text-sm font-medium text-brand-navy">
                    Insgesamt {assignedWindows} Fenster ausgewählt
                  </p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="customDetail" className="text-sm font-normal text-neutral-600">
                    Sonstiges <span className="text-neutral-400">(optional)</span>
                  </Label>
                  <Input
                    id="customDetail"
                    placeholder="z. B. schwer erreichbare Fenster oder besondere Anforderung"
                    value={customDetail}
                    onChange={(e) => setCustomDetail(e.target.value)}
                    className="bg-white font-light text-neutral-600 placeholder:text-neutral-400/70"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Wie groß ist die zu reinigende Fläche?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Verschieben Sie den Regler für eine Schätzung.
                  </p>
                </div>

                <div className="rounded-2xl bg-brand-mint/50 p-8">
                  <div className="mb-6 text-center">
                    <span className="font-display text-5xl font-extrabold text-brand-navy">
                      {area[0].toLocaleString("de-DE")}
                    </span>
                    <span className="ml-2 text-lg text-neutral-500">m²</span>
                  </div>
                  <Slider
                    value={area}
                    onValueChange={setArea}
                    max={1000}
                    min={20}
                    step={10}
                    className="[&_[role=slider]]:bg-brand-blue [&_[role=slider]]:border-brand-blue"
                  />
                  <div className="mt-3 flex justify-between text-xs text-neutral-400">
                    <span>20 m²</span>
                    <span>1.000 m²</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - Fotos */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                Fotos hochladen <span className="text-neutral-400">(optional)</span>
              </h3>
              <p className="text-sm text-neutral-500">
                Bilder helfen uns, Ihr Angebot genauer zu kalkulieren.
              </p>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-blue/30 bg-brand-mint/40 px-6 py-12 text-center transition-colors hover:border-brand-blue/60 hover:bg-brand-mint/70 cursor-pointer"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10">
                <Upload className="h-6 w-6 text-brand-blue" />
              </div>
              <div>
                <p className="font-semibold text-brand-navy">Fotos auswählen</p>
                <p className="text-sm text-neutral-500">Klicken Sie hier, um Bilder hochzuladen</p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />

            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {photos.map((photo, i) => (
                  <div key={i} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-brand-navy/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url || "/placeholder.svg"} alt={photo.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy/80 text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                      aria-label="Foto entfernen"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4 - Häufigkeit (nur Fenster) & Kontakt */}
        {step === 3 && (
          <div className="space-y-10">
            {/* Turnus ausschließlich bei der Fensterreinigung anzeigen */}
            {isWindow && (
              <div className="space-y-5">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Wie häufig benötigen Sie die Reinigung?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Bei regelmäßiger Reinigung sparen Sie dauerhaft.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {quoteFrequencies.map((f) => {
                    const active = frequencyValue === f.value
                    return (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setFrequencyValue(f.value)}
                        className={`flex items-center justify-between rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                          active
                            ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                        }`}
                      >
                        <span className="font-semibold text-brand-navy">{f.label}</span>
                        {/* Für Gewerbekunden gibt es keinen Rabatt, daher nur bei Privatkunden anzeigen */}
                        {f.discount > 0 && !isCommercial && (
                          <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-bold text-white">
                            -{f.discount}%
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                  Ihre Kontaktdaten
                </h3>
                <p className="text-sm text-neutral-500">
                  Damit wir Ihnen Ihr persönliches Angebot zusenden können.
                </p>
              </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-normal text-neutral-600">Name *</Label>
                <Input
                  id="name"
                  placeholder="Ihr Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-normal text-neutral-600">E-Mail *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone" className="font-normal text-neutral-600">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+352 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message" className="font-normal text-neutral-600">
                  Anmerkungen <span className="text-neutral-400">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  rows={3}
                  placeholder="Weitere Informationen zu Ihrem Anliegen..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-brand-mint/50 p-4 sm:col-span-2">
                <Checkbox
                  id="privacy-consent"
                  checked={privacyConsent}
                  onCheckedChange={(checked) => setPrivacyConsent(checked === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="privacy-consent"
                  className="text-sm font-normal leading-relaxed text-neutral-600"
                >
                  Ich habe die{" "}
                  <Link
                    href="/datenschutz"
                    target="_blank"
                    className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-teal"
                  >
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen und stimme der Verarbeitung meiner Angaben zu. *
                </Label>
              </div>
            </div>
            </div>
          </div>
        )}

        {/* STEP 5 - Angebot (Preis erst hier, nach Abschluss aller Eingaben) */}
        {step === 4 && (
          <div className="space-y-8">
            {!submitted ? (
              <>
                <div className="text-center">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-blue">
                    Ihr unverbindliches Angebot
                  </p>
                  <h3 className="font-display text-2xl font-extrabold text-brand-navy">
                    Geschätzter Preis
                  </h3>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-teal p-8 text-center">
                  <p className="text-sm text-white/80">Geschätzte Preisspanne</p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-white sm:text-5xl">
                    {price.min.toLocaleString("de-DE")} - {price.max.toLocaleString("de-DE")} €
                  </p>
                  {/* Rabatt-Hinweis nur bei Privatkunden mit regelmäßiger Reinigung */}
                  {!isCommercial && selectedFrequency && selectedFrequency.discount > 0 && (
                    <p className="mt-2 text-sm text-white/80">
                      inkl. {selectedFrequency.discount}% Rabatt bei {selectedFrequency.label.toLowerCase()}er Reinigung
                    </p>
                  )}
                </div>

                {/* Pflichthinweis: Preis ist nur eine Orientierung */}
                <p className="rounded-2xl bg-brand-mint/50 px-5 py-4 text-center text-sm text-brand-navy">
                  Dieser Preis dient lediglich als Orientierung. Der tatsächliche Preis kann nach
                  Besichtigung oder genauer Prüfung abweichen.
                </p>

                {/* Zusätzlicher Hinweis für Gewerbekunden */}
                {isCommercial && (
                  <p className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 px-5 py-4 text-center text-sm text-brand-navy">
                    Für Gewerbekunden erfolgt in der Regel eine Besichtigung vor Ort. Der angezeigte
                    Preis dient lediglich als Orientierung.
                  </p>
                )}

                {/* Zusammenfassung */}
                <div className="space-y-2.5 rounded-2xl bg-brand-mint/50 p-6 text-sm">
                  <SummaryRow label="Leistung" value={selectedService?.label ?? "-"} />
                  {allDetails.length > 0 && <SummaryRow label="Details" value={allDetails.join(", ")} />}
                  {isWindow && (
                    <SummaryRow label="Kundentyp" value={customerType === "gewerbe" ? "Gewerbekunde" : "Privatkunde"} />
                  )}
                  {isWindow && <SummaryRow label="Turnus" value={selectedFrequency?.label ?? "-"} />}
                  {isWindow ? (
                    <SummaryRow label="Fenster gesamt" value={`${assignedWindows}`} />
                  ) : (
                    <SummaryRow label="Fläche" value={`${area[0].toLocaleString("de-DE")} m²`} />
                  )}
                  <SummaryRow label="Adresse" value={address || "-"} />
                  {travel && (
                    <SummaryRow
                      label="Anfahrt"
                      value={`ca. ${travel.distanceKm.toLocaleString("de-DE")} km · ${Math.round(
                        travel.billableKm * pricingConfig.travelCostPerKm,
                      ).toLocaleString("de-DE")} €`}
                    />
                  )}
                  {preferredDate && <SummaryRow label="Wunschtermin" value={preferredDate} />}
                  {photos.length > 0 && <SummaryRow label="Fotos" value={`${photos.length} hochgeladen`} />}
                </div>

                <p className="text-center text-xs text-neutral-400">
                  Unverbindliche Schätzung. Der finale Preis wird nach einer kostenlosen Besichtigung
                  vor Ort festgelegt. Ihre Angaben werden in beiden Fällen an Blitzeblank übermittelt.
                </p>

                <div className="flex flex-col gap-3">
                  <Button
                    disabled={submitting}
                    onClick={() => handleDecision("accepted")}
                    className="group h-16 w-full rounded-full bg-brand-blue text-lg font-bold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:bg-brand-teal hover:scale-[1.02] sm:text-xl"
                  >
                    {submitting && decision === "accepted" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ThumbsUp className="h-5 w-5" />
                    )}
                    Angebot annehmen
                  </Button>
                  <Button
                    variant="ghost"
                    disabled={submitting}
                    onClick={() => handleDecision("declined")}
                    className="rounded-full text-neutral-500 hover:bg-brand-mint hover:text-brand-navy"
                  >
                    {submitting && decision === "declined" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ThumbsDown className="h-4 w-4" />
                    )}
                    Angebot ablehnen
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <div
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${
                    decision === "accepted" ? "bg-brand-blue/10" : "bg-brand-teal/10"
                  }`}
                >
                  {decision === "accepted" ? (
                    <CheckCircle2 className="h-8 w-8 text-brand-blue" />
                  ) : (
                    <Phone className="h-8 w-8 text-brand-teal" />
                  )}
                </div>
                <h3 className="mb-3 font-display text-2xl font-extrabold text-brand-navy">
                  {decision === "accepted" ? "Vielen Dank für Ihr Vertrauen!" : "Schade!"}
                </h3>
                <p className="mx-auto max-w-md text-neutral-600">
                  {decision === "accepted"
                    ? "Ihre Anfrage wurde an Blitzeblank übermittelt. Wir melden uns in Kürze bei Ihnen, um einen Termin für die kostenlose Besichtigung zu vereinbaren."
                    : "Wir verstehen, dass die Preisspanne nicht Ihren Vorstellungen entspricht. Rufen Sie uns an - vielleicht finden wir gemeinsam eine Lösung."}
                </p>
                {decision === "declined" && (
                  <Button
                    asChild
                    size="lg"
                    className="mt-8 h-14 rounded-full bg-brand-blue px-8 text-lg font-bold text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal"
                  >
                    <a href="tel:+352661830493" className="cursor-pointer">
                      <Phone className="h-5 w-5" />
                      +352 661 830 493
                    </a>
                  </Button>
                )}
                <div>
                  <Button
                    asChild
                    variant={decision === "declined" ? "ghost" : "default"}
                    size="lg"
                    className={
                      decision === "declined"
                        ? "mt-4 rounded-full text-neutral-500 hover:bg-brand-mint hover:text-brand-navy"
                        : "mt-8 rounded-full bg-brand-blue text-white hover:bg-brand-teal"
                    }
                  >
                    <Link href="/" className="cursor-pointer">
                      Zurück zur Startseite
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        {!(step === 4 && submitted) && (
          <div className="mt-10 flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              onClick={back}
              disabled={step === 0}
              className="text-brand-navy hover:bg-brand-mint disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>

            {step < STEPS.length - 1 && (
              <Button
                type="button"
                onClick={next}
                disabled={!canProceed()}
                className="group rounded-full bg-brand-blue text-white hover:bg-brand-teal disabled:opacity-40"
              >
                Weiter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-neutral-500">{label}</span>
      <span className="text-right font-medium text-brand-navy">{value}</span>
    </div>
  )
}
