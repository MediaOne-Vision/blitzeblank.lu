"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import type { GalleryImage } from "@/lib/service-media"

interface GalleryCarouselProps {
  images: GalleryImage[]
  /** auto-rotate interval in ms */
  interval?: number
}

export function GalleryCarousel({ images, interval = 4000 }: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [paused, setPaused] = useState(false)
  const count = images.length

  const goTo = useCallback((i: number) => setCurrent(((i % count) + count) % count), [count])
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-rotate, paused on hover or when lightbox is open
  useEffect(() => {
    if (count <= 1 || paused || lightbox) return
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, paused, lightbox, interval])

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

  return (
    <div>
      {/* Carousel */}
      <div
        className="relative overflow-hidden rounded-3xl shadow-sm ring-1 ring-brand-navy/5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/10] w-full">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`${img.alt} – vergrößern`}
              aria-hidden={i !== current}
              tabIndex={i === current ? 0 : -1}
              onClick={() => setLightbox(true)}
              className={`group absolute inset-0 cursor-zoom-in transition-opacity duration-700 ${
                i === current ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-brand-navy/0 transition-colors group-hover:bg-brand-navy/15" />
              <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-navy opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-5 w-5" />
              </span>
            </button>
          ))}

          {/* Caption */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/70 to-transparent p-5 pt-12">
            <p className="text-pretty text-sm font-medium text-white">{images[current].alt}</p>
          </div>
        </div>

        {/* Arrows */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Vorheriges Bild"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg ring-1 ring-brand-navy/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Nächstes Bild"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg ring-1 ring-brand-navy/10 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {count > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Bild ${i + 1} anzeigen`}
              aria-current={i === current}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-8 bg-brand-blue" : "w-2.5 bg-brand-navy/20 hover:bg-brand-navy/40"
              }`}
            />
          ))}
        </div>
      )}

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
