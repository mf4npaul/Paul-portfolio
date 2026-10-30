import { Briefcase, GraduationCap } from 'lucide-react'
import type { TimelineEntry } from '../../data/experience'

/**
 * A vertical list of experience or education entries.
 * Dates and durations only appear when they exist in the data, so nothing is invented.
 */
export function Timeline({ entries, label }: { entries: TimelineEntry[]; label: string }) {
  return (
    <ol aria-label={label} className="relative space-y-8 border-l border-line pl-8">
      {entries.map((e) => {
        const Icon = e.kind === 'education' ? GraduationCap : Briefcase
        const when = e.period ?? e.duration
        return (
          <li key={e.id} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[3.1rem] top-0 grid size-9 place-items-center rounded-full border border-line bg-surface text-accent"
            >
              <Icon size={17} />
            </span>
            <h3 className="text-xl">{e.title}</h3>
            <p className="mt-1 font-medium text-muted">{e.organisation}</p>
            {when && <p className="mt-1 text-sm text-muted">{when}</p>}
            <p className="mt-3 max-w-xl">{e.description}</p>
          </li>
        )
      })}
    </ol>
  )
}
