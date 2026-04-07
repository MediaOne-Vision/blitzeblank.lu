import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 lg:w-48 lg:h-48 opacity-20">
        <Image
          src="/images/logo-icon.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-40 left-10 w-24 h-24 opacity-10 rotate-12">
        <Image
          src="/images/logo-icon.png"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Headline - Centered Large Typography */}
        <div className="max-w-5xl mx-auto text-center mb-16 lg:mb-24">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-medium tracking-tight text-foreground leading-[0.95] text-balance mb-8">
            Professionelle Sauberkeit trifft 
            <span className="italic"> Präzision</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Wir reinigen Ihre Gewerbeflächen in Luxemburg zuverlässig, 
            gründlich und termingerecht.
          </p>
        </div>

        {/* Two Column Layout - CTAs and Image */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-end">
          {/* Left CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Kostenlos & Unverbindlich</p>
            <h3 className="text-lg font-medium mb-4">Besichtigungstermin vereinbaren</h3>
            <Button 
              asChild 
              variant="outline"
              className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background transition-all group"
            >
              <Link href="/kontakt" className="flex items-center gap-2 cursor-pointer">
                Termin anfragen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Center - Mascot Image */}
          <div className="relative flex justify-center order-first lg:order-none">
            <div className="relative w-full max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbär Maskottchen"
                width={500}
                height={500}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Right CTA */}
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Preistransparenz</p>
            <h3 className="text-lg font-medium mb-4">Sofort Preisspanne erfahren</h3>
            <Button 
              asChild 
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all group"
            >
              <Link href="#preiskalkulator" className="flex items-center gap-2 cursor-pointer">
                Preis berechnen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scrolling Service Marquee */}
      <div className="mt-20 lg:mt-32 border-t border-b border-border/40 py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4">
              <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Industriereinigung</span>
              <span className="text-primary">•</span>
              <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Fensterreinigung</span>
              <span className="text-primary">•</span>
              <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Trockeneisreinigung</span>
              <span className="text-primary">•</span>
              <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Steinreinigung</span>
              <span className="text-primary">•</span>
              <span className="text-sm uppercase tracking-[0.15em] text-muted-foreground">Fassadenreinigung</span>
              <span className="text-primary">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
