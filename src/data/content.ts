/**
 * Every string on the site lives here. Components render from this file, so
 * updating the portfolio never means touching JSX.
 *
 * Content sourced from ISHA SHAIKH (2).pdf (résumé), August 2026.
 */

export interface SkillGroup {
  title: string
  /** One line, ~12-18 words. Longer breaks the grid's even card heights. */
  description: string
  skills: string[]
}

export interface Project {
  title: string
  description: string
  /** Omit where the résumé doesn't state the stack — don't guess it. */
  stack?: string[]
  /** GitHub repo URL. Omitted projects render as non-linked rows. */
  repo?: string
  /** Optional live deployment, rendered as a secondary link. */
  live?: string
  year?: string
}

export interface TimelineItem {
  /** Left-hand date range, e.g. "2023 — 2026". Optional. */
  period?: string
  title: string
  subtitle?: string
  detail?: string
}

export interface ContactLink {
  label: string
  value: string
  href: string
}

export interface Stat {
  /** Keep short — 2-4 characters reads best at display size. */
  value: string
  label: string
}

export interface HeadlineLine {
  text: string
  /** Renders in the gold→champagne gradient. Use on one line only. */
  emphasis?: boolean
}

export interface CertificationGroup {
  title: string
  items: string[]
}

export const hero = {
  name: 'Isha Nashir Shaikh',

  /** Drives the animated headline. Line breaks are deliberate, not wrapped. */
  headline: [
    { text: 'Isha Nashir' },
    { text: 'Shaikh', emphasis: true },
  ] satisfies HeadlineLine[],

  roles: [
    'Full-Stack Developer',
    'Data Science Enthusiast',
    'Generative AI',
  ],

  summary:
    'Passionate and detail-oriented BCA student with expertise in modern web ' +
    'development technologies and data analysis. Proven track record of building ' +
    'responsive web applications using React.js, Node.js, and various programming ' +
    'languages. Currently developing a live service platform while pursuing advanced ' +
    'knowledge in full-stack development. Seeking opportunities to contribute ' +
    'technical skills and innovative solutions to forward-thinking organizations.',
}

/**
 * Every figure is checkable against the arrays below — recount if you edit them:
 *   03   — entries in `projects`
 *   07   — entries across `certifications` (4 data science + 3 professional)
 *   21   — concrete technologies in `capabilities`: Languages 4 + Frontend 7 +
 *          Backend 4 + Tools 6. The Design and Competencies groups are excluded
 *          because they list disciplines and skills, not technologies.
 *   2026 — expected graduation
 */
export const stats: Stat[] = [
  { value: '03', label: 'Projects Built' },
  { value: '07', label: 'Certifications' },
  { value: '21', label: 'Technologies' },
  { value: '2026', label: 'Graduating' },
]

/**
 * Portrait for the hero. `src` accepts any of three forms — while it is null
 * the frame renders its reserved placeholder at the same 4:5 ratio, so
 * filling this in causes no layout shift.
 *
 *   1. Local file (best) — drop it in `public/`, then: src: '/portrait.jpg'
 *   2. Hosted URL        — src: 'https://example.com/portrait.jpg'
 *   3. Base64 data URI   — src: 'data:image/jpeg;base64,/9j/4AAQ…'
 */
export const portrait: { src: string | null; alt: string } = {
  src: '/portrait.jpg',
  alt: 'Isha Nashir Shaikh',
}

/** Groups mirror the résumé's Technical Expertise and Core Competencies. */
export const capabilities: SkillGroup[] = [
  {
    title: 'Languages',
    description:
      'Core programming languages used across coursework and project work.',
    skills: ['C', 'C++', 'Python', 'JavaScript'],
  },
  {
    title: 'Frontend',
    description:
      'Building responsive, component-driven interfaces for the browser.',
    // React Router, Axios and Tailwind CSS added 2026-08-17 — all three are in
    // active use in the Article Web App repo but absent from the résumé.
    skills: [
      'HTML5',
      'CSS3',
      'React.js',
      'React Router',
      'Axios',
      'Tailwind CSS',
      'Bootstrap 5',
    ],
  },
  {
    title: 'Backend',
    description:
      'Server-side logic, data persistence, and caching for web applications.',
    // Express added 2026-08-17 — it powers the Article Web App's REST API.
    skills: ['Node.js', 'Express', 'SQL (Basic)', 'Redis'],
  },
  {
    title: 'Tools',
    description:
      'Development, analysis, and publishing environments used day to day.',
    // Vite added 2026-08-17 — the build tool behind the news reader.
    skills: [
      'VS Code',
      'Vite',
      'MATLAB',
      'Jupyter Notebook',
      'WordPress',
      'Excel',
    ],
  },
  {
    title: 'Design',
    description:
      'Interface design and layout that adapts across screen sizes.',
    skills: ['UI/UX Design', 'Responsive Web Design'],
  },
  {
    title: 'Competencies',
    description:
      'Applied technical strengths carried across every project below.',
    skills: [
      'Problem-solving',
      'Analytical thinking',
      'API integration',
      'Database management',
    ],
  },
]

/**
 * Professional Skills from the résumé's Core Competencies section.
 *
 * Rendered as a full-width band closing the capabilities grid rather than a
 * seventh card: the grid is a 3x2, and a lone seventh cell would leave two
 * empty boxes with hairline borders on one side. These also aren't a peer
 * category — they apply across all six groups above.
 *
 * Deliberately excluded from the "Technologies" stat, which counts tools only.
 */
export const professionalSkills = {
  title: 'Professional',
  // Avoid echoing the Competencies card directly above, which already says
  // "carried across every project".
  description: 'How the work gets organised, communicated and delivered.',
  skills: [
    'Strong communication',
    'Team collaboration',
    'Time management',
    'Project organization',
    'Presentation skills',
  ],
}

export const projects: Project[] = [
  {
    // Leads the list deliberately: it's the only project with a real backend,
    // and so the only one that substantiates "Full-Stack Developer" in the hero.
    // Verified against the repo on 2026-08-17 — Express API (GET /articles and
    // GET /articles/:id) consumed over HTTP by a React SPA with client-side
    // routing. Articles are a hardcoded array in server.js, so "full-stack" is
    // claimed for the architecture, not for persistence.
    title: 'Article Web App',
    description:
      'A full-stack article platform pairing an Express REST API with a React ' +
      'single-page app — article listing, client-side routing, and individual ' +
      'detail views fetched per article.',
    stack: ['React', 'Express', 'React Router', 'Axios', 'Tailwind CSS'],
    repo: 'https://github.com/isha-shaikh/Article-Web-App',
  },
  {
    title: 'News Magazine Website',
    // Description and stack verified against the repo on 2026-08-17, not taken
    // from the résumé. The résumé called this "full-stack ... content
    // management", but package.json lists only react and react-dom — there is
    // no server, database or CMS. It's a frontend client for a public API.
    // NB: the navbar renders a search input, but it has no handlers or state
    // attached — it's presentational only, so search is NOT claimed here.
    description:
      'A React news reader pulling live headlines from the NewsAPI, with ' +
      'category filtering across technology, business, health and sports.',
    stack: ['React.js', 'Vite', 'NewsAPI'],
    repo: 'https://github.com/isha-shaikh/news-magazine',
  },
  {
    title: 'Employee List Management System',
    // Verified against the repo on 2026-08-17. The résumé claimed "complete
    // CRUD operations", but the source has only two handlers, both bulk
    // employees.map() updates behind "Promote All" and "Hike All" — no create,
    // no delete, no persistence. Described as what it actually does.
    description:
      'A React employee directory with bulk promotion and salary actions ' +
      'applied across all records, built with React Bootstrap in a ' +
      'responsive card layout.',
    stack: ['React.js', 'React Bootstrap', 'CSS'],
    repo: 'https://github.com/isha-shaikh/Employee-List',
  },
  // The E-commerce Website row was removed on 2026-08-17. There is no repo for
  // it on the GitHub account, so it could not be linked or verified, and its
  // stack was guesswork. Isha's own description is preserved here in case the
  // project is pushed later and the row is restored:
  //
  //   'A shopping app built with Claude AI as a development partner —
  //    covering product browsing, cart functionality, and a clean, responsive
  //    interface designed for a smooth checkout experience.'
]

/**
 * Work history. Empty because the résumé contains no employment or internship
 * entries — Isha is a current BCA student. The Experience section hides itself
 * entirely while this array is empty; add entries and it appears automatically.
 */
export const experience: TimelineItem[] = []

export const education: TimelineItem[] = [
  {
    // The résumé gives no start year — only "3rd year" and the 2026 graduation
    // date. Don't add one here unless it's confirmed.
    period: '3rd Year · Expected 2026',
    title: 'MIT Vishwaprayag University, Solapur',
    subtitle: 'Bachelor of Computer Applications (BCA)',
    detail: 'Currently in third year. Expected graduation 2026.',
  },
]

export const certifications: CertificationGroup[] = [
  {
    title: 'Data Science & Analytics',
    // Résumé marks this whole group "All Coursera".
    items: [
      'What is Data Science? — Coursera',
      'Tools for Data Science — Coursera',
      'Python for Data Science, AI & Development — Coursera',
      'Statistics and Data Analysis — Coursera',
    ],
  },
  {
    title: 'Professional Development',
    // Résumé marks Excel and Email Etiquette as Coursera; UI/UX Design has no
    // provider stated, so none is claimed here.
    items: [
      'Excel Essentials and Beyond — Coursera',
      'UI/UX Design',
      'Email Etiquette — Coursera',
    ],
  },
]

export const contact = {
  email: 'ishashaikh2003@gmail.com',
  links: [
    {
      label: 'Phone',
      value: '+91 97674 44567',
      href: 'tel:+919767444567',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/isha-shaikh-7aba712a5',
      href: 'https://www.linkedin.com/in/isha-shaikh-7aba712a5',
    },
    {
      label: 'Location',
      value: 'Solapur, Maharashtra, India',
      href: '#',
    },
  ] satisfies ContactLink[],
}
