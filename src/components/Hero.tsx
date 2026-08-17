import { hero, stats } from '../data/content'
import { useParallax } from '../hooks/useParallax'
import { AnimatedHeadline } from './AnimatedHeadline'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'

export function Hero() {
  // Gentle drift — the portrait trails the type column as the page scrolls.
  const parallaxRef = useParallax<HTMLDivElement>(0.09)

  return (
    <section
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-20 md:pt-32"
      aria-labelledby="hero-name"
    >
      {/* Soft gold bloom from the top-left — the only light source on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[30%] -left-[15%] h-[70vh] w-[70vw] rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            'radial-gradient(circle, rgba(227,178,60,0.22) 0%, rgba(227,178,60,0.06) 45%, transparent 70%)',
        }}
      />

      <div className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
        {/* ---- Left: type column ---- */}
        <div>
          <Reveal>
            <p className="u-label mb-8 text-gold">Portfolio — 2026</p>
          </Reveal>

          <AnimatedHeadline
            id="hero-name"
            lines={hero.headline}
            // 2.75rem floor: at 3.25rem "Isha Nashir" overflows a 320px screen.
            className="font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] tracking-[-0.02em] text-bone"
          />

          <Reveal delay={380}>
            {/* The separator trails its role rather than leading the next one,
                so a wrap at narrow widths never starts a line with "/". */}
            <p className="u-label mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-gold">
              {hero.roles.map((role, i) => (
                <span key={role}>
                  {role}
                  {/* Decorative separator, aria-hidden and so exempt from
                      contrast minimums — but `slate` measured 1.3:1, which is
                      effectively invisible. bone/40 keeps it subordinate to
                      the roles while staying legible. */}
                  {i < hero.roles.length - 1 && (
                    <span aria-hidden="true" className="ml-3 text-bone/40">
                      /
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>

          {/* Short tagline only. The full résumé summary lives in the About
              section — two long prose blocks in the same voice read as
              repetition, and it keeps the hero uncluttered. */}
          <Reveal delay={450}>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-bone/55">
              {hero.tagline}
            </p>
          </Reveal>
        </div>

        {/* ---- Right: portrait, drifting slower than the type column ----
            Reveal owns the outer transform, so the parallax transform goes on
            an inner node. Sharing one element would make them overwrite each
            other and the entrance animation would snap. */}
        <Reveal delay={300} className="mx-auto w-full max-w-sm lg:max-w-none">
          <div ref={parallaxRef} className="will-change-transform">
            <Portrait />
          </div>
        </Reveal>
      </div>

      {/* ---- Stat row, spanning both columns ---- */}
      <div className="relative mt-20 grid grid-cols-2 border-t border-l border-slate sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={520 + i * 50}>
            {/* No hover state here by design — these cells aren't interactive,
                and a fill + colour shift on hover implies they're clickable. */}
            {/* px-4 at the smallest sizes: at 375px the two-column grid leaves
                ~115px of content per cell, and "Certifications" — a single
                unbreakable word — overflows that at px-6. */}
            <div className="h-full border-r border-b border-slate px-4 py-7 sm:px-6">
              <span className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-gold">
                {stat.value}
              </span>
              <p className="u-label mt-3 text-bone/55">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={720} className="relative mt-16">
        <a
          href="#about-me"
          className="u-label group inline-flex items-center gap-3 text-bone/55 transition-colors duration-300 hover:text-gold"
        >
          Scroll
          <span
            aria-hidden="true"
            className="h-px w-12 bg-slate transition-all duration-500 ease-cinematic group-hover:w-20 group-hover:bg-gold"
          />
        </a>
      </Reveal>
    </section>
  )
}
