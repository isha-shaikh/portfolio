import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

/** Direction the element travels from as it reveals. */
type RevealFrom = 'bottom' | 'left' | 'right'

const OFFSET: Record<RevealFrom, string> = {
  bottom: 'translate-y-2',
  left: '-translate-x-10',
  right: 'translate-x-10',
}

interface RevealProps {
  children: ReactNode
  /** Stagger offset in ms. Use multiples of 60 for a consistent cascade. */
  delay?: number
  /**
   * Travel direction. Horizontal reveals need an `overflow-hidden` ancestor
   * or the offscreen offset will widen the page and trigger a scrollbar.
   */
  from?: RevealFrom
  className?: string
  /** Render as something other than a div, e.g. `as="li"` inside a list. */
  as?: ElementType
}

/**
 * Wraps children in the site's entrance effect: fade plus a short slide.
 * All scroll motion lives here — no component should hand-roll its own.
 */
export function Reveal({
  children,
  delay = 0,
  from = 'bottom',
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-[600ms] ease-cinematic ${
        isVisible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `${OFFSET[from]} opacity-0`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
