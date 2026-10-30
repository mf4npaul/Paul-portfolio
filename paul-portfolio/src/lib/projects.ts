import { projects as allProjects } from '../data/projects'
import { categories } from '../data/categories'
import type { Project, ProjectCategoryId, ProjectStatus } from '../types/project'

export type CategoryFilter = 'all' | ProjectCategoryId

/** Returns projects matching a category ('all' returns everything). */
export function filterProjects(list: Project[], category: CategoryFilter): Project[] {
  return category === 'all' ? list : list.filter((p) => p.category === category)
}

export function getProjectBySlug(slug: string | undefined, list: Project[] = allProjects): Project | undefined {
  if (!slug) return undefined
  return list.find((p) => p.slug === slug)
}

export function getFeaturedProjects(list: Project[] = allProjects): Project[] {
  return list.filter((p) => p.featured)
}

/** Previous/next projects in display order, wrapping around at the ends. */
export function getNeighbours(slug: string, list: Project[] = allProjects) {
  const i = list.findIndex((p) => p.slug === slug)
  if (i === -1 || list.length < 2) return { previous: undefined, next: undefined }
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  }
}

/** Only categories that currently contain at least one project, so no filter button is ever empty. */
export function getAvailableCategories(list: Project[] = allProjects) {
  return categories.filter((c) => list.some((p) => p.category === c.id))
}

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  'in-development': 'In development',
  planned: 'Planned',
}

/** A project's work is "built" only when it is live; wording on case studies changes accordingly. */
export const isBuilt = (p: Project) => p.status === 'live'

/** Accept only real http(s) URLs so a typo can never render a broken or unsafe link. */
export function isValidUrl(value: string | undefined): value is string {
  if (!value) return false
  try {
    const u = new URL(value)
    return u.protocol === 'http:' || u.protocol === 'https:'
  } catch {
    return false
  }
}
