import { ArrowUpRight, Globe } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { isValidUrl } from '../../lib/projects'
import type { Project } from '../../types/project'

/**
 * Renders only the links that really exist. A project without a live demo or
 * repository simply shows no button for it. Nothing is ever a dead link.
 */
export function ProjectLinks({ project, size = 'md' }: { project: Project; size?: 'md' | 'lg' }) {
  const hasLive = isValidUrl(project.liveUrl)
  const hasCode = isValidUrl(project.githubUrl)
  const related = project.relatedLink && isValidUrl(project.relatedLink.url) ? project.relatedLink : undefined
  if (!hasLive && !hasCode && !related) return null

  return (
    <div className="flex flex-wrap gap-3">
      {hasLive && (
        <Button href={project.liveUrl!} size={size} icon={<Globe size={18} aria-hidden="true" />}>
          Live demo
        </Button>
      )}
      {hasCode && (
        <Button href={project.githubUrl!} size={size} variant="secondary" icon={<GithubIcon size={18} />}>
          Source code
        </Button>
      )}
      {related && (
        <Button href={related.url} size={size} variant="secondary" icon={<ArrowUpRight size={18} aria-hidden="true" />}>
          {related.label}
        </Button>
      )}
    </div>
  )
}
