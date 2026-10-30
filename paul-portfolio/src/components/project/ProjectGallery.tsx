import type { Project } from '../../types/project'

/** Screenshots for a project, or one honest concept illustration while no screenshots exist. */
export function ProjectGallery({ project }: { project: Project }) {
  if (project.gallery && project.gallery.length > 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {project.gallery.map((img) => (
          <figure key={img.src} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              width={1600}
              height={1000}
              className="aspect-[8/5] w-full object-cover"
            />
            {img.caption && <figcaption className="border-t border-line p-4 text-sm text-muted">{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    )
  }
  return (
    <p className="rounded-[var(--radius-control)] border border-dashed border-line p-5 text-muted">
      Screenshots of {project.title} will appear here as the project is built. The illustration at the top of this page is an interface concept, not a capture of a working app.
    </p>
  )
}
