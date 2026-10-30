import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { skillGroups, skillLevels, type SkillLevel } from '../data/skills'
import { cn } from '../lib/cn'

const dot: Record<SkillLevel, string> = {
  core: 'bg-ok',
  growing: 'bg-warn',
  learning: 'bg-info',
}

export default function Skills() {
  return (
    <>
      <Seo
        title="Skills"
        path="/skills"
        description="Frontend, backend and infrastructure skills, grouped by how I actually use them: working with regularly, building experience, or currently learning."
      />
      <PageHeader
        title="Skills"
        intro="Grouped by what I build with them, and labelled honestly: some tools I use every day, others I am still learning. No scores or progress bars, because they would not mean anything."
      >
        <dl className="mt-10 grid gap-4 sm:grid-cols-3">
          {(Object.keys(skillLevels) as SkillLevel[]).map((k) => (
            <div key={k} className="flex gap-3">
              <span aria-hidden="true" className={cn('mt-2 size-3 shrink-0 rounded-full', dot[k])} />
              <div>
                <dt className="font-semibold">{skillLevels[k].label}</dt>
                <dd className="text-sm text-muted">{skillLevels[k].description}</dd>
              </div>
            </div>
          ))}
        </dl>
      </PageHeader>

      <div className="container-page pb-8 pt-4">
        {skillGroups.map((g) => (
          <Reveal key={g.id}>
            <CaseStudySection id={g.id} title={g.title}>
              <p className="max-w-2xl text-lg">{g.summary}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {g.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between gap-4 rounded-[var(--radius-control)] border border-line bg-surface px-4 py-3.5"
                  >
                    <span className="font-semibold">{s.name}</span>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm text-muted">
                      <span aria-hidden="true" className={cn('size-2.5 rounded-full', dot[s.level])} />
                      {skillLevels[s.level].label}
                    </span>
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          </Reveal>
        ))}
      </div>
    </>
  )
}
