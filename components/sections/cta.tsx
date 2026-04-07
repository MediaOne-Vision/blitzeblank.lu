import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <Image src="/images/logo-icon.png" alt="" width={60} height={60} className="h-12 w-auto" />
      </div>
      <div className="absolute bottom-8 right-8 opacity-20">
        <Image src="/images/logo-icon.png" alt="" width={80} height={80} className="h-16 w-auto" />
      </div>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 opacity-10">
        <Image src="/images/logo-icon.png" alt="" width={40} height={40} className="h-8 w-auto" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Bereit für strahlende Sauberkeit?
          </h2>
          <p className="mb-8 text-pretty text-lg text-primary-foreground/85">
            Kontaktieren Sie uns noch heute für eine kostenlose und unverbindliche Besichtigung. 
            Wir freuen uns darauf, Sie kennenzulernen.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              <Link href="/kontakt" className="flex items-center gap-2">
                Kostenlosen Termin anfragen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <a href="tel:+352123456789" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +352 123 456 789
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
