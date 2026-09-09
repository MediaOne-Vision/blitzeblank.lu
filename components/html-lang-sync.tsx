"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"

/**
 * Keeps the <html lang> attribute in sync with the current locale.
 * The root layout can only render one static <html> tag, so this
 * updates it client-side whenever the route changes.
 */
export function HtmlLangSync() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.lang = getLocaleFromPathname(pathname)
  }, [pathname])

  return null
}
