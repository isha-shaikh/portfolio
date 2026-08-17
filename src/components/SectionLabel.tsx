interface SectionLabelProps {
  /** Two-digit section numeral, e.g. "01". */
  index: string
  /** Section name; rendered uppercase by the label style. */
  title: string
  /** Id referenced by the parent section's aria-labelledby. */
  id?: string
}

/**
 * "01 — CAPABILITIES" in tracked gold mono, above a hairline rule.
 *
 * Renders as an h2 rather than a styled span: it is genuinely the heading for
 * its section, and without it the document skips straight from the h1 name to
 * the h3 card titles, which screen reader users navigate by.
 */
export function SectionLabel({ index, title, id }: SectionLabelProps) {
  return (
    <div className="mb-12 flex items-center gap-4 border-b border-slate pb-4">
      <h2 className="u-label text-gold" id={id}>
        <span aria-hidden="true">{index} — </span>
        {title}
      </h2>
    </div>
  )
}
