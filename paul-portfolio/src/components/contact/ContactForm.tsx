import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'
import {
  emptyContact,
  submitContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '../../lib/contact'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Field = 'name' | 'email' | 'subject' | 'message'

interface Props {
  /** URL of the form service (e.g. Formspree). Empty means "not connected". */
  endpoint: string
  /** Optional direct email shown as a fallback. */
  fallbackEmail?: string
}

const inputClass =
  'w-full min-h-12 rounded-[var(--radius-control)] border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent'

export function ContactForm({ endpoint, fallbackEmail }: Props) {
  const uid = useId()
  const [values, setValues] = useState<ContactValues>(emptyContact)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const connected = endpoint !== ''
  const id = (f: string) => `${uid}-${f}`

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    // After the first failed submit, keep errors in sync while the person fixes them.
    if (submittedOnce) setErrors(validateContact(next))
  }

  const onBlur = (field: Field) => {
    const found = validateContact(values)[field]
    setErrors((prev) => ({ ...prev, [field]: found }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'submitting' || !connected) return
    setSubmittedOnce(true)
    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = (['name', 'email', 'subject', 'message'] as Field[]).find((f) => found[f])
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus()
      return
    }
    setStatus('submitting')
    setServerMessage('')
    const result = await submitContact(values, endpoint)
    if (result.ok) {
      setStatus('success')
      setValues(emptyContact)
      setErrors({})
      setSubmittedOnce(false)
    } else {
      setStatus('error')
      setServerMessage(result.message)
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-[var(--radius-card)] border border-ok/50 bg-surface p-8">
        <CircleCheck className="text-ok" size={32} aria-hidden="true" />
        <h2 className="mt-4 text-2xl">Message sent</h2>
        <p className="mt-2 text-muted">Thank you. Your message was delivered and I will reply to the email address you gave.</p>
        <Button className="mt-6" variant="secondary" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  const fieldError = (f: Field) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="mt-2 flex items-start gap-2 text-sm font-medium text-danger">
        <CircleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null

  const common = (f: Field) => ({
    id: id(f),
    name: f,
    value: values[f],
    onChange,
    onBlur: () => onBlur(f),
    disabled: !connected || status === 'submitting',
    'aria-invalid': errors[f] ? (true as const) : undefined,
    'aria-describedby': errors[f] ? id(`${f}-error`) : undefined,
    'aria-required': true as const,
    className: cn(inputClass, errors[f] ? 'border-danger' : 'border-line'),
  })

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === 'submitting'} className="space-y-6">
      {!connected && (
        <div role="note" className="rounded-[var(--radius-control)] border border-warn/60 bg-surface p-4">
          <p className="font-semibold">The contact form is not connected yet.</p>
          <p className="mt-1 text-sm text-muted">
            It cannot send messages until a form service is configured.
            {fallbackEmail ? (
              <>
                {' '}
                Please email{' '}
                <a href={`mailto:${fallbackEmail}`} className="font-medium text-accent underline">
                  {fallbackEmail}
                </a>{' '}
                instead.
              </>
            ) : (
              ' Please use the links on this page to reach me.'
            )}
          </p>
          {import.meta.env.DEV && (
            <p className="mt-2 text-sm text-muted">
              Developer note: set <code>VITE_CONTACT_FORM_ENDPOINT</code> in <code>.env</code>. See the README.
            </p>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="mb-2 block font-semibold">
            Name
          </label>
          <input type="text" autoComplete="name" {...common('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={id('email')} className="mb-2 block font-semibold">
            Email
          </label>
          <input type="email" autoComplete="email" inputMode="email" {...common('email')} />
          {fieldError('email')}
        </div>
      </div>

      <div>
        <label htmlFor={id('subject')} className="mb-2 block font-semibold">
          Subject
        </label>
        <input type="text" {...common('subject')} />
        {fieldError('subject')}
      </div>

      <div>
        <label htmlFor={id('message')} className="mb-2 block font-semibold">
          Message
        </label>
        <textarea rows={6} {...common('message')} className={cn(common('message').className, 'resize-y')} />
        {fieldError('message')}
      </div>

      {/* Honeypot: hidden from people and assistive tech; automated form-fillers tend to complete it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company (leave this empty)
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={onChange}
          />
        </label>
      </div>

      {status === 'error' && (
        <div role="alert" className="flex items-start gap-3 rounded-[var(--radius-control)] border border-danger/60 bg-surface p-4">
          <CircleAlert className="mt-0.5 shrink-0 text-danger" size={20} aria-hidden="true" />
          <div>
            <p className="font-semibold">Your message was not sent.</p>
            <p className="text-sm text-muted">
              {serverMessage}
              {fallbackEmail && (
                <>
                  {' '}
                  You can also email{' '}
                  <a href={`mailto:${fallbackEmail}`} className="font-medium text-accent underline">
                    {fallbackEmail}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!connected || status === 'submitting'}
        icon={
          status === 'submitting' ? (
            <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
          ) : (
            <Send size={18} aria-hidden="true" />
          )
        }
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
