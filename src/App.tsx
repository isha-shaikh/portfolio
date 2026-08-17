import { Capabilities } from './components/Capabilities'
import { Certifications } from './components/Certifications'
import { Contact } from './components/Contact'
import { Cursor } from './components/Cursor'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Grain } from './components/Grain'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { SectionLabel } from './components/SectionLabel'
import { experience } from './data/content'

export default function App() {
  /**
   * Section numerals are assigned here rather than hardcoded, so the sequence
   * stays gapless when Experience hides itself for lack of entries.
   */
  const hasExperience = experience.length > 0
  const numeral = (position: number) => String(position).padStart(2, '0')

  let n = 0
  const capabilitiesNo = numeral(++n)
  const projectsNo = numeral(++n)
  const experienceNo = hasExperience ? numeral(++n) : ''
  const certificationsNo = numeral(++n)
  const backgroundNo = numeral(++n)

  return (
    <>
      {/* First tab stop on the page. Visually hidden until focused. */}
      <a
        href="#capabilities"
        className="u-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-onyx focus:px-5 focus:py-3 focus:text-gold"
      >
        Skip to content
      </a>

      <Cursor />
      <Grain />

      {/* overflow-x-clip contains the projects' horizontal reveal offset
          without creating a scroll container — so no phantom scrollbar, and
          no clipped focus rings inside the padded content. */}
      <div className="mx-auto w-full max-w-[1240px] overflow-x-clip px-6 sm:px-10 lg:px-16">
        <main>
          <Hero />
          <Capabilities index={capabilitiesNo} />
          <Projects index={projectsNo} />
          <Experience index={experienceNo} />
          <Certifications index={certificationsNo} />

          <section
            id="about"
            className="py-20 md:py-32"
            aria-labelledby="about-label"
          >
            <SectionLabel
              index={backgroundNo}
              title="Background"
              id="about-label"
            />
            {/* Two columns: education timeline left, contact right. The left
                border on the second column draws the dividing hairline, and
                only applies once the grid is actually side by side. */}
            <div className="grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-0">
              <div className="lg:pr-16">
                <Education />
              </div>
              <div className="lg:border-l lg:border-slate lg:pl-16">
                <Contact />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
