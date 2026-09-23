import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { HeroSection } from "@/components/sections/hero"
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

export function HomeContent({ locale = "de" }: { locale?: Locale }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection locale={locale} />
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
      </main>
      <Footer locale={locale} />
    </div>
  )
}
