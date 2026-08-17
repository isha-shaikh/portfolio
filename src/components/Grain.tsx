/**
 * Film-grain overlay, jittering between eight positions each second.
 *
 * Sized 110% and inset by -5% so the animation's translation never drags an
 * edge into view. Static grain reads as texture; grain that jumps reads as
 * projected film, which is the whole point.
 *
 * The reduced-motion rule in index.css collapses every animation duration, so
 * users who asked for less motion get the original still grain.
 */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed -inset-[5%] z-50 h-[110%] w-[110%] opacity-[0.035] mix-blend-overlay"
      style={{
        animation: 'u-grain-shift 0.8s steps(1) infinite',
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}
