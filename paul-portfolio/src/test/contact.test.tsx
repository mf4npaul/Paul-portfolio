import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '../components/contact/ContactForm'
import { emptyContact, submitContact, validateContact } from '../lib/contact'

const valid = {
  name: 'Ada Obi',
  email: 'ada@example.com',
  subject: 'Frontend role',
  message: 'We would like to talk to you about a frontend developer role.',
  company: '',
}

afterEach(() => vi.unstubAllGlobals())

describe('validateContact', () => {
  it('accepts valid input', () => {
    expect(validateContact(valid)).toEqual({})
  })
  it('flags every empty field', () => {
    expect(Object.keys(validateContact(emptyContact)).sort()).toEqual(['email', 'message', 'name', 'subject'])
  })
  it('rejects bad emails and short messages', () => {
    const e = validateContact({ ...valid, email: 'nope', message: 'too short' })
    expect(e.email).toMatch(/valid email/i)
    expect(e.message).toMatch(/at least 20/)
  })
})

describe('submitContact', () => {
  it('does not pretend to send when no endpoint is configured', async () => {
    const fetchSpy = vi.fn()
    const r = await submitContact(valid, '', fetchSpy as unknown as typeof fetch)
    expect(r).toMatchObject({ ok: false, reason: 'not-configured' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })
  it('refuses honeypot submissions without calling the service', async () => {
    const fetchSpy = vi.fn()
    const r = await submitContact({ ...valid, company: 'Bot Inc' }, 'https://x.test/f', fetchSpy as unknown as typeof fetch)
    expect(r).toMatchObject({ ok: false, reason: 'spam' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })
  it('reports success only when the service returns ok', async () => {
    const ok = vi.fn().mockResolvedValue({ ok: true })
    expect(await submitContact(valid, 'https://x.test/f', ok as unknown as typeof fetch)).toEqual({ ok: true })
    const bad = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: 'Form not found' }) })
    expect(await submitContact(valid, 'https://x.test/f', bad as unknown as typeof fetch)).toMatchObject({ ok: false, reason: 'rejected', message: 'Form not found' })
  })
  it('reports network failures as failures', async () => {
    const down = vi.fn().mockRejectedValue(new Error('offline'))
    expect(await submitContact(valid, 'https://x.test/f', down as unknown as typeof fetch)).toMatchObject({ ok: false, reason: 'network' })
  })
})

describe('<ContactForm>', () => {
  it('is honestly disabled when not connected', () => {
    render(<ContactForm endpoint="" fallbackEmail="me@example.com" />)
    expect(screen.getByText(/not connected yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled()
    expect(screen.getByRole('link', { name: 'me@example.com' })).toHaveAttribute('href', 'mailto:me@example.com')
  })

  it('shows accessible errors and focuses the first invalid field', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    render(<ContactForm endpoint="https://x.test/f" />)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    const name = screen.getByLabelText('Name')
    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(name).toHaveFocus()
    expect(screen.getByText('Enter your name.')).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('submits valid data, shows success, and shows failure honestly', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchSpy)
    const { unmount } = render(<ContactForm endpoint="https://x.test/f" />)
    await user.type(screen.getByLabelText('Name'), valid.name)
    await user.type(screen.getByLabelText('Email'), valid.email)
    await user.type(screen.getByLabelText('Subject'), valid.subject)
    await user.type(screen.getByLabelText('Message'), valid.message)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByText('Message sent')).toBeInTheDocument())
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    const body = JSON.parse(fetchSpy.mock.calls[0]![1].body)
    expect(body).toMatchObject({ name: valid.name, email: valid.email, subject: valid.subject })
    expect(body).not.toHaveProperty('company')
    unmount()

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }))
    render(<ContactForm endpoint="https://x.test/f" />)
    await user.type(screen.getByLabelText('Name'), valid.name)
    await user.type(screen.getByLabelText('Email'), valid.email)
    await user.type(screen.getByLabelText('Subject'), valid.subject)
    await user.type(screen.getByLabelText('Message'), valid.message)
    await user.click(screen.getByRole('button', { name: /send message/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/not sent/i)
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument()
  })
})
