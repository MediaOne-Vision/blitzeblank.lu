import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FileText, MapPin, Phone, Mail, Shield, User, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Impressum | Blitzeblank - Professionelle Reinigung in Luxemburg",
  description: "Impressum und rechtliche Angaben von BLITZEBLANK S.à r.l., Mustapha El-Ali, Waldbillig.",
  alternates: {
    canonical: "https://blitzeblank.lu/impressum",
    languages: {
      de: "/impressum",
      en: "/en/impressum",
    },
  },
}

const blocks = [
  {
    icon: User,
    title: "Anbieter",
    lines: [
      "Mustapha El-Ali",
      "BLITZEBLANK S.à r.l.",
    ],
  },
  {
    icon: MapPin,
    title: "Anschrift",
    lines: [
      "6A, Rue Michel Rodange",
      "7681 Waldbillig",
    ],
  },
  {
    icon: Phone,
    title: "Telefon",
    lines: ["+352 661 830 493"],
    href: "tel:+352661830493",
  },
  {
    icon: Mail,
    title: "E-Mail",
    lines: ["info@blitzeblank.lu"],
    href: "mailto:info@blitzeblank.lu",
  },
]

export default function ImpressumPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-16 lg:pt-36 lg:pb-20">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15">
              <FileText className="h-4 w-4" />
              Rechtliches
            </span>
            <h1 className="mb-6 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Impressum
            </h1>
            <p className="text-lg text-white/75 text-pretty">
              Angaben gemäß den gesetzlichen Vorschriften.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-10">
              {/* Contact blocks - same style as detailed sections */}
              {blocks.map((block) => (
                <div key={block.title}>
                  <div className="mb-3 flex items-center gap-3">
                    <block.icon className="h-5 w-5 text-brand-blue" />
                    <h2 className="font-display text-xl font-extrabold text-brand-navy">
                      {block.title}
                    </h2>
                  </div>
                  <div className="rounded-2xl bg-brand-mint/50 p-6 text-neutral-600 leading-relaxed">
                    {block.href ? (
                      <a
                        href={block.href}
                        className="text-brand-navy hover:text-brand-blue transition-colors cursor-pointer"
                      >
                        {block.lines[0]}
                      </a>
                    ) : (
                      block.lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))
                    )}
                  </div>
                </div>
              ))}

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-display text-xl font-extrabold text-brand-navy">
                    Angaben zur Berufshaftpflichtversicherung
                  </h2>
                </div>
                <div className="rounded-2xl bg-brand-mint/50 p-6 text-neutral-600 leading-relaxed">
                  <p className="mb-1">
                    <span className="font-medium text-brand-navy">Name und Sitz des Versicherers:</span>
                  </p>
                  <p>LVM Versicherung</p>
                  <p>Kolde-Ring 21</p>
                  <p>48151 Münster</p>
                  <p className="mt-3">
                    <span className="font-medium text-brand-navy">Geltungsraum der Versicherung:</span>{" "}
                    Deutschland, Luxemburg
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <User className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-display text-xl font-extrabold text-brand-navy">
                    Redaktionell verantwortlich
                  </h2>
                </div>
                <div className="rounded-2xl bg-brand-mint/50 p-6 text-neutral-600 leading-relaxed">
                  <p>Mustapha El-Ali</p>
                  <p>6A, Rue Michel Rodange</p>
                  <p>7681 Waldbillig</p>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Scale className="h-5 w-5 text-brand-blue" />
                  <h2 className="font-display text-xl font-extrabold text-brand-navy">
                    Verbraucherstreitbeilegung / Universalschlichtungsstelle
                  </h2>
                </div>
                <div className="rounded-2xl bg-brand-mint/50 p-6 text-neutral-600 leading-relaxed">
                  <p>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor 
                    einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
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
