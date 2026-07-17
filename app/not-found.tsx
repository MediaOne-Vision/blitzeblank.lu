import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Home, Calculator, Phone, ArrowRight } from "lucide-react"

const serviceLinks = [
  { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
  { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
  { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
  { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />

      <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* 404 */}
          <p className="font-display text-[7rem] font-extrabold leading-none tracking-tight text-brand-blue sm:text-[9rem]">
            404
          </p>

          <h1 className="mt-2 text-balance font-display text-2xl font-bold text-brand-navy sm:text-3xl">
            Diese Seite konnten wir nicht finden
          </h1>

          <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-neutral-600">
            Die von Ihnen aufgerufene Seite existiert nicht oder wurde verschoben. Kein Problem &ndash;
            hier geht es zurück zu unseren Leistungen.
          </p>

          {/* Primary actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group w-full bg-brand-blue text-white shadow-md shadow-brand-blue/30 transition-transform hover:scale-105 hover:bg-brand-teal rounded-full sm:w-auto"
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
              <Link href="/angebot" className="cursor-pointer">
                <Calculator className="h-4 w-4" />
                Preis berechnen
              </Link>
            </Button>
          </div>

          {/* Service links */}
          <div className="mt-12 rounded-2xl border border-brand-blue/10 bg-white p-6 shadow-sm shadow-brand-navy/5 sm:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-teal">
              Unsere Leistungen
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex items-center justify-between rounded-lg px-4 py-3 text-left text-brand-navy transition-colors hover:bg-brand-mint hover:text-brand-blue cursor-pointer"
                >
                  <span className="font-medium">{service.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand-blue/50 transition-transform group-hover:translate-x-1 group-hover:text-brand-blue" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact hint */}
          <p className="mt-8 flex items-center justify-center gap-2 text-sm text-neutral-500">
            <Phone className="h-4 w-4 text-brand-blue" />
            Sie haben eine Frage?{" "}
            <Link
              href="/kontakt"
              className="font-semibold text-brand-blue underline-offset-4 hover:underline cursor-pointer"
            >
              Kontaktieren Sie uns
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
