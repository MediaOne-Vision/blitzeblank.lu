import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { TrackLead } from "@/components/track-lead"
import { CheckCircle2, Home, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Anfrage | Blitzeblank",
  description: "Ihre Anfrage zur Pflasterflächen- und Steinpflege ist bei Blitzeblank eingegangen. Wir melden uns in Kürze bei Ihnen.",
  robots: { index: false, follow: false },
}

export default function SteinAngebotDankePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* Feuert das lead_submitted-Event (service=steinreinigung, accepted).
              Nur nach echtem Formular-Submit; sonst Redirect auf die Startseite. */}
          <TrackLead expected="accepted" />

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-blue/10">
            <CheckCircle2 className="h-10 w-10 text-brand-blue" />
          </div>

          <h1 className="mt-6 text-balance font-display text-3xl font-extrabold text-brand-navy sm:text-4xl">
            Vielen Dank für Ihr Vertrauen!
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-neutral-600">
            Ihre Anfrage zur Pflasterflächen- und Steinpflege ist bei uns eingegangen. Wir haben Ihnen eine
            Bestätigung mit der Zusammenfassung per E-Mail geschickt und melden uns in Kürze bei Ihnen.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group w-full rounded-full bg-brand-blue text-white shadow-md shadow-brand-blue/30 transition-transform hover:scale-105 hover:bg-brand-teal sm:w-auto"
            >
              <Link href="/" className="cursor-pointer">
                <Home className="h-4 w-4" />
                Zur Startseite
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full rounded-full border-brand-blue/30 text-brand-blue hover:bg-brand-mint hover:text-brand-blue sm:w-auto"
            >
              <a href="tel:+352661830493" className="cursor-pointer">
                <Phone className="h-4 w-4" />
                +352 661 830 493
              </a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
