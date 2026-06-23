import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

const faqs = [
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
    question: "Sind Anfahrtskosten im Preis inbegriffen?",
    answer:
      "In unserem Einzugsgebiet in Luxemburg und Deutschland sind die Anfahrtskosten in der Regel im Angebot enthalten. Alle Kosten weisen wir vorab transparent aus.",
  },
  {
    question: "Gibt es Rabatte auf z. B. regelmäßige Buchungen?",
    answer:
      "Ja. Für regelmäßige Reinigungen bieten wir attraktive Konditionen. Je nach Häufigkeit profitieren Sie von vergünstigten Preisen - die Details halten wir in Ihrem individuellen Angebot fest.",
  },
]

export function FaqSection() {
  return (
    <section className="py-20 bg-brand-mint">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
            <HelpCircle className="h-6 w-6 text-brand-blue" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue mb-3">FAQ</p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-brand-navy tracking-tight text-balance">
            Häufige Fragen
          </h2>
          <p className="text-neutral-600 leading-relaxed mt-4 text-pretty">
            Hier finden Sie die Antworten auf die häufigsten Fragen rund um unsere
            Reinigungsleistungen.
          </p>
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
      </div>
    </section>
  )
}
