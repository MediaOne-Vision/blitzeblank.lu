import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-medium text-neutral-900 mb-4">
            Sprechen Sie mit uns uber Ihr Projekt
          </h2>
          <p className="text-neutral-600 max-w-xl mx-auto mb-8">
            Kontaktieren Sie uns fur eine kostenlose und unverbindliche Beratung. 
            Wir erstellen Ihnen ein massgeschneidertes Angebot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-neutral-900 hover:bg-neutral-800 text-white rounded-full px-8">
              <Link href="/kontakt" className="cursor-pointer">
                Kontakt aufnehmen
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-neutral-300 text-neutral-900 hover:bg-neutral-50 rounded-full px-8">
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
