"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Phone, ChevronDown } from "lucide-react"

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Uber uns" },
  { href: "/kontakt", label: "Kontakt" },
]

const serviceLinks = [
  { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
  { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
  { href: "/leistungen/trockeneisreinigung", label: "Trockeneisreinigung" },
  { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
  { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank Logo"
            width={150}
            height={38}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => 
            link.label === "Leistungen" ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>
                {/* Dropdown */}
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="min-w-[200px] rounded-lg border border-border bg-background p-2 shadow-lg">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
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
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:+352123456789" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
            <Phone className="h-4 w-4" />
            +352 123 456 789
          </a>
          <Button asChild>
            <Link href="/kontakt" className="cursor-pointer">
              Kostenlose Beratung
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu offnen</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xs">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="cursor-pointer" onClick={() => setOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank Logo"
                  width={130}
                  height={32}
                  className="h-7 w-auto"
                />
              </Link>
              
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => 
                  link.label === "Leistungen" ? (
                    <div key={link.href} className="flex flex-col">
                      <Link
                        href={link.href}
                        className="py-2 text-base font-medium text-foreground cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="ml-4 flex flex-col gap-1 border-l border-border pl-4">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="py-1.5 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
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
                      className="py-2 text-base font-medium text-foreground cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <a href="tel:+352123456789" className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                  <Phone className="h-4 w-4" />
                  +352 123 456 789
                </a>
                <Button asChild className="w-full">
                  <Link href="/kontakt" onClick={() => setOpen(false)}>
                    Kostenlose Beratung
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
