import type { ReactNode } from 'react'

interface Props {
  title: string
  intro?: string
  action?: ReactNode
  id?: string
}

export function SectionHeading({ title, intro, action, id }: Props) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-2xl">
        <h2 id={id} className="text-[clamp(2rem,4.5vw,3.25rem)]">
          {title}
        </h2>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  )
}
