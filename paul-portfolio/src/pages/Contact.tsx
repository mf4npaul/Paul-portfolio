import { Download, Mail, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { ContactForm } from '../components/contact/ContactForm'
import { getSocialLinks, siteConfig } from '../config/site'

const socialIcons = { github: GithubIcon, linkedin: LinkedinIcon, other: Mail }

export default function Contact() {
  const socials = getSocialLinks()
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Get in touch with Paul Victor about software development roles, freelance work or collaboration."
      />
      <PageHeader
        title="Let's talk"
        intro="Tell me about the role, the project or the idea. I read every message and reply to the email address you give."
      />

      <div className="container-page grid gap-14 py-14 sm:py-20 lg:grid-cols-[1fr_1.35fr]">
        <aside aria-label="Contact details" className="space-y-8">
          <p className="text-lg">{siteConfig.availability}</p>
          <ul className="space-y-1">
            <li className="flex min-h-11 items-center gap-3">
              <MapPin size={20} className="text-accent" aria-hidden="true" /> {siteConfig.location}
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="inline-flex min-h-11 items-center gap-3 no-underline hover:text-accent">
                  <Mail size={20} className="text-accent" aria-hidden="true" /> {siteConfig.email}
                </a>
              </li>
            )}
            {socials.map((s) => {
              const Icon = socialIcons[s.kind]
              return (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 no-underline hover:text-accent">
                    <Icon size={20} className="text-accent" /> {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
            {siteConfig.resumePath && (
              <li>
                <a href={siteConfig.resumePath} download className="inline-flex min-h-11 items-center gap-3 no-underline hover:text-accent">
                  <Download size={20} className="text-accent" aria-hidden="true" /> Download résumé
                </a>
              </li>
            )}
          </ul>
        </aside>

        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:p-9">
          <h2 className="mb-6 text-2xl">Send a message</h2>
          <ContactForm endpoint={siteConfig.contactFormEndpoint} fallbackEmail={siteConfig.email || undefined} />
        </div>
      </div>
    </>
  )
}
