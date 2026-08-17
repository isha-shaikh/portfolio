import { hero } from '../data/content'

export function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t border-slate py-10 sm:flex-row sm:items-center sm:justify-between">
      <p className="u-label text-bone/55">
        © {new Date().getFullYear()} {hero.name}
      </p>
      <p className="u-label text-bone/55">Built with React &amp; Tailwind</p>
    </footer>
  )
}
