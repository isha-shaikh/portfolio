import { aboutPhotos } from '../data/content'

/**
 * Photo grid for the About section, sized off the array length so adding a
 * photo later needs no layout changes:
 *
 *   1 → a single 4:5 frame spanning the row
 *   2 → two squares side by side
 *   3 → the first spans the row, the other two sit beneath it
 *
 * Only real entries render, so there are never empty placeholder frames.
 * Returns nothing at all if the array is empty.
 */
export function PhotoCluster() {
  if (aboutPhotos.length === 0) return null

  const single = aboutPhotos.length === 1

  return (
    <div className="grid grid-cols-2 gap-3">
      {aboutPhotos.map((photo, i) => {
        // The first photo spans both columns when it's alone, or when there are
        // three and it acts as the lead image.
        const spans = i === 0 && aboutPhotos.length !== 2

        return (
          <figure
            key={photo.src + i}
            className={`relative overflow-hidden border border-slate bg-onyx ${
              spans ? 'col-span-2' : ''
            } ${single ? 'aspect-[4/5]' : spans ? 'aspect-[4/3]' : 'aspect-square'}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
              className="h-full w-full object-cover grayscale-[0.2]"
              style={{ objectPosition: photo.objectPosition ?? 'center' }}
            />
            {/* Corner ticks, echoing the hero portrait frame. */}
            {(
              [
                'top-0 left-0 border-t border-l',
                'bottom-0 right-0 border-b border-r',
              ] as const
            ).map((position) => (
              <span
                key={position}
                aria-hidden="true"
                className={`absolute h-4 w-4 border-gold ${position}`}
              />
            ))}
          </figure>
        )
      })}
    </div>
  )
}
