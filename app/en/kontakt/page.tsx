"use client"

import { useState } from "react"
import Link from "next/link"
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
  { value: "industrie", label: "Industrial cleaning" },
  { value: "fenster", label: "Window cleaning" },
  { value: "stein", label: "Stone cleaning" },
  { value: "fassade", label: "Facade cleaning" },
  { value: "sonstiges", label: "Other" },
]

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+352 661 830 493",
    href: "tel:+352661830493",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@blitzeblank.lu",
    href: "mailto:info@blitzeblank.lu",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "6A Rue Michel Rodange, 7681 Waldbillig, Luxembourg",
    href: "https://www.google.com/maps/search/?api=1&query=6A+Rue+Michel+Rodange+7681+Waldbillig",
  },
]

export default function KontaktEnPage() {
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
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <Sparkles className="h-4 w-4" />
              Contact
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Let&apos;s talk
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Request a free on-site assessment or ask us your questions.
              We&apos;ll get back to you within 24 hours.
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
                  How to reach us
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
                      <h3 className="text-sm font-medium text-neutral-500">Opening hours</h3>
                      <p className="text-brand-navy">Mon-Fri: 8:00 AM - 6:00 PM</p>
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
                        Thank you for your inquiry!
                      </h3>
                      <p className="mb-6 text-neutral-600">
                        We&apos;ve received your message and will get back to you within 24 hours.
                      </p>
                      <Button
                        asChild
                        className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8"
                      >
                        <Link href="/en" className="cursor-pointer">
                          Back to home
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-brand-navy">
                          Request your free, no-obligation quote
                        </h3>
                        <p className="text-sm text-neutral-500">
                          Fill out the form and we&apos;ll get back to you.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="font-normal text-neutral-600">Name *</Label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.name}
                              onChange={(e) =>
                                setFormState({ ...formState, name: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="company" className="font-normal text-neutral-600">Company</Label>
                            <Input
                              id="company"
                              placeholder="Your company"
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.company}
                              onChange={(e) =>
                                setFormState({ ...formState, company: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="font-normal text-neutral-600">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your@email.com"
                              required
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.email}
                              onChange={(e) =>
                                setFormState({ ...formState, email: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="font-normal text-neutral-600">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="+352 ..."
                              className="font-light text-neutral-500 placeholder:text-neutral-400/70"
                              value={formState.phone}
                              onChange={(e) =>
                                setFormState({ ...formState, phone: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="service" className="font-normal text-neutral-600">Desired service</Label>
                          <Select
                            value={formState.service}
                            onValueChange={(value) =>
                              setFormState({ ...formState, service: value })
                            }
                          >
                            <SelectTrigger id="service" className="font-light text-neutral-500">
                              <SelectValue placeholder="Select a service" />
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
                          <Label htmlFor="message" className="font-normal text-neutral-600">Your message *</Label>
                          <Textarea
                            id="message"
                            placeholder="Briefly describe your requirements..."
                            rows={4}
                            required
                            className="font-light text-neutral-500 placeholder:text-neutral-400/70"
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
                          <Label htmlFor="consent" className="text-xs font-normal text-neutral-400 leading-relaxed">
                            I agree that my information will be stored and processed to handle my
                            inquiry. For more information, please see our{" "}
                            <Link href="/en/datenschutz" className="text-brand-blue hover:underline">
                              privacy policy
                            </Link>
                            .
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-brand-blue text-white hover:bg-brand-teal rounded-full shadow-lg shadow-brand-blue/30"
                          disabled={isSubmitting || !formState.consent}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              Send inquiry
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
