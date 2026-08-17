import { useEffect, useRef } from 'react'

/**
 * Translates an element against the scroll so it drifts slower than the
 * content around it.
 *
 * The transform is written straight to the node and batched into a rAF, so
 * scrolling never re-renders React and never queues more work than the
 * browser can paint.
 *
 * Inactive under reduced motion, and below `minWidth` — on a phone the hero
 * columns stack, so the drift reads as a glitch rather than depth, and the
 * scroll listener would be pure cost.
 *
 * @param strength Fraction of scroll distance to offset by. 0.1 is subtle;
 *                 past ~0.2 the drift becomes obvious and cheap-looking.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  strength = 0.1,
  minWidth = 1024,
  /**
   * Maximum drift in px, either direction. Without a cap the offset grows with
   * scroll distance — measured at 305px on this page — which is far enough to
   * push the element into whatever sits below it.
   */
  maxOffset = 56,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`)

    let frame: number | null = null
    let attached = false

    const update = () => {
      frame = null
      const rect = node.getBoundingClientRect()
      // Distance from the element's centre to the viewport's centre. Zero as
      // it passes mid-screen, so the drift is symmetrical either side.
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      const drift = Math.max(
        -maxOffset,
        Math.min(maxOffset, -offset * strength),
      )
      node.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    const sync = () => {
      const shouldRun = wide.matches && !reduced.matches

      if (shouldRun && !attached) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll, { passive: true })
        attached = true
        update() // set the initial offset so there's no jump on first scroll
      } else if (!shouldRun && attached) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        attached = false
        // Clear any drift left behind, or the element stays displaced.
        node.style.transform = ''
      }
    }

    sync()
    // Respond live to a resize across the breakpoint or an OS motion setting change.
    wide.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      wide.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [strength, minWidth, maxOffset])

  return ref
}
