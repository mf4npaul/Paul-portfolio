import type { ReactNode } from 'react'

interface Props {
  id: string
  title: string
  children: ReactNode
}

/** One block of a case study: heading on the left, content on the right (stacked on mobile). */
export function CaseStudySection({ id, title, children }: Props) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className="grid gap-6 border-t border-line py-12 md:grid-cols-[13rem_1fr] md:gap-12 lg:grid-cols-[16rem_1fr]">
      <h2 id={headingId} className="text-2xl md:sticky md:top-24 md:self-start">
        {title}
      </h2>
      <div className="min-w-0 space-y-5">{children}</div>
    </section>
  )
}
