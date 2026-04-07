import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const features = [
  "Kostenlose Erstberatung",
  "Kurzfristige Termine",
  "Transparente Preise",
]

export function HeroSection() {
  return (
    <section className="bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              <Image
                src="/images/logo-icon.png"
                alt=""
                width={16}
                height={16}
                className="h-4 w-4"
              />
              Professionelle Reinigung in Luxemburg
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Sauberkeit, die{" "}
              <span className="text-primary">uberzeugt</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Blitzeblank ist Ihr zuverlassiger Partner fur professionelle Reinigungsdienstleistungen. 
              Von der Industriereinigung bis zur Fassadenpflege - wir liefern Qualitat, auf die Sie sich verlassen konnen.
            </p>

            <ul className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
              <Button asChild size="lg" className="gap-2">
                <Link href="/kontakt" className="cursor-pointer">
                  Kostenlose Beratung
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/leistungen" className="cursor-pointer">
                  Unsere Leistungen
                </Link>
              </Button>
            </div>
          </div>

          {/* Mascot Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl" />
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbar Maskottchen"
                width={450}
                height={450}
                className="relative h-auto w-full max-w-sm lg:max-w-md"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
