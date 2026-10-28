"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { submitContact } from "@/app/actions/submit-contact"
import { FormHoneypot } from "@/components/form-honeypot"
import { formErrorMessage } from "@/lib/form-errors"
import { useSubmissionId } from "@/lib/submission-id"
import { storeLeadHandoff } from "@/lib/tracking"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, Sparkles, ArrowRight } from "lucide-react"

const services = [
  { value: "industrie", label: "Nettoyage industriel" },
  { value: "fenster", label: "Nettoyage de vitres" },
  { value: "stein", label: "Nettoyage de pierre" },
  { value: "fassade", label: "Nettoyage de façades" },
  { value: "sonstiges", label: "Autre" },
]

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "+352 661 830 493",
    href: "tel:+352661830493",
  },
  {
    icon: Mail,
    title: "E-mail",
    content: "info@blitzeblank.lu",
    href: "mailto:info@blitzeblank.lu",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "6A Rue Michel Rodange, 7681 Waldbillig, Luxembourg",
    href: "https://www.google.com/maps/search/?api=1&query=6A+Rue+Michel+Rodange+7681+Waldbillig",
  },
]

export default function KontaktFrPage() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()
  const honeypotRef = useRef<HTMLInputElement>(null)
  const renderedAt = useRef(Date.now())
  const submission = useSubmissionId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const result = await submitContact({
        ...formState,
        locale: "fr",
        honeypot: honeypotRef.current?.value ?? "",
        renderedAt: renderedAt.current,
        submissionId: submission.get(),
      })

      if (result.status === "error") {
        setSubmitError(formErrorMessage(result.code, "fr"))
        setIsSubmitting(false)
        return
      }

      submission.renew()
      if (result.status === "confirmed" && result.proof) {
        storeLeadHandoff(result.proof)
        router.push("/fr/kontakt/danke")
        return
      }
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch {
      setSubmitError(formErrorMessage("network", "fr"))
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <Sparkles className="h-4 w-4" />
              Contact
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Parlons-en
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Demandez une visite gratuite sur place ou posez-nous vos questions. Nous vous répondons sous 24
              heures.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 font-display text-2xl font-extrabold text-brand-navy">
                  Comment nous joindre
                </h2>

                <div className="space-y-3">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-navy/5 transition-shadow hover:shadow-md cursor-pointer"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-mint">
                        <item.icon className="h-5 w-5 text-brand-blue" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-neutral-500">{item.title}</h3>
                        <p className="text-brand-navy">{item.content}</p>
                      </div>
                    </a>
                  ))}

                  <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-navy/5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-mint">
                      <Clock className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500">Horaires d&apos;ouverture</h3>
                      <p className="text-brand-navy">Lun-Ven : 8h00 - 18h00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-brand-navy/5 lg:p-8">
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-mint">
                        <CheckCircle className="h-8 w-8 text-brand-blue" />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-bold text-brand-navy">
                        Merci pour votre demande !
                      </h3>
                      <p className="mb-6 text-neutral-600">
                        Nous avons bien reçu votre message et vous répondrons sous 24 heures.
                      </p>
                      <Button
                        asChild
                        className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8"
                      >
                        <Link href="/fr" className="cursor-pointer">
                          Retour à l&apos;accueil
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-brand-navy">
                          Demandez votre devis gratuit et sans engagement
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Remplissez le formulaire et nous vous recontactons.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <FormHoneypot inputRef={honeypotRef} />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="font-normal text-neutral-600">Nom *</Label>
                            <Input
                              id="name"
                              placeholder="Votre nom"
                              required
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.name}
                              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="font-normal text-neutral-600">Entreprise</Label>
                            <Input
                              id="company"
                              placeholder="Votre entreprise"
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.company}
                              onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="font-normal text-neutral-600">E-mail *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="votre@email.com"
                              required
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.email}
                              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="font-normal text-neutral-600">Téléphone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+352 ..."
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.phone}
                              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service" className="font-normal text-neutral-600">Prestation souhaitée</Label>
                          <Select
                            value={formState.service}
                            onValueChange={(value) => setFormState({ ...formState, service: value })}
                          >
                            <SelectTrigger id="service" className="font-light text-neutral-500">
                              <SelectValue placeholder="Choisir une prestation" />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="font-normal text-neutral-600">Votre message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Décrivez brièvement vos besoins..."
                            rows={4}
                            required
                            className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                          />
                        </div>

                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="consent"
                            checked={formState.consent}
                            onCheckedChange={(checked) =>
                              setFormState({ ...formState, consent: checked as boolean })
                            }
                            required
                          />
                          <Label htmlFor="consent" className="text-xs font-normal text-neutral-400 leading-relaxed">
                            J&apos;accepte que mes données soient enregistrées et traitées afin de répondre à ma
                            demande. Pour plus d&apos;informations, consultez notre{" "}
                            <Link href="/fr/datenschutz" className="text-brand-blue hover:underline">
                              politique de confidentialité
                            </Link>
                            .
                          </Label>
                        </div>

                        {submitError && (
                          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                            {submitError}
                          </p>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-brand-blue text-white hover:bg-brand-teal rounded-full shadow-lg shadow-brand-blue/30"
                          disabled={isSubmitting || !formState.consent}
                        >
                          {isSubmitting ? (
                            "Envoi en cours..."
                          ) : (
                            <>
                              Envoyer la demande
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
