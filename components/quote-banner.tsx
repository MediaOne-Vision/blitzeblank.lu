import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calculator, ArrowRight, Clock, BadgeCheck } from "lucide-react"

interface QuoteBannerProps {
  /** Optional service slug to preselect in the wizard */
  slug?: string
  /** Optional service title to personalize the copy */
  serviceTitle?: string
}

export function QuoteBanner({ slug, serviceTitle }: QuoteBannerProps) {
  const href = slug ? `/angebot?leistung=${slug}` : "/angebot"

  return (
    <section className="px-6 py-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-8 py-10 sm:px-12 sm:py-12">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-brand-sky/20 blur-3xl animate-float" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-brand-sky ring-1 ring-white/15 backdrop-blur">
                <Calculator className="h-4 w-4" />
                Preisrechner
              </span>
              <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {serviceTitle
                  ? `Kostenloses Angebot für ${serviceTitle}`
                  : "Berechnen Sie Ihr kostenloses Angebot"}
              </h2>
              <p className="mt-3 text-pretty text-white/70">
                In nur wenigen Schritten zu Ihrem unverbindlichen Richtpreis - inklusive
                Mengenrabatten für regelmäßige Reinigung.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-brand-sky" />
                  In 2 Minuten erledigt
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-brand-sky" />
                  Unverbindlich &amp; kostenlos
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="group shrink-0 rounded-full bg-brand-blue px-8 text-white shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105 hover:bg-brand-teal"
            >
              <Link href={href} className="cursor-pointer">
                Jetzt Preis berechnen
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
