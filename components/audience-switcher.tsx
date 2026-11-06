"use client"

import { usePathname, useRouter } from "next/navigation"
import { House, Building2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLocaleFromPathname } from "@/lib/i18n"
import { AUDIENCE_IDS, AUDIENCE_UI, audiencePath, getAudienceRoute } from "@/lib/audience"
import { useAudience } from "@/components/audience-provider"
import type { Audience } from "@/lib/locations"

const ICONS = { privat: House, gewerbe: Building2 }

/**
 * Umschalter Privat / Gewerbe für die Kopfzeile.
 * Auf Startseite, Zielgruppen-Seiten und Leistungen, die nur eine Gruppe betreffen, wird
 * zur passenden Seite navigiert (clientseitig, ohne Neuladen). Überall sonst wird nur die
 * Auswahl umgestellt – Formulare und Hinweise passen sich an.
 */
export function AudienceSwitcher({ transparent = false, className }: { transparent?: boolean; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const locale = getLocaleFromPathname(pathname)
  const { audience, selectAudience } = useAudience()
  const t = AUDIENCE_UI[locale]
  const route = getAudienceRoute(pathname)
  const navigates = route.kind !== "other"

  const choose = (value: Audience) => {
    selectAudience(value, "header_switcher")
    if (navigates && !(route.kind === "audience-page" && route.audience === value)) {
      router.push(audiencePath(value, locale))
    }
  }

  return (
    <div
      role="group"
      aria-label={t.switcher}
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-sm font-medium",
        transparent ? "bg-white/15 ring-1 ring-white/25" : "bg-brand-mint ring-1 ring-brand-blue/15",
        className,
      )}
    >
      {AUDIENCE_IDS.map((id) => {
        const Icon = ICONS[id]
        const active = audience === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => choose(id)}
            aria-pressed={active}
            className={cn(
              "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors",
              active
                ? transparent
                  ? "bg-white text-brand-blue shadow-sm"
                  : "bg-brand-blue text-white shadow-sm"
                : transparent
                  ? "text-white/90 hover:bg-white/10"
                  : "text-neutral-600 hover:text-brand-blue",
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {t[id]}
          </button>
        )
      })}
    </div>
  )
}
