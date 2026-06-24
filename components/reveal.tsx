"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Animation direction / style. Defaults to "up". */
  direction?: Direction
  /** Delay in ms before the animation starts once in view. */
  delay?: number
  /** How much of the element must be visible before triggering (0-1). */
  threshold?: number
  /** Render as a different element (e.g. "li", "span"). Defaults to "div". */
  as?: ElementType
  /** Only animate once (default true). */
  once?: boolean
}

const hiddenByDirection: Record<Direction, string> = {
  up: "opacity-0 translate-y-8",
  down: "opacity-0 -translate-y-8",
  left: "opacity-0 translate-x-8",
  right: "opacity-0 -translate-x-8",
  scale: "opacity-0 scale-95",
  fade: "opacity-0",
}

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  threshold = 0.15,
  as,
  once = true,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who prefer reduced motion - show immediately.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none",
        visible ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenByDirection[direction],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
