import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, Download, MapPin } from 'lucide-react'
import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/project/ProjectCard'
import { ProjectMockup } from '../components/project/ProjectMockup'
import { siteConfig } from '../config/site'
import { skillGroups } from '../data/skills'
import { education, experience } from '../data/experience'
import { getFeaturedProjects } from '../lib/projects'

const ease = [0.22, 1, 0.36, 1] as const
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export default function Home() {
  const featured = getFeaturedProjects()

  return (
    <>
      <Seo path="/" />

      {/* HERO: the one orchestrated entrance on the site */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pb-24 lg:pt-16">
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.09 }}>
            <motion.p variants={item} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium">
              <MapPin size={16} aria-hidden="true" className="text-accent" />
              {siteConfig.title} in {siteConfig.location}
            </motion.p>
            <motion.h1 variants={item} className="mt-7 text-[clamp(2.7rem,6vw,4.75rem)] leading-[1.02]">
              {siteConfig.headline}
            </motion.h1>
            <motion.p variants={item} className="mt-7 max-w-xl text-lg text-muted sm:text-xl">
              {siteConfig.intro}
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Button to="/projects" size="lg">
                Explore my work
              </Button>
              <Button to="/contact" size="lg" variant="secondary">
                Let&apos;s talk
              </Button>
              {siteConfig.resumePath && (
                <Button href={siteConfig.resumePath} download size="lg" variant="ghost" icon={<Download size={18} aria-hidden="true" />}>
                  Download résumé
                </Button>
              )}
            </motion.div>
            <motion.p variants={item} className="mt-6 text-sm text-muted">
              {siteConfig.availability}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="relative mx-auto w-full max-w-[34rem]"
          >
            <figure>
              <div className="rounded-[var(--radius-card)] border border-line bg-surface p-2 shadow-card">
                <ProjectMockup kind="kanban" label="Concept illustration of the DevFlow project board" className="w-full" />
              </div>
              <div className="absolute -bottom-8 -left-3 w-[46%] rounded-2xl border border-line bg-surface p-1.5 shadow-card sm:-left-8">
                <ProjectMockup kind="storefront" label="Concept illustration of the Ikeja Online storefront" className="w-full" />
              </div>
              <figcaption className="mt-4 pl-[50%] text-sm text-muted sm:pl-[46%]">
                Interface concepts for DevFlow and Ikeja Online 2.0, both in development.
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="section-pad" aria-labelledby="selected-work">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="selected-work"
              title="Selected projects"
              intro="Three of the applications I am building. Each one is clearly marked with its real status."
              action={
                <Button to="/projects" variant="secondary" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                  See all projects
                </Button>
              }
            />
          </Reveal>
          <ul className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <li key={p.id}>
                <Reveal delay={i * 0.08} className="h-full">
                  <ProjectCard project={p} priority={i === 0} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INTRO + SKILLS */}
      <section className="section-pad border-y border-line bg-surface" aria-labelledby="what-i-do">
        <div className="container-page grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 id="what-i-do" className="text-[clamp(2rem,4.5vw,3.25rem)]">
              A developer who cares how it looks and how it works.
            </h2>
            <p className="mt-6 max-w-lg text-lg text-muted">{siteConfig.shortBio}</p>
            <Link to="/about" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent no-underline hover:underline">
              More about me <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="divide-y divide-line border-y border-line">
              {skillGroups.map((g) => (
                <li key={g.id} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <h3 className="text-xl">{g.title}</h3>
                  <p className="text-muted">{g.skills.map((s) => s.name).join(', ')}</p>
                </li>
              ))}
            </ul>
            <Link to="/skills" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent no-underline hover:underline">
              How I use these tools <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE + EDUCATION PREVIEW */}
      <section className="section-pad" aria-labelledby="background">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="background"
              title="Background"
              action={
                <Button to="/experience" variant="secondary" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
                  Full experience and education
                </Button>
              }
            />
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <h3 className="text-2xl">Experience</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {experience.slice(0, 3).map((e) => (
                  <li key={e.id} className="py-4">
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-muted">{e.organisation}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-2xl">Education</h3>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {education.map((e) => (
                  <li key={e.id} className="py-4">
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-muted">{e.organisation}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-line bg-surface" aria-labelledby="cta">
        <div className="container-page section-pad flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 id="cta" className="text-[clamp(2rem,5vw,3.75rem)]">
              Have a role or a project in mind?
            </h2>
            <p className="mt-4 text-lg text-muted">
              I am open to software development roles and freelance work. Send me a message and I will reply.
            </p>
          </div>
          <Button to="/contact" size="lg">
            Start a conversation
          </Button>
        </div>
      </section>
    </>
  )
}
