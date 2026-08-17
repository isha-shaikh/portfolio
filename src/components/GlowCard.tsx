import { useCallback, useRef } from 'react'
import type { PointerEvent, ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
}

/**
 * Card surface with a gold glow that follows the cursor.
 *
 * Pointer position is written straight to CSS custom properties on the node,
 * so moving the mouse never re-renders React. The write is batched into a
 * rAF frame so a fast drag across the grid can't outpace the paint.
 */
export function GlowCard({ children, className = '' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    // Ignore touch/pen — the glow is a cursor affordance only.
    if (event.pointerType !== 'mouse') return

    const { clientX, clientY } = event
    if (frame.current !== null) return

    frame.current = requestAnimationFrame(() => {
      frame.current = null
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--glow-x', `${clientX - rect.left}px`)
      node.style.setProperty('--glow-y', `${clientY - rect.top}px`)
    })
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`group relative isolate overflow-hidden ${className}`}
    >
      <span aria-hidden="true" className="u-glow absolute inset-0 -z-10" />
      {children}
    </div>
  )
}
