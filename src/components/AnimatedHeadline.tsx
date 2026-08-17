import { useEffect, useState } from 'react'
import type { HeadlineLine } from '../data/content'
import { prefersReducedMotion } from '../hooks/useReveal'

interface AnimatedHeadlineProps {
  lines: HeadlineLine[]
  className?: string
  id?: string
}

/** Per-character stagger. Reads as one gesture rather than a typewriter. */
const CHAR_STAGGER = 18
/** Extra beat before each new line starts. */
const LINE_DELAY = 90
/** Lets fonts settle so characters don't reflow mid-animation. */
const START_DELAY = 80

/** --color-gold and --color-champagne, as RGB triples. */
const GOLD = [227, 178, 60] as const
const CHAMPAGNE = [247, 212, 134] as const

/**
 * Colour for a glyph at position `t` (0-1) along the emphasis line.
 *
 * The gradient is applied per character rather than with `bg-clip-text`,
 * because these spans are individually transformed for the entrance
 * animation: a transform promotes each span to its own paint layer, so a
 * parent's text-clipped background never reaches the glyphs and the line
 * renders completely invisible. Solid per-glyph colours sidestep that
 * entirely and read the same at display size.
 */
function gradientColor(t: number) {
  const rising = t < 0.5
  const [from, to] = rising ? [GOLD, CHAMPAGNE] : [CHAMPAGNE, GOLD]
  const u = rising ? t * 2 : (t - 0.5) * 2
  const channel = (i: number) => Math.round(from[i] + (to[i] - from[i]) * u)
  return `rgb(${channel(0)}, ${channel(1)}, ${channel(2)})`
}

export function AnimatedHeadline({
  lines,
  className = '',
  id,
}: AnimatedHeadlineProps) {
  // Initialised during render, so reduced-motion users never paint a blank frame.
  const [played, setPlayed] = useState(prefersReducedMotion)

  useEffect(() => {
    if (played) return
    const timer = setTimeout(() => setPlayed(true), START_DELAY)
    return () => clearTimeout(timer)
  }, [played])

  // Stagger accumulates across lines so the cascade never restarts mid-name.
  let charIndex = 0

  return (
    <h1
      id={id}
      // The split spans are aria-hidden; this carries the real text so screen
      // readers announce the name instead of spelling it letter by letter.
      aria-label={lines.map((line) => line.text).join(' ')}
      className={className}
    >
      {lines.map((line, lineIndex) => {
        const words = line.text.split(' ')
        // Position along the gradient is measured over visible glyphs only,
        // so spaces don't create dead stops in the colour ramp.
        const glyphCount = line.text.replace(/\s/g, '').length
        let glyphIndex = 0

        return (
          <span
            key={line.text}
            aria-hidden="true"
            // overflow-hidden creates the curtain mask; the negative margin
            // pair gives serif descenders room so the mask doesn't clip them.
            className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
          >
            {words.map((word, wordIndex) => (
              <span key={`${word}-${wordIndex}`} className="inline-block">
                {word.split('').map((char, i) => {
                  const delay =
                    charIndex++ * CHAR_STAGGER + lineIndex * LINE_DELAY
                  const t =
                    glyphCount > 1 ? glyphIndex++ / (glyphCount - 1) : 0

                  return (
                    <span
                      key={`${char}-${i}`}
                      className={`inline-block transition-[transform,opacity] duration-700 ease-cinematic ${
                        played
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-[110%] opacity-0'
                      }`}
                      style={{
                        transitionDelay: `${delay}ms`,
                        ...(line.emphasis ? { color: gradientColor(t) } : {}),
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
                {/* Preserve the space between words as a non-animated node. */}
                {wordIndex < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))}
          </span>
        )
      })}
    </h1>
  )
}
