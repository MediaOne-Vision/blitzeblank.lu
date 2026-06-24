import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { HeroSection } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { ServicesOverview } from "@/components/sections/services-overview"
import { ResultsShowcase } from "@/components/sections/results-showcase"
import { WhyUsSection } from "@/components/sections/why-us"
import { OwnerSection } from "@/components/sections/owner"
import { ProcessSection } from "@/components/sections/process"
import { QuoteBanner } from "@/components/quote-banner"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FaqSection } from "@/components/sections/faq"
import { CtaSection } from "@/components/sections/cta"
import { SocialBanner } from "@/components/sections/social-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <Reveal direction="fade">
          <TrustBar />
        </Reveal>
        <ServicesOverview />
        <Reveal>
          <ResultsShowcase />
        </Reveal>
        <WhyUsSection />
        <Reveal>
          <OwnerSection />
        </Reveal>
        <Reveal>
          <ProcessSection />
        </Reveal>
        <Reveal>
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6">
              <QuoteBanner />
            </div>
          </section>
        </Reveal>
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        <Reveal>
          <FaqSection />
        </Reveal>
        <Reveal>
          <CtaSection />
        </Reveal>
        <Reveal direction="fade">
          <SocialBanner />
        </Reveal>
      </main>
      <Footer />
    </div>
  )
}
