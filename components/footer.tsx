import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram } from "lucide-react"
import { CookieSettingsLink } from "@/components/cookie-settings-link"
import { localizeHref, type Locale } from "@/lib/i18n"

const SERVICES = {
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

const NAVIGATION = {
  de: [
    { href: "/", label: "Startseite" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/angebot", label: "Kostenloses Angebot" },
    { href: "/stein-angebot", label: "Steinpflege-Rechner" },
    { href: "/ueber-uns", label: "Über uns" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Services" },
    { href: "/angebot", label: "Free Quote" },
    { href: "/ueber-uns", label: "About Us" },
    { href: "/kontakt", label: "Contact" },
  ],
}

const TEXT = {
  de: {
    tagline:
      "Ihr Partner für professionelle Reinigungsdienstleistungen in Luxemburg, Trier, Bitburg und der Region. Zuverlässig, gründlich und transparent.",
    navHeading: "Navigation",
    servicesHeading: "Leistungen",
    contactHeading: "Kontakt",
    rights: "Alle Rechte vorbehalten.",
    impressum: "Impressum",
    datenschutz: "Datenschutz",
  },
  en: {
    tagline:
      "Your partner for professional cleaning services in Luxembourg, Trier, Bitburg and the surrounding region. Reliable, thorough and transparent.",
    navHeading: "Navigation",
    servicesHeading: "Services",
    contactHeading: "Contact",
    rights: "All rights reserved.",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
  },
}

export function Footer({ locale = "de" }: { locale?: Locale }) {
  const services = SERVICES[locale].map((s) => ({ ...s, href: localizeHref(s.href, locale) }))
  const navigation = NAVIGATION[locale].map((n) => ({ ...n, href: localizeHref(n.href, locale) }))
  const t = TEXT[locale]

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2">
            <Link href={localizeHref("/", locale)} className="inline-block mb-6 cursor-pointer">
              <Image
                src="/images/logo.png"
                alt="Blitzeblank"
                width={240}
                height={60}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs mb-6">{t.tagline}</p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.facebook.com/blitzeblank.lu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blitzeblank auf Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-brand-blue hover:text-white cursor-pointer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/blitzeblank.lu/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blitzeblank auf Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-brand-blue hover:text-white cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
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
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">{t.navHeading}</h3>
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
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">{t.servicesHeading}</h3>
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
            <h3 className="font-display text-sm font-bold text-brand-sky mb-4">{t.contactHeading}</h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                6A, Rue Michel Rodange<br />
                7681 Waldbillig, Luxemburg
              </li>
              <li>
                <a href="tel:+352661830493" className="hover:text-white transition-colors cursor-pointer">
                  +352 661 830 493
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
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-neutral-500">
            {new Date().getFullYear()} Blitzeblank. {t.rights}{" "}
            <span className="block sm:inline">
              Website glänzend umgesetzt von{" "}
              <a
                href="https://mediaone-vision.de"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors cursor-pointer"
              >
                MediaOne
              </a>
            </span>
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={localizeHref("/impressum", locale)}
              className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              {t.impressum}
            </Link>
            <Link
              href={localizeHref("/datenschutz", locale)}
              className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer"
            >
              {t.datenschutz}
            </Link>
            <CookieSettingsLink className="text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
