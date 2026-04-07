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
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
]

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Blitzeblank Logo"
                width={140}
                height={35}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Ihr Partner für professionelle Reinigungsdienstleistungen in Luxemburg. 
              Zuverlässig, gründlich und transparent.
            </p>
            <div className="pt-2">
              <Image
                src="/images/mascot.png"
                alt="Blitzeblank Waschbär"
                width={80}
                height={80}
                className="h-16 w-auto opacity-90"
              />
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Leistungen</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/80">
                  Rue de la Gare 123<br />
                  L-1234 Luxemburg
                </span>
              </li>
              <li>
                <a href="tel:+352123456789" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  +352 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@blitzeblank.lu" className="flex items-center gap-3 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  <Mail className="h-4 w-4 shrink-0" />
                  info@blitzeblank.lu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-primary-foreground/60">
              {new Date().getFullYear()} Blitzeblank. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link href="/impressum" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
