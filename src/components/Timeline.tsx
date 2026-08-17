import type { TimelineItem } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { Reveal } from './Reveal'

interface TimelineProps {
  items: TimelineItem[]
  /** Heading above the spine. Rendered as an h3 under the section's h2. */
  heading?: string
}

/**
 * Vertical timeline with a spine that draws itself downward as the list
 * enters view, then reveals each entry in sequence behind it.
 *
 * Shared by Experience and Education — both are the same shape, and the
 * drawing spine is the one animation unique to this component.
 */
export function Timeline({ items, heading }: TimelineProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()

  if (items.length === 0) return null

  return (
    <div ref={ref}>
      {heading && <h3 className="u-label mb-10 text-gold">{heading}</h3>}

      <ol className="relative">
        {/* The spine. Scales from the top so it reads as being drawn down the
            page; sits behind the nodes, which punch through it as they land. */}
        <span
          aria-hidden="true"
          className={`absolute top-1.5 left-0 w-px origin-top bg-slate transition-transform duration-[900ms] ease-cinematic ${
            isVisible ? 'scale-y-100' : 'scale-y-0'
          }`}
          style={{ height: 'calc(100% - 0.375rem)' }}
        />

        {items.map((item, i) => (
          // Entries trail the spine so the line always arrives first.
          <Reveal as="li" key={item.title} delay={220 + i * 110}>
            <div className="group relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 -left-[3.5px] block h-2 w-2 rounded-full bg-gold"
              />

              {item.period && (
                <p className="u-label text-bone/55">{item.period}</p>
              )}

              <h4 className="mt-3 font-display text-2xl leading-snug text-bone">
                {item.title}
              </h4>

              {item.subtitle && (
                <p className="mt-1.5 text-bone/70">{item.subtitle}</p>
              )}

              {item.detail && (
                <p className="mt-2 max-w-[45ch] text-sm leading-relaxed text-bone/55">
                  {item.detail}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
