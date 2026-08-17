import { about } from '../data/content'
import { PhotoCluster } from './PhotoCluster'
import { Reveal } from './Reveal'
import { SectionLabel } from './SectionLabel'

interface AboutProps {
  /** Section numeral, assigned by App so numbering stays sequential. */
  index: string
}

export function About({ index }: AboutProps) {
  return (
    <section id="about-me" className="py-20 md:py-32" aria-labelledby="about-me-label">
      <SectionLabel index={index} title="About" id="about-me-label" />

      {/* Text leads, photos sit right. Collapses to one column below lg, with
          the photos following the prose rather than splitting it.
          items-center keeps the prose balanced against the photo, which runs
          considerably taller — left-aligned to the top it left a large void
          under the paragraph. */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <div>
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="mb-6 text-lg leading-relaxed text-bone/55 last:mb-0">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mx-auto w-full max-w-sm lg:max-w-none">
          <PhotoCluster />
        </Reveal>
      </div>
    </section>
  )
}
