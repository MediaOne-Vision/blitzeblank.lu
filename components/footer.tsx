import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const services = [
  { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
  { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
  { href: "/leistungen/trockeneisreinigung", label: "Trockeneisreinigung" },
  { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
  { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
]

const quickLinks = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Logo & Info */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-block cursor-pointer">
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank Logo"
                  width={140}
                  height={35}
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-sm text-background/60 leading-relaxed max-w-xs">
                Ihr Partner für professionelle Reinigungsdienstleistungen in Luxemburg. 
                Zuverlässig, gründlich und transparent.
              </p>
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbär"
                width={80}
                height={80}
                className="h-20 w-auto opacity-80"
              />
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <h3 className="text-xs uppercase tracking-[0.15em] text-background/40 mb-6">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-[0.15em] text-background/40 mb-6">Leistungen</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-1 text-sm text-background/70 hover:text-background transition-colors cursor-pointer"
                    >
                      {service.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-3">
              <h3 className="text-xs uppercase tracking-[0.15em] text-background/40 mb-6">Kontakt</h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-sm text-background/70">
                    Rue de la Gare 123<br />
                    L-1234 Luxemburg
                  </p>
                </li>
                <li>
                  <a href="tel:+352123456789" className="text-sm text-background/70 hover:text-background transition-colors cursor-pointer">
                    +352 123 456 789
                  </a>
                </li>
                <li>
                  <a href="mailto:info@blitzeblank.lu" className="text-sm text-background/70 hover:text-background transition-colors cursor-pointer">
                    info@blitzeblank.lu
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-background/40">
              {new Date().getFullYear()} Blitzeblank. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-xs text-background/40 hover:text-background transition-colors cursor-pointer">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-xs text-background/40 hover:text-background transition-colors cursor-pointer">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
