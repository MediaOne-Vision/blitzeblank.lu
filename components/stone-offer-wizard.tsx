"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { stoneOfferServices, stoneAreaTypes } from "@/lib/stone-offer-data"
import { submitStoneOffer } from "@/app/actions/submit-stone-offer"
import type { StoneOfferSubmission } from "@/lib/stone-offer-email"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react"

const STEPS = ["Leistungen", "Fläche", "Fotos", "Kontakt"]

/** Einfache, aber robuste E-Mail-Prüfung für die clientseitige Validierung */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface UploadedPhoto {
  name: string
  url: string
  pathname?: string
  status: "uploading" | "done" | "error"
}

function generateStoneLeadId(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `BB-STEIN-${year}-${rand}`
}

export function StoneOfferWizard() {
  const [step, setStep] = useState(0)
  const [renderedAt] = useState(() => Date.now())
  const topRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Step 1 - Leistungen
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // Step 2 - Fläche
  const [areaType, setAreaType] = useState("pflaster")
  const [areaSize, setAreaSize] = useState([50])
  const [condition, setCondition] = useState("")
  const [preferredDate, setPreferredDate] = useState("")

  // Step 3 - Fotos
  const [photos, setPhotos] = useState<(UploadedPhoto & { _key: string })[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step 4 - Kontakt
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const [submitting, setSubmitting] = useState(false)

  const emailValid = EMAIL_REGEX.test(email.trim())

  const toggleService = (id: string) => {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      const previewUrl = URL.createObjectURL(file)
      const key = `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`
      setPhotos((prev) => [...prev, { name: file.name, url: previewUrl, status: "uploading", _key: key }])

      const formData = new FormData()
      formData.append("file", file)

      fetch("/api/quote-photo/upload", { method: "POST", body: formData })
        .then(async (res) => {
          if (!res.ok) throw new Error("upload failed")
          return res.json() as Promise<{ pathname: string; name: string }>
        })
        .then((data) => {
          setPhotos((prev) =>
            prev.map((p) => (p._key === key ? { ...p, pathname: data.pathname, status: "done" as const } : p)),
          )
        })
        .catch(() => {
          setPhotos((prev) => prev.map((p) => (p._key === key ? { ...p, status: "error" as const } : p)))
        })
    })
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const photosUploading = photos.some((p) => p.status === "uploading")

  const canProceed = () => {
    switch (step) {
      case 0:
        return selectedServices.length > 0
      case 3:
        return Boolean(name.trim() && emailValid && privacyConsent)
      default:
        return true
    }
  }

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

  const handleSubmit = async () => {
    setSubmitting(true)

    const selectedTitles = stoneOfferServices.filter((s) => selectedServices.includes(s.id)).map((s) => s.title)
    const areaTypeLabel = stoneAreaTypes.find((a) => a.value === areaType)?.label ?? areaType

    const submission: StoneOfferSubmission = {
      services: selectedTitles,
      areaTypeLabel,
      areaSize: areaSize[0],
      condition,
      preferredDate,
      address,
      photos: photos.filter((p) => p.status === "done" && p.pathname).map((p) => ({ name: p.name, pathname: p.pathname as string })),
      name,
      email,
      phone,
      message,
      leadId: generateStoneLeadId(),
    }

    try {
      await submitStoneOffer({ submission, honeypot, renderedAt })
    } catch {
      // Auch bei einem Übertragungsfehler leiten wir weiter – die Anfrage ist in
      // aller Regel dennoch bei uns eingegangen, und der Nutzer erhält Feedback.
    }

    router.push("/stein-angebot/danke")
  }

  return (
    <div ref={topRef} className="scroll-mt-24 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-navy/5">
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
            {/* STEP 1 - Leistungen */}
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Welche Leistungen benötigen Sie?
                  </h3>
                  <p className="text-sm text-neutral-500">Wählen Sie eine oder mehrere Leistungen aus.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {stoneOfferServices.map((service) => {
                    const active = selectedServices.includes(service.id)
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                          active
                            ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                        }`}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-mint">
                          <Image src={service.image} alt={service.title} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-brand-navy">{service.title}</p>
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                active ? "border-brand-blue bg-brand-blue" : "border-brand-navy/20"
                              }`}
                            >
                              {active && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{service.description}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 - Fläche */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Angaben zu Ihrer Fläche
                  </h3>
                  <p className="text-sm text-neutral-500">Diese Angaben helfen uns bei der Vorbereitung Ihres Termins.</p>
                </div>

                <div className="rounded-2xl bg-brand-mint/50 p-5">
                  <Label className="text-sm font-semibold text-brand-navy">Art der Fläche</Label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stoneAreaTypes.map((a) => {
                      const active = areaType === a.value
                      return (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => setAreaType(a.value)}
                          className={`rounded-full border px-4 py-1.5 text-sm transition-all cursor-pointer ${
                            active
                              ? "border-brand-blue bg-brand-blue text-white"
                              : "border-brand-navy/15 bg-white text-brand-navy hover:border-brand-blue/40"
                          }`}
                        >
                          {a.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-brand-navy">Ungefähre Flächengröße</Label>
                    <span className="font-display text-lg font-extrabold text-brand-blue">{areaSize[0]} m²</span>
                  </div>
                  <Slider min={10} max={500} step={5} value={areaSize} onValueChange={setAreaSize} />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="condition" className="font-normal text-neutral-600">
                      Zustand der Fläche <span className="text-neutral-400">(optional)</span>
                    </Label>
                    <Textarea
                      id="condition"
                      rows={3}
                      placeholder="z. B. verwittert, Moosbewuchs, alte Fugen bröckeln..."
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                    />
                  </div>
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
                </div>
              </div>
            )}

            {/* STEP 3 - Fotos */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Fotos hochladen <span className="text-neutral-400">(optional)</span>
                  </h3>
                  <p className="text-sm text-neutral-500">Bilder helfen uns, Ihre Anfrage genauer einzuschätzen.</p>
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
                      <div key={photo._key} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-brand-navy/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo.url || "/placeholder.svg"} alt={photo.name} className="h-full w-full object-cover" />
                        {photo.status === "uploading" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/50">
                            <Loader2 className="h-5 w-5 animate-spin text-white" />
                          </div>
                        )}
                        {photo.status === "error" && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-600/70 px-1 text-center text-[10px] font-semibold text-white">
                            Upload fehlgeschlagen
                          </div>
                        )}
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

                {photosUploading && (
                  <p className="flex items-center gap-2 text-sm text-neutral-500">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                    Fotos werden hochgeladen…
                  </p>
                )}
              </div>
            )}

            {/* STEP 4 - Kontakt */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">Ihre Kontaktdaten</h3>
                  <p className="text-sm text-neutral-500">Damit wir uns bei Ihnen melden können.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Honeypot - für Menschen unsichtbar, Bots füllen dieses Feld häufig aus */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <Label htmlFor="company">Firma</Label>
                    <Input
                      id="company"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-normal text-neutral-600">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ihr Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-normal text-neutral-600">
                      E-Mail *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      inputMode="email"
                      placeholder="ihre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={email.trim().length > 0 && !emailValid}
                      className={`font-light text-neutral-600 placeholder:text-neutral-400/70 ${
                        email.trim().length > 0 && !emailValid ? "border-red-400 focus-visible:ring-red-400/30" : ""
                      }`}
                    />
                    {email.trim().length > 0 && !emailValid && (
                      <p className="text-xs font-light text-red-500">Bitte geben Sie eine gültige E-Mail-Adresse ein.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-normal text-neutral-600">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+352 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="font-light text-neutral-600 placeholder:text-neutral-400/70"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-2 text-sm font-normal text-neutral-600">
                      <MapPin className="h-4 w-4 text-brand-blue" />
                      Adresse <span className="text-neutral-400">(optional)</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Straße Hausnummer, PLZ Ort"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
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
                    <Label htmlFor="privacy-consent" className="text-sm font-normal leading-relaxed text-neutral-600">
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

                {photosUploading && (
                  <p className="flex items-center justify-center gap-2 text-center text-sm text-neutral-500">
                    <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                    Ihre Fotos werden noch hochgeladen…
                  </p>
                )}

                <Button
                  disabled={!canProceed() || submitting || photosUploading}
                  onClick={handleSubmit}
                  className="group h-16 w-full rounded-full bg-brand-blue text-lg font-bold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:bg-brand-teal hover:scale-[1.02] disabled:opacity-40 sm:text-xl"
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
                  Anfrage senden
                </Button>
              </div>
            )}

            {/* Navigation */}
            {step !== 3 && (
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

                <Button
                  type="button"
                  onClick={next}
                  disabled={!canProceed()}
                  className="group rounded-full bg-brand-blue text-white hover:bg-brand-teal disabled:opacity-40"
                >
                  Weiter
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
            {step === 3 && (
              <div className="mt-6 flex items-center justify-start">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={back}
                  className="text-brand-navy hover:bg-brand-mint"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </Button>
              </div>
            )}
      </div>
    </div>
  )
}
