"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, Mail, Send } from "lucide-react"
import { submitContact } from "@/app/actions/submit-contact"
import { useAudience } from "@/components/audience-provider"
import { FormHoneypot } from "@/components/form-honeypot"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formErrorMessage } from "@/lib/form-errors"
import { localizeHref, type Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"
import { useSubmissionId } from "@/lib/submission-id"
import { storeLeadHandoff } from "@/lib/tracking"

const TEXT = {
  de: {
    eyebrow: "Kontakt",
    heading: "Jetzt unverbindlich anfragen",
    body: "Schildern Sie uns kurz Ihr Anliegen. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.",
    requestAs: "Ich frage an als",
    private: "Privatkunde",
    business: "Gewerbekunde",
    name: "Name",
    company: "Unternehmen",
    email: "E-Mail",
    phone: "Telefon",
    location: "Ort des Objekts",
    message: "Ihre Nachricht",
    messagePlaceholder: "Was soll gereinigt werden? Wie groß ist das Objekt?",
    consent: "Ich willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Details in der",
    privacy: "Datenschutzerklärung",
    send: "Anfrage absenden",
    sending: "Wird gesendet...",
    call: "Lieber telefonisch? Wir sind Mo-Fr von 8 bis 18 Uhr erreichbar.",
  },
  en: {
    eyebrow: "Contact",
    heading: "Send us your request",
    body: "Briefly describe what you need. We will get back to you within 24 hours with a proposed appointment.",
    requestAs: "I am enquiring as a",
    private: "Private customer",
    business: "Business customer",
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    location: "Property location",
    message: "Your message",
    messagePlaceholder: "What needs cleaning? How large is the property?",
    consent: "I agree that my details may be processed to handle my request. See our",
    privacy: "privacy policy",
    send: "Send request",
    sending: "Sending...",
    call: "Prefer to call? We are available Mon-Fri, 8 am to 6 pm.",
  },
  fr: {
    eyebrow: "Contact",
    heading: "Envoyez-nous votre demande",
    body: "Décrivez brièvement votre besoin. Nous vous répondons sous 24 heures avec une proposition de rendez-vous.",
    requestAs: "Je demande en tant que",
    private: "Particulier",
    business: "Entreprise",
    name: "Nom",
    company: "Entreprise",
    email: "E-mail",
    phone: "Téléphone",
    location: "Lieu du site",
    message: "Votre message",
    messagePlaceholder: "Que faut-il nettoyer ? Quelle est la taille du site ?",
    consent: "J'accepte que mes données soient traitées pour répondre à ma demande. Voir notre",
    privacy: "politique de confidentialité",
    send: "Envoyer la demande",
    sending: "Envoi en cours...",
    call: "Vous préférez appeler ? Nous sommes joignables du lundi au vendredi, de 8 h à 18 h.",
  },
}

interface EmbeddedContactFormProps {
  locale?: Locale
  /** Leistungs-Slug, wird der Anfrage mitgegeben. */
  service?: string
  id?: string
}

export function EmbeddedContactForm({ locale = "de", service = "", id = "kontakt" }: EmbeddedContactFormProps) {
  const t = TEXT[locale]
  const router = useRouter()
  const { audience: routeAudience } = useAudience()
  const [audienceChoice, setAudienceChoice] = useState<Audience | null>(null)
  const audience: Audience | null = audienceChoice ?? routeAudience
  const honeypotRef = useRef<HTMLInputElement>(null)
  const renderedAt = useRef(Date.now())
  const submission = useSubmissionId()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [state, setState] = useState({ name: "", company: "", email: "", phone: "", location: "", message: "", consent: false })

  const update = (key: keyof typeof state, value: string | boolean) => setState((prev) => ({ ...prev, [key]: value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    setError(null)
    setIsSubmitting(true)
    try {
      const result = await submitContact({
        ...state,
        service,
        audience: audience ?? "",
        locale,
        honeypot: honeypotRef.current?.value ?? "",
        renderedAt: renderedAt.current,
        submissionId: submission.get(),
      })
      if (result.status === "error") {
        setError(formErrorMessage(result.code, locale))
        setIsSubmitting(false)
        return
      }
      submission.renew()
      if (result.status === "confirmed" && result.proof) storeLeadHandoff(result.proof)
      router.push(localizeHref("/kontakt/danke", locale))
    } catch {
      setError(formErrorMessage("network", locale))
      setIsSubmitting(false)
    }
  }

  const showCompany = audience !== "privat"

  return (
    <section id={id} className="scroll-mt-24 bg-brand-mint py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
          <h2 className="mb-4 text-balance font-display text-3xl font-extrabold tracking-tight text-brand-navy lg:text-4xl">
            {t.heading}
          </h2>
          <p className="mb-8 text-neutral-600 text-pretty">{t.body}</p>
          <ul className="space-y-3 text-brand-navy">
            <li>
              <a href="tel:+352661830493" className="flex items-center gap-3 font-semibold hover:text-brand-blue">
                <Phone className="h-5 w-5 text-brand-blue" />
                +352 661 830 493
              </a>
            </li>
            <li>
              <a href="mailto:info@blitzeblank.lu" className="flex items-center gap-3 font-semibold hover:text-brand-blue">
                <Mail className="h-5 w-5 text-brand-blue" />
                info@blitzeblank.lu
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm text-neutral-500">{t.call}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-brand-navy/5 lg:col-span-3 lg:p-8"
        >
          <FormHoneypot inputRef={honeypotRef} />
          <fieldset className="space-y-2">
            <legend className="text-sm font-normal text-neutral-600">{t.requestAs}</legend>
            <div className="grid grid-cols-2 gap-2" role="radiogroup">
              {(["privat", "gewerbe"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={audience === value}
                  onClick={() => setAudienceChoice(value)}
                  className={`cursor-pointer rounded-xl px-4 py-3 text-sm font-medium ring-1 transition-colors ${
                    audience === value
                      ? "bg-brand-blue text-white ring-brand-blue"
                      : "bg-white text-brand-navy ring-brand-navy/15 hover:ring-brand-blue"
                  }`}
                >
                  {value === "privat" ? t.private : t.business}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`} className="font-normal text-neutral-600">{t.name} *</Label>
              <Input id={`${id}-name`} required value={state.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            {showCompany ? (
              <div className="space-y-2">
                <Label htmlFor={`${id}-company`} className="font-normal text-neutral-600">{t.company}</Label>
                <Input id={`${id}-company`} value={state.company} onChange={(e) => update("company", e.target.value)} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor={`${id}-location`} className="font-normal text-neutral-600">{t.location}</Label>
                <Input id={`${id}-location`} value={state.location} onChange={(e) => update("location", e.target.value)} />
              </div>
            )}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${id}-email`} className="font-normal text-neutral-600">{t.email} *</Label>
              <Input id={`${id}-email`} type="email" required value={state.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-phone`} className="font-normal text-neutral-600">{t.phone}</Label>
              <Input id={`${id}-phone`} type="tel" value={state.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
          </div>
          {showCompany && (
            <div className="space-y-2">
              <Label htmlFor={`${id}-location`} className="font-normal text-neutral-600">{t.location}</Label>
              <Input id={`${id}-location`} value={state.location} onChange={(e) => update("location", e.target.value)} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`${id}-message`} className="font-normal text-neutral-600">{t.message} *</Label>
            <Textarea
              id={`${id}-message`}
              rows={4}
              required
              placeholder={t.messagePlaceholder}
              value={state.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id={`${id}-consent`}
              checked={state.consent}
              onCheckedChange={(checked) => update("consent", checked === true)}
              required
            />
            <Label htmlFor={`${id}-consent`} className="text-xs font-normal leading-relaxed text-neutral-500">
              {t.consent}{" "}
              <a href={localizeHref("/datenschutz", locale)} className="text-brand-blue hover:underline">
                {t.privacy}
              </a>
              .
            </Label>
          </div>
          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !state.consent}
            className="w-full rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal"
          >
            {isSubmitting ? t.sending : t.send}
            {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </section>
  )
}
