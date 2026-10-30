import { Link } from 'react-router-dom'
import { ArrowUpRight, Globe } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { StatusBadge, TechBadge } from '../ui/Badge'
import { ProjectVisual } from './ProjectVisual'
import { categoryLabel } from '../../data/categories'
import { isValidUrl } from '../../lib/projects'
import type { Project } from '../../types/project'

interface Props {
  project: Project
  /** Load the preview immediately (use for the first row on a page). */
  priority?: boolean
}

const MAX_BADGES = 5

export function ProjectCard({ project, priority }: Props) {
  const to = `/projects/${project.slug}`
  const extra = project.technologies.length - MAX_BADGES
  const hasLive = isValidUrl(project.liveUrl)
  const hasCode = isValidUrl(project.githubUrl)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card focus-within:border-accent">
      <Link to={to} tabIndex={-1} aria-hidden="true" className="relative block overflow-hidden border-b border-line bg-surface-2">
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <ProjectVisual project={project} priority={priority} />
        </div>
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={project.status} />
        </div>
        {!project.thumbnail && (
          <span className="absolute bottom-3 left-3 rounded-full bg-bg/85 px-3 py-1 text-xs font-medium text-muted">
            Concept preview
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-sm font-medium text-muted">{categoryLabel(project.category)}</p>
          <h3 className="mt-1 text-2xl">
            <Link to={to} className="no-underline hover:text-accent">
              {project.title}
            </Link>
          </h3>
          <p className="mt-1 text-[0.95rem] text-muted">{project.tagline}</p>
        </div>

        <p className="text-[0.98rem]">{project.shortDescription}</p>

        <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.technologies.slice(0, MAX_BADGES).map((t) => (
            <li key={t}>
              <TechBadge>{t}</TechBadge>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <span className="inline-flex items-center rounded-full px-2 py-1 text-[0.8rem] text-muted">+{extra} more</span>
            </li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
          <Link
            to={to}
            className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-accent no-underline hover:underline"
          >
            View case study
            <ArrowUpRight size={18} aria-hidden="true" />
            <span className="sr-only"> for {project.title}</span>
          </Link>
          {hasLive && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink no-underline hover:text-accent"
            >
              <Globe size={16} aria-hidden="true" /> Live demo<span className="sr-only"> of {project.title}</span>
            </a>
          )}
          {hasCode && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-ink no-underline hover:text-accent"
            >
              <GithubIcon size={16} /> Source code<span className="sr-only"> of {project.title}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
