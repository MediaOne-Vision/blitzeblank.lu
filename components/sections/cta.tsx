import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Bereit für strahlende Sauberkeit?
          </h2>
          <p className="mb-8 text-pretty text-lg text-primary-foreground/80">
            Kontaktieren Sie uns noch heute für eine kostenlose und unverbindliche Besichtigung. 
            Wir freuen uns darauf, Sie kennenzulernen.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
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
