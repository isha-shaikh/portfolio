import { caseStudy } from '../data/content'

/**
 * Media panel for the case study.
 *
 * With no screenshot yet this renders a deliberate abstract graphic — gold
 * hairline tiles over a soft bloom, suggesting a storefront grid. It carries no
 * "image missing" text, no broken-image icon and no grey box, so it reads as
 * artwork rather than absent content.
 *
 * Both states share the same 16:10 container, so setting `caseStudy.image`
 * swaps a real screenshot in with zero layout shift.
 */
export function CaseStudyMedia() {
  if (caseStudy.image) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border border-slate bg-onyx">
        <img
          src={caseStudy.image}
          alt={`${caseStudy.title} interface`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[16/10] overflow-hidden border border-slate bg-onyx"
    >
      {/* Bloom, matching the hero's single light source. */}
      <div
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[120%] w-[120%] -translate-x-1/2 opacity-60 blur-[70px]"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(227,178,60,0.16) 0%, transparent 62%)',
        }}
      />

      <div className="relative flex h-full flex-col gap-3 p-5 sm:gap-4 sm:p-7">
        {/* Suggestion of a header bar. */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
          <span className="h-px w-16 bg-gold/25" />
          <span className="ml-auto h-px w-8 bg-bone/15" />
          <span className="h-px w-8 bg-bone/15" />
        </div>

        {/* Product-tile grid. The first tile is filled to imply a focused item. */}
        <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-3 sm:gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className={`rounded-sm border ${
                i === 0
                  ? 'border-gold/35 bg-gold/[0.07]'
                  : 'border-gold/12 bg-bone/[0.015]'
              }`}
            >
              {/* A caption line inside each tile. */}
              <div className="flex h-full flex-col justify-end gap-1.5 p-2.5">
                <span
                  className={`h-px ${i === 0 ? 'w-2/3 bg-gold/40' : 'w-1/2 bg-bone/12'}`}
                />
                <span
                  className={`h-px ${i === 0 ? 'w-1/3 bg-gold/25' : 'w-1/4 bg-bone/10'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
