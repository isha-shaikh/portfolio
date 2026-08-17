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
 * Derived from the résumé so every figure is checkable:
 *   03   — projects in the résumé portfolio
 *   07   — certifications listed (4 data science + 3 professional)
 *   16   — named technologies across the technical expertise section
 *   2026 — expected graduation
 * Update these if any of the above changes.
 */
export const stats: Stat[] = [
  { value: '03', label: 'Projects Built' },
  { value: '07', label: 'Certifications' },
  { value: '16', label: 'Technologies' },
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
    skills: ['HTML5', 'CSS3', 'React.js', 'Bootstrap 5'],
  },
  {
    title: 'Backend',
    description:
      'Server-side logic, data persistence, and caching for web applications.',
    skills: ['Node.js', 'SQL (Basic)', 'Redis'],
  },
  {
    title: 'Tools',
    description:
      'Development, analysis, and publishing environments used day to day.',
    skills: ['VS Code', 'MATLAB', 'Jupyter Notebook', 'WordPress', 'Excel'],
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

export const projects: Project[] = [
  {
    title: 'News Magazine Website',
    description:
      'Full-stack web application for dynamic news content management.',
    // No stack listed: the résumé states none for this project. React.js and
    // Node.js appear only in the general summary, so attributing them here
    // would be a guess. Add the real stack once confirmed.
    repo: 'https://github.com/isha-shaikh/news-magazine.git',
  },
  {
    title: 'Employee List Management System',
    description:
      'Web-based employee records management application with complete CRUD ' +
      'operations and an intuitive user interface, built responsively.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/isha-shaikh/Employee-List.git',
  },
  {
    title: 'E-commerce Website',
    // ⚠️ Written as a stand-in at Isha's request — the résumé gives only
    // "E-commerce website: Using Claude AI", so this describes the project in
    // general terms without claiming specific features. Replace with the real
    // detail, and add `repo` / `live` URLs, when available.
    description:
      'An online storefront built with AI-assisted development, using Claude ' +
      'to move from interface layout through to application logic.',
    stack: ['Claude AI'],
  },
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
