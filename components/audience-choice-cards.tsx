"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { audiencePath } from "@/lib/audience"
import { useAudience } from "@/components/audience-provider"
import type { Locale } from "@/lib/i18n"
import type { Audience } from "@/lib/locations"

const TEXT = {
  de: {
    privat: { title: "Privatkunden", sub: "Haus, Terrasse, Garten & Treppenhaus", cta: "Leistungen für Zuhause", alt: "Gepflegtes Einfamilienhaus mit sauberer Fassade" },
    gewerbe: { title: "Gewerbekunden", sub: "Büro, Praxis, Betrieb & Industrie", cta: "Leistungen für Unternehmen", alt: "Moderne Glasfassade eines Bürogebäudes" },
    last: "Zuletzt gewählt",
    legend: "Wählen Sie Ihre Kundengruppe",
  },
  en: {
    privat: { title: "Private customers", sub: "Home, terrace, garden & stairwell", cta: "Services for your home", alt: "Well-kept family home with a clean facade" },
    gewerbe: { title: "Business customers", sub: "Office, practice, company & industry", cta: "Services for businesses", alt: "Modern glass facade of an office building" },
    last: "Last selected",
    legend: "Choose your customer type",
  },
  fr: {
    privat: { title: "Particuliers", sub: "Maison, terrasse, jardin & cage d'escalier", cta: "Prestations pour votre domicile", alt: "Maison individuelle soignée avec façade propre" },
    gewerbe: { title: "Entreprises", sub: "Bureau, cabinet, société & industrie", cta: "Prestations pour entreprises", alt: "Façade vitrée moderne d'un immeuble de bureaux" },
    last: "Dernier choix",
    legend: "Choisissez votre type de client",
  },
}

const IMAGES: Record<Audience, string> = {
  privat: "/images/leistungen/fassadenreinigung-einfamilienhaus-gereinigt-nachher.avif",
  gewerbe: "/images/hero-glasfassade-buerogebaeude.png",
}

export function AudienceChoiceCards({ locale = "de" }: { locale?: Locale }) {
  const t = TEXT[locale]
  const { audience, selectAudience } = useAudience()
  const ids: Audience[] = ["privat", "gewerbe"]

  return (
    <div role="group" aria-label={t.legend} className="grid w-full gap-4 sm:grid-cols-2">
      {ids.map((id) => {
        const copy = t[id]
        return (
          <Link
            key={id}
            href={audiencePath(id, locale)}
            onClick={() => selectAudience(id, "hero_card")}
            className="group relative flex min-h-[8.5rem] cursor-pointer items-stretch overflow-hidden rounded-2xl bg-white text-left shadow-xl shadow-brand-navy/30 ring-1 ring-white/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-sky"
          >
            <div className="relative w-28 shrink-0 sm:w-32">
              <Image src={IMAGES[id]} alt={copy.alt} fill sizes="128px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4 sm:p-5">
              {audience === id && (
                <span className="text-[11px] font-semibold uppercase tracking-wide text-brand-blue">{t.last}</span>
              )}
              <h2 className="font-display text-xl font-extrabold text-brand-navy sm:text-2xl">{copy.title}</h2>
              <p className="text-pretty text-sm text-neutral-600">{copy.sub}</p>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue">
                {copy.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
