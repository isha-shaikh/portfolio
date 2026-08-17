import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface WipeProps {
  children: ReactNode
  /** Stagger offset in ms. */
  delay?: number
  className?: string
}

/**
 * Reveals its contents by sliding them up from behind a mask — the same
 * curtain the hero headline uses, applied to headings elsewhere so the page
 * feels of a piece with it.
 *
 * Renders as inline-block rather than block so it can sit inside an anchor
 * without breaking that anchor's layout. Note the mask is `overflow-hidden`,
 * which clips absolutely positioned descendants — so a stretched link
 * (`after:inset-0`) must be an *ancestor* of this, never a child of it.
 *
 * Under reduced motion useReveal initialises to visible, so no transform is
 * ever applied.
 */
export function Wipe({ children, delay = 0, className = '' }: WipeProps) {
  const { ref, isVisible } = useReveal<HTMLSpanElement>()

  return (
    <span
      ref={ref}
      // The negative margin pair gives descenders room the mask would clip.
      className={`inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom ${className}`}
    >
      <span
        className={`inline-block transition-transform duration-[900ms] ease-cinematic ${
          isVisible ? 'translate-y-0' : 'translate-y-[110%]'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </span>
    </span>
  )
}
