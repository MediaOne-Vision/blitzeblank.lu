import type { Locale } from "@/lib/i18n"

const VALUES = {
  de: ["Antwort innerhalb von 24 Stunden", "Kostenlose Besichtigung vor Ort", "Transparente, faire Preise", "Qualitätsgarantie inklusive"],
  en: ["We reply within 24 hours", "Free on-site visit", "Transparent, fair pricing", "Quality guarantee included"],
}

export function TrustBar({ locale = "de" }: { locale?: Locale }) {
  const values = VALUES[locale]
  return (
    <section className="bg-white py-6">
      <div className="mx-auto max-w-6xl px-6">
        <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-sm text-neutral-600 sm:justify-between sm:gap-x-6 sm:text-[0.95rem]">
          {values.map((value, i) => (
            <li key={value} className="flex items-center gap-x-3 sm:gap-x-6">
              <span className="text-balance">{value}</span>
              {i < values.length - 1 && <span className="hidden h-1 w-1 rounded-full bg-brand-blue/40 sm:block" aria-hidden="true" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
