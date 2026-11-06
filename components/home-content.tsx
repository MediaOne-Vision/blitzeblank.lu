import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { HeroSection } from "@/components/sections/hero"
import { AudienceLocationsSection } from "@/components/sections/audience-locations"
import { AudienceServicesSection } from "@/components/sections/audience-services"
import { LocationsGrid } from "@/components/locations-grid"
import { ServicesOverview } from "@/components/sections/services-overview"
import { ResultsShowcase } from "@/components/sections/results-showcase"
import { WhyUsSection } from "@/components/sections/why-us"
import { OwnerSection } from "@/components/sections/owner"
import { InActionSection } from "@/components/sections/in-action"
import { ProcessSection } from "@/components/sections/process"
import { QuoteBanner } from "@/components/quote-banner"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FaqSection } from "@/components/sections/faq"
import { CtaSection } from "@/components/sections/cta"
import type { Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

/**
 * Startseite (neutral) und Zielgruppen-Seiten (/privatkunden, /gewerbekunden).
 * Die Zielgruppen-Seiten sind eigene, serverseitig gerenderte Seiten und damit indexierbar.
 */
export function HomeContent({ locale = "de", audience = null }: { locale?: Locale; audience?: Audience | null }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection locale={locale} audience={audience} />
        {audience ? (
          <>
            <AudienceServicesSection locale={locale} audience={audience} />
            <Reveal>
              <TestimonialsSection locale={locale} />
            </Reveal>
            <Reveal>
              <ResultsShowcase locale={locale} />
            </Reveal>
            <section className="bg-brand-mint py-16 lg:py-20">
              <div className="mx-auto max-w-6xl px-6">
                <LocationsGrid locale={locale} />
              </div>
            </section>
            <WhyUsSection locale={locale} />
            <Reveal>
              <ProcessSection locale={locale} />
            </Reveal>
            <Reveal>
              <OwnerSection locale={locale} />
            </Reveal>
            <Reveal>
              <FaqSection locale={locale} />
            </Reveal>
            <Reveal>
              <CtaSection locale={locale} />
            </Reveal>
          </>
        ) : (
          <>
            <AudienceLocationsSection locale={locale} />
            <ServicesOverview locale={locale} />
            <WhyUsSection locale={locale} />
            <Reveal>
              <ResultsShowcase locale={locale} />
            </Reveal>
            <Reveal>
              <OwnerSection locale={locale} />
            </Reveal>
            <Reveal>
              <ProcessSection locale={locale} />
            </Reveal>
            <Reveal>
              <InActionSection locale={locale} />
            </Reveal>
            <Reveal>
              <QuoteBanner locale={locale} />
            </Reveal>
            <Reveal>
              <TestimonialsSection locale={locale} />
            </Reveal>
            <Reveal>
              <FaqSection locale={locale} />
            </Reveal>
            <Reveal>
              <CtaSection locale={locale} />
            </Reveal>
          </>
        )}
      </main>
      <Footer locale={locale} />
    </div>
  )
}
