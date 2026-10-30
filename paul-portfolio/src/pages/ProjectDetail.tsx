import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CircleDashed, LoaderCircle } from 'lucide-react'
import { Seo } from '../components/Seo'
import { StatusBadge, TechBadge } from '../components/ui/Badge'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { ProjectLinks } from '../components/project/ProjectLinks'
import { ProjectVisual } from '../components/project/ProjectVisual'
import { ProjectGallery } from '../components/project/ProjectGallery'
import { categoryLabel } from '../data/categories'
import { getNeighbours, getProjectBySlug, isBuilt } from '../lib/projects'
import type { FeatureState } from '../types/project'
import NotFound from './NotFound'

const featureState: Record<FeatureState, { label: string; Icon: typeof Check; className: string }> = {
  done: { label: 'Done', Icon: Check, className: 'text-ok' },
  'in-progress': { label: 'In progress', Icon: LoaderCircle, className: 'text-warn' },
  planned: { label: 'Planned', Icon: CircleDashed, className: 'text-muted' },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  if (!project) return <NotFound title="Project not found" message="There is no project at this address. It may have been renamed or removed." />

  const cs = project.caseStudy
  const built = isBuilt(project)
  const { previous, next } = getNeighbours(project.slug)

  return (
    <>
      <Seo title={`${project.title} case study`} path={`/projects/${project.slug}`} description={project.shortDescription} />

      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 pb-14 pt-10 sm:pt-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Link to="/projects" className="inline-flex min-h-11 items-center gap-2 font-medium text-muted no-underline hover:text-ink">
              <ArrowLeft size={18} aria-hidden="true" /> All projects
            </Link>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="text-sm text-muted">{categoryLabel(project.category)}</span>
            </div>
            <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.25rem)]">{project.title}</h1>
            <p className="mt-3 text-xl text-muted">{project.tagline}</p>
            <p className="mt-6 max-w-xl text-lg">{project.longDescription}</p>
            <div className="mt-8">
              <ProjectLinks project={project} size="lg" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-2 shadow-card">
            <ProjectVisual project={project} priority className="aspect-[8/5] w-full rounded-xl" />
          </div>
        </div>
      </header>

      <div className="container-page pb-6">
        <CaseStudySection id="overview" title="Overview">
          <p className="max-w-2xl text-lg">{cs.overview}</p>
          <dl className="grid max-w-2xl gap-5 pt-2 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-muted">Status</dt>
              <dd className="mt-1">{built ? 'Live and usable.' : project.status === 'in-development' ? 'In development. Features below are marked by what exists.' : 'Planned. This is a concept and roadmap, not a finished app.'}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-muted">My role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
          </dl>
        </CaseStudySection>

        <CaseStudySection id="problem" title="The problem">
          <p className="max-w-2xl text-lg">{cs.problem}</p>
        </CaseStudySection>

        <CaseStudySection id="goals" title="Goals and requirements">
          <ul className="max-w-2xl list-disc space-y-3 pl-5 marker:text-accent">
            {cs.goals.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="design" title="Design decisions">
          <ul className="grid gap-5">
            {cs.designDecisions.map((d) => (
              <li key={d.title} className="max-w-2xl rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <h3 className="text-xl">{d.title}</h3>
                <p className="mt-2 text-muted">{d.body}</p>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="architecture" title="Technical architecture">
          <p className="max-w-2xl text-lg">{cs.architecture.summary}</p>
          <ol className="max-w-2xl divide-y divide-line border-y border-line" aria-label="Architecture layers">
            {cs.architecture.layers.map((l, i) => (
              <li key={l.name} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <span className="font-display text-lg font-bold">
                  <span className="sr-only">Layer {i + 1}: </span>
                  {l.name}
                </span>
                <span className="text-muted">{l.description}</span>
              </li>
            ))}
          </ol>
        </CaseStudySection>

        <CaseStudySection id="stack" title="Technology stack">
          <ul className="flex flex-wrap gap-2.5" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t}>
                <TechBadge>{t}</TechBadge>
              </li>
            ))}
          </ul>
          {!built && <p className="text-sm text-muted">This is the intended stack and may change as the project develops.</p>}
        </CaseStudySection>

        <CaseStudySection id="features" title={built ? 'Major features' : 'Planned features'}>
          {!built && (
            <p className="max-w-2xl text-muted">
              Nothing here is claimed as finished unless it is marked Done.
            </p>
          )}
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((f) => {
              const st = featureState[f.state]
              return (
                <li key={f.title} className="rounded-[var(--radius-control)] border border-line bg-surface p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{f.title}</p>
                    <span className={`inline-flex shrink-0 items-center gap-1.5 text-sm font-medium ${st.className}`}>
                      <st.Icon size={16} aria-hidden="true" />
                      {st.label}
                    </span>
                  </div>
                  {f.description && <p className="mt-1.5 text-[0.95rem] text-muted">{f.description}</p>}
                </li>
              )
            })}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="challenges" title={built ? 'Challenges and solutions' : 'Challenges to solve'}>
          <ul className="grid gap-5">
            {cs.challenges.map((c) => (
              <li key={c.challenge} className="max-w-2xl rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <h3 className="text-xl">{c.challenge}</h3>
                <p className="mt-3">
                  <span className="font-semibold">{built ? 'Solution: ' : 'Planned approach: '}</span>
                  {c.approach}
                </p>
                {c.tradeOff && (
                  <p className="mt-2 text-muted">
                    <span className="font-semibold text-ink">Trade-off: </span>
                    {c.tradeOff}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="previews" title="Screenshots and previews">
          <ProjectGallery project={project} />
        </CaseStudySection>

        <CaseStudySection id="lessons" title={built ? 'Lessons learned' : 'What I aim to learn'}>
          <ul className="max-w-2xl list-disc space-y-3 pl-5 marker:text-accent">
            {cs.learnings.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection id="future" title="Future improvements">
          <ul className="max-w-2xl list-disc space-y-3 pl-5 marker:text-accent">
            {cs.futureImprovements.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </CaseStudySection>
      </div>

      {previous && next && (
        <nav aria-label="More projects" className="border-t border-line bg-surface">
          <div className="container-page grid gap-px sm:grid-cols-2">
            <Link to={`/projects/${previous.slug}`} className="group flex min-h-28 flex-col justify-center gap-1 py-8 no-underline sm:pr-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                <ArrowLeft size={16} aria-hidden="true" /> Previous project
              </span>
              <span className="font-display text-2xl font-bold group-hover:text-accent">{previous.title}</span>
            </Link>
            <Link to={`/projects/${next.slug}`} className="group flex min-h-28 flex-col justify-center gap-1 border-t border-line py-8 no-underline sm:items-end sm:border-l sm:border-t-0 sm:pl-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                Next project <ArrowRight size={16} aria-hidden="true" />
              </span>
              <span className="font-display text-2xl font-bold group-hover:text-accent">{next.title}</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  )
}
