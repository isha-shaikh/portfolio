import { projects } from '../data/content'
import { CaseStudy } from './CaseStudy'
import { Reveal } from './Reveal'
import { Wipe } from './Wipe'
import { SectionLabel } from './SectionLabel'

interface ProjectsProps {
  /** Section numeral, assigned by App so numbering stays sequential. */
  index: string
}

export function Projects({ index }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="py-20 md:py-32"
      aria-labelledby="proj-label"
    >
      <SectionLabel index={index} title="Selected Work" id="proj-label" />

      {/* Featured first, then the list. The rows keep their own 01-03 numbering
          — the case study sits outside that sequence rather than taking 01,
          which keeps the numbered list matching the three linkable projects. */}
      <CaseStudy />

      {/* No overflow-hidden here — it clipped the focus ring on the left edge
          of each title link. The horizontal reveal offset is contained by
          `overflow-x-clip` on the page wrapper in App.tsx instead. */}
      <ul className="border-t border-slate">
        {projects.map((project, i) => (
          <Reveal as="li" key={project.title} from="left" delay={i * 90}>
            {/* The row is not itself an anchor: the title link is stretched
                across it via after:inset-0, which lets the live-demo link sit
                on top without nesting one anchor inside another.

                Every hover state is paired with focus-within so a keyboard
                user tabbing through gets the same feedback as a mouse user. */}
            <div
              className={`group relative border-b border-slate py-10 transition-colors duration-500 ease-cinematic ${
                // Rows without a repo aren't clickable, so they get no hover
                // fill — same reasoning as the stat cells.
                project.repo ? 'hover:bg-onyx/60 focus-within:bg-onyx/60' : ''
              }`}
            >
              {project.repo && (
                /* Gold underline sweeping left to right. */
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 ease-cinematic group-hover:w-full group-focus-within:w-full"
                />
              )}

              <div className="flex flex-col gap-6 md:flex-row md:items-baseline md:gap-10">
                <span className="u-label shrink-0 text-bone/55 transition-colors duration-500 group-hover:text-gold group-focus-within:text-gold md:w-16">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* The title no longer slides right on hover — the underline
                    sweep already tracks the same gesture, and running both
                    made the row feel busy. */}
                <div className="flex-1">
                  <h3 className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-tight text-bone">
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-colors duration-300 after:absolute after:inset-0 hover:text-gold focus-visible:text-gold"
                      >
                        <Wipe delay={60}>{project.title}</Wipe>
                        <span className="sr-only"> — view on GitHub</span>
                      </a>
                    ) : (
                      // No repository published — render as plain text rather
                      // than a dead link.
                      <Wipe delay={60}>{project.title}</Wipe>
                    )}
                  </h3>

                  <p className="mt-3 max-w-[55ch] leading-relaxed text-bone/55">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    {project.stack && project.stack.length > 0 && (
                      <p className="u-label text-bone/55">
                        {project.stack.join(' · ')}
                      </p>
                    )}

                    {project.live && (
                      // relative + z-10 lifts this above the stretched link.
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="u-label relative z-10 border-b border-slate pb-0.5 text-bone/50 transition-colors duration-300 hover:border-gold hover:text-gold"
                      >
                        Live Site ↗
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-4 md:self-center">
                  {project.year && (
                    <span className="u-label text-bone/55">{project.year}</span>
                  )}
                  {project.repo && (
                    <span
                      aria-hidden="true"
                      className="u-label text-bone/55 transition-colors duration-500 group-hover:text-gold group-focus-within:text-gold"
                    >
                      GitHub ↗
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
