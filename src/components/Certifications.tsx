import { certifications } from '../data/content'
import { Reveal } from './Reveal'
import { Wipe } from './Wipe'
import { SectionLabel } from './SectionLabel'

interface CertificationsProps {
  /** Section numeral, assigned by App so numbering stays sequential. */
  index: string
}

/**
 * Certifications, grouped by discipline.
 *
 * Deliberately not a timeline: the résumé gives no completion dates, and a
 * timeline with no dates is just a list wearing a spine.
 */
export function Certifications({ index }: CertificationsProps) {
  return (
    <section
      id="certifications"
      className="py-20 md:py-32"
      aria-labelledby="cert-label"
    >
      <SectionLabel index={index} title="Certifications" id="cert-label" />

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        {certifications.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 90}>
            <h3 className="u-label mb-8 text-gold">
              <Wipe>{group.title}</Wipe>
            </h3>

            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 border-b border-slate py-4 last:border-b-0"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 translate-y-[-0.2em] rounded-full bg-gold"
                  />
                  <span className="leading-relaxed text-bone/70">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
