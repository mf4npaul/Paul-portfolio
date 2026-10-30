import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { navItems, siteConfig } from '../../config/site'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 no-underline" aria-label={`${siteConfig.fullName}, home`}>
      <span className="grid size-11 place-items-center rounded-xl bg-accent font-display text-lg font-extrabold tracking-tight text-accent-ink transition-transform group-hover:-rotate-3">
        {siteConfig.initials}
      </span>
      <span className="hidden font-display text-lg font-bold tracking-tight sm:block">{siteConfig.shortName}</span>
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu whenever the page changes.
  useEffect(() => setOpen(false), [location.pathname])

  // Slightly stronger header background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu and returns focus to the button; focus moves into the menu when it opens.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled || open ? 'border-line bg-bg/92 backdrop-blur-md' : 'border-transparent bg-bg/70',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-11 items-center px-4 text-[0.95rem] font-medium no-underline transition-colors',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-x-4 bottom-1 h-0.5 rounded-full bg-accent"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <Button to="/contact">Hire me</Button>
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-12 place-items-center rounded-full border border-line bg-surface lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-t border-line bg-bg shadow-card lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-4">
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-14 items-center border-b border-line font-display text-2xl font-bold tracking-tight no-underline',
                          isActive ? 'text-accent' : 'text-ink',
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Button to="/contact" size="lg" className="mt-5 w-full">
                Hire me
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
