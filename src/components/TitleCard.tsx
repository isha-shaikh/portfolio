import { useCallback, useEffect, useState } from 'react'
import { hero } from '../data/content'
import { INTRO_DONE, introWillPlay, markIntroPlayed } from '../lib/intro'

/** Gold rule finishes drawing at roughly this point. */
const RULE_DELAY = 700
/** Card begins lifting away. */
const LIFT_AT = 1750
/** Duration of the lift, after which the card unmounts. */
const LIFT_MS = 900

/**
 * Title card shown over the page on first load — name centred like a film
 * title, a gold rule drawn beneath it, then the whole card lifts away.
 *
 * Deliberately overlaid rather than gating the render: the page mounts and
 * paints underneath immediately, so the intro costs nothing in largest
 * contentful paint. It is aria-hidden and contains nothing focusable, so
 * screen reader and keyboard users interact with the real page throughout.
 *
 * Plays once per session, is skippable with a click or any key, and never
 * appears under reduced motion. The hero headline waits on INTRO_DONE so its
 * letters rise *after* the curtain lifts rather than behind it.
 */
export function TitleCard() {
  // Decided during the first render so the hero headline sees the same answer.
  const [playing, setPlaying] = useState(introWillPlay)
  /** Drives the name and rule in. */
  const [entered, setEntered] = useState(false)
  /** Drives the card out. */
  const [lifting, setLifting] = useState(false)

  const finish = useCallback(() => {
    markIntroPlayed()
    setPlaying(false)
    window.dispatchEvent(new Event(INTRO_DONE))
  }, [])

  const skip = useCallback(() => setLifting(true), [])

  // Enter on the next frame, so the transition has an initial state to run from.
  useEffect(() => {
    if (!playing) return
    const frame = requestAnimationFrame(() => setEntered(true))
    const lift = setTimeout(() => setLifting(true), LIFT_AT)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(lift)
    }
  }, [playing])

  // Unmount once the lift has run, however it was triggered.
  useEffect(() => {
    if (!playing || !lifting) return
    const end = setTimeout(finish, LIFT_MS)
    return () => clearTimeout(end)
  }, [playing, lifting, finish])

  // Hold the page still while the card is up; any key skips.
  useEffect(() => {
    if (!playing) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', skip)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', skip)
    }
  }, [playing, skip])

  // NB: there is deliberately no cleanup-only effect dispatching INTRO_DONE
  // here. One was tried, and StrictMode's intentional mount→unmount→mount in
  // development fired it instantly — releasing the headline to animate behind
  // the curtain, which is exactly what the event exists to prevent. The
  // headline carries its own timeout fallback instead, so it can never be left
  // waiting even if this component disappears unexpectedly.

  if (!playing) return null

  return (
    <div
      aria-hidden="true"
      onClick={skip}
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-void transition-transform duration-[900ms] ease-cinematic ${
        lifting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* The same single gold light source as the hero. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(227,178,60,0.13) 0%, transparent 70%)',
        }}
      />

      <p
        className={`u-label relative mb-8 text-gold transition-opacity duration-700 ease-cinematic ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Portfolio — 2026
      </p>

      <h1
        className={`relative px-6 text-center font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-bone transition-all duration-[1100ms] ease-cinematic ${
          entered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {hero.name}
      </h1>

      {/* Gold rule drawing outward from the centre. */}
      <span
        className={`relative mt-10 block h-px w-40 origin-center bg-gold transition-transform duration-[800ms] ease-cinematic ${
          entered ? 'scale-x-100' : 'scale-x-0'
        }`}
        style={{ transitionDelay: `${RULE_DELAY}ms` }}
      />
    </div>
  )
}
