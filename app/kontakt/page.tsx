"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react"

const services = [
  { value: "industrie", label: "Industriereinigung" },
  { value: "fenster", label: "Fensterreinigung" },
  { value: "trockeneis", label: "Trockeneisreinigung" },
  { value: "stein", label: "Steinreinigung" },
  { value: "fassade", label: "Fassadenreinigung" },
  { value: "sonstiges", label: "Sonstiges" },
]

const contactInfo = [
  {
    icon: Phone,
    title: "Telefon",
    content: "+352 123 456 789",
    href: "tel:+352123456789",
    description: "Mo-Fr: 8:00 - 18:00 Uhr",
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: "info@blitzeblank.lu",
    href: "mailto:info@blitzeblank.lu",
    description: "Antwort innerhalb von 24h",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "Rue de la Gare 123, L-1234 Luxemburg",
    href: "https://maps.google.com",
    description: "Besuchen Sie uns vor Ort",
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: "Mo-Fr: 8:00 - 18:00",
    description: "Termine nach Vereinbarung",
  },
]

export default function KontaktPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Kontakt aufnehmen
              </h1>
              <p className="text-lg text-primary-foreground/80">
                Fordern Sie einen kostenlosen Besichtigungstermin an oder stellen Sie uns Ihre Fragen. 
                Wir melden uns innerhalb von 24 Stunden bei Ihnen.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  So erreichen Sie uns
                </h2>
                <p className="mb-8 text-muted-foreground leading-relaxed">
                  Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? 
                  Kontaktieren Sie uns auf dem für Sie angenehmsten Weg.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.content}</p>
                        )}
                        <p className="text-sm text-muted-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-12 rounded-xl bg-secondary p-6">
                  <h3 className="mb-4 font-semibold text-foreground">Darum Blitzeblank</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Kostenlose Besichtigung vor Ort
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Unverbindliches Angebot
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Probearbeit möglich
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      Antwort innerhalb von 24h
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border-0 bg-card p-6 shadow-lg lg:p-8">
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                        <CheckCircle className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground">
                        Vielen Dank für Ihre Anfrage!
                      </h3>
                      <p className="mb-6 text-muted-foreground">
                        Wir haben Ihre Nachricht erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.
                      </p>
                      <Button asChild variant="outline">
                        <Link href="/">Zur Startseite</Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-foreground">
                          Kostenlosen Besichtigungstermin anfragen
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Füllen Sie das Formular aus und wir melden uns bei Ihnen.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              placeholder="Ihr Name"
                              required
                              value={formState.name}
                              onChange={(e) =>
                                setFormState({ ...formState, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company">Unternehmen</Label>
                            <Input
                              id="company"
                              placeholder="Ihr Unternehmen"
                              value={formState.company}
                              onChange={(e) =>
                                setFormState({ ...formState, company: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">E-Mail *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="ihre@email.com"
                              required
                              value={formState.email}
                              onChange={(e) =>
                                setFormState({ ...formState, email: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefon</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+352 ..."
                              value={formState.phone}
                              onChange={(e) =>
                                setFormState({ ...formState, phone: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service">Gewünschte Leistung</Label>
                          <Select
                            value={formState.service}
                            onValueChange={(value) =>
                              setFormState({ ...formState, service: value })
                            }
                          >
                            <SelectTrigger id="service">
                              <SelectValue placeholder="Leistung auswählen" />
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
                          <Label htmlFor="message">Ihre Nachricht *</Label>
                          <Textarea
                            id="message"
                            placeholder="Beschreiben Sie kurz Ihre Anforderungen..."
                            rows={4}
                            required
                            value={formState.message}
                            onChange={(e) =>
                              setFormState({ ...formState, message: e.target.value })
                            }
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
                          <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                            Ich bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage 
                            verwendet werden. Weitere Informationen finden Sie in unserer{" "}
                            <Link href="/datenschutz" className="text-accent hover:underline">
                              Datenschutzerklärung
                            </Link>
                            .
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                          disabled={isSubmitting || !formState.consent}
                        >
                          {isSubmitting ? (
                            "Wird gesendet..."
                          ) : (
                            <>
                              Anfrage absenden
                              <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
