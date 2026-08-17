import { useEffect, useRef, useState } from 'react'

/** How much of the remaining distance the ring closes each frame. Lower = more lag. */
const RING_EASE = 0.18
/** Ring scale when hovering something interactive. */
const HOT_SCALE = 1.9

/**
 * Custom cursor: a gold ring that trails the pointer, plus a dot that tracks it
 * exactly. The lag on the ring is the whole effect; the dot keeps the pointer
 * position legible so precision isn't lost.
 *
 * Both nodes are moved by writing transforms straight to the DOM inside a
 * single rAF loop — pointer movement never re-renders React.
 *
 * Renders nothing at all unless the device has a fine pointer and the user
 * hasn't asked for reduced motion. The native cursor is only hidden once this
 * component has mounted and taken over (via `data-cursor` on <html>), so if the
 * JS never runs the pointer is still visible.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  // Decide whether to take over at all.
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      const on = fine.matches && !reduced.matches
      setEnabled(on)
      document.documentElement.toggleAttribute('data-cursor', on)
    }

    sync()
    fine.addEventListener('change', sync)
    reduced.addEventListener('change', sync)

    return () => {
      fine.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
      document.documentElement.removeAttribute('data-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    // Pointer target, and the ring's eased position chasing it.
    let tx = 0
    let ty = 0
    let rx = 0
    let ry = 0
    let hot = false
    let shown = false
    let frame: number | null = null
    // Scale is eased in JS rather than via a CSS transition: the loop rewrites
    // `transform` every frame, so a transition on it would restart constantly
    // and never settle.
    let scale = 1

    const tick = () => {
      rx += (tx - rx) * RING_EASE
      ry += (ty - ry) * RING_EASE
      scale += ((hot ? HOT_SCALE : 1) - scale) * RING_EASE
      ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      tx = event.clientX
      ty = event.clientY

      if (!shown) {
        // Jump the ring to the first known position so it doesn't fly in from 0,0.
        rx = tx
        ry = ty
        shown = true
        ring.style.opacity = '1'
        dot.style.opacity = '1'
      }

      const target = event.target
      const interactive =
        target instanceof Element &&
        target.closest('a[href], button, [role="button"]') !== null
      if (interactive !== hot) {
        hot = interactive
        ring.style.borderColor = hot
          ? 'var(--color-champagne)'
          : 'var(--color-gold)'
        ring.style.backgroundColor = hot
          ? 'color-mix(in oklab, var(--color-gold) 12%, transparent)'
          : 'transparent'
      }
    }

    const hide = () => {
      shown = false
      ring.style.opacity = '0'
      dot.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        // transform is deliberately absent from the transition list — the rAF
        // loop owns it.
        className="pointer-events-none fixed top-0 left-0 z-[60] h-8 w-8 rounded-full border border-gold opacity-0 transition-[opacity,border-color,background-color] duration-300 ease-cinematic will-change-transform"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[60] h-1 w-1 rounded-full bg-gold opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </>
  )
}
