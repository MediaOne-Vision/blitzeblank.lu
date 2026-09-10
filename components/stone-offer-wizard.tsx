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
import {
  stoneAreaTypes,
  stoneColors,
  colorSwatches,
  usageClasses,
  jointProperties,
  jointMaterials,
  filterJointMaterials,
  protectionOptions,
  thermalWeedInfo,
  stoneDimensionDefaults,
} from "@/lib/stone-offer-data"
import { submitStoneOffer } from "@/app/actions/submit-stone-offer"
import type { StoneOfferSubmission } from "@/lib/stone-offer-email"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  MapPin,
  Plus,
  RotateCcw,
  ClipboardList,
} from "lucide-react"

const STEPS = ["Fläche", "Material", "Nutzung", "Fuge", "Farbe", "Fugenwahl", "Schutz", "Unkraut", "Kontakt"]

/** Einfache, aber robuste E-Mail-Prüfung für die clientseitige Validierung */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function generateStoneLeadId(): string {
  const year = new Date().getFullYear()
  const rand = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0")
  return `BB-STEIN-${year}-${rand}`
}

function ColorDot({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full ring-1 ring-brand-navy/15 ${className}`}
      style={{ backgroundColor: colorSwatches[name] ?? "#cbd5e1" }}
    />
  )
}

export function StoneOfferWizard() {
  const [step, setStep] = useState(0)
  const [renderedAt] = useState(() => Date.now())
  const topRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Step 0 - Fläche
  const [areaType, setAreaType] = useState("pflaster")
  const [areaSize, setAreaSize] = useState([50])

  // Step 1 - Materialbedarf
  const [steinbreite, setSteinbreite] = useState([stoneDimensionDefaults.steinbreite])
  const [steinlaenge, setSteinlaenge] = useState([stoneDimensionDefaults.steinlaenge])
  const [fugenbreite, setFugenbreite] = useState([stoneDimensionDefaults.fugenbreite])
  const [fugentiefe, setFugentiefe] = useState([stoneDimensionDefaults.fugentiefe])

  // Step 2 - Nutzung
  const [usage, setUsage] = useState<string | null>(null)

  // Step 3 - Fugeneigenschaften
  const [properties, setProperties] = useState<string[]>([])

  // Step 4 - Steinfarbe
  const [stoneColor, setStoneColor] = useState<string | null>(null)

  // Step 5 - Passende Fuge
  const [jointMaterialId, setJointMaterialId] = useState<string | null>(null) // id | "none" | null
  const [jointColor, setJointColor] = useState<string | null>(null)

  // Step 6 - Schutz
  const [protectionId, setProtectionId] = useState<string | null>(null) // id | "none" | null

  // Step 7 - Thermische Unkrautentfernung
  const [thermalWeed, setThermalWeed] = useState<boolean | null>(null)

  // Step 8 - Kontakt
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const [submitting, setSubmitting] = useState(false)

  const emailValid = EMAIL_REGEX.test(email.trim())

  // Gefilterte Fugenmaterialien nach Nutzung + Eigenschaften
  const filtered = filterJointMaterials(usage ?? "", properties)
  const fallback = filtered.length === 0
  const shownMaterials = fallback ? jointMaterials.filter((m) => !usage || m.usage.includes(usage)) : filtered

  const toggleProperty = (value: string) => {
    setProperties((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]))
    // Auswahl der Fuge zurücksetzen, da sich die Filterergebnisse ändern
    setJointMaterialId(null)
    setJointColor(null)
  }

  const selectUsage = (value: string) => {
    setUsage(value)
    setJointMaterialId(null)
    setJointColor(null)
  }

  const selectJointMaterial = (id: string) => {
    setJointMaterialId(id)
    const material = jointMaterials.find((m) => m.id === id)
    setJointColor((prev) => (prev && material?.colors.includes(prev) ? prev : material?.colors[0] ?? null))
  }

  const resetDimensions = () => {
    setSteinbreite([stoneDimensionDefaults.steinbreite])
    setSteinlaenge([stoneDimensionDefaults.steinlaenge])
    setFugenbreite([stoneDimensionDefaults.fugenbreite])
    setFugentiefe([stoneDimensionDefaults.fugentiefe])
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return areaSize[0] > 0
      case 2:
        return usage !== null
      case 4:
        return stoneColor !== null
      case 5:
        return jointMaterialId !== null
      case 6:
        return protectionId !== null
      case 7:
        return thermalWeed !== null
      case 8:
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

  const buildSubmission = (): StoneOfferSubmission => {
    const areaTypeLabel = stoneAreaTypes.find((a) => a.value === areaType)?.label ?? areaType
    const usageLabel = usageClasses.find((u) => u.value === usage)?.label ?? "Keine Angabe"
    const jointPropertyLabels = properties.map(
      (p) => jointProperties.find((jp) => jp.value === p)?.label ?? p,
    )
    const stoneColorLabel = stoneColors.find((c) => c.value === stoneColor)?.label ?? "Keine Angabe"

    let jointChoice: StoneOfferSubmission["jointChoice"] = null
    if (jointMaterialId && jointMaterialId !== "none") {
      const material = jointMaterials.find((m) => m.id === jointMaterialId)
      if (material) {
        jointChoice = { materialLabel: material.title, colorLabel: jointColor ?? material.colors[0] ?? "—" }
      }
    }

    const protectionLabel =
      protectionId && protectionId !== "none"
        ? protectionOptions.find((p) => p.id === protectionId)?.title ?? null
        : null

    return {
      areaTypeLabel,
      areaSize: areaSize[0],
      dimensions: {
        steinbreite: steinbreite[0],
        steinlaenge: steinlaenge[0],
        fugenbreite: fugenbreite[0],
        fugentiefe: fugentiefe[0],
      },
      usageLabel,
      jointPropertyLabels,
      stoneColorLabel,
      jointChoice,
      protectionLabel,
      thermalWeed: thermalWeed === true,
      name,
      email,
      phone,
      address,
      message,
      leadId: generateStoneLeadId(),
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      await submitStoneOffer({ submission: buildSubmission(), honeypot, renderedAt })
    } catch {
      // Auch bei einem Übertragungsfehler leiten wir weiter – die Anfrage ist in
      // aller Regel dennoch bei uns eingegangen, und der Nutzer erhält Feedback.
    }
    router.push("/stein-angebot/danke")
  }

  /* ----------------------- Live-Konfigurationsübersicht ----------------------- */

  const selectedUsageLabel = usageClasses.find((u) => u.value === usage)?.label
  const selectedStoneColorLabel = stoneColors.find((c) => c.value === stoneColor)?.label
  const selectedJointMaterial = jointMaterials.find((m) => m.id === jointMaterialId)
  const selectedProtectionLabel =
    protectionId === "none" ? "Ohne Schutz" : protectionOptions.find((p) => p.id === protectionId)?.title

  const summaryItems: { label: string; value: string; swatch?: string }[] = []
  if (areaSize[0] > 0) {
    const at = stoneAreaTypes.find((a) => a.value === areaType)?.label ?? areaType
    summaryItems.push({ label: "Fläche", value: `${at} · ${areaSize[0]} m²` })
  }
  if (selectedUsageLabel) summaryItems.push({ label: "Nutzung", value: selectedUsageLabel })
  if (properties.length > 0) {
    summaryItems.push({
      label: "Fugeneigenschaften",
      value: properties.map((p) => jointProperties.find((jp) => jp.value === p)?.label ?? p).join(", "),
    })
  }
  if (selectedStoneColorLabel) {
    summaryItems.push({ label: "Steinfarbe", value: selectedStoneColorLabel, swatch: selectedStoneColorLabel })
  }
  if (jointMaterialId === "none") {
    summaryItems.push({ label: "Fuge", value: "Ohne Fugensanierung" })
  } else if (selectedJointMaterial) {
    summaryItems.push({
      label: "Fuge",
      value: `${selectedJointMaterial.title}${jointColor ? ` · ${jointColor}` : ""}`,
      swatch: jointColor ?? undefined,
    })
  }
  if (selectedProtectionLabel) summaryItems.push({ label: "Schutz", value: selectedProtectionLabel })
  if (thermalWeed !== null) {
    summaryItems.push({ label: "Unkrautentfernung", value: thermalWeed ? "Thermisch, gewünscht" : "Nein" })
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:items-start">
        {/* -------------------------------- Wizard -------------------------------- */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brand-navy/5">
          {/* Compact progress header */}
          <div className="border-b border-brand-navy/5 bg-brand-mint/40 px-6 py-4 sm:px-8">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-display text-sm font-extrabold text-brand-navy">
                Schritt {step + 1} <span className="text-brand-navy/40">von {STEPS.length}</span>
              </p>
              <p className="text-sm font-semibold text-brand-blue">{STEPS[step]}</p>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-brand-navy/10">
              <div
                className="h-full rounded-full bg-brand-blue transition-all duration-300"
                style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {/* STEP 0 - Fläche */}
            {step === 0 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">Wie groß ist Ihre Fläche?</h3>
                  <p className="text-sm text-neutral-500">Wählen Sie die Art der Fläche und die ungefähre Größe.</p>
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
                  <div className="flex items-end justify-between">
                    <div>
                      <Label className="text-sm font-semibold text-brand-navy">Gesamtfläche</Label>
                      <p className="mt-1 font-display text-2xl font-extrabold text-brand-blue">
                        {areaSize[0]} m²
                      </p>
                    </div>
                    <span className="text-sm text-neutral-500">Über 300 m² auf Anfrage</span>
                  </div>
                  <Slider min={0} max={300} step={5} value={areaSize} onValueChange={setAreaSize} />
                </div>
              </div>
            )}

            {/* STEP 1 - Materialbedarf */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Materialbedarf der Fuge berechnen
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Wenn Sie unsicher sind, lassen Sie einfach die Standardwerte - diese sind die gängigsten Maße für
                    Pflastersteinflächen.
                  </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-brand-navy">Steinbreite</Label>
                      <span className="font-display text-sm font-extrabold text-brand-blue">{steinbreite[0]} cm</span>
                    </div>
                    <Slider min={5} max={60} step={1} value={steinbreite} onValueChange={setSteinbreite} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-brand-navy">Steinlänge</Label>
                      <span className="font-display text-sm font-extrabold text-brand-blue">{steinlaenge[0]} cm</span>
                    </div>
                    <Slider min={5} max={60} step={1} value={steinlaenge} onValueChange={setSteinlaenge} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-brand-navy">Fugenbreite</Label>
                      <span className="font-display text-sm font-extrabold text-brand-blue">{fugenbreite[0]} mm</span>
                    </div>
                    <Slider min={1} max={20} step={1} value={fugenbreite} onValueChange={setFugenbreite} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-brand-navy">Fugentiefe</Label>
                      <span className="font-display text-sm font-extrabold text-brand-blue">{fugentiefe[0]} mm</span>
                    </div>
                    <Slider min={10} max={80} step={1} value={fugentiefe} onValueChange={setFugentiefe} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={resetDimensions}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue underline underline-offset-4 hover:text-brand-teal cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Zurück zu Standardwerten
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 - Nutzung */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Wie stark wird die Fläche genutzt?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Wählen Sie die Belastungsklasse - wir zeigen Ihnen nur Materialien, die dafür geeignet sind.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {usageClasses.map((u) => {
                    const active = usage === u.value
                    const Icon = u.icon
                    return (
                      <button
                        key={u.value}
                        type="button"
                        onClick={() => selectUsage(u.value)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                          active
                            ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sky/40 text-brand-navy">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-sm font-semibold text-brand-navy">{u.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3 - Fugeneigenschaften */}
            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Welche Eigenschaften sind Ihnen bei der neuen Fuge wichtig?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Wählen Sie die Eigenschaften, die Ihre neue Fuge erfüllen muss - wir filtern die passenden
                    Materialien automatisch.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {jointProperties.map((p) => {
                    const active = properties.includes(p.value)
                    const Icon = p.icon
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => toggleProperty(p.value)}
                        className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                          active
                            ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-sky/40 text-brand-navy">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="flex-1 text-sm font-semibold text-brand-navy">{p.label}</span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                            active ? "border-brand-blue bg-brand-blue" : "border-brand-navy/20"
                          }`}
                        >
                          {active && <Check className="h-3 w-3 text-white" />}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <p className="text-sm text-neutral-500">Kein Muss - Sie können diesen Schritt auch überspringen.</p>
              </div>
            )}

            {/* STEP 4 - Steinfarbe */}
            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Welche Farbe hat Ihr Stein?
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Wir fragen nach der aktuellen Steinfarbe, um im nächsten Schritt eine Fugenfarbe auszuwählen, die
                    perfekt zu Ihrem Stil passt.
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-brand-navy">Aktuelle Steinfarbe</Label>
                  <div className="mt-4 flex flex-wrap gap-5">
                    {stoneColors.map((c) => {
                      const active = stoneColor === c.value
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setStoneColor(c.value)}
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <span
                            className={`h-14 w-14 rounded-xl ring-2 transition-all ${
                              active ? "ring-brand-blue ring-offset-2" : "ring-transparent"
                            }`}
                            style={{ backgroundColor: colorSwatches[c.label] ?? "#cbd5e1" }}
                          />
                          <span
                            className={`text-xs ${active ? "font-semibold text-brand-navy" : "text-neutral-500"}`}
                          >
                            {c.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 - Passende Fuge */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">Passende Fuge wählen</h3>
                  <p className="text-sm text-neutral-500">
                    {fallback
                      ? "Für Ihre Kombination gibt es keine exakte Übereinstimmung - hier alle für Ihre Nutzung geeigneten Fugen. Wir beraten Sie gerne."
                      : "Auf Basis Ihrer Nutzung und Eigenschaften passen diese Fugen zu Ihrer Fläche."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {shownMaterials.map((m) => {
                    const active = jointMaterialId === m.id
                    return (
                      <div
                        key={m.id}
                        className={`overflow-hidden rounded-2xl border transition-all ${
                          active
                            ? "border-brand-blue ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40"
                        }`}
                      >
                        <div className="relative h-44 w-full bg-white">
                          <Image
                            src={m.image}
                            alt={m.title}
                            fill
                            sizes="(max-width:640px) 100vw, 300px"
                            className="object-contain p-3"
                          />
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-brand-navy">{m.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-500">{m.description}</p>

                          <p className="mt-3 text-xs font-semibold text-brand-navy">Fugenfarbe wählen</p>
                          <div className="mt-2 flex flex-wrap gap-3">
                            {m.colors.map((color) => {
                              const colorActive = active && jointColor === color
                              return (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => {
                                    setJointMaterialId(m.id)
                                    setJointColor(color)
                                  }}
                                  className="flex flex-col items-center gap-1 cursor-pointer"
                                >
                                  <ColorDot
                                    name={color}
                                    className={`h-7 w-7 ${colorActive ? "ring-2 ring-brand-blue ring-offset-1" : ""}`}
                                  />
                                  <span className="text-[10px] text-neutral-500">{color}</span>
                                </button>
                              )
                            })}
                          </div>

                          <Button
                            type="button"
                            variant={active ? "default" : "outline"}
                            onClick={() => selectJointMaterial(m.id)}
                            className={`mt-4 w-full rounded-full ${
                              active
                                ? "bg-brand-blue text-white hover:bg-brand-teal"
                                : "border-brand-blue/40 text-brand-blue hover:bg-brand-mint hover:text-brand-blue"
                            }`}
                          >
                            {active ? (
                              <>
                                <Check className="h-4 w-4" />
                                Ausgewählt
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4" />
                                Auswählen
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Ohne Fugensanierung */}
                <button
                  type="button"
                  onClick={() => {
                    setJointMaterialId("none")
                    setJointColor(null)
                  }}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    jointMaterialId === "none"
                      ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                      : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      jointMaterialId === "none" ? "border-brand-blue bg-brand-blue" : "border-brand-navy/20"
                    }`}
                  >
                    {jointMaterialId === "none" && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">Weiter ohne Fugensanierung</span>
                    <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
                      Wählen Sie diese Option, wenn Sie nur eine Reinigung möchten. Beachten Sie: Die alte Fuge wird
                      dabei ausgewaschen.
                    </span>
                  </span>
                </button>
              </div>
            )}

            {/* STEP 6 - Schutz */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    Schutz für eine langlebige Oberfläche
                  </h3>
                  <p className="text-sm text-neutral-500">
                    Ein Schutz erhält das Ergebnis länger - wählen Sie eine Behandlung oder fahren Sie ohne fort.
                  </p>
                </div>

                <div className="space-y-4">
                  {protectionOptions.map((p) => {
                    const active = protectionId === p.id
                    return (
                      <div
                        key={p.id}
                        className={`overflow-hidden rounded-2xl border transition-all ${
                          active
                            ? "border-brand-blue ring-2 ring-brand-blue/20"
                            : "border-brand-navy/10 hover:border-brand-blue/40"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-40 w-full shrink-0 bg-brand-mint sm:h-auto sm:w-40">
                            <Image src={p.image} alt={p.title} fill sizes="(max-width:640px) 100vw, 160px" className="object-cover" />
                          </div>
                          <div className="flex-1 p-4">
                            <p className="text-sm font-semibold text-brand-navy">{p.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-neutral-500">{p.description}</p>
                            <Button
                              type="button"
                              variant={active ? "default" : "outline"}
                              onClick={() => setProtectionId(p.id)}
                              className={`mt-4 w-full rounded-full sm:w-auto ${
                                active
                                  ? "bg-brand-blue text-white hover:bg-brand-teal"
                                  : "border-brand-blue/40 text-brand-blue hover:bg-brand-mint hover:text-brand-blue"
                              }`}
                            >
                              {active ? (
                                <>
                                  <Check className="h-4 w-4" />
                                  Ausgewählt
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4" />
                                  Auswählen
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setProtectionId("none")}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    protectionId === "none"
                      ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                      : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      protectionId === "none" ? "border-brand-blue bg-brand-blue" : "border-brand-navy/20"
                    }`}
                  >
                    {protectionId === "none" && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-brand-navy">Weiter ohne Imprägnierung</span>
                    <span className="mt-1 block text-xs leading-relaxed text-neutral-500">
                      Wir empfehlen nach der Reinigung eine Imprägnierung - sonst bildet sich durch die geöffneten
                      Poren schnell wieder Grünbelag.
                    </span>
                  </span>
                </button>
              </div>
            )}

            {/* STEP 7 - Thermische Unkrautentfernung */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">
                    <span className="bg-brand-sky/60 px-1">Starkes Unkrautproblem?</span> Wir behandeln thermisch.
                  </h3>
                </div>

                <div
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    thermalWeed === true
                      ? "border-brand-blue ring-2 ring-brand-blue/20"
                      : "border-brand-navy/10 hover:border-brand-blue/40"
                  }`}
                >
                  <div className="relative h-44 w-full bg-brand-mint">
                    <Image
                      src={thermalWeedInfo.image}
                      alt={thermalWeedInfo.title}
                      fill
                      sizes="(max-width:640px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-brand-navy">{thermalWeedInfo.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{thermalWeedInfo.description}</p>
                    <p className="mt-3 border-t border-brand-navy/5 pt-3 text-xs leading-relaxed text-neutral-500">
                      {thermalWeedInfo.detail}
                    </p>
                    <Button
                      type="button"
                      variant={thermalWeed === true ? "default" : "outline"}
                      onClick={() => setThermalWeed(true)}
                      className={`mt-4 w-full rounded-full sm:w-auto ${
                        thermalWeed === true
                          ? "bg-brand-blue text-white hover:bg-brand-teal"
                          : "border-brand-blue/40 text-brand-blue hover:bg-brand-mint hover:text-brand-blue"
                      }`}
                    >
                      {thermalWeed === true ? (
                        <>
                          <Check className="h-4 w-4" />
                          Ausgewählt
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Auswählen
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setThermalWeed(false)}
                  className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    thermalWeed === false
                      ? "border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20"
                      : "border-brand-navy/10 hover:border-brand-blue/40 hover:bg-brand-mint/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      thermalWeed === false ? "border-brand-blue bg-brand-blue" : "border-brand-navy/20"
                    }`}
                  >
                    {thermalWeed === false && <Check className="h-3 w-3 text-white" />}
                  </span>
                  <span className="text-sm font-semibold text-brand-navy">
                    Weiter ohne thermische Unkrautbehandlung
                  </span>
                </button>
              </div>
            )}

            {/* STEP 8 - Kontakt */}
            {step === 8 && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-1 font-display text-xl font-extrabold text-brand-navy">Ihre Kontaktdaten</h3>
                  <p className="text-sm text-neutral-500">Damit wir Ihnen Ihr persönliches Angebot zusenden können.</p>
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

                <Button
                  disabled={!canProceed() || submitting}
                  onClick={handleSubmit}
                  className="group h-16 w-full rounded-full bg-brand-blue text-lg font-bold text-white shadow-lg shadow-brand-blue/30 transition-transform hover:bg-brand-teal hover:scale-[1.02] disabled:opacity-40 sm:text-xl"
                >
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
                  Anfrage senden
                </Button>
              </div>
            )}

            {/* Navigation */}
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

              {step !== STEPS.length - 1 && (
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
          </div>
        </div>

        {/* ---------------------- Live-Konfigurationsübersicht ---------------------- */}
        <aside className="md:sticky md:top-24">
          <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-brand-navy/5">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <ClipboardList className="h-4 w-4" />
              </span>
              <h4 className="font-display text-base font-extrabold text-brand-navy">Ihre Konfiguration</h4>
            </div>

            {summaryItems.length === 0 ? (
              <p className="text-sm leading-relaxed text-neutral-500">
                Ihre Auswahl erscheint hier, während Sie den Rechner durchlaufen.
              </p>
            ) : (
              <ul className="space-y-3">
                {summaryItems.map((item) => (
                  <li key={item.label} className="border-b border-brand-navy/5 pb-3 last:border-0 last:pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-navy/40">
                      {item.label}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2">
                      {item.swatch && <ColorDot name={item.swatch} className="h-4 w-4 shrink-0" />}
                      <p className="text-sm font-semibold text-brand-navy">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-5 rounded-xl bg-brand-mint/60 px-4 py-3 text-xs leading-relaxed text-neutral-500">
              Kostenlos &amp; unverbindlich - Sie erhalten anschließend Ihr persönliches Angebot.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
