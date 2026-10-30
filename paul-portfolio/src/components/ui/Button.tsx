import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface Shared {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  icon?: ReactNode
}

type InternalLink = Shared & { to: string; href?: never }
type ExternalLink = Shared & { href: string; to?: never; external?: boolean; download?: boolean }
type NativeButton = Shared & { to?: never; href?: never } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export type ButtonProps = InternalLink | ExternalLink | NativeButton

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-semibold no-underline select-none ' +
  'transition-[transform,background-color,border-color,color,opacity] duration-200 ease-out ' +
  'active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-110',
  secondary: 'border border-line bg-surface text-ink hover:border-accent hover:bg-surface-2',
  ghost: 'text-ink hover:bg-surface-2',
}
const sizes: Record<Size, string> = {
  md: 'min-h-12 px-5 text-[0.95rem]',
  lg: 'min-h-14 px-7 text-base',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, icon } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {icon}
    </>
  )

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }
  if ('href' in props && props.href !== undefined) {
    const ext = props.external ?? /^https?:/.test(props.href)
    return (
      <a
        href={props.href}
        className={classes}
        download={props.download}
        {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }
  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, to: _t, href: _h, ...rest } = props as NativeButton
  void [_v, _s, _c, _ch, _i, _t, _h]
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
