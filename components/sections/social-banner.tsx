import Link from "next/link"
import { Facebook, Instagram } from "lucide-react"

export function SocialBanner() {
  return (
    <section className="px-6 pb-16 lg:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-brand-mint px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-bold text-brand-navy">
              Folgen Sie uns für Updates
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600 text-pretty">
              Auf Facebook und Instagram teilen wir regelmäßig Einblicke, Vorher-Nachher-Ergebnisse
              und Neuigkeiten rund um Blitzeblank.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link
              href="https://www.facebook.com/blitzeblank.lu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blitzeblank auf Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white transition-transform hover:scale-110 hover:bg-brand-blue"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.instagram.com/blitzeblank.lu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blitzeblank auf Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-white transition-transform hover:scale-110 hover:bg-brand-blue"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
