"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { GalleryImage } from "@/lib/service-media"

interface GalleryCarouselProps {
  images: GalleryImage[]
}

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [lightbox, setLightbox] = useState(false)
  const [current, setCurrent] = useState(0)
  const count = images.length

  const goTo = useCallback((i: number) => setCurrent(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const open = (i: number) => {
    setCurrent(i)
    setLightbox(true)
  }

  // Keyboard controls while lightbox is open
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false)
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightbox, next, prev])

  if (count === 0) return null

  // Bilder verdoppeln für eine nahtlose, endlose Laufschleife
  const looped = [...images, ...images]

  return (
    <div>
      {/* Endlos durchlaufende Bilderleiste */}
      <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <ul className="animate-marquee flex w-max items-center gap-4 py-2">
          {looped.map((img, i) => (
            <li key={`${img.src}-${i}`} className="shrink-0">
              <button
                type="button"
                onClick={() => open(i % count)}
                aria-label={`${img.alt} – vergrößern`}
                className="group/item relative block h-28 w-44 overflow-hidden rounded-xl shadow-sm ring-1 ring-brand-navy/5 transition-all duration-300 hover:z-10 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:h-32 sm:w-52"
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  sizes="208px"
                  className="object-cover transition-transform duration-300 group-hover/item:scale-105"
                />
                <span className="absolute inset-0 bg-brand-navy/20 opacity-100 transition-opacity duration-300 group-hover/item:opacity-0" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-navy/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="Schließen"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
              <Image
                src={images[current].src || "/placeholder.svg"}
                alt={images[current].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm text-white/80">{images[current].alt}</p>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Vorheriges Bild"
                  className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:-left-16"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Nächstes Bild"
                  className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:-right-16"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
