"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { audiencePath } from "@/lib/audience"
import { useAudience } from "@/components/audience-provider"
import type { Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const TEXT = {
  de: { privat: "Für Privatkunden", gewerbe: "Für Gewerbekunden", legend: "Wählen Sie Ihre Kundengruppe" },
  en: { privat: "For private customers", gewerbe: "For business customers", legend: "Choose your customer type" },
  fr: { privat: "Pour les particuliers", gewerbe: "Pour les entreprises", legend: "Choisissez votre type de client" },
}

export function AudienceChoiceCards({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const { selectAudience } = useAudience()

  return (
    <div role="group" aria-label={t.legend} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
      <Button asChild size="lg" className="group w-full rounded-full bg-brand-blue px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-brand-blue/40 hover:bg-brand-teal sm:w-auto">
        <Link href={audiencePath("privat", locale)} onClick={() => selectAudience("privat", "hero_card")} className="cursor-pointer">
          {t.privat}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="w-full rounded-full border-2 border-white bg-transparent px-7 text-sm font-semibold uppercase tracking-[0.08em] text-white hover:bg-white/10 hover:text-white sm:w-auto">
        <Link href={audiencePath("gewerbe", locale)} onClick={() => selectAudience("gewerbe", "hero_card")} className="cursor-pointer">
          {t.gewerbe}
        </Link>
      </Button>
    </div>
  )
}
