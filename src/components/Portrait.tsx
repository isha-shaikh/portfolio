import { portrait } from '../data/content'

/**
 * Reserved portrait frame. Holds its 4:5 aspect ratio whether or not an image
 * is set, so dropping the photo in later causes zero layout shift.
 *
 * Deliberately unlit: the hero already has one gold bloom, and a second one
 * behind this frame competed with it and flattened the sense of depth.
 */
export function Portrait() {
  return (
    <div className="relative aspect-[4/5] w-full">
      <div className="relative h-full w-full overflow-hidden border border-slate bg-onyx">
        {portrait.src ? (
          <img
            src={portrait.src}
            alt={portrait.alt}
            // Intrinsic size of the source file. Lets the browser reserve the
            // right box before the bytes arrive.
            width={714}
            height={1264}
            // Eager + high priority: this is above the fold, so lazy-loading
            // it would only delay the largest contentful paint.
            loading="eager"
            fetchPriority="high"
            draggable={false}
            // The source is 1:1.77, far taller than this 4:5 frame, so cover
            // crops it. Biasing the focal point below centre pulls the subject
            // up in frame — at the default 50% there was too much headroom.
            // Adjust this one percentage to re-frame.
            className="h-full w-full object-cover object-[center_60%] grayscale-[0.2]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <span className="u-label text-bone/55">Portrait</span>
            <span className="u-label text-bone/50">4 : 5</span>
          </div>
        )}
      </div>

      {/* Corner ticks — a quiet cinematic framing cue. */}
      {(
        [
          'top-0 left-0 border-t border-l',
          'top-0 right-0 border-t border-r',
          'bottom-0 left-0 border-b border-l',
          'bottom-0 right-0 border-b border-r',
        ] as const
      ).map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute h-5 w-5 border-gold ${position}`}
        />
      ))}
    </div>
  )
}
