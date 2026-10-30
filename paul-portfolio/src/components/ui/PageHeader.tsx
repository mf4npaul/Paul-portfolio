import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  intro?: ReactNode
  children?: ReactNode
}

/** Shared top-of-page block for inner pages (About, Projects, Skills...). */
export function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-page relative pb-14 pt-16 sm:pb-20 sm:pt-24">
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,5.25rem)]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">{intro}</p>}
        {children}
      </div>
    </header>
  )
}
