import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
      question: "Welche Reinigungsmittel verwenden Sie?",
      answer:
        "Wir setzen auf hochwertige, professionelle Reinigungsmittel, die passend zur jeweiligen Oberfläche ausgewählt werden und sowohl effektiv als auch materialschonend sind.",
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
      question: "What cleaning products do you use?",
      answer:
        "We rely on high-quality, professional cleaning products selected to match each surface, ensuring effective results that are gentle on materials.",
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
  fr: [
    {
      question: "Que se passe-t-il si je ne suis pas satisfait de la prestation ?",
      answer:
        "Votre satisfaction est notre priorité absolue. Si un résultat ne correspond pas à vos attentes, nous retouchons gratuitement. Notre travail n'est considéré comme terminé que lorsque vous êtes entièrement satisfait.",
    },
    {
      question: "Comment se déroule l'établissement d'un devis ?",
      answer:
        "Après votre demande, nous convenons d'une visite gratuite sur place. Nous évaluons l'ampleur des travaux et vos souhaits, puis nous vous remettons un devis transparent et sans engagement, sans frais cachés.",
    },
    {
      question: "Dois-je fournir les produits de nettoyage ou le matériel ?",
      answer:
        "Non. Nous apportons nous-mêmes tous les produits de nettoyage professionnels et l'équipement nécessaire. Vous n'avez à vous occuper de rien.",
    },
    {
      question: "En combien de temps le nettoyage peut-il être réalisé ?",
      answer:
        "Nous répondons à votre demande sous 24 heures et proposons des rendez-vous à court terme. Si nécessaire, nous pouvons souvent réaliser le nettoyage en quelques jours seulement.",
    },
    {
      question: "Quels produits de nettoyage utilisez-vous ?",
      answer:
        "Nous utilisons des produits de nettoyage professionnels de haute qualité, choisis en fonction de chaque surface, efficaces et respectueux des matériaux.",
    },
    {
      question: "Proposez-vous également un service d'urgence ?",
      answer:
        "Oui, pour les demandes urgentes, nous sommes flexibles et nous adaptons à votre planning. Contactez-nous simplement et nous trouverons ensemble une solution rapide.",
    },
    {
      question: "Y a-t-il des remises, par exemple pour des réservations régulières ?",
      answer:
        "Oui. Pour les nettoyages réguliers, nous proposons des conditions avantageuses. Selon la fréquence, vous bénéficiez de tarifs réduits - les détails figurent dans votre devis personnalisé.",
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
  fr: {
    eyebrow: "FAQ",
    heading: "Questions fréquentes",
    body: "Retrouvez ici les réponses aux questions les plus fréquentes sur nos prestations de nettoyage.",
    ctaHeading: "Votre question n'y figure pas ?",
    ctaBody: "Nous répondons volontiers à toutes vos demandes - personnellement et sans engagement.",
    ctaButton: "Nous contacter maintenant",
  },
}

export function FaqSection({ locale = "de" }: { locale?: Locale }) {
  const faqs = FAQS[locale]
  const t = TEXT[locale]
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          {/* Left column: heading + contact */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy text-balance lg:text-4xl">
              {t.heading}
            </h2>
            <p className="mt-4 text-neutral-600 leading-relaxed text-pretty">{t.body}</p>

            <div className="mt-10 border-t border-brand-navy/10 pt-6">
              <p className="font-display font-bold text-brand-navy text-balance">{t.ctaHeading}</p>
              <p className="mt-1.5 text-sm text-neutral-600 text-pretty">{t.ctaBody}</p>
              <Link
                href={localizeHref("/kontakt", locale)}
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:text-brand-teal"
              >
                {t.ctaButton}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right column: accordion */}
          <Accordion type="single" collapsible className="divide-y divide-brand-navy/10 border-t border-brand-navy/10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-none">
                <AccordionTrigger className="py-5 text-left font-display font-bold text-brand-navy hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
