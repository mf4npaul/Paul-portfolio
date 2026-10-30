export interface ContactValues {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot: real people never see or fill this field. */
  company: string
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'subject' | 'message', string>>

export const emptyContact: ContactValues = { name: '', email: '', subject: '', message: '', company: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  const name = v.name.trim()
  const email = v.email.trim()
  const subject = v.subject.trim()
  const message = v.message.trim()

  if (!name) errors.name = 'Enter your name.'
  else if (name.length < 2) errors.name = 'Your name should be at least 2 characters.'

  if (!email) errors.email = 'Enter your email address so I can reply.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address, like name@example.com.'

  if (!subject) errors.subject = 'Add a short subject.'
  else if (subject.length < 3) errors.subject = 'The subject should be at least 3 characters.'

  if (!message) errors.message = 'Write a message.'
  else if (message.length < 20) errors.message = 'Your message should be at least 20 characters so I have enough to go on.'
  else if (message.length > 5000) errors.message = 'Please keep your message under 5,000 characters.'

  return errors
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'not-configured' | 'spam' | 'rejected' | 'network'; message: string }

/**
 * Sends the message to the configured endpoint (e.g. Formspree).
 * It only returns { ok: true } when the service confirmed receipt.
 * It never fakes success.
 */
export async function submitContact(
  values: ContactValues,
  endpoint: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubmitResult> {
  if (!endpoint) {
    return { ok: false, reason: 'not-configured', message: 'The contact form is not connected yet.' }
  }
  if (values.company.trim() !== '') {
    return { ok: false, reason: 'spam', message: 'This message was flagged as automated and was not sent.' }
  }
  try {
    const res = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: values.name.trim(),
        email: values.email.trim(),
        _replyto: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      }),
    })
    if (res.ok) return { ok: true }
    let detail = ''
    try {
      const data = (await res.json()) as { errors?: { message?: string }[]; error?: string }
      detail = data.errors?.[0]?.message ?? data.error ?? ''
    } catch {
      /* response had no JSON body */
    }
    return { ok: false, reason: 'rejected', message: detail || 'The message service rejected the request. Please try again.' }
  } catch {
    return { ok: false, reason: 'network', message: 'Could not reach the message service. Check your connection and try again.' }
  }
}
