"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, getPathForLocale, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#262626" />
      <rect y="6.66" width="30" height="6.67" fill="#dd0000" />
      <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
    </svg>
  )
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0 30 20M30 0 0 20" stroke="#c8102e" strokeWidth="1.2" />
      <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="4.2" />
      <path d="M15 0V20M0 10H30" stroke="#c8102e" strokeWidth="2.2" />
    </svg>
  )
}

function FlagFR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="10" height="20" fill="#0055a4" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#ef4135" />
    </svg>
  )
}

const OPTIONS: { locale: Locale; label: string; Flag: typeof FlagDE }[] = [
  { locale: "de", label: "Deutsch", Flag: FlagDE },
  { locale: "en", label: "English", Flag: FlagGB },
  { locale: "fr", label: "Français", Flag: FlagFR },
]

/** Sprachumschalter mit Flaggen. Verlinkt zur Entsprechung der aktuellen Seite in der jeweiligen Sprache. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname() ?? "/"
  const current = getLocaleFromPathname(pathname)

  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-brand-blue/15 bg-white/60 p-1", className)}>
      {OPTIONS.map(({ locale, label, Flag }) => (
        <Link
          key={locale}
          href={getPathForLocale(pathname, locale)}
          hrefLang={locale}
          lang={locale}
          aria-label={label}
          aria-current={current === locale ? "true" : undefined}
          className={cn(
            "flex h-6 w-8 items-center justify-center overflow-hidden rounded-full transition-opacity cursor-pointer",
            current === locale ? "ring-2 ring-brand-blue" : "opacity-40 hover:opacity-80",
          )}
        >
          <Flag className="h-full w-full object-cover" />
        </Link>
      ))}
    </div>
  )
}
