import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calculator } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      </div>

      <div className="container relative mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
              <Image 
                src="/images/logo-icon.png" 
                alt="Sparkle" 
                width={16} 
                height={16} 
                className="h-4 w-4"
              />
              Professionelle Reinigung in Luxemburg
            </div>

            {/* Headline */}
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Sauberkeit, auf die Sie sich verlassen können
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-pretty text-lg text-primary-foreground/85 md:text-xl">
              Wir reinigen Ihre Gewerbeflächen zuverlässig, gründlich und termingerecht. 
              Mit Blitzeblank setzen Sie auf Qualität und Transparenz.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                <Link href="/kontakt" className="flex items-center gap-2">
                  Kostenlosen Besichtigungstermin anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="#preiskalkulator" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Preisspanne berechnen
                </Link>
              </Button>
            </div>
          </div>

          {/* Mascot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow effect behind mascot */}
              <div className="absolute inset-0 blur-3xl bg-white/20 rounded-full scale-75" />
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbär Maskottchen"
                width={500}
                height={500}
                className="relative z-10 h-auto w-full max-w-[320px] md:max-w-[400px] lg:max-w-[450px] drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48h1440V24c-240 24-480 24-720 0S240 0 0 24v24z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  )
}
