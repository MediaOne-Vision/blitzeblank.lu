import Image from "next/image"
import { Reveal } from "@/components/reveal"

const photos = [
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
]

export function InActionSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-blue">Im Einsatz</p>
          <h2 className="text-balance font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-brand-navy">
            Echte Arbeit, echtes Team
          </h2>
          <p className="mt-4 text-neutral-600 text-pretty leading-relaxed">
            Keine gestellten Fotos: So sieht unser Team bei der täglichen Arbeit aus - mit
            professioneller Ausrüstung und dem Blick fürs Detail.
          </p>
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
