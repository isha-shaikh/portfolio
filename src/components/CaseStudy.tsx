import { caseStudy } from '../data/content'
import { CaseStudyMedia } from './CaseStudyMedia'
import { GlowCard } from './GlowCard'
import { Reveal } from './Reveal'
import { Wipe } from './Wipe'

/**
 * The featured project, given a full card above the plain project rows.
 *
 * Deliberately not wrapped in a link: there is no repository or deployment for
 * this project yet, so the whole card is not clickable. If `repo` or `live` are
 * set in content.ts, link buttons appear and only those are interactive — the
 * card body stays inert either way, which avoids implying a destination that
 * doesn't exist.
 */
export function CaseStudy() {
  const hasLinks = Boolean(caseStudy.repo || caseStudy.live)

  return (
    <Reveal className="mb-16 md:mb-20">
      <GlowCard className="border border-slate bg-onyx/40 transition-colors duration-500 ease-cinematic hover:bg-onyx/60">
        <div className="grid grid-cols-1 gap-10 p-7 md:p-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
          {/* ---- Copy ---- */}
          <div>
            <p className="u-label text-gold">{caseStudy.eyebrow}</p>

            <h3 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-tight text-bone">
              <Wipe delay={80}>{caseStudy.title}</Wipe>
            </h3>

            <p className="mt-5 text-lg leading-relaxed text-bone/70">
              {caseStudy.lead}
            </p>

            <p className="mt-4 leading-relaxed text-bone/55">
              {caseStudy.body}
            </p>

            {/* The Claude AI collaboration gets its own callout rather than
                being buried in the paragraphs above. */}
            <p className="mt-7 inline-flex items-center gap-3 border border-gold/35 px-4 py-2.5">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold"
              />
              <span className="u-label text-gold">{caseStudy.partnerNote}</span>
            </p>

            {caseStudy.stack.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-2">
                {caseStudy.stack.map((item) => (
                  <li
                    key={item}
                    className="u-label border border-slate px-2.5 py-1 text-bone/55"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {hasLinks && (
              <div className="mt-8 flex flex-wrap items-center gap-6">
                {caseStudy.repo && (
                  <a
                    href={caseStudy.repo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label border-b border-slate pb-1 text-bone/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    View Repository ↗
                  </a>
                )}
                {caseStudy.live && (
                  <a
                    href={caseStudy.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label border-b border-slate pb-1 text-bone/70 transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    Live Site ↗
                  </a>
                )}
              </div>
            )}
          </div>

          {/* ---- Media ---- */}
          <CaseStudyMedia />
        </div>
      </GlowCard>
    </Reveal>
  )
}
