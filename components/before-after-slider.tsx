"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"

interface BeforeAfterSliderProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  /** optional caption shown under the slider */
  caption?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  caption,
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5))
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5))
  }

  return (
    <figure className={className}>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl shadow-sm ring-1 ring-brand-navy/5 touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* After image (full, underneath) */}
        <Image
          src={afterSrc || "/placeholder.svg"}
          alt={afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover pointer-events-none"
        />
        {/* Before image (clipped from the left) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc || "/placeholder.svg"}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded-full bg-brand-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm pointer-events-none">
          Vorher
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-brand-blue/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm pointer-events-none">
          Nachher
        </span>

        {/* Divider line + handle */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <button
            type="button"
            aria-label="Vorher-Nachher-Vergleich verschieben"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="slider"
            onKeyDown={onKeyDown}
            className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white text-brand-navy shadow-lg ring-1 ring-brand-navy/10 active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <MoveHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-neutral-500">{caption}</figcaption>
      )}
    </figure>
  )
}
