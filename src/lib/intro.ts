const STORAGE_KEY = 'portfolio-intro-played'

/** Fired on window once the title card has finished lifting (or been skipped). */
export const INTRO_DONE = 'intro:done'

/**
 * Whether the title card should play on this page load.
 *
 * Once per session, never under reduced motion. Wrapped in try/catch because
 * sessionStorage throws in private-mode Safari and inside some embedded
 * webviews — a storage failure should skip the intro, not break the page.
 */
export function introWillPlay(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) === null
  } catch {
    return false
  }
}

export function markIntroPlayed() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Ignore — worst case the intro plays again next navigation.
  }
}
