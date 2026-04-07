import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          {/* Decorative Mascot */}
          <div className="absolute right-0 bottom-0 hidden lg:block">
            <Image
              src="/images/mascot.png"
              alt=""
              width={200}
              height={200}
              className="h-48 w-auto opacity-20"
            />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl mb-4">
              Bereit fur strahlende Sauberkeit?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Kontaktieren Sie uns noch heute fur eine kostenlose und unverbindliche Besichtigung.
            </p>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="gap-2"
              >
                <Link href="/kontakt" className="cursor-pointer">
                  Jetzt Kontakt aufnehmen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href="tel:+352123456789" className="cursor-pointer">
                  <Phone className="h-4 w-4" />
                  +352 123 456 789
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
