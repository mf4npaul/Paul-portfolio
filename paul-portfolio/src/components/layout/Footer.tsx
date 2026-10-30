import { Link } from 'react-router-dom'
import { Link2, Mail, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { getSocialLinks, navItems, siteConfig } from '../../config/site'

const icons = { github: GithubIcon, linkedin: LinkedinIcon, other: Link2 }

export function Footer() {
  const socials = getSocialLinks()
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">{siteConfig.fullName}</p>
          <p className="mt-3 max-w-sm text-muted">{siteConfig.shortBio}</p>
          <p className="mt-4 text-sm text-muted">{siteConfig.location}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-lg font-bold">Explore</p>
          <ul className="mt-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-flex min-h-10 items-center text-muted no-underline hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg font-bold">Get in touch</p>
          <ul className="mt-3 space-y-1">
            <li>
              <Link to="/contact" className="inline-flex min-h-10 items-center gap-2 text-muted no-underline hover:text-ink">
                <Mail size={18} aria-hidden="true" /> Contact form
              </Link>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-10 items-center gap-2 text-muted no-underline hover:text-ink">
                  <Mail size={18} aria-hidden="true" /> {siteConfig.email}
                </a>
              </li>
            )}
            {socials.map((s) => {
              const Icon = icons[s.kind]
              return (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-muted no-underline hover:text-ink">
                    <Icon size={18} aria-hidden="true" /> {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
            {siteConfig.resumePath && (
              <li>
                <a href={siteConfig.resumePath} download className="inline-flex min-h-10 items-center gap-2 text-muted no-underline hover:text-ink">
                  <Download size={18} aria-hidden="true" /> Download résumé
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-sm text-muted">
          © {new Date().getFullYear()} {siteConfig.fullName}. Built with React, TypeScript and Tailwind CSS.
        </p>
      </div>
    </footer>
  )
}
