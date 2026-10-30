import { cn } from '../../lib/cn'
import type { CategoryFilter } from '../../lib/projects'

interface FilterOption {
  id: CategoryFilter
  label: string
  count: number
}

interface Props {
  options: FilterOption[]
  active: CategoryFilter
  onChange: (id: CategoryFilter) => void
}

/** Category buttons. Uses aria-pressed so screen readers announce which filter is on. */
export function ProjectFilters({ options, active, onChange }: Props) {
  return (
    <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const isActive = o.id === active
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(o.id)}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[0.92rem] font-semibold transition-colors duration-200 active:scale-[0.97]',
              isActive
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line bg-surface text-ink hover:border-accent',
            )}
          >
            {o.label}
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-bold',
                isActive ? 'bg-accent-ink/15' : 'bg-surface-2 text-muted',
              )}
            >
              {o.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
