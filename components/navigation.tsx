"use client"

import Link from "@/components/audience-link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, ChevronDown, Phone, Calculator, Mountain, House, Building2, ArrowRight, type LucideIcon } from "lucide-react"
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n"
import { getLocalizedServices } from "@/lib/services"
import { getAudienceLabel, type Audience } from "@/lib/locations"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useAudience } from "@/components/audience-provider"
import { withAudienceQuery } from "@/lib/audience"

const NAV_LINKS = {
  de: [
    { href: "/leistungen", label: "Leistungen" },
    { href: "/stein-angebot", label: "Steinpflege-Rechner" },
    { href: "/ueber-uns", label: "Über uns" },
  ],
  en: [
    { href: "/leistungen", label: "Services" },
    { href: "/ueber-uns", label: "About Us" },
  ],
  fr: [
    { href: "/leistungen", label: "Prestations" },
    { href: "/ueber-uns", label: "À propos" },
  ],
}

const AUDIENCE_ORDER: Audience[] = ["privat", "gewerbe"]

const AUDIENCE_ICONS: Record<Audience, LucideIcon> = {
  privat: House,
  gewerbe: Building2,
}

const TEXT = {
  de: {
    quote: "Preis berechnen",
    contact: "Kontakt",
    contactFull: "Kontakt aufnehmen",
    menu: "Menü",
    allServices: "Alle Leistungen ansehen",
    onlyGermany: "nur Deutschland",
  },
  en: {
    quote: "Calculate Price Instantly",
    contact: "Contact",
    contactFull: "Get in Touch",
    menu: "Menu",
    allServices: "View all services",
    onlyGermany: "Germany only",
  },
  fr: {
    quote: "Calculer le prix",
    contact: "Contact",
    contactFull: "Nous contacter",
    menu: "Menu",
    allServices: "Voir toutes les prestations",
    onlyGermany: "Allemagne uniquement",
  },
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const navLinks = NAV_LINKS[locale].map((l) => ({ ...l, href: localizeHref(l.href, locale) }))
  const localizedServices = getLocalizedServices(locale)
  const t = TEXT[locale]
  const { audience } = useAudience()
  const serviceGroups = AUDIENCE_ORDER.filter((id) => !audience || id === audience).map((id) => ({
    audience: id,
    label: getAudienceLabel(id, locale),
    icon: AUDIENCE_ICONS[id],
    services: localizedServices.filter((service) => service.audiences.includes(id)),
  }))
  const singleGroup = serviceGroups.length === 1
  const angebotHref = withAudienceQuery(localizeHref("/angebot", locale), audience)
  const kontaktHref = withAudienceQuery(localizeHref("/kontakt", locale), audience)

  const isActive = (href: string) => {
    if (href === "/" || href === "/en" || href === "/fr") return pathname === href
    if (href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  const isHome = pathname === localizeHref("/", locale)
  const transparent = isHome && !scrolled

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-brand-blue/10 bg-white/90 shadow-sm backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <Link href={localizeHref("/", locale)} className="shrink-0 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank"
            width={220}
            height={55}
            className={cn("h-9 w-auto sm:h-11 lg:h-12", transparent && "brightness-0 invert")}
            priority
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {navLinks.map((link) =>
            link.href === localizeHref("/leistungen", locale) ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                    isActive(link.href)
                      ? transparent
                        ? "bg-white/15 text-white"
                        : "bg-brand-blue/10 text-brand-blue"
                      : transparent
                        ? "text-white/90 hover:bg-white/10 hover:text-white"
                        : "text-neutral-600 hover:bg-brand-mint hover:text-brand-blue",
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-200">
                  <div
                    className={cn(
                      "overflow-hidden rounded-xl border border-brand-blue/10 bg-white shadow-xl shadow-brand-navy/5",
                      singleGroup ? "w-[300px]" : "w-[540px]",
                    )}
                  >
                    <div className={cn("grid divide-x divide-brand-blue/10", singleGroup ? "grid-cols-1" : "grid-cols-2")}>
                      {serviceGroups.map((group) => {
                        const GroupIcon = group.icon
                        return (
                          <div key={group.audience} className="p-3">
                            <div className="mb-2 flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                              <GroupIcon className="h-4 w-4" aria-hidden="true" />
                              {group.label}
                            </div>
                            <ul className="flex flex-col">
                              {group.services.map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={service.href}
                                    className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-brand-mint hover:text-brand-blue cursor-pointer"
                                  >
                                    <span>{service.title}</span>
                                    {service.locations.length === 1 && service.locations[0] === "de" && (
                                      <span className="shrink-0 rounded-full bg-brand-mint px-2 py-0.5 text-[11px] font-medium text-brand-blue">
                                        DE
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between border-t border-brand-blue/10 bg-brand-mint/60 px-6 py-3 text-sm font-medium text-brand-blue transition-colors hover:bg-brand-mint cursor-pointer"
                    >
                      {t.allServices}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  isActive(link.href)
                    ? transparent
                      ? "bg-white/15 text-white"
                      : "bg-brand-blue/10 text-brand-blue"
                    : transparent
                      ? "text-white/90 hover:bg-white/10 hover:text-white"
                      : "text-neutral-600 hover:bg-brand-mint hover:text-brand-blue",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
          <Button
            asChild
            size="sm"
            variant="outline"
            className={cn(
              "group rounded-full px-4",
              transparent
                ? "border-transparent bg-white text-brand-blue hover:bg-white/90 hover:text-brand-blue"
                : "border-brand-blue/30 text-brand-blue hover:bg-brand-mint hover:text-brand-blue",
            )}
          >
            <Link href={angebotHref} className="cursor-pointer">
              <Calculator className="h-4 w-4" />
              {t.quote}
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="group bg-brand-blue hover:bg-brand-teal text-white rounded-full px-5 shadow-md shadow-brand-blue/30 transition-transform hover:scale-105"
          >
            <Link href={kontaktHref} className="cursor-pointer">
              <Phone className="h-4 w-4" />
              {t.contact}
            </Link>
          </Button>
          <LanguageSwitcher />
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 shrink-0 rounded-full",
                transparent
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : "text-brand-navy hover:bg-brand-mint hover:text-brand-blue",
              )}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] max-w-[85vw] bg-white p-0">
            <SheetTitle className="sr-only">{t.menu}</SheetTitle>
            <div className="flex h-full flex-col">
              {/* Header inside sheet */}
              <div className="flex items-center justify-between border-b border-brand-blue/10 px-6 py-5">
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank"
                  width={180}
                  height={45}
                  className="h-9 w-auto"
                />
                <LanguageSwitcher />
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5">
                {navLinks.map((link) =>
                  link.href === localizeHref("/leistungen", locale) ? (
                    <div key={link.href} className="flex flex-col">
                      <Link
                        href={link.href}
                        className={cn(
                          "rounded-lg px-3 py-2.5 font-medium transition-colors cursor-pointer",
                          isActive(link.href)
                            ? "bg-brand-blue/10 text-brand-blue"
                            : "text-brand-navy hover:bg-brand-mint",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="ml-3 mt-2 flex flex-col gap-4 border-l-2 border-brand-blue/15 pl-3">
                        {serviceGroups.map((group) => {
                          const GroupIcon = group.icon
                          return (
                            <div key={group.audience} className="flex flex-col gap-0.5">
                              <div className="flex items-center gap-2 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                                <GroupIcon className="h-4 w-4" aria-hidden="true" />
                                {group.label}
                              </div>
                              {group.services.map((service) => (
                                <Link
                                  key={service.slug}
                                  href={service.href}
                                  className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-brand-mint hover:text-brand-blue transition-colors cursor-pointer"
                                  onClick={() => setOpen(false)}
                                >
                                  <span>{service.title}</span>
                                  {service.locations.length === 1 && service.locations[0] === "de" && (
                                    <span className="shrink-0 rounded-full bg-brand-mint px-2 py-0.5 text-[11px] font-medium text-brand-blue">
                                      DE
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2.5 font-medium transition-colors cursor-pointer",
                        isActive(link.href)
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "text-brand-navy hover:bg-brand-mint",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {link.href === angebotHref && <Calculator className="h-4 w-4 shrink-0" />}
                      {link.href === localizeHref("/stein-angebot", locale) && <Mountain className="h-4 w-4 shrink-0" />}
                      {link.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="border-t border-brand-blue/10 p-4">
                <Button
                  asChild
                  className="w-full bg-brand-blue hover:bg-brand-teal text-white rounded-full shadow-md shadow-brand-blue/30"
                >
                  <Link href={kontaktHref} onClick={() => setOpen(false)}>
                    <Phone className="h-4 w-4" />
                    {t.contactFull}
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
