import { useEffect, useRef, useState } from 'react'

/** True when the user has asked the OS to minimise animation. */
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * The site's scroll entrance effect. Observes the returned ref and flips
 * `isVisible` once, the first time the element enters the viewport.
 *
 * Under reduced motion this initialises to visible *during render*, not in an
 * effect — otherwise the first painted frame is opacity-0 and those users see
 * the page flash blank before correcting.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (isVisible) return

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // fires once, never re-hides
        }
      },
      // No negative bottom inset. Pairing one with a threshold creates a dead
      // band at the foot of the document: an element sitting inside it can
      // never reach the required ratio once scrolling has bottomed out, and
      // stays at opacity 0 forever. Reproduced by jumping straight to #about,
      // which left the last contact row permanently invisible. A slightly
      // higher threshold keeps the "reveals just after entering" feel without
      // introducing an unreachable zone.
      { threshold: 0.2, rootMargin: '0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
    // isVisible is read only to skip setup once revealed; re-running on the
    // flip to true is harmless and keeps the dependency honest.
  }, [isVisible])

  return { ref, isVisible }
}
