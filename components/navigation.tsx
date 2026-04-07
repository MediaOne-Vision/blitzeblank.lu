"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Phone, ChevronDown, Building2, Droplets, Wind, Gem, Building, ArrowRight } from "lucide-react"

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
]

const serviceLinks = [
  { href: "/leistungen/industriereinigung", label: "Industriereinigung", description: "Professionelle Reinigung für Produktionsstätten", icon: Building2 },
  { href: "/leistungen/fensterreinigung", label: "Fensterreinigung", description: "Streifenfreie Glasreinigung in jeder Höhe", icon: Droplets },
  { href: "/leistungen/trockeneisreinigung", label: "Trockeneisreinigung", description: "Schonende Reinigung ohne Rückstände", icon: Wind },
  { href: "/leistungen/steinreinigung", label: "Steinreinigung", description: "Aufwertung von Stein- und Pflasterflächen", icon: Gem },
  { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung", description: "Strahlende Gebäudefronten", icon: Building },
]

export function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container mx-auto flex h-18 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <Image
            src="/images/logo.png"
            alt="Blitzeblank Logo"
            width={160}
            height={40}
            className="h-9 w-auto transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => 
            link.label === "Leistungen" ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground cursor-pointer rounded-full hover:bg-muted/50"
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                {/* Modern Mega Dropdown */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                  <div className="w-[480px] rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/10">
                    <div className="grid gap-1">
                      {serviceLinks.map((service) => {
                        const Icon = service.icon
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="group/item flex items-start gap-4 rounded-xl p-3 transition-all hover:bg-muted/70 cursor-pointer"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">{service.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <Link 
                        href="/leistungen" 
                        className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                      >
                        Alle Leistungen ansehen
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground cursor-pointer rounded-full hover:bg-muted/50"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <a href="tel:+352123456789" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span className="hidden xl:inline">+352 123 456 789</span>
          </a>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-5 shadow-lg shadow-accent/25 transition-all hover:shadow-accent/40 hover:scale-105">
            <Link href="/kontakt" className="cursor-pointer">Termin anfragen</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm border-l-0 bg-background/95 backdrop-blur-xl">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-8 pt-6">
              <Link href="/" className="flex items-center cursor-pointer" onClick={() => setOpen(false)}>
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank Logo"
                  width={140}
                  height={35}
                  className="h-8 w-auto"
                />
              </Link>
              
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => 
                  link.label === "Leistungen" ? (
                    <div key={link.href} className="flex flex-col gap-2">
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-foreground rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                      <div className="flex flex-col gap-1 ml-4 pl-4 border-l-2 border-primary/20">
                        {serviceLinks.map((service) => {
                          const Icon = service.icon
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                              onClick={() => setOpen(false)}
                            >
                              <Icon className="h-4 w-4 text-primary" />
                              {service.label}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-foreground rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
              
              <div className="flex flex-col gap-4 pt-6 mt-auto border-t border-border/50">
                <a href="tel:+352123456789" className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <Phone className="h-4 w-4" />
                  </div>
                  +352 123 456 789
                </a>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-12 shadow-lg shadow-accent/25">
                  <Link href="/kontakt" onClick={() => setOpen(false)} className="cursor-pointer">Termin anfragen</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
