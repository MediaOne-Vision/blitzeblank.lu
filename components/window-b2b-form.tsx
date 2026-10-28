"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { CheckCircle2, Loader2, Phone, ShieldCheck } from "lucide-react"
import { submitB2BInquiry } from "@/app/actions/submit-b2b-inquiry"
import type { B2BCleaningNeed, B2BObjectType } from "@/lib/b2b-inquiry-email"
import { pushDataLayerEvent } from "@/lib/tracking"
import { FormHoneypot } from "@/components/form-honeypot"
import { formErrorMessage } from "@/lib/form-errors"
import { useSubmissionId } from "@/lib/submission-id"
import { localizeHref, type Locale } from "@/lib/i18n"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

const TEXT = {
  de: {
    eyebrow: "Kostenlose Objektbesichtigung",
    heading: "Fensterreinigung für Ihr Unternehmen anfragen",
    sub: "In unter einer Minute ausgefüllt. Wir melden uns für einen unverbindlichen Vor-Ort-Termin – Sie beauftragen erst danach.",
    company: "Unternehmen *",
    companyPh: "Firmenname",
    contact: "Ansprechpartner *",
    contactPh: "Vor- und Nachname",
    location: "PLZ & Ort *",
    locationPh: "z. B. 1234 Luxemburg",
    objectType: "Um welches Objekt geht es? *",
    cleaningNeed: "Reinigungsbedarf",
    email: "E-Mail",
    emailPh: "name@firma.lu",
    phone: "Telefon",
    phonePh: "+352 ...",
    contactHint: "Bitte mindestens einen Kontaktweg angeben (E-Mail oder Telefon).",
    message: "Nachricht (optional)",
    messagePh: "Anzahl Fenster, Etagen, Zugang, gewünschter Zeitraum …",
    privacyPrefix: "Ich habe die",
    privacyLink: "Datenschutzerklärung",
    privacySuffix: "gelesen und stimme der Verarbeitung meiner Angaben zu. *",
    submit: "Kostenlose Besichtigung anfragen",
    submitting: "Wird gesendet …",
    emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
    contactRequired: "Bitte geben Sie eine E-Mail-Adresse oder Telefonnummer an.",
    requiredMissing: "Bitte füllen Sie alle Pflichtfelder aus.",
    privacyRequired: "Bitte stimmen Sie der Datenschutzerklärung zu.",
    trust: "Kostenlos & unverbindlich · Antwort i. d. R. innerhalb von 24 Std.",
    successTitle: "Vielen Dank für Ihre Anfrage!",
    successBody:
      "Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen, um einen Termin für die kostenlose Objektbesichtigung abzustimmen.",
    successNote: "Eine Bestätigung senden wir zusätzlich per E-Mail, sofern Sie eine Adresse angegeben haben.",
    callUs: "Lieber direkt anrufen?",
    objectTypes: [
      { value: "buero", label: "Büro" },
      { value: "geschaeft", label: "Geschäft / Schaufenster" },
      { value: "gewerbe", label: "Gewerbegebäude" },
      { value: "sonstiges", label: "Sonstiges" },
    ] as { value: B2BObjectType; label: string }[],
    needs: [
      { value: "einmalig", label: "Einmalig" },
      { value: "regelmaessig", label: "Regelmäßig" },
      { value: "offen", label: "Noch offen" },
    ] as { value: Exclude<B2BCleaningNeed, "">; label: string }[],
  },
  en: {
    eyebrow: "Free on-site visit",
    heading: "Request window cleaning for your business",
    sub: "Filled in under a minute. We'll get in touch for a non-binding on-site visit – you only commission afterwards.",
    company: "Company *",
    companyPh: "Company name",
    contact: "Contact person *",
    contactPh: "First and last name",
    location: "Postal code & city *",
    locationPh: "e.g. 1234 Luxembourg",
    objectType: "What kind of property is it? *",
    cleaningNeed: "Cleaning needs",
    email: "Email",
    emailPh: "name@company.lu",
    phone: "Phone",
    phonePh: "+352 ...",
    contactHint: "Please provide at least one way to contact you (email or phone).",
    message: "Message (optional)",
    messagePh: "Number of windows, floors, access, preferred timeframe …",
    privacyPrefix: "I have read the",
    privacyLink: "Privacy Policy",
    privacySuffix: "and agree to the processing of my data. *",
    submit: "Request free site visit",
    submitting: "Sending …",
    emailInvalid: "Please enter a valid email address.",
    contactRequired: "Please provide an email address or phone number.",
    requiredMissing: "Please fill in all required fields.",
    privacyRequired: "Please agree to the privacy policy.",
    trust: "Free & non-binding · usually a reply within 24 hrs",
    successTitle: "Thank you for your request!",
    successBody:
      "We've received your request and will get in touch shortly to arrange a free on-site visit.",
    successNote: "We'll also send a confirmation by email if you provided an address.",
    callUs: "Prefer to call directly?",
    objectTypes: [
      { value: "buero", label: "Office" },
      { value: "geschaeft", label: "Shop / shop window" },
      { value: "gewerbe", label: "Commercial building" },
      { value: "sonstiges", label: "Other" },
    ] as { value: B2BObjectType; label: string }[],
    needs: [
      { value: "einmalig", label: "One-time" },
      { value: "regelmaessig", label: "Recurring" },
      { value: "offen", label: "Still open" },
    ] as { value: Exclude<B2BCleaningNeed, "">; label: string }[],
  },
  fr: {
    eyebrow: "Visite gratuite du site",
    heading: "Demandez le nettoyage de vitres pour votre entreprise",
    sub: "Rempli en moins d'une minute. Nous vous contactons pour une visite sans engagement – vous ne commandez qu'ensuite.",
    company: "Entreprise *",
    companyPh: "Nom de l'entreprise",
    contact: "Interlocuteur *",
    contactPh: "Prénom et nom",
    location: "Code postal et ville *",
    locationPh: "p. ex. 1234 Luxembourg",
    objectType: "De quel type de site s'agit-il ? *",
    cleaningNeed: "Besoin de nettoyage",
    email: "E-mail",
    emailPh: "nom@entreprise.lu",
    phone: "Téléphone",
    phonePh: "+352 ...",
    contactHint: "Veuillez indiquer au moins un moyen de contact (e-mail ou téléphone).",
    message: "Message (facultatif)",
    messagePh: "Nombre de fenêtres, étages, accès, période souhaitée …",
    privacyPrefix: "J'ai lu la",
    privacyLink: "politique de confidentialité",
    privacySuffix: "et j'accepte le traitement de mes données. *",
    submit: "Demander une visite gratuite",
    submitting: "Envoi en cours …",
    emailInvalid: "Veuillez saisir une adresse e-mail valide.",
    contactRequired: "Veuillez indiquer une adresse e-mail ou un numéro de téléphone.",
    requiredMissing: "Veuillez remplir tous les champs obligatoires.",
    privacyRequired: "Veuillez accepter la politique de confidentialité.",
    trust: "Gratuit et sans engagement · réponse généralement sous 24 h",
    successTitle: "Merci pour votre demande !",
    successBody:
      "Nous avons bien reçu votre demande et vous contacterons très prochainement pour convenir d'une visite gratuite du site.",
    successNote: "Nous envoyons également une confirmation par e-mail si vous avez indiqué une adresse.",
    callUs: "Vous préférez appeler directement ?",
    objectTypes: [
      { value: "buero", label: "Bureau" },
      { value: "geschaeft", label: "Commerce / vitrine" },
      { value: "gewerbe", label: "Bâtiment commercial" },
      { value: "sonstiges", label: "Autre" },
    ] as { value: B2BObjectType; label: string }[],
    needs: [
      { value: "einmalig", label: "Ponctuel" },
      { value: "regelmaessig", label: "Régulier" },
      { value: "offen", label: "Pas encore décidé" },
    ] as { value: Exclude<B2BCleaningNeed, "">; label: string }[],
  },
}

const CONTACT = { phone: "+352 661 830 493", phoneHref: "tel:+352661830493" }

export function WindowB2BForm({ locale = "de", id }: { locale?: Locale; id?: string }) {
  const t = TEXT[locale]

  const [company, setCompany] = useState("")
  const [contactPerson, setContactPerson] = useState("")
  const [location, setLocation] = useState("")
  const [objectType, setObjectType] = useState<B2BObjectType | "">("")
  const [cleaningNeed, setCleaningNeed] = useState<B2BCleaningNeed>("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [privacy, setPrivacy] = useState(false)

  const honeypotRef = useRef<HTMLInputElement>(null)
  const submission = useSubmissionId()
  const renderedAt = useRef(Date.now())
  const startFired = useRef(false)

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const emailTrim = email.trim()
  const phoneTrim = phone.trim()
  const emailValid = emailTrim === "" || EMAIL_REGEX.test(emailTrim)
  const hasContact = emailTrim !== "" || phoneTrim !== ""

  // b2b_form_start beim ersten Interaktionsimpuls (einmalig)
  const fireStart = () => {
    if (startFired.current) return
    startFired.current = true
    pushDataLayerEvent("b2b_form_start", { service: "window_cleaning", form_type: "b2b_site_visit" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!company.trim() || !contactPerson.trim() || !location.trim() || !objectType) {
      setError(t.requiredMissing)
      return
    }
    if (!hasContact) {
      setError(t.contactRequired)
      return
    }
    if (emailTrim && !EMAIL_REGEX.test(emailTrim)) {
      setError(t.emailInvalid)
      return
    }
    if (!privacy) {
      setError(t.privacyRequired)
      return
    }

    setSubmitting(true)

    try {
      const result = await submitB2BInquiry({
        submission: {
          company: company.trim(),
          contactPerson: contactPerson.trim(),
          location: location.trim(),
          objectType: objectType as B2BObjectType,
          cleaningNeed,
          email: emailTrim,
          phone: phoneTrim,
          message: message.trim(),
          service: "window_cleaning",
          formType: "b2b_site_visit",
          locale,
        },
        honeypot: honeypotRef.current?.value ?? "",
        renderedAt: renderedAt.current,
        submissionId: submission.get(),
      })

      if (result.status === "error") {
        setError(formErrorMessage(result.code, locale))
        setSubmitting(false)
        return
      }

      // Conversion-Event nur nach vom Versanddienst bestätigter Annahme.
      if (result.status === "confirmed") {
        pushDataLayerEvent("b2b_lead_success", {
          service: "window_cleaning",
          form_type: "b2b_site_visit",
          lead_id: result.leadId,
        })
      }

      submission.renew()
      setSubmitted(true)
    } catch {
      setError(formErrorMessage("network", locale))
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        id={id}
        className="rounded-3xl border border-brand-blue/15 bg-white p-8 text-center shadow-xl shadow-brand-navy/5 sm:p-10"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10">
          <CheckCircle2 className="h-8 w-8 text-brand-blue" />
        </div>
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
          {t.successTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-neutral-600">{t.successBody}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400">{t.successNote}</p>
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-brand-navy">
          <Phone className="h-4 w-4 text-brand-blue" />
          {t.callUs}{" "}
          <a href={CONTACT.phoneHref} className="font-bold text-brand-blue hover:text-brand-teal">
            {CONTACT.phone}
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      id={id}
      className="rounded-3xl border border-brand-blue/15 bg-white p-6 shadow-xl shadow-brand-navy/5 sm:p-8"
    >
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
        <h3 className="mt-2 text-balance font-display text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
          {t.heading}
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-neutral-600">{t.sub}</p>
      </div>

      <form onSubmit={handleSubmit} onFocus={fireStart} className="space-y-5" noValidate>
        <FormHoneypot inputRef={honeypotRef} />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="b2b-company" className="text-sm font-semibold text-brand-navy">
              {t.company}
            </Label>
            <Input
              id="b2b-company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t.companyPh}
              className="mt-1.5 h-11 bg-white"
              autoComplete="organization"
              required
            />
          </div>
          <div>
            <Label htmlFor="b2b-contact" className="text-sm font-semibold text-brand-navy">
              {t.contact}
            </Label>
            <Input
              id="b2b-contact"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder={t.contactPh}
              className="mt-1.5 h-11 bg-white"
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="b2b-location" className="text-sm font-semibold text-brand-navy">
            {t.location}
          </Label>
          <Input
            id="b2b-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t.locationPh}
            className="mt-1.5 h-11 bg-white"
            autoComplete="postal-code"
            required
          />
        </div>

        {/* Objektart */}
        <div>
          <span className="text-sm font-semibold text-brand-navy">{t.objectType}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.objectTypes.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setObjectType(o.value)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  objectType === o.value
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-navy/15 bg-white text-neutral-600 hover:border-brand-blue/40 hover:bg-brand-mint",
                )}
                aria-pressed={objectType === o.value}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reinigungsbedarf (optional) */}
        <div>
          <span className="text-sm font-semibold text-brand-navy">{t.cleaningNeed}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.needs.map((n) => (
              <button
                key={n.value}
                type="button"
                onClick={() => setCleaningNeed((prev) => (prev === n.value ? "" : n.value))}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  cleaningNeed === n.value
                    ? "border-brand-blue bg-brand-blue text-white"
                    : "border-brand-navy/15 bg-white text-neutral-600 hover:border-brand-blue/40 hover:bg-brand-mint",
                )}
                aria-pressed={cleaningNeed === n.value}
              >
                {n.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="b2b-email" className="text-sm font-semibold text-brand-navy">
              {t.email}
            </Label>
            <Input
              id="b2b-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPh}
              className={cn("mt-1.5 h-11 bg-white", !emailValid && "border-red-400 focus-visible:ring-red-400")}
              autoComplete="email"
              aria-invalid={!emailValid}
            />
          </div>
          <div>
            <Label htmlFor="b2b-phone" className="text-sm font-semibold text-brand-navy">
              {t.phone}
            </Label>
            <Input
              id="b2b-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t.phonePh}
              className="mt-1.5 h-11 bg-white"
              autoComplete="tel"
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-neutral-400">{t.contactHint}</p>

        <div>
          <Label htmlFor="b2b-message" className="text-sm font-semibold text-brand-navy">
            {t.message}
          </Label>
          <Textarea
            id="b2b-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.messagePh}
            className="mt-1.5 min-h-24 bg-white"
            rows={3}
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="b2b-privacy"
            checked={privacy}
            onCheckedChange={(v) => setPrivacy(v === true)}
            className="mt-0.5"
          />
        <Label htmlFor="b2b-privacy" className="block text-sm font-normal leading-relaxed text-neutral-600">
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

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full rounded-full bg-brand-blue py-3 text-base font-semibold text-white shadow-lg shadow-brand-blue/30 hover:bg-brand-teal disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.submitting}
            </>
          ) : (
            t.submit
          )}
        </Button>

        <p className="flex items-center justify-center gap-2 text-center text-xs text-neutral-400">
          <ShieldCheck className="h-4 w-4 text-brand-blue" />
          {t.trust}
        </p>
      </form>
    </div>
  )
}
