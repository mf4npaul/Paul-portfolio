import type { ProjectCategoryId } from '../types/project.ts'

export interface ProjectCategory {
  id: ProjectCategoryId
  label: string
}

/** Filter buttons on the Projects page. Categories with no projects are hidden automatically. */
export const categories: ProjectCategory[] = [
  { id: 'full-stack', label: 'Full-Stack Applications' },
  { id: 'e-commerce', label: 'E-commerce' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'dashboards-apis', label: 'Dashboards & APIs' },
  { id: 'cloud-devops', label: 'Cloud & DevOps' },
]

export const categoryLabel = (id: ProjectCategoryId): string =>
  categories.find((c) => c.id === id)?.label ?? id
