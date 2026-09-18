import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { QuoteWizard } from "@/components/quote-wizard"
import { getPricingConfig } from "@/lib/pricing-store"
import { Sparkles } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Free Quote | Blitzeblank - Professional Cleaning",
  description:
    "Calculate your no-obligation price estimate in just a few steps and request a free quote for your cleaning.",
  alternates: {
    canonical: "https://blitzeblank.lu/en/angebot",
    languages: {
      de: "/angebot",
      en: "/en/angebot",
    },
  },
}

export default async function AngebotEnPage({
  searchParams,
}: {
  searchParams: Promise<{ leistung?: string }>
}) {
  const { leistung } = await searchParams
  const pricingConfig = await getPricingConfig()

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand-navy pt-28 pb-12 lg:pt-36 lg:pb-16">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-sky ring-1 ring-white/15 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Free &amp; no obligation
            </span>
            <h1 className="mb-4 text-balance font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Your free, no-obligation quote
            </h1>
            <p className="text-pretty text-lg text-white/75">
              Get your personalized price estimate in just a few steps - tell us your
              requirements and receive an instant, no-obligation estimate.
            </p>
          </div>
        </section>

        {/* Wizard */}
        <section className="bg-brand-mint py-12 lg:py-16">
          <div className="mx-auto max-w-4xl px-6">
            <QuoteWizard initialSlug={leistung} pricingConfig={pricingConfig} locale="en" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
