import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { ServicesOverview } from "@/components/sections/services-overview"
import { WhyUsSection } from "@/components/sections/why-us"
import { OwnerSection } from "@/components/sections/owner"
import { ProcessSection } from "@/components/sections/process"
import { CalculatorSection } from "@/components/sections/calculator-section"
import { TestimonialsSection } from "@/components/sections/testimonials"
import { FaqSection } from "@/components/sections/faq"
import { CtaSection } from "@/components/sections/cta"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <TrustBar />
        <ServicesOverview />
        <WhyUsSection />
        <OwnerSection />
        <ProcessSection />
        <CalculatorSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
