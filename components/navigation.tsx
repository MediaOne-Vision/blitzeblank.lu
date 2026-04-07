"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronDown, ArrowUpRight } from "lucide-react"

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
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
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-4 mt-4 flex items-center justify-between rounded-full border border-border/40 bg-background/70 px-4 py-3 backdrop-blur-xl lg:mx-8 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer group">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank Logo"
            width={140}
            height={35}
            className="h-7 w-auto transition-all duration-300 group-hover:opacity-70"
            priority
          />
        </Link>

        {/* Desktop Navigation - Center */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => 
            link.label === "Leistungen" ? (
              <div key={link.href} className="relative group">
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                </button>
                {/* Minimal Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="min-w-[200px] rounded-2xl border border-border/40 bg-background/95 backdrop-blur-xl p-2 shadow-xl">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground rounded-xl transition-colors hover:bg-muted hover:text-foreground cursor-pointer group/item"
                      >
                        {service.label}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 translate-y-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0" />
                      </Link>
                    ))}
                    <div className="my-2 border-t border-border/40" />
                    <Link
                      href="/leistungen"
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-primary rounded-xl transition-colors hover:bg-primary/5 cursor-pointer"
                    >
                      Alle Leistungen
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/90 transition-all">
            <Link href="/kontakt" className="cursor-pointer">Kontakt</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-auto border-b border-border/40 bg-background/95 backdrop-blur-xl rounded-b-3xl">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-6 py-8">
              <Link href="/" className="flex justify-center cursor-pointer" onClick={() => setOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank Logo"
                  width={120}
                  height={30}
                  className="h-7 w-auto"
                />
              </Link>
              
              <div className="flex flex-col items-center gap-1">
                {navLinks.map((link) => 
                  link.label === "Leistungen" ? (
                    <div key={link.href} className="flex flex-col items-center w-full">
                      <Link
                        href={link.href}
                        className="px-4 py-3 text-lg text-foreground cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="flex flex-wrap justify-center gap-2 px-4 pb-3">
                        {serviceLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="px-3 py-1.5 text-xs text-muted-foreground border border-border/40 rounded-full hover:bg-muted cursor-pointer"
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
                      className="px-4 py-3 text-lg text-foreground cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              
              <div className="flex justify-center pt-4">
                <Button asChild className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/90">
                  <Link href="/kontakt" onClick={() => setOpen(false)} className="cursor-pointer">Kontakt aufnehmen</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
