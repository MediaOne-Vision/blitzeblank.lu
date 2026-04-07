import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-neutral-900 pt-16 flex items-center overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/80 via-neutral-900/60 to-neutral-900" />
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-32 w-full">
        <div className="max-w-2xl">
          <p className="text-neutral-400 text-sm tracking-wide uppercase mb-6">
            Professionelle Reinigung in Luxemburg
          </p>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-tight mb-8">
            Ihr Partner fur makellose Sauberkeit im gewerblichen Bereich
          </h1>
          
          <p className="text-neutral-400 text-lg max-w-lg mb-10 leading-relaxed">
            Von der Industriereinigung bis zur Fassadenpflege bieten wir massgeschneiderte Losungen fur Unternehmen in ganz Luxemburg.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-8">
              <Link href="/kontakt" className="cursor-pointer">
                Kostenlose Beratung
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-neutral-800 rounded-full px-8">
              <Link href="/leistungen" className="cursor-pointer">
                Unsere Leistungen
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mascot - Bottom Right */}
      <div className="absolute bottom-0 right-0 lg:right-20 opacity-20 lg:opacity-100">
        <Image
          src="/images/mascot.png"
          alt="Blitzeblank Maskottchen"
          width={400}
          height={400}
          className="h-64 lg:h-96 w-auto"
          priority
        />
      </div>
    </section>
  )
}
