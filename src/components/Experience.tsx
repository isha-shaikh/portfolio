import { experience } from '../data/content'
import { SectionLabel } from './SectionLabel'
import { Timeline } from './Timeline'

interface ExperienceProps {
  /** Section numeral, assigned by App so numbering stays sequential. */
  index: string
}

/**
 * Work history as an animated timeline.
 *
 * Renders nothing while `experience` is empty — an "Experience" heading over
 * a blank spine reads worse than no section at all. Add entries to
 * `content.ts` and the section appears, numbered in sequence.
 */
export function Experience({ index }: ExperienceProps) {
  if (experience.length === 0) return null

  return (
    <section
      id="experience"
      className="py-20 md:py-32"
      aria-labelledby="exp-label"
    >
      <SectionLabel index={index} title="Experience" id="exp-label" />
      <Timeline items={experience} />
    </section>
  )
}
