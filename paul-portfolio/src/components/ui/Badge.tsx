import { cn } from '../../lib/cn'
import { statusLabels } from '../../lib/projects'
import type { ProjectStatus } from '../../types/project'

export function TechBadge({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface-2 px-3 py-1 text-[0.8rem] font-medium leading-none text-ink">
      {children}
    </span>
  )
}

const statusStyles: Record<ProjectStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-ok', text: 'text-ok' },
  'in-development': { dot: 'bg-warn', text: 'text-warn' },
  planned: { dot: 'bg-info', text: 'text-info' },
}

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const s = statusStyles[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8rem] font-semibold leading-none',
        s.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-2 rounded-full', s.dot)} />
      {statusLabels[status]}
    </span>
  )
}
