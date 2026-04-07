import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Kontakt
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium tracking-tight text-foreground mb-8 leading-tight">
            Bereit für strahlende Sauberkeit?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
            Kontaktieren Sie uns noch heute für eine kostenlose und unverbindliche Besichtigung.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-8 h-14 text-base"
            >
              <Link href="/kontakt" className="flex items-center gap-2 cursor-pointer">
                Jetzt Kontakt aufnehmen
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/20 hover:bg-foreground hover:text-background px-8 h-14 text-base"
            >
              <a href="tel:+352123456789" className="cursor-pointer">
                +352 123 456 789
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
