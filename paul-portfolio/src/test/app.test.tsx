import { describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { AppRoutes } from '../App'
import { ThemeProvider } from '../hooks/useTheme'

function renderAt(path: string) {
  return render(
    <ThemeProvider>
      <MotionConfig reducedMotion="always">
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </MotionConfig>
    </ThemeProvider>,
  )
}

describe('routing', () => {
  it('renders the home page with both calls to action', async () => {
    renderAt('/')
    expect(await screen.findByRole('heading', { level: 1, name: /look good and work even better/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '/projects')
    expect(screen.getByRole('link', { name: /let's talk/i })).toHaveAttribute('href', '/contact')
  })

  it.each([
    ['/about', /about me/i],
    ['/skills', /^skills$/i],
    ['/experience', /experience and education/i],
    ['/contact', /let's talk/i],
  ])('renders %s', async (path, name) => {
    renderAt(path)
    expect(await screen.findByRole('heading', { level: 1, name })).toBeInTheDocument()
  })

  it('renders a case study directly from its URL', async () => {
    renderAt('/projects/devflow')
    expect(await screen.findByRole('heading', { level: 1, name: 'DevFlow' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /technical architecture/i })).toBeInTheDocument()
    // no live demo / repo configured, so no such buttons exist
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /source code/i })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /next project/i })).toHaveAttribute('href', '/projects/ikeja-online')
  })

  it('shows the original-site reference link only where configured', async () => {
    renderAt('/projects/ikeja-online')
    expect(await screen.findByRole('link', { name: /original ikeja online marketplace/i })).toHaveAttribute('href', 'https://ikeja-online.onrender.com')
  })

  it('shows the 404 page for unknown routes and unknown projects', async () => {
    const first = renderAt('/no-such-page')
    expect(await screen.findByRole('heading', { level: 1, name: /page not found/i })).toBeInTheDocument()
    first.unmount()
    renderAt('/projects/does-not-exist')
    expect(await screen.findByRole('heading', { level: 1, name: /project not found/i })).toBeInTheDocument()
  })
})

describe('projects page', () => {
  it('shows all six projects, then filters by category', async () => {
    const user = userEvent.setup()
    renderAt('/projects')
    await screen.findByRole('heading', { level: 1, name: /^projects$/i })
    expect(screen.getAllByRole('article')).toHaveLength(6)

    await user.click(screen.getByRole('button', { name: /e-commerce/i }))
    // Cards that are filtered out fade away first (exit animation), then leave the page.
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(1))
    const cards = screen.getAllByRole('article')
    expect(within(cards[0]!).getByRole('heading', { name: /ikeja online 2.0/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /e-commerce/i })).toHaveAttribute('aria-pressed', 'true')

    await user.click(screen.getByRole('button', { name: /all projects/i }))
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(6))
  })

  it('marks every project with an honest status badge', async () => {
    renderAt('/projects')
    await screen.findByRole('heading', { level: 1, name: /^projects$/i })
    expect(screen.getAllByText('In development').length).toBe(3)
    expect(screen.getAllByText('Planned').length).toBe(3)
    expect(screen.queryByText('Live')).not.toBeInTheDocument()
  })
})

describe('theme switching', () => {
  it('toggles the data-theme attribute', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await screen.findByRole('heading', { level: 1 })
    const html = document.documentElement
    expect(html.getAttribute('data-theme')).toBe('dark')
    await user.click(screen.getByRole('button', { name: /switch to light theme/i }))
    expect(html.getAttribute('data-theme')).toBe('light')
    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }))
    expect(html.getAttribute('data-theme')).toBe('dark')
  })
})

describe('mobile navigation', () => {
  it('opens, lists every page, and closes with Escape', async () => {
    const user = userEvent.setup()
    renderAt('/')
    await screen.findByRole('heading', { level: 1 })
    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    const nav = await screen.findByRole('navigation', { name: 'Mobile' })
    for (const label of ['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument()
    }
    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
