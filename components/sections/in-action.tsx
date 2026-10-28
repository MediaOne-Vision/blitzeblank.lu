import Image from "next/image"
import { Reveal } from "@/components/reveal"
import type { Locale } from "@/lib/i18n"

const PHOTOS = {
  de: [
    {
      src: "/images/einsatz/blitzeblank-mitarbeiter-pergola-hochdruckreinigung.avif",
      alt: "Blitzeblank Mitarbeiter reinigt ein Pergola-Dach mit der Hochdruck-Teleskoplanze",
      caption: "Hochdruckreinigung einer Terrassenüberdachung",
    },
    {
      src: "/images/einsatz/blitzeblank-terrassenreinigung-flaechenreiniger-einsatz.avif",
      alt: "Blitzeblank Mitarbeiter reinigt Terrassenplatten mit einem Flächenreiniger",
      caption: "Flächenreinigung einer Terrasse",
    },
    {
      src: "/images/einsatz/blitzeblank-team-firmenshirt-reinigungseinsatz.avif",
      alt: "Blitzeblank Teammitglied im Firmenshirt mit Waschbär-Logo beim Reinigungseinsatz",
      caption: "Unser Team im täglichen Einsatz",
    },
  ],
  en: [
    {
      src: "/images/einsatz/blitzeblank-mitarbeiter-pergola-hochdruckreinigung.avif",
      alt: "Blitzeblank employee cleaning a pergola roof with a high-pressure telescopic lance",
      caption: "Pressure washing of a patio cover",
    },
    {
      src: "/images/einsatz/blitzeblank-terrassenreinigung-flaechenreiniger-einsatz.avif",
      alt: "Blitzeblank employee cleaning terrace slabs with a surface cleaner",
      caption: "Surface cleaning of a terrace",
    },
    {
      src: "/images/einsatz/blitzeblank-team-firmenshirt-reinigungseinsatz.avif",
      alt: "Blitzeblank team member in a company shirt with raccoon logo during a cleaning job",
      caption: "Our team at work every day",
    },
  ],
  fr: [
    {
      src: "/images/einsatz/blitzeblank-mitarbeiter-pergola-hochdruckreinigung.avif",
      alt: "Employé de Blitzeblank nettoyant un toit de pergola avec une lance télescopique haute pression",
      caption: "Nettoyage haute pression d'une couverture de terrasse",
    },
    {
      src: "/images/einsatz/blitzeblank-terrassenreinigung-flaechenreiniger-einsatz.avif",
      alt: "Employé de Blitzeblank nettoyant des dalles de terrasse avec un nettoyeur de surface",
      caption: "Nettoyage de surface d'une terrasse",
    },
    {
      src: "/images/einsatz/blitzeblank-team-firmenshirt-reinigungseinsatz.avif",
      alt: "Membre de l'équipe Blitzeblank en t-shirt d'entreprise avec logo de raton laveur lors d'une intervention de nettoyage",
      caption: "Notre équipe au travail au quotidien",
    },
  ],
}

const TEXT = {
  de: {
    eyebrow: "Im Einsatz",
    heading: "Echte Arbeit, echtes Team",
    body: "Keine gestellten Fotos: So sieht unser Team bei der täglichen Arbeit aus - mit professioneller Ausrüstung und dem Blick fürs Detail.",
  },
  en: {
    eyebrow: "On the Job",
    heading: "Real Work, Real Team",
    body: "No staged photos: this is what our team looks like at work every day - with professional equipment and an eye for detail.",
  },
  fr: {
    eyebrow: "En action",
    heading: "Du vrai travail, une vraie équipe",
    body: "Pas de photos mises en scène : voici à quoi ressemble notre équipe au travail au quotidien - avec un équipement professionnel et le sens du détail.",
  },
}

export function InActionSection({ locale = "de" }: { locale?: Locale }) {
  const photos = PHOTOS[locale]
  const t = TEXT[locale]
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">{t.eyebrow}</p>
          <h2 className="text-balance font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-navy">
            {t.heading}
          </h2>
          <p className="mt-4 text-neutral-600 text-pretty leading-relaxed">{t.body}</p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo, i) => (
            <Reveal
              key={photo.src}
              direction="up"
              delay={i * 100}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-sm ring-1 ring-brand-navy/5">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm font-medium text-white">
                  {photo.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
