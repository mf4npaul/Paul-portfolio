import { Seo } from '../components/Seo'
import { Button } from '../components/ui/Button'

interface Props {
  title?: string
  message?: string
}

export default function NotFound({
  title = 'Page not found',
  message = 'The page you are looking for does not exist or has moved.',
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <Seo title={title} noindex />
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-page relative flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="font-display text-[clamp(6rem,22vw,15rem)] font-extrabold leading-none tracking-tighter text-accent" aria-hidden="true">
          404
        </p>
        <h1 className="mt-2 text-[clamp(2rem,5vw,3.5rem)]">{title}</h1>
        <p className="mt-4 max-w-md text-lg text-muted">{message}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/" size="lg">
            Back to home
          </Button>
          <Button to="/projects" size="lg" variant="secondary">
            Browse projects
          </Button>
        </div>
      </div>
    </section>
  )
}
