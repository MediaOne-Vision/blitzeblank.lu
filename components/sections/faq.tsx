import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HelpCircle, ArrowRight } from "lucide-react"
import { localizeHref, type Locale } from "@/lib/i18n"

const FAQS = {
  de: [
    {
      question: "Was, wenn ich mit der Leistung nicht zufrieden bin?",
      answer:
        "Ihre Zufriedenheit hat oberste Priorität. Sollte ein Ergebnis einmal nicht Ihren Erwartungen entsprechen, bessern wir kostenlos nach. Unsere Arbeit gilt erst als abgeschlossen, wenn Sie vollständig zufrieden sind.",
    },
    {
      question: "Wie läuft eine Angebotserstellung ab?",
      answer:
        "Nach Ihrer Anfrage vereinbaren wir eine kostenlose Vor-Ort-Besichtigung. Dabei erfassen wir den Umfang und Ihre Wünsche und erstellen Ihnen anschließend ein transparentes, unverbindliches Angebot ohne versteckte Kosten.",
    },
    {
      question: "Muss ich Reinigungsmittel oder Geräte zur Verfügung stellen?",
      answer:
        "Nein. Wir bringen sämtliche professionellen Reinigungsmittel und das benötigte Equipment selbst mit. Sie müssen sich um nichts kümmern.",
    },
    {
      question: "Wie schnell kann die Reinigung durchgeführt werden?",
      answer:
        "Wir antworten auf Ihre Anfrage innerhalb von 24 Stunden und bieten kurzfristige Termine an. Bei Bedarf können wir die Reinigung oft schon innerhalb weniger Tage durchführen.",
    },
    {
      question: "Sind die Reinigungsmittel umweltfreundlich?",
      answer:
        "Wir setzen auf hochwertige, schonende und nach Möglichkeit umweltfreundliche Reinigungsmittel, die sowohl effektiv als auch materialschonend sind.",
    },
    {
      question: "Bieten Sie auch Notfalldienste an?",
      answer:
        "Ja, bei dringenden Anliegen sind wir flexibel und passen uns Ihrem Zeitplan an. Sprechen Sie uns einfach an, und wir finden gemeinsam eine schnelle Lösung.",
    },
    {
      question: "Gibt es Rabatte auf z. B. regelmäßige Buchungen?",
      answer:
        "Ja. Für regelmäßige Reinigungen bieten wir attraktive Konditionen. Je nach Häufigkeit profitieren Sie von vergünstigten Preisen - die Details halten wir in Ihrem individuellen Angebot fest.",
    },
  ],
  en: [
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Your satisfaction is our top priority. If a result doesn't meet your expectations, we'll touch it up free of charge. Our work is only considered complete once you're fully satisfied.",
    },
    {
      question: "How does the quoting process work?",
      answer:
        "After your inquiry, we arrange a free on-site visit. We assess the scope and your wishes, then provide you with a transparent, non-binding quote with no hidden costs.",
    },
    {
      question: "Do I need to provide cleaning products or equipment?",
      answer:
        "No. We bring all the professional cleaning products and equipment needed ourselves. You don't need to worry about a thing.",
    },
    {
      question: "How quickly can the cleaning be carried out?",
      answer:
        "We respond to your inquiry within 24 hours and offer short-notice appointments. If needed, we can often carry out the cleaning within just a few days.",
    },
    {
      question: "Are the cleaning products eco-friendly?",
      answer:
        "We rely on high-quality, gentle and, where possible, environmentally friendly cleaning products that are both effective and gentle on materials.",
    },
    {
      question: "Do you offer emergency services?",
      answer:
        "Yes, for urgent matters we're flexible and adapt to your schedule. Just get in touch and we'll find a quick solution together.",
    },
    {
      question: "Are there discounts for e.g. regular bookings?",
      answer:
        "Yes. We offer attractive terms for regular cleaning. Depending on frequency, you benefit from reduced prices - the details are set out in your individual quote.",
    },
  ],
}

const TEXT = {
  de: {
    eyebrow: "FAQ",
    heading: "Häufige Fragen",
    body: "Hier finden Sie die Antworten auf die häufigsten Fragen rund um unsere Reinigungsleistungen.",
    ctaHeading: "Ihre Frage war nicht dabei?",
    ctaBody: "Wir beantworten gerne alle Ihre Anliegen - persönlich und unverbindlich.",
    ctaButton: "Jetzt Kontakt aufnehmen",
  },
  en: {
    eyebrow: "FAQ",
    heading: "Frequently Asked Questions",
    body: "Here you'll find answers to the most common questions about our cleaning services.",
    ctaHeading: "Didn't find your question?",
    ctaBody: "We're happy to answer all your questions - personally and without obligation.",
    ctaButton: "Get in Touch Now",
  },
}

export function FaqSection({ locale = "de" }: { locale?: Locale }) {
  const faqs = FAQS[locale]
  const t = TEXT[locale]
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
            <HelpCircle className="h-6 w-6 text-brand-blue" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">{t.eyebrow}</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
            {t.heading}
          </h2>
          <p className="text-neutral-600 leading-relaxed mt-4 text-pretty">{t.body}</p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border border-brand-blue/10 bg-white px-6 last:border-b"
            >
              <AccordionTrigger className="text-left font-display font-bold text-brand-navy hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA below FAQ */}
        <div className="mt-12 rounded-2xl bg-white border border-brand-blue/10 px-6 py-8 text-center">
          <p className="font-display text-xl font-bold text-brand-navy mb-2 text-balance">{t.ctaHeading}</p>
          <p className="text-neutral-600 mb-6 text-pretty">{t.ctaBody}</p>
          <Button
            asChild
            size="lg"
            className="group bg-brand-blue text-white hover:bg-brand-teal rounded-full px-8 shadow-lg shadow-brand-blue/30"
          >
            <Link href={localizeHref("/kontakt", locale)} className="cursor-pointer">
              {t.ctaButton}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
