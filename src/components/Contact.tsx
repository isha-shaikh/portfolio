import { contact } from '../data/content'
import { Reveal } from './Reveal'

export function Contact() {
  return (
    <div>
      <h3 className="u-label mb-10 text-gold">Contact</h3>

      <Reveal>
        {/* The email is the largest interactive element on the page — the
            single clear call to action. */}
        {/* Capped at 2.75rem: this column is only ~492px wide at 1440px, and
            at 3.25rem the address overflowed and break-all snapped it
            mid-word, orphaning a single "m" on the second line. break-words
            (rather than break-all) means any future longer address breaks at
            the @ or a dot instead of an arbitrary character. */}
        <a
          href={`mailto:${contact.email}`}
          className="group inline-block font-display text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight break-words text-bone transition-colors duration-500 ease-cinematic hover:text-gold"
        >
          {contact.email}
          <span
            aria-hidden="true"
            className="block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-cinematic group-hover:scale-x-100"
          />
        </a>
      </Reveal>

      <dl className="mt-12 space-y-5">
        {contact.links.map((link, i) => (
          <Reveal key={link.label} delay={60 + i * 60}>
            <div className="flex items-baseline gap-6 border-b border-slate pb-4">
              <dt className="u-label w-24 shrink-0 text-bone/55">
                {link.label}
              </dt>
              {/* min-w-0 lets this flex item shrink below its intrinsic width,
                  and break-words gives the long LinkedIn URL somewhere to
                  break — without both it overflows the row at 375px. */}
              <dd className="min-w-0 break-words">
                {link.href === '#' ? (
                  <span className="text-bone/70">{link.value}</span>
                ) : (
                  <a
                    href={link.href}
                    target={
                      link.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      link.href.startsWith('http')
                        ? 'noreferrer noopener'
                        : undefined
                    }
                    className="text-bone/70 transition-colors duration-300 hover:text-gold"
                  >
                    {link.value}
                  </a>
                )}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </div>
  )
}
