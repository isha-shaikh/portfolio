import { capabilities } from '../data/content'
import { GlowCard } from './GlowCard'
import { Reveal } from './Reveal'
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
                {group.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-bone/50">
                {group.description}
              </p>

              {/* mt-auto pins the pills to the bottom so uneven description
                  lengths don't leave the tag rows misaligned across the grid.
                  Pills are deliberately static: the glow and the top rule
                  already signal hover, and recolouring twelve pills on top of
                  that was noise rather than feedback. */}
              <ul className="mt-auto flex flex-wrap gap-2 pt-6">
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
    </section>
  )
}
