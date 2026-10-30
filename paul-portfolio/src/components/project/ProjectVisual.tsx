import type { Project } from '../../types/project'
import { ProjectMockup } from './ProjectMockup'

interface Props {
  project: Project
  /** Load immediately (above the fold) instead of lazily. */
  priority?: boolean
  className?: string
}

/** Shows the project's real screenshot if one is configured, otherwise the built-in concept illustration. */
export function ProjectVisual({ project, priority = false, className }: Props) {
  if (project.thumbnail) {
    return (
      <img
        src={project.thumbnail.src}
        alt={project.thumbnail.alt}
        width={1600}
        height={1000}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className ?? 'aspect-[8/5] size-full object-cover'}
      />
    )
  }
  return (
    <ProjectMockup
      kind={project.mockup}
      label={`Concept illustration of the ${project.title} interface`}
      className={className ?? 'aspect-[8/5] size-full'}
    />
  )
}
