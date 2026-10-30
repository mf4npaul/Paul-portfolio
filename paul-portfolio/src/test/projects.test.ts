import { describe, expect, it } from 'vitest'
import { projects } from '../data/projects'
import { categories } from '../data/categories'
import {
  filterProjects,
  getAvailableCategories,
  getFeaturedProjects,
  getNeighbours,
  getProjectBySlug,
  isValidUrl,
} from '../lib/projects'

describe('project data integrity', () => {
  it('contains exactly the six initial projects', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'devflow',
      'ikeja-online',
      'taskflow',
      'insightboard',
      'cloudpulse',
      'bookingflow',
    ])
  })

  it('has unique ids and slugs, and URL-safe slugs', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
    for (const p of projects) expect(p.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
  })

  it('only uses categories that exist', () => {
    const ids = categories.map((c) => c.id)
    for (const p of projects) expect(ids).toContain(p.category)
  })

  it('never ships fabricated links: any liveUrl/githubUrl present must be a real http(s) URL', () => {
    for (const p of projects) {
      if (p.liveUrl !== undefined) expect(isValidUrl(p.liveUrl)).toBe(true)
      if (p.githubUrl !== undefined) expect(isValidUrl(p.githubUrl)).toBe(true)
    }
  })

  it('is honest about status: nothing is "live" and no feature is "done" without a live demo', () => {
    for (const p of projects) {
      if (!p.liveUrl) expect(p.status).not.toBe('live')
      if (p.status !== 'live') for (const f of p.features) expect(f.state).not.toBe('done')
    }
  })

  it('gives every project a complete case study', () => {
    for (const p of projects) {
      const cs = p.caseStudy
      expect(cs.overview.length).toBeGreaterThan(40)
      expect(cs.problem.length).toBeGreaterThan(40)
      for (const list of [cs.goals, cs.designDecisions, cs.architecture.layers, cs.challenges, cs.learnings, cs.futureImprovements, p.features, p.technologies]) {
        expect(list.length).toBeGreaterThan(0)
      }
    }
  })
})

describe('project helpers', () => {
  it('"all" returns every project', () => {
    expect(filterProjects(projects, 'all')).toHaveLength(6)
  })

  it('filters by category', () => {
    expect(filterProjects(projects, 'e-commerce').map((p) => p.slug)).toEqual(['ikeja-online'])
    expect(filterProjects(projects, 'full-stack').map((p) => p.slug)).toEqual(['devflow', 'bookingflow'])
    expect(filterProjects(projects, 'cloud-devops').map((p) => p.slug)).toEqual(['cloudpulse'])
  })

  it('only offers filter buttons for categories that have projects', () => {
    const subset = projects.filter((p) => p.category === 'productivity')
    expect(getAvailableCategories(subset).map((c) => c.id)).toEqual(['productivity'])
  })

  it('finds projects by slug and returns undefined for unknown slugs', () => {
    expect(getProjectBySlug('taskflow')?.title).toBe('TaskFlow')
    expect(getProjectBySlug('nope')).toBeUndefined()
    expect(getProjectBySlug(undefined)).toBeUndefined()
  })

  it('wraps previous/next around the ends', () => {
    expect(getNeighbours('devflow').previous?.slug).toBe('bookingflow')
    expect(getNeighbours('bookingflow').next?.slug).toBe('devflow')
    expect(getNeighbours('taskflow').previous?.slug).toBe('ikeja-online')
  })

  it('exposes featured projects', () => {
    expect(getFeaturedProjects().length).toBeGreaterThan(0)
  })

  it('rejects unsafe or malformed URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('javascript:alert(1)')).toBe(false)
    expect(isValidUrl('not a url')).toBe(false)
    expect(isValidUrl('')).toBe(false)
    expect(isValidUrl(undefined)).toBe(false)
  })

  it('supports adding a new project without touching other code', () => {
    const extra = { ...projects[0]!, id: 'new', slug: 'new-project', category: 'productivity' as const }
    const list = [...projects, extra]
    expect(getProjectBySlug('new-project', list)).toBeDefined()
    expect(filterProjects(list, 'productivity')).toHaveLength(2)
    expect(getNeighbours('new-project', list).next?.slug).toBe('devflow')
  })
})
