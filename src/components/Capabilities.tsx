import { capabilities, professionalSkills } from '../data/content'
import { GlowCard } from './GlowCard'
import { Reveal } from './Reveal'
import { Wipe } from './Wipe'
import { SectionLabel } from './SectionLabel'

interface CapabilitiesProps {
  /** Section numeral, assigned by App so numbering stays sequential. */
  index: string
}

export function Capabilities({ index }: CapabilitiesProps) {
  return (
    <section
      id="capabilities"
      className="py-20 md:py-32"
      aria-labelledby="cap-label"
    >
      <SectionLabel index={index} title="Capabilities" id="cap-label" />

      {/* Dividers only, no card fills — the negative-space grid is the design.
          Cards fill on hover, where the cursor glow sits underneath. */}
      <div className="grid grid-cols-1 border-t border-l border-slate md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((group, i) => (
          // Stagger resets per row so each row cascades left to right.
          <Reveal key={group.title} delay={(i % 3) * 80} className="h-full">
            <GlowCard className="flex h-full flex-col border-r border-b border-slate p-8 transition-colors duration-500 ease-cinematic hover:bg-onyx/60">
              {/* Gold rule that draws itself across the top on hover. */}
              <span
                aria-hidden="true"
                className="mb-6 block h-px w-0 bg-gold transition-all duration-500 ease-cinematic group-hover:w-12"
              />

              <span className="u-label text-bone/55">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="mt-3 font-display text-2xl text-bone">
                <Wipe delay={80}>{group.title}</Wipe>
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-bone/50">
                {group.description}
              </p>

              {/* Pills follow the description rather than being pinned to the
                  card bottom with mt-auto. Bottom-pinning aligned the tag rows
                  but opened a hole mid-card wherever a group had few pills —
                  worst on Design, which has two. Since every description runs
                  to one or two lines, letting them sit directly beneath the
                  text lines the rows up about as well anyway, and the leftover
                  space falls at the card's foot where it reads as padding.

                  Pills are deliberately static: the glow and the top rule
                  already signal hover, and recolouring twelve pills on top of
                  that was noise rather than feedback. */}
              <ul className="flex flex-wrap gap-2 pt-6">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="u-label border border-slate px-2.5 py-1 text-bone/55"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      {/* Full-width band closing the grid. Continues the same hairline borders
          (no border-t — the grid's last row already supplies it) so it reads as
          part of the same block rather than a stray card. Laid out
          horizontally, which is what distinguishes it from the cards above. */}
      <Reveal delay={160}>
        <GlowCard className="flex flex-col gap-6 border-r border-b border-l border-slate p-8 transition-colors duration-500 ease-cinematic hover:bg-onyx/60 lg:flex-row lg:items-center lg:gap-12">
          <div className="lg:w-64 lg:shrink-0">
            <h3 className="font-display text-2xl text-bone">
              <Wipe>{professionalSkills.title}</Wipe>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-bone/50">
              {professionalSkills.description}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {professionalSkills.skills.map((skill) => (
              <li
                key={skill}
                className="u-label border border-slate px-2.5 py-1 text-bone/55"
              >
                {skill}
              </li>
            ))}
          </ul>
        </GlowCard>
      </Reveal>
    </section>
  )
}
