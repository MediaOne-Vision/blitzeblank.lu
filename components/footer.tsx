import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

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
  { href: "/ueber-uns", label: "Uber uns" },
  { href: "/kontakt", label: "Kontakt" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Logo & Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link href="/" className="inline-block cursor-pointer mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Blitzeblank Logo"
                  width={140}
                  height={35}
                  className="h-8 w-auto brightness-0 invert"
                />
              </Link>
              <p className="text-sm text-background/60 mb-4">
                Ihr Partner fur professionelle Reinigungsdienstleistungen in Luxemburg.
              </p>
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbar"
                width={60}
                height={60}
                className="h-14 w-auto opacity-70"
              />
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-background mb-4">Navigation</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-background mb-4">Leistungen</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-background mb-4">Kontakt</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-background/60 mt-0.5 shrink-0" />
                  <span className="text-sm text-background/60">
                    Rue de la Gare 123<br />
                    L-1234 Luxemburg
                  </span>
                </li>
                <li>
                  <a href="tel:+352123456789" className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                    <Phone className="h-4 w-4 shrink-0" />
                    +352 123 456 789
                  </a>
                </li>
                <li>
                  <a href="mailto:info@blitzeblank.lu" className="flex items-center gap-3 text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                    <Mail className="h-4 w-4 shrink-0" />
                    info@blitzeblank.lu
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
