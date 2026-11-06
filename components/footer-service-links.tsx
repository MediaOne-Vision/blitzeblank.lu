"use client"

import Link from "@/components/audience-link"
import { useAudience } from "@/components/audience-provider"
import { getLocalizedServices } from "@/lib/services"
import type { Locale } from "@/lib/i18n"

export function FooterServiceLinks({ locale }: { locale: Locale }) {
  const { audience } = useAudience()
  const services = getLocalizedServices(locale).filter((service) => !audience || service.audiences.includes(audience))

  return (
    <ul className="space-y-3">
      {services.map((service) => (
        <li key={service.href}>
          <Link
            href={service.href}
            className="cursor-pointer text-sm text-neutral-400 transition-colors hover:text-white"
          >
            {service.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
