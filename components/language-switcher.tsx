"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname, getCounterpartPath } from "@/lib/i18n"
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

/** Sprachumschalter mit zwei Flaggen. Verlinkt zur Entsprechung der aktuellen Seite in der anderen Sprache. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const counterpart = getCounterpartPath(pathname ?? "/")

  return (
    <div className={cn("flex items-center gap-1 rounded-full border border-brand-blue/15 bg-white/60 p-1", className)}>
      <Link
        href={locale === "de" ? pathname ?? "/" : counterpart}
        aria-label="Deutsch"
        aria-current={locale === "de" ? "true" : undefined}
        className={cn(
          "flex h-6 w-8 items-center justify-center overflow-hidden rounded-full transition-opacity cursor-pointer",
          locale === "de" ? "ring-2 ring-brand-blue" : "opacity-40 hover:opacity-80",
        )}
      >
        <FlagDE className="h-full w-full object-cover" />
      </Link>
      <Link
        href={locale === "en" ? pathname ?? "/en" : counterpart}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        className={cn(
          "flex h-6 w-8 items-center justify-center overflow-hidden rounded-full transition-opacity cursor-pointer",
          locale === "en" ? "ring-2 ring-brand-blue" : "opacity-40 hover:opacity-80",
        )}
      >
        <FlagGB className="h-full w-full object-cover" />
      </Link>
    </div>
  )
}
