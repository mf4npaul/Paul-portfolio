import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { ProjectCard } from '../components/project/ProjectCard'
import { ProjectFilters } from '../components/project/ProjectFilters'
import { projects } from '../data/projects'
import { filterProjects, getAvailableCategories, type CategoryFilter } from '../lib/projects'

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const available = useMemo(() => getAvailableCategories(projects), [])

  // The filter lives in the URL (?category=e-commerce) so it survives refresh and can be shared.
  const requested = params.get('category')
  const active: CategoryFilter = available.some((c) => c.id === requested) ? (requested as CategoryFilter) : 'all'

  const visible = filterProjects(projects, active)
  const options = [
    { id: 'all' as const, label: 'All projects', count: projects.length },
    ...available.map((c) => ({ id: c.id, label: c.label, count: filterProjects(projects, c.id).length })),
  ]

  const onChange = (id: CategoryFilter) => {
    if (id === 'all') setParams({}, { replace: true })
    else setParams({ category: id }, { replace: true })
  }

  return (
    <>
      <Seo
        title="Projects"
        path="/projects"
        description="Six full-stack, real-time, dashboard and cloud projects by Paul Victor, each with a case study and an honest status."
      />
      <PageHeader
        title="Projects"
        intro="Six applications that each practise a different part of software engineering. Every one shows its real status, so you can see what is built and what is still on the roadmap."
      />

      <section className="container-page py-12 sm:py-16" aria-label="Project gallery">
        <ProjectFilters options={options} active={active} onChange={onChange} />

        <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-line p-10 text-center">
            <p className="text-lg">No projects in this category yet.</p>
            <Button className="mt-5" variant="secondary" onClick={() => onChange('all')}>
              Show all projects
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.2) }}
                >
                  <ProjectCard project={p} priority={i < 3} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </section>
    </>
  )
}
