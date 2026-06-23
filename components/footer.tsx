import Link from "next/link"
import Image from "next/image"

const services = [
  { href: "/leistungen/industriereinigung", label: "Industriereinigung" },
  { href: "/leistungen/fensterreinigung", label: "Fensterreinigung" },
  { href: "/leistungen/trockeneisreinigung", label: "Trockeneisreinigung" },
  { href: "/leistungen/steinreinigung", label: "Steinreinigung" },
  { href: "/leistungen/fassadenreinigung", label: "Fassadenreinigung" },
]

const navigation = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/kontakt", label: "Kontakt" },
]

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2">
            <Link href="/" className="inline-block mb-6 cursor-pointer">
              <Image
                src="/images/logo.png"
                alt="Blitzeblank"
                width={240}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs mb-6">
              Ihr Partner für professionelle Reinigungsdienstleistungen in Luxemburg 
              und Deutschland. Zuverlässig, gründlich und transparent.
            </p>
            <Image
              src="/images/mascot.png"
              alt=""
              width={80}
              height={80}
              className="h-16 w-auto opacity-50"
            />
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">Leistungen</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                Rue de la Gare 123<br />
                L-1234 Luxemburg
              </li>
              <li>
                <a href="tel:+352123456789" className="hover:text-white transition-colors cursor-pointer">
                  +352 123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@blitzeblank.lu" className="hover:text-white transition-colors cursor-pointer">
                  info@blitzeblank.lu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-neutral-500">
            {new Date().getFullYear()} Blitzeblank. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">
              Impressum
            </Link>
            <Link href="/datenschutz" className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
