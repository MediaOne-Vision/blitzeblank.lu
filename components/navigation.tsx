"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank"
            width={140}
            height={35}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => 
            link.label === "Leistungen" ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white border border-neutral-200 rounded-lg shadow-lg py-2 min-w-[180px]">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 cursor-pointer"
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
                className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button asChild size="sm" className="bg-brand-blue hover:bg-brand-teal text-white rounded-full px-5 shadow-sm shadow-brand-blue/30">
            <Link href="/kontakt" className="cursor-pointer">
              Kontakt
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex flex-col pt-8">
              <nav className="flex flex-col">
                {navLinks.map((link) => 
                  link.label === "Leistungen" ? (
                    <div key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-3 text-neutral-900 font-medium border-b border-neutral-100 cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="py-2 pl-4 border-b border-neutral-100">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block py-2 text-sm text-neutral-500 hover:text-neutral-900 cursor-pointer"
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
                      className="py-3 text-neutral-900 font-medium border-b border-neutral-100 cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="pt-6">
                <Button asChild className="w-full bg-brand-blue hover:bg-brand-teal text-white rounded-full">
                  <Link href="/kontakt" onClick={() => setOpen(false)}>
                    Kontakt
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
