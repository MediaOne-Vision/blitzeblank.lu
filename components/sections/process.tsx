import { Phone, ClipboardCheck, Sparkles, ThumbsUp } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const STEPS = {
  de: [
    { number: "01", icon: Phone, title: "Kontakt aufnehmen", description: "Rufen Sie uns an oder nutzen Sie unser Kontaktformular. Wir melden uns innerhalb von 24 Stunden zurück." },
    { number: "02", icon: ClipboardCheck, title: "Kostenlose Besichtigung", description: "Wir besichtigen Ihre Räumlichkeiten vor Ort und erstellen ein maßgeschneidertes Angebot." },
    { number: "03", icon: Sparkles, title: "Professionelle Reinigung", description: "Unser geschultes Team führt die Reinigung nach höchsten Standards durch - termingerecht und gründlich." },
    { number: "04", icon: ThumbsUp, title: "Ihre Zufriedenheit", description: "Nach Abschluss prüfen wir gemeinsam das Ergebnis. Ihre Zufriedenheit ist unser Maßstab." },
  ],
  en: [
    { number: "01", icon: Phone, title: "Get in Touch", description: "Call us or use our contact form. We'll get back to you within 24 hours." },
    { number: "02", icon: ClipboardCheck, title: "Free Site Visit", description: "We visit your premises on site and create a tailored quote." },
    { number: "03", icon: Sparkles, title: "Professional Cleaning", description: "Our trained team carries out the cleaning to the highest standards - on time and thoroughly." },
    { number: "04", icon: ThumbsUp, title: "Your Satisfaction", description: "Once finished, we review the result together. Your satisfaction is our benchmark." },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Ablauf",
    heading: "In vier Schritten zur Sauberkeit",
    body: "Vom ersten Kontakt bis zum strahlenden Ergebnis: einfach, transparent und ohne Umwege.",
  },
  en: {
    eyebrow: "Process",
    heading: "Four Steps to Spotless",
    body: "From first contact to sparkling result: simple, transparent and straightforward.",
  },
}

export function ProcessSection({ locale = "de" }: { locale?: Locale }) {
  const steps = STEPS[locale]
  const t = TEXT[locale]
  return (
    <section className="py-24 bg-brand-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-sky mb-4">
            <span className="h-px w-8 bg-brand-sky/50" />
            {t.eyebrow}
            <span className="h-px w-8 bg-brand-sky/50" />
          </p>
          <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-white max-w-2xl mx-auto text-balance">
            {t.heading}
          </h2>
          <p className="mt-5 text-lg text-white/60 max-w-xl mx-auto text-pretty">{t.body}</p>
        </div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Horizontal connecting line (desktop) */}
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative flex h-full flex-col items-center text-center group">
                {/* Icon node */}
                <div className="relative z-10 mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand-blue ring-8 ring-brand-navy shadow-lg shadow-brand-blue/30 transition-transform group-hover:scale-110">
                  <step.icon className="h-8 w-8 text-white" strokeWidth={2.2} />
                </div>

                {/* Card */}
                <div className="flex h-full w-full flex-col rounded-2xl bg-white/[0.06] ring-1 ring-white/10 p-6 backdrop-blur-sm transition-colors group-hover:bg-white/[0.1]">
                  <span className="font-display text-5xl font-extrabold text-white/10 block leading-none mb-3">
                    {step.number}
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-white mb-3 text-balance">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-white/70 leading-relaxed text-pretty">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
