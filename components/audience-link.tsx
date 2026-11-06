"use client"

import NextLink from "next/link"
import { usePathname } from "next/navigation"
import type { ComponentProps } from "react"
import { useAudience } from "@/components/audience-provider"
import { audienceHref } from "@/lib/audience"
import { getLocaleFromPathname, stripLocalePrefix } from "@/lib/i18n"

type LinkProps = ComponentProps<typeof NextLink>

/**
 * Drop-in-Ersatz für next/link. Interne Links innerhalb von /privatkunden bzw. /gewerbekunden
 * (und /en, /fr davon) bleiben automatisch in der jeweiligen Zielgruppe. Auf neutralen Seiten
 * und bei Seiten ohne Zielgruppen-Version verhält er sich wie ein normaler Link.
 */
export default function Link({ href, ...props }: LinkProps) {
  const pathname = usePathname()
  const { audience } = useAudience()

  if (typeof href !== "string" || !href.startsWith("/") || !audience) {
    return <NextLink href={href} {...props} />
  }

  const locale = getLocaleFromPathname(pathname)
  const canonical = stripLocalePrefix(href)
  return <NextLink href={audienceHref(canonical, audience, locale)} {...props} />
}
