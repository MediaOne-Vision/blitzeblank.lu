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

  const featured = Boolean(serviceTitle)

  return (
    <section className={featured ? "px-6 py-16 lg:py-24" : "px-6 py-12 lg:py-16"}>
      <div className={featured ? "mx-auto max-w-7xl" : "mx-auto max-w-6xl"}>
        <div
          className={`relative overflow-hidden rounded-3xl bg-brand-navy ${
            featured ? "px-8 py-14 sm:px-16 sm:py-20" : "px-8 py-10 sm:px-12 sm:py-12"
          }`}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand-blue/30 blur-3xl animate-float-slow" />
          <div className="absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-brand-sky/20 blur-3xl animate-float" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span
                className={`mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 font-semibold text-brand-sky ring-1 ring-white/15 backdrop-blur ${
                  featured ? "py-2 text-base" : "py-1.5 text-sm"
                }`}
              >
                <Calculator className={featured ? "h-5 w-5" : "h-4 w-4"} />
                Preisrechner
              </span>
              <h2
                className={`text-balance font-display font-extrabold tracking-tight text-white ${
                  featured ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl"
                }`}
              >
                {serviceTitle ? (
                  <>
                    Kostenloses Angebot für{" "}
                    <span className="text-brand-sky">{serviceTitle}</span>
                  </>
                ) : (
                  "Berechnen Sie Ihr kostenloses Angebot"
                )}
              </h2>
              <p className={`text-pretty text-white/70 ${featured ? "mt-5 text-lg" : "mt-3"}`}>
                In nur wenigen Schritten zu Ihrem unverbindlichen Richtpreis - inklusive
                Mengenrabatten für regelmäßige Reinigung.
              </p>
              <div
                className={`flex flex-wrap gap-x-6 gap-y-2 text-white/70 ${
                  featured ? "mt-7 text-base" : "mt-5 text-sm"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Clock className={featured ? "h-5 w-5 text-brand-sky" : "h-4 w-4 text-brand-sky"} />
                  In 2 Minuten erledigt
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className={featured ? "h-5 w-5 text-brand-sky" : "h-4 w-4 text-brand-sky"} />
                  Unverbindlich &amp; kostenlos
                </span>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className={`group shrink-0 rounded-full bg-brand-blue text-white shadow-lg shadow-brand-blue/40 transition-transform hover:scale-105 hover:bg-brand-teal ${
                featured ? "h-14 px-10 text-lg font-bold" : "px-8"
              }`}
            >
              <Link href={href} className="cursor-pointer">
                Jetzt Preis berechnen
                <ArrowRight className={`transition-transform group-hover:translate-x-1 ${featured ? "h-5 w-5" : "h-4 w-4"}`} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
