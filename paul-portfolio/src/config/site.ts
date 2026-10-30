/**
 * ───────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION: edit this file to change personal details.
 * ───────────────────────────────────────────────────────────────
 *  Anything left as an empty string ('') is treated as "not set" and the
 *  related button, link or icon is hidden automatically. Nothing is
 *  invented, so fill these in yourself with real, verified values.
 */

const env = import.meta.env

export const siteConfig = {
  fullName: 'Paul Mfonobong Victor',
  /** Short form used in the header and footer. */
  shortName: 'Paul Victor',
  initials: 'PV',
  title: 'Software Developer',
  location: 'Lagos, Nigeria',

  headline: 'Building digital products that look good and work even better.',
  intro:
    'I build responsive web experiences and practical software applications, with a growing focus on full-stack engineering, real-time systems and cloud technologies.',
  shortBio:
    'Software developer in Lagos who enjoys turning ideas into functional, well-designed web applications, and is expanding into backend engineering, cloud infrastructure and DevOps.',

  /** TODO: add your real email address, e.g. 'you@example.com'. */
  email: '',
  /** TODO: add your GitHub profile URL, e.g. 'https://github.com/your-username'. */
  githubUrl: '',
  /** TODO: add your LinkedIn profile URL. */
  linkedinUrl: '',
  /** Other links, e.g. { label: 'X', url: 'https://x.com/your-handle' }. */
  otherLinks: [] as { label: string; url: string }[],

  /**
   * Path to your résumé inside /public, e.g. '/Paul-Victor-Resume.pdf'.
   * Leave empty and the "Download résumé" buttons stay hidden.
   */
  resumePath: '',

  /** Production domain, set via VITE_SITE_URL (no trailing slash). Used for canonical URLs and Open Graph links. */
  siteUrl: ((env.VITE_SITE_URL as string | undefined) ?? '').replace(/\/+$/, ''),

  /** Form endpoint (e.g. Formspree), set via VITE_CONTACT_FORM_ENDPOINT. Empty = form shows "not connected". */
  contactFormEndpoint: ((env.VITE_CONTACT_FORM_ENDPOINT as string | undefined) ?? '').trim(),

  /** Default Open Graph image inside /public. */
  ogImage: '/og-image.png',

  /** Shown on the contact page and in the footer. */
  availability: 'Open to software development roles and freelance projects.',
}

export type SiteConfig = typeof siteConfig

/** Social/profile links that are actually configured. */
export function getSocialLinks(config: SiteConfig = siteConfig) {
  const links: { label: string; url: string; kind: 'github' | 'linkedin' | 'other' }[] = []
  if (config.githubUrl) links.push({ label: 'GitHub', url: config.githubUrl, kind: 'github' })
  if (config.linkedinUrl) links.push({ label: 'LinkedIn', url: config.linkedinUrl, kind: 'linkedin' })
  for (const l of config.otherLinks) if (l.url) links.push({ label: l.label, url: l.url, kind: 'other' })
  return links
}

export const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
] as const
