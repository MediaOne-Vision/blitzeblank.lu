"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
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
  getLocalizedQuoteServices,
  getLocalizedQuoteFrequencies,
  getLocalizedWindowTypes,
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
import { submitQuote } from "@/app/actions/submit-quote"
import type { QuoteSubmission } from "@/lib/quote-email"
import { generateLeadId, storeLeadHandoff, type LeadStatus, type QuoteType } from "@/lib/tracking"
import { localizeHref, type Locale } from "@/lib/i18n"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  Phone,
} from "lucide-react"

const STEPS_BY_LOCALE = {
  de: ["Leistung", "Umfang", "Fotos", "Kontakt", "Angebot"],
  en: ["Service", "Scope", "Photos", "Contact", "Quote"],
}

const WIZARD_TEXT = {
  de: {
    step1Heading: "Welche Leistung benötigen Sie?",
    step1Sub: "Wählen Sie eine Reinigungsart aus.",
    optionalMulti: "(optional, Mehrfachauswahl)",
    other: "Sonstiges",
    optional: "(optional)",
    customPlaceholderDefault: "z. B. ein anderes Material oder besondere Anforderung",
    customPlaceholderWindow: "z. B. schwer erreichbare Fenster oder besondere Anforderung",
    preferredDate: "Wunschtermin",
    address: "Adresse *",
    addressPlaceholder: "Straße Hausnummer, PLZ Ort",
    addressConfirmed: "Adresse übernommen",
    step2WindowHeading: "Welche Fenster sollen gereinigt werden?",
    step2WindowSub:
      "Tragen Sie je Fenstertyp die Anzahl ein (Rollladen in m²). Sie müssen nicht alle Felder ausfüllen – geben Sie nur an, was zutrifft.",
    customerType: "Kundentyp",
    customerPrivate: "Privatkunde",
    customerCommercial: "Gewerbekunde",
    windowSizesHeading: "Fenstergrößen & Anzahl",
    otherOptionalWindows: "(optional – Fensterfront, Terrassenfenster, Glastür, Rollladen …)",
    totalWindowsSelected: (n: number) => `Insgesamt ${n} Fenster ausgewählt`,
    step2AreaHeading: "Wie groß ist die zu reinigende Fläche?",
    step2AreaSub: "Verschieben Sie den Regler für eine Schätzung.",
    priceOnRequest: "Preis auf Anfrage",
    priceOnRequestBody: (area: string, min: string, max: string) =>
      `Ein automatischer Richtpreis ist für ${area} m² nicht verfügbar (kalkulierbar von ${min}–${max} m²). Größere Objekte können jederzeit individuell angefragt werden.`,
    largerObjectsNote: "Größere Objekte können jederzeit individuell angefragt werden.",
    photosHeading: "Fotos hochladen",
    photosSub: "Bilder helfen uns, Ihr Angebot genauer zu kalkulieren.",
    photosSelect: "Fotos auswählen",
    photosClickHint: "Klicken Sie hier, um Bilder hochzuladen",
    uploadFailed: "Upload fehlgeschlagen",
    removePhoto: "Foto entfernen",
    photosUploading: "Fotos werden hochgeladen…",
    frequencyHeading: "Wie häufig benötigen Sie die Reinigung?",
    frequencySub: "Bei regelmäßiger Reinigung sparen Sie dauerhaft.",
    contactHeading: "Ihre Kontaktdaten",
    contactSub: "Damit wir Ihnen Ihr persönliches Angebot zusenden können.",
    name: "Name *",
    namePlaceholder: "Ihr Name",
    email: "E-Mail *",
    emailPlaceholder: "ihre@email.com",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    phone: "Telefon",
    phonePlaceholder: "+352 ...",
    message: "Anmerkungen",
    messagePlaceholder: "Weitere Informationen zu Ihrem Anliegen...",
    privacyPrefix: "Ich habe die",
    privacyLink: "Datenschutzerklärung",
    privacySuffix: "gelesen und stimme der Verarbeitung meiner Angaben zu. *",
    yourQuote: "Ihr unverbindliches Angebot",
    estimatedPrice: "Geschätzter Preis",
    individualOffer: "Individuelles Angebot",
    customQuoteBody: "Für diese Objektgröße erstellen wir Ihnen ein persönliches Angebot.",
    estimatedRange: "Geschätzte Preisspanne",
    discountNote: (discount: number, freq: string) => `inkl. ${discount}% Rabatt bei ${freq}er Reinigung`,
    onRequestNote:
      "Größere Objekte können jederzeit individuell angefragt werden. Wir melden uns mit einem maßgeschneiderten Angebot.",
    estimateNote:
      "Dieser Preis dient lediglich als Orientierung. Der tatsächliche Preis kann nach Besichtigung oder genauer Prüfung abweichen.",
    commercialNote:
      "Für Gewerbekunden erfolgt in der Regel eine Besichtigung vor Ort. Der angezeigte Preis dient lediglich als Orientierung.",
    summaryService: "Leistung",
    summaryDetails: "Details",
    summaryCustomerType: "Kundentyp",
    summaryFrequency: "Turnus",
    summaryWindowsTotal: "Fenster gesamt",
    summaryArea: "Fläche",
    summaryAddress: "Adresse",
    summaryTravel: "Anfahrt (ungefähr)",
    travelNote: "Die Anfahrt ist nur ein ungefährer Richtwert und kann je nach tatsächlicher Route abweichen.",
    summaryDate: "Wunschtermin",
    summaryPhotos: "Fotos",
    photosUploadedCount: (n: number) => `${n} hochgeladen`,
    finalNote:
      "Unverbindliche Schätzung. Der finale Preis wird nach einer kostenlosen Besichtigung vor Ort festgelegt. Ihre Angaben werden in beiden Fällen an Blitzeblank übermittelt.",
    stillUploading: "Ihre Fotos werden noch hochgeladen…",
    requestOffer: "Angebot anfragen",
    acceptOffer: "Angebot annehmen",
    declineOffer: "Angebot ablehnen",
    thanksAccepted: "Vielen Dank für Ihr Vertrauen!",
    thanksDeclined: "Schade!",
    thanksAcceptedBody1: "Ihre Anfrage wurde an Blitzeblank übermittelt. Eine Bestätigung mit der Zusammenfassung haben wir an",
    thanksAcceptedBody2:
      "gesendet. Wir melden uns in Kürze bei Ihnen, um einen Termin für die kostenlose Besichtigung zu vereinbaren.",
    thanksDeclinedBody:
      "Wir verstehen, dass die Preisspanne nicht Ihren Vorstellungen entspricht. Rufen Sie uns an - vielleicht finden wir gemeinsam eine Lösung.",
    backHome: "Zurück zur Startseite",
    back: "Zurück",
    next: "Weiter",
    privateLabel: "Privatkunde",
    commercialLabel: "Gewerbekunde",
  },
  en: {
    step1Heading: "Which service do you need?",
    step1Sub: "Choose a type of cleaning.",
    optionalMulti: "(optional, multi-select)",
    other: "Other",
    optional: "(optional)",
    customPlaceholderDefault: "e.g. a different material or special requirement",
    customPlaceholderWindow: "e.g. hard-to-reach windows or special requirement",
    preferredDate: "Preferred date",
    address: "Address *",
    addressPlaceholder: "Street number, postal code city",
    addressConfirmed: "Address confirmed",
    step2WindowHeading: "Which windows should be cleaned?",
    step2WindowSub:
      "Enter the quantity for each window type (roller shutters in m²). You don't need to fill in every field – just enter what applies.",
    customerType: "Customer Type",
    customerPrivate: "Private Customer",
    customerCommercial: "Commercial Customer",
    windowSizesHeading: "Window Sizes & Quantity",
    otherOptionalWindows: "(optional – window front, patio window, glass door, roller shutter …)",
    totalWindowsSelected: (n: number) => `${n} windows selected in total`,
    step2AreaHeading: "How large is the area to be cleaned?",
    step2AreaSub: "Move the slider for an estimate.",
    priceOnRequest: "Price on Request",
    priceOnRequestBody: (area: string, min: string, max: string) =>
      `An automatic estimate isn't available for ${area} m² (calculable from ${min}–${max} m²). Larger objects can always be requested individually.`,
    largerObjectsNote: "Larger objects can always be requested individually.",
    photosHeading: "Upload Photos",
    photosSub: "Photos help us calculate your quote more accurately.",
    photosSelect: "Select Photos",
    photosClickHint: "Click here to upload images",
    uploadFailed: "Upload failed",
    removePhoto: "Remove photo",
    photosUploading: "Uploading photos…",
    frequencyHeading: "How often do you need the cleaning?",
    frequencySub: "You save permanently with regular cleaning.",
    contactHeading: "Your Contact Details",
    contactSub: "So we can send you your personal quote.",
    name: "Name *",
    namePlaceholder: "Your name",
    email: "Email *",
    emailPlaceholder: "your@email.com",
    emailInvalid: "Please enter a valid email address.",
    phone: "Phone",
    phonePlaceholder: "+352 ...",
    message: "Notes",
    messagePlaceholder: "Additional information about your request...",
    privacyPrefix: "I have read the",
    privacyLink: "Privacy Policy",
    privacySuffix: "and agree to the processing of my data. *",
    yourQuote: "Your Non-Binding Quote",
    estimatedPrice: "Estimated Price",
    individualOffer: "Individual Quote",
    customQuoteBody: "For this property size, we'll create a personal quote for you.",
    estimatedRange: "Estimated Price Range",
    discountNote: (discount: number, freq: string) => `incl. ${discount}% discount for ${freq} cleaning`,
    onRequestNote:
      "Larger objects can always be requested individually. We'll get back to you with a tailored offer.",
    estimateNote:
      "This price is for guidance only. The actual price may vary after an on-site visit or closer inspection.",
    commercialNote:
      "For commercial customers, an on-site visit usually takes place. The price shown is for guidance only.",
    summaryService: "Service",
    summaryDetails: "Details",
    summaryCustomerType: "Customer Type",
    summaryFrequency: "Frequency",
    summaryWindowsTotal: "Windows Total",
    summaryArea: "Area",
    summaryAddress: "Address",
    summaryTravel: "Travel (approx.)",
    travelNote: "Travel is only an approximate estimate and may vary depending on the actual route.",
    summaryDate: "Preferred Date",
    summaryPhotos: "Photos",
    photosUploadedCount: (n: number) => `${n} uploaded`,
    finalNote:
      "Non-binding estimate. The final price is determined after a free on-site visit. Your details will be sent to Blitzeblank in both cases.",
    stillUploading: "Your photos are still uploading…",
    requestOffer: "Request Quote",
    acceptOffer: "Accept Quote",
    declineOffer: "Decline Quote",
    thanksAccepted: "Thank you for your trust!",
    thanksDeclined: "Too bad!",
    thanksAcceptedBody1: "Your request has been sent to Blitzeblank. We've sent a confirmation with a summary to",
    thanksAcceptedBody2:
      "We will get in touch with you shortly to arrange a free on-site visit.",
    thanksDeclinedBody:
      "We understand the price range doesn't match your expectations. Give us a call - maybe we can find a solution together.",
    backHome: "Back to Home",
    back: "Back",
    next: "Next",
    privateLabel: "Private",
    commercialLabel: "Commercial",
  },
}

// Reinigungen pro Jahr je Turnus – für den Jahreswert (quote_value) im Conversion-Tracking.
const VISITS_PER_YEAR: Record<string, number> = {
  einmalig: 1,
  monatlich: 12,
  quartalsweise: 4,
  halbjaehrlich: 2,
}

/**
 * Flächenbasierte Leistungen: Grenzen des Schiebereglers sowie der Bereich, für
 * den ein Richtpreis berechnet wird. Außerhalb dieses Bereichs erfolgt keine
 * automatische Kalkulation, sondern "Preis auf Anfrage".
 */
const AREA_LIMITS: Record<
  string,
  { sliderMin: number; sliderMax: number; quoteMin: number; quoteMax: number }
> = {
  fassade: { sliderMin: 20, sliderMax: 400, quoteMin: 100, quoteMax: 400 },
  stein: { sliderMin: 20, sliderMax: 300, quoteMin: 50, quoteMax: 150 },
}

/** Standard-Fläche beim Wechsel der Leistung (innerhalb des kalkulierbaren Bereichs) */
const DEFAULT_AREA_BY_SERVICE: Record<string, number> = {
  fassade: 100,
  stein: 50,
}

/** Einfache, aber robuste E-Mail-Prüfung für die clientseitige Validierung */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface UploadedPhoto {
  /** Ursprünglicher Dateiname */
  name: string
  /** Lokale Vorschau-URL (Object-URL im Browser) */
  url: string
  /** Pfad im Blob-Store, sobald der Upload abgeschlossen ist */
  pathname?: string
  /** Status des Server-Uploads */
  status: "uploading" | "done" | "error"
}

export function QuoteWizard({
  initialSlug,
  pricingConfig = defaultPricingConfig,
  locale = "de",
}: {
  initialSlug?: string
  pricingConfig?: PricingConfig
  locale?: Locale
}) {
  const t = WIZARD_TEXT[locale]
  const STEPS = STEPS_BY_LOCALE[locale]
  const quoteServicesL = getLocalizedQuoteServices(locale)
  const quoteFrequenciesL = getLocalizedQuoteFrequencies(locale)
  const windowTypesL = getLocalizedWindowTypes(locale)
  const [step, setStep] = useState(0)

  // Step 1 - Leistung
  const [serviceValue, setServiceValue] = useState(
    initialSlug ? quoteServicesL.find((s) => s.slug === initialSlug)?.value ?? "" : "",
  )
  const [details, setDetails] = useState<string[]>([])
  const [customDetail, setCustomDetail] = useState("")
  const [preferredDate, setPreferredDate] = useState("")

  // Adresse + Autocomplete (kostenloses OpenStreetMap-Nominatim + Haversine)
  const [address, setAddress] = useState("")
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [travel, setTravel] = useState<TravelInfo | null>(null)
  const suggestTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Anker am Anfang des Formulars – beim Schrittwechsel wird hierher gescrollt
  const topRef = useRef<HTMLDivElement>(null)

  // Weitere (optionale) Fensterarten – einklappbarer Bereich im Umfang-Schritt
  const [showMoreWindows, setShowMoreWindows] = useState(false)

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
  const router = useRouter()
  const [privacyConsent, setPrivacyConsent] = useState(false)

  const selectedService = quoteServicesL.find((s) => s.value === serviceValue)
  const isWindow = serviceValue === "fenster"
  const isCommercial = isWindow && customerType === "gewerbe"

  // Flächenbasierte Leistungen: Slider-Grenzen + kalkulierbarer Bereich
  const areaLimit = selectedService ? AREA_LIMITS[selectedService.value] : undefined
  // Außerhalb des kalkulierbaren Bereichs wird kein Richtpreis berechnet.
  const priceOnRequest =
    !isWindow && !!areaLimit && (area[0] < areaLimit.quoteMin || area[0] > areaLimit.quoteMax)

  // E-Mail nur akzeptieren, wenn sie korrekt formatiert ist (clientseitig)
  const emailValid = EMAIL_REGEX.test(email.trim())

  // Standardgrößen sind immer sichtbar, sonstige Fensterarten stehen im aufklappbaren Bereich
  const primaryWindowTypes = windowTypesL.filter((t) => !t.optional)
  const optionalWindowTypes = windowTypesL.filter((t) => t.optional)

  // Turnus gibt es nur bei der Fensterreinigung, sonst immer "Einmalig".
  const effectiveFrequencyValue = isWindow ? frequencyValue : "einmalig"
  const selectedFrequency = quoteFrequenciesL.find((f) => f.value === effectiveFrequencyValue)

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

  // Eine Eingabezeile für eine Fensterart (wird für Standard- und weitere Arten genutzt)
  const renderWindowRow = (t: (typeof windowTypes)[number]) => {
    const qty = windowQuantities[t.value] ?? ""
    const active = (Number.parseFloat(qty.replace(",", ".")) || 0) > 0
    return (
      <div
        key={t.value}
        className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors ${
          active ? "border-brand-blue bg-brand-blue/5" : "border-brand-navy/10 bg-brand-mint/30"
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
    // Entfernung zur Firmenadresse per Haversine schätzen (fließt in den Preis ein).
    // Angezeigt wird die Anfahrt erst in der finalen Preisübersicht.
    setTravel(computeTravel(suggestion))
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file)
      // Eindeutiger Schlüssel, um genau dieses Foto nach dem Upload zu aktualisieren.
      const key = `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`
      const photo: UploadedPhoto & { _key: string } = {
        name: file.name,
        url: previewUrl,
        status: "uploading",
        _key: key,
      }
      setPhotos((prev) => [...prev, photo])

      const formData = new FormData()
      formData.append("file", file)

      fetch("/api/quote-photo/upload", { method: "POST", body: formData })
        .then(async (res) => {
          if (!res.ok) throw new Error("upload failed")
          return res.json() as Promise<{ pathname: string; name: string }>
        })
        .then((data) => {
          setPhotos((prev) =>
            prev.map((p) =>
              (p as UploadedPhoto & { _key?: string })._key === key
                ? { ...p, pathname: data.pathname, status: "done" as const }
                : p,
            ),
          )
        })
        .catch(() => {
          setPhotos((prev) =>
            prev.map((p) =>
              (p as UploadedPhoto & { _key?: string })._key === key ? { ...p, status: "error" as const } : p,
            ),
          )
        })
    })
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  // True, solange mindestens ein Foto noch hochgeladen wird – blockiert das Absenden.
  const photosUploading = photos.some((p) => p.status === "uploading")

  const canProceed = () => {
    switch (step) {
      case 0:
        return Boolean(serviceValue && address.trim())
      case 1:
        return isWindow ? numericWindowRows.some((row) => row.quantity > 0 && row.type) : true
      case 3:
        // Turnus nur bei Fensterreinigung verpflichtend, E-Mail muss gültig sein
        return Boolean(name.trim() && emailValid && privacyConsent && (!isWindow || frequencyValue))
      default:
        return true
    }
  }

  // Beim Schrittwechsel immer an den Anfang der Formularseite scrollen,
  // damit der Nutzer nicht manuell hochscrollen muss.
  const scrollToTop = () => {
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  const next = () => {
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
    scrollToTop()
  }
  const back = () => {
    setStep((s) => Math.max(s - 1, 0))
    scrollToTop()
  }

  const handleDecision = async (choice: "accepted" | "declined") => {
    setDecision(choice)
    setSubmitting(true)

    // Eindeutige Anfrage-ID – landet in der internen Mail und im Conversion-Tracking.
    const leadId = generateLeadId()

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
      photos: photos
        .filter((p) => p.status === "done" && p.pathname)
        .map((p) => ({ name: p.name, pathname: p.pathname as string })),
      name,
      email,
      phone,
      message,
      estimatedMin: priceOnRequest ? 0 : price.min,
      estimatedMax: priceOnRequest ? 0 : price.max,
      decision: choice,
      leadId,
      locale,
    }

    // Tracking-Nutzlast für die Danke-Seite ablegen (Handoff via sessionStorage).
    const quoteType: QuoteType = effectiveFrequencyValue === "einmalig" ? "onetime" : "recurring"
    const visitsPerYear = VISITS_PER_YEAR[effectiveFrequencyValue] ?? 1
    const perVisit = priceOnRequest ? 0 : Math.round((price.min + price.max) / 2)
    // Bei Turnusverträgen den Jahreswert übermitteln, sonst den Einzelpreis.
    const quoteValue = perVisit > 0 ? perVisit * visitsPerYear : undefined
    const leadStatus: LeadStatus = choice === "accepted" ? "accepted" : "price_rejected"

    storeLeadHandoff({
      lead_status: leadStatus,
      service: serviceValue,
      quote_value: quoteValue,
      quote_type: quoteType,
      lead_id: leadId,
      email,
      phone,
    })

    try {
      await submitQuote(submission)
    } catch {
      // Auch bei einem Übertragungsfehler leiten wir weiter – die Anfrage ist in
      // aller Regel dennoch bei uns eingegangen, und der Nutzer erhält Feedback.
    }

    // Weiterleitung auf die passende Danke-Seite (Conversion-Tracking via GTM).
    router.push(localizeHref(choice === "accepted" ? "/danke" : "/preisabsage-danke", locale))
  }

  return (
    <div
      ref={topRef}
      className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-navy/5"
    >
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
              <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">{t.step1Heading}</h3>
              <p className="text-sm text-neutral-500">{t.step1Sub}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quoteServicesL.map((s) => {
                const active = serviceValue === s.value
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => {
                      setServiceValue(s.value)
                      setDetails([])
                      setCustomDetail("")
                      // Fläche auf einen kalkulierbaren Startwert der Leistung setzen
                      if (DEFAULT_AREA_BY_SERVICE[s.value]) {
                        setArea([DEFAULT_AREA_BY_SERVICE[s.value]])
                      }
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
                  <span className="font-normal text-neutral-400">{t.optionalMulti}</span>
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
                    {t.other} <span className="text-neutral-400">{t.optional}</span>
                  </Label>
                  <Input
                    id="customDetail"
                    placeholder={t.customPlaceholderDefault}
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
                  {t.preferredDate} <span className="text-neutral-400">{t.optional}</span>
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
                  {t.address}
                </Label>
                <Input
                  id="address"
                  autoComplete="off"
                  placeholder={t.addressPlaceholder}
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
                {/* Bestätigung, dass die Adresse übernommen wurde – die Anfahrtskosten
                    werden bewusst erst in der finalen Preisübersicht angezeigt. */}
                {travel && (
                  <p className="flex items-center gap-1.5 text-xs font-light text-neutral-500">
                    <Check className="h-3.5 w-3.5 text-brand-blue" />
                    {t.addressConfirmed}
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
                    {t.step2WindowHeading}
                  </h3>
                  <p className="text-sm text-neutral-500">{t.step2WindowSub}</p>
                </div>

                {/* Kundentyp - beeinflusst die Preiskalkulation */}
                <div className="rounded-2xl bg-brand-mint/50 p-5">
                  <Label className="text-sm font-semibold text-brand-navy">{t.customerType}</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(
                      [
                        { value: "privat" as const, label: t.customerPrivate },
                        { value: "gewerbe" as const, label: t.customerCommercial },
                      ]
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

                {/* Fenstergrößen: Standardgrößen sichtbar, sonstige Arten einklappbar */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-brand-navy">{t.windowSizesHeading}</Label>
                  {primaryWindowTypes.map((wt) => renderWindowRow(wt))}

                  {/* Einklappbarer Bereich "Sonstiges" – für alle Kunden sichtbar.
                      Enthält sonstige Fensterarten (alle) und – nur für Gewerbekunden –
                      die Auswahl "Welche Art von Fenstern?". */}
                  {optionalWindowTypes.length > 0 && (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={() => setShowMoreWindows((v) => !v)}
                        aria-expanded={showMoreWindows}
                        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-dashed border-brand-blue/40 bg-white px-4 py-3 text-left text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-mint/50 cursor-pointer"
                      >
                        <span>
                          {t.other}{" "}
                          <span className="font-normal text-neutral-400">{t.otherOptionalWindows}</span>
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-brand-blue transition-transform ${
                            showMoreWindows ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showMoreWindows && (
                        <div className="space-y-5">
                          {/* Sonstige Fensterarten mit Mengenangabe – für alle Kunden */}
                          <div className="space-y-3">{optionalWindowTypes.map((t) => renderWindowRow(t))}</div>

                          {/* "Welche Art von Fenstern?" – nur für Gewerbekunden */}
                          {isCommercial && (
                            <div className="rounded-2xl bg-brand-mint/50 p-5">
                              <Label className="text-sm font-semibold text-brand-navy">
                                {selectedService?.detail.optionLabel}{" "}
                                <span className="font-normal text-neutral-400">{t.optionalMulti}</span>
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
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {assignedWindows > 0 && (
                  <p className="text-sm font-medium text-brand-navy">{t.totalWindowsSelected(assignedWindows)}</p>
                )}

                <div className="space-y-2">
                  <Label htmlFor="customDetail" className="text-sm font-normal text-neutral-600">
                    {t.other} <span className="text-neutral-400">{t.optional}</span>
                  </Label>
                  <Input
                    id="customDetail"
                    placeholder={t.customPlaceholderWindow}
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
                    {t.step2AreaHeading}
                  </h3>
                  <p className="text-sm text-neutral-500">{t.step2AreaSub}</p>
                </div>

                <div className="rounded-2xl bg-brand-mint/50 p-8">
                  <div className="mb-6 text-center">
                    <span className="font-display text-5xl font-extrabold text-brand-navy">
                      {area[0].toLocaleString("de-DE")}
                    </span>
                    <span className="ml-2 text-lg text-neutral-500">m²</span>
                  </div>
                  <Slider
                    value={[Math.min(Math.max(area[0], areaLimit?.sliderMin ?? 20), areaLimit?.sliderMax ?? 1000)]}
                    onValueChange={setArea}
                    max={areaLimit?.sliderMax ?? 1000}
                    min={areaLimit?.sliderMin ?? 20}
                    step={10}
                    className="[&_[role=slider]]:bg-brand-blue [&_[role=slider]]:border-brand-blue"
                  />
                  <div className="mt-3 flex justify-between text-xs text-neutral-400">
                    <span>{(areaLimit?.sliderMin ?? 20).toLocaleString("de-DE")} m²</span>
                    <span>{(areaLimit?.sliderMax ?? 1000).toLocaleString("de-DE")} m²</span>
                  </div>
                </div>

                {/* Hinweis auf "Preis auf Anfrage" außerhalb des kalkulierbaren Bereichs */}
                {priceOnRequest && areaLimit && (
                  <div className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 px-5 py-4 text-sm text-brand-navy">
                    <p className="font-semibold">{t.priceOnRequest}</p>
                    <p className="mt-1 font-light text-neutral-600">
                      {t.priceOnRequestBody(
                        area[0].toLocaleString("de-DE"),
                        areaLimit.quoteMin.toLocaleString("de-DE"),
                        areaLimit.quoteMax.toLocaleString("de-DE"),
                      )}
                    </p>
                  </div>
                )}

                <p className="text-center text-xs font-light text-neutral-400">{t.largerObjectsNote}</p>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - Fotos */}
        {step === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                {t.photosHeading} <span className="text-neutral-400">{t.optional}</span>
              </h3>
              <p className="text-sm text-neutral-500">{t.photosSub}</p>
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
                <p className="font-semibold text-brand-navy">{t.photosSelect}</p>
                <p className="text-sm text-neutral-500">{t.photosClickHint}</p>
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

                    {/* Upload läuft */}
                    {photo.status === "uploading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/50">
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      </div>
                    )}
                    {/* Upload fehlgeschlagen */}
                    {photo.status === "error" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-600/70 px-1 text-center text-[10px] font-semibold text-white">
                        {t.uploadFailed}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-navy/80 text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                      aria-label={t.removePhoto}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {photosUploading && (
              <p className="flex items-center gap-2 text-sm text-neutral-500">
                <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                {t.photosUploading}
              </p>
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
                    {t.frequencyHeading}
                  </h3>
                  <p className="text-sm text-neutral-500">{t.frequencySub}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {quoteFrequenciesL.map((f) => {
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
                  {t.contactHeading}
                </h3>
                <p className="text-sm text-neutral-500">{t.contactSub}</p>
              </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-normal text-neutral-600">{t.name}</Label>
                <Input
                  id="name"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-normal text-neutral-600">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={email.trim().length > 0 && !emailValid}
                  className={`font-light text-neutral-600 placeholder:text-neutral-400/70 ${
                    email.trim().length > 0 && !emailValid
                      ? "border-red-400 focus-visible:ring-red-400/30"
                      : ""
                  }`}
                />
                {email.trim().length > 0 && !emailValid && (
                  <p className="text-xs font-light text-red-500">{t.emailInvalid}</p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="phone" className="font-normal text-neutral-600">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message" className="font-normal text-neutral-600">
                  {t.message} <span className="text-neutral-400">{t.optional}</span>
                </Label>
                <Textarea
                  id="message"
                  rows={3}
                  placeholder={t.messagePlaceholder}
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
                  {t.privacyPrefix}{" "}
                  <Link
                    href={localizeHref("/datenschutz", locale)}
                    target="_blank"
                    className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-teal"
                  >
                    {t.privacyLink}
                  </Link>{" "}
                  {t.privacySuffix}
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
                    {t.yourQuote}
                  </p>
                  <h3 className="font-display text-2xl font-extrabold text-brand-navy">
                    {priceOnRequest ? t.priceOnRequest : t.estimatedPrice}
                  </h3>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-brand-blue to-brand-teal p-8 text-center">
                  {priceOnRequest ? (
                    <>
                      <p className="text-sm text-white/80">{t.individualOffer}</p>
                      <p className="mt-1 font-display text-3xl font-extrabold text-white sm:text-4xl">
                        {t.priceOnRequest}
                      </p>
                      <p className="mt-2 text-sm text-white/80">{t.customQuoteBody}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white/80">{t.estimatedRange}</p>
                      <p className="mt-1 font-display text-4xl font-extrabold text-white sm:text-5xl">
                        {price.min.toLocaleString("de-DE")} - {price.max.toLocaleString("de-DE")} €
                      </p>
                      {/* Rabatt-Hinweis nur bei Privatkunden mit regelmäßiger Reinigung */}
                      {!isCommercial && selectedFrequency && selectedFrequency.discount > 0 && (
                        <p className="mt-2 text-sm text-white/80">
                          {t.discountNote(selectedFrequency.discount, selectedFrequency.label.toLowerCase())}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Pflichthinweis: Preis ist nur eine Orientierung */}
                <p className="rounded-2xl bg-brand-mint/50 px-5 py-4 text-center text-sm text-brand-navy">
                  {priceOnRequest ? t.onRequestNote : t.estimateNote}
                </p>

                {/* Zusätzlicher Hinweis für Gewerbekunden */}
                {isCommercial && (
                  <p className="rounded-2xl border border-brand-blue/20 bg-brand-blue/5 px-5 py-4 text-center text-sm text-brand-navy">
                    {t.commercialNote}
                  </p>
                )}

                {/* Zusammenfassung */}
                <div className="space-y-2.5 rounded-2xl bg-brand-mint/50 p-6 text-sm">
                  <SummaryRow label={t.summaryService} value={selectedService?.label ?? "-"} />
                  {allDetails.length > 0 && <SummaryRow label={t.summaryDetails} value={allDetails.join(", ")} />}
                  {isWindow && (
                    <SummaryRow
                      label={t.summaryCustomerType}
                      value={customerType === "gewerbe" ? t.commercialLabel : t.privateLabel}
                    />
                  )}
                  {isWindow && <SummaryRow label={t.summaryFrequency} value={selectedFrequency?.label ?? "-"} />}
                  {isWindow ? (
                    <SummaryRow label={t.summaryWindowsTotal} value={`${assignedWindows}`} />
                  ) : (
                    <SummaryRow label={t.summaryArea} value={`${area[0].toLocaleString("de-DE")} m²`} />
                  )}
                  <SummaryRow label={t.summaryAddress} value={address || "-"} />
                  {travel && (
                    <>
                      <SummaryRow
                        label={t.summaryTravel}
                        value={`${travel.distanceKm.toLocaleString("de-DE")} km · ${Math.round(
                          travel.billableKm * pricingConfig.travelCostPerKm,
                        ).toLocaleString("de-DE")} €`}
                      />
                      <p className="text-xs font-light text-neutral-400">{t.travelNote}</p>
                    </>
                  )}
                  {preferredDate && <SummaryRow label={t.summaryDate} value={preferredDate} />}
                  {photos.length > 0 && (
                    <SummaryRow label={t.summaryPhotos} value={t.photosUploadedCount(photos.length)} />
                  )}
                </div>

                <p className="text-center text-xs text-neutral-400">{t.finalNote}</p>

                {photosUploading && (
                  <p className="flex items-center justify-center gap-2 text-center text-sm text-neutral-500">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                    {t.stillUploading}
                  </p>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    disabled={submitting || photosUploading}
                    onClick={() => handleDecision("accepted")}
                    className="group h-16 w-full rounded-full bg-brand-blue text-lg font-bold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:bg-brand-teal hover:scale-[1.02] sm:text-xl"
                  >
                    {submitting && decision === "accepted" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ThumbsUp className="h-5 w-5" />
                    )}
                    {priceOnRequest ? t.requestOffer : t.acceptOffer}
                  </Button>
                  <Button
                    variant="ghost"
                    disabled={submitting || photosUploading}
                    onClick={() => handleDecision("declined")}
                    className="rounded-full text-neutral-500 hover:bg-brand-mint hover:text-brand-navy"
                  >
                    {submitting && decision === "declined" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ThumbsDown className="h-4 w-4" />
                    )}
                    {t.declineOffer}
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
                  {decision === "accepted" ? t.thanksAccepted : t.thanksDeclined}
                </h3>
                <p className="mx-auto max-w-md text-neutral-600">
                  {decision === "accepted" ? (
                    <>
                      {t.thanksAcceptedBody1}{" "}
                      <span className="font-semibold text-brand-navy">{email}</span> {t.thanksAcceptedBody2}
                    </>
                  ) : (
                    t.thanksDeclinedBody
                  )}
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
                    <Link href={localizeHref("/", locale)} className="cursor-pointer">
                      {t.backHome}
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
              {t.back}
            </Button>

            {step < STEPS.length - 1 && (
              <Button
                type="button"
                onClick={next}
                disabled={!canProceed()}
                className="group rounded-full bg-brand-blue text-white hover:bg-brand-teal disabled:opacity-40"
              >
                {t.next}
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
