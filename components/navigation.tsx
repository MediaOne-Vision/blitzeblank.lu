"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, ChevronDown, Phone, Calculator, Mountain } from "lucide-react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n"

const NAV_LINKS = {
  de: [
    { href: "/", label: "Startseite" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/angebot", label: "Angebot" },
    { href: "/stein-angebot", label: "Steinpflege-Rechner" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Services" },
    { href: "/angebot", label: "Get a Quote" },
    { href: "/ueber-uns", label: "About Us" },
    { href: "/kontakt", label: "Contact" },
  ],
}

const SERVICE_LINKS = {
  de: [
    { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
    { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
    { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
    { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
  ],
  en: [
    { href: "/leistungen/industriereinigung", label: "Industrial Cleaning" },
    { href: "/leistungen/fensterreinigung", label: "Window Cleaning" },
    { href: "/leistungen/steinreinigung", label: "Stone Cleaning" },
    { href: "/leistungen/fassadenreinigung", label: "Facade Cleaning" },
  ],
}

const TEXT = {
  de: { quote: "Preis sofort berechnen", contact: "Kontakt", contactFull: "Kontakt aufnehmen", menu: "Menü" },
  en: { quote: "Calculate Price Instantly", contact: "Contact", contactFull: "Get in Touch", menu: "Menu" },
}

export function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const navLinks = NAV_LINKS[locale].map((l) => ({ ...l, href: localizeHref(l.href, locale) }))
  const serviceLinks = SERVICE_LINKS[locale].map((l) => ({ ...l, href: localizeHref(l.href, locale) }))
  const t = TEXT[locale]
  const angebotHref = localizeHref("/angebot", locale)
  const kontaktHref = localizeHref("/kontakt", locale)

  const isActive = (href: string) => {
    if (href === "/" || href === "/en") return pathname === href
    if (href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-blue/10 shadow-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        {/* Logo */}
        <Link href={localizeHref("/", locale)} className="shrink-0 cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank"
            width={220}
            height={55}
            className="h-9 w-auto sm:h-11 lg:h-12"
            priority
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.href === localizeHref("/leistungen", locale) ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                    isActive(link.href)
                      ? "bg-brand-blue/10 text-brand-blue"
                      : "text-neutral-600 hover:bg-brand-mint hover:text-brand-blue",
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="bg-white border border-brand-blue/10 rounded-xl shadow-xl shadow-brand-navy/5 p-2 min-w-[210px]">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block rounded-lg px-3 py-2 text-sm text-neutral-600 hover:text-brand-blue hover:bg-brand-mint transition-colors cursor-pointer"
                      >
                        {service.label}
                      </Link>
                    ))}
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
                    ? "bg-brand-blue/10 text-brand-blue"
                    : "text-neutral-600 hover:bg-brand-mint hover:text-brand-blue",
                )}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="group border-brand-blue/30 text-brand-blue hover:bg-brand-mint hover:text-brand-blue rounded-full px-4"
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
              className="h-10 w-10 shrink-0 rounded-full text-brand-navy hover:bg-brand-mint hover:text-brand-blue"
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
                      <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l-2 border-brand-blue/15 pl-3">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-brand-mint hover:text-brand-blue transition-colors cursor-pointer"
                            onClick={() => setOpen(false)}
                          >
                            {service.label}
                          </Link>
                        ))}
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
