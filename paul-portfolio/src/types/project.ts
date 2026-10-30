/**
 * Types for the central project data (src/data/projects.ts).
 * Every page that shows projects (gallery, home previews, filters,
 * case studies, sitemap) reads from this one shape.
 */

/** live = usable by visitors, in-development = being built, planned = concept/roadmap. */
export type ProjectStatus = 'live' | 'in-development' | 'planned'

/** Must match an id in src/data/categories.ts. */
export type ProjectCategoryId =
  | 'full-stack'
  | 'e-commerce'
  | 'productivity'
  | 'dashboards-apis'
  | 'cloud-devops'

/** Which built-in illustration to draw until a real screenshot is added. */
export type MockupKind = 'kanban' | 'storefront' | 'tasks' | 'analytics' | 'pipeline' | 'calendar'

/** Whether a single feature actually exists yet. Never mark 'done' unless it works. */
export type FeatureState = 'planned' | 'in-progress' | 'done'

export interface ProjectFeature {
  title: string
  description?: string
  state: FeatureState
}

export interface ProjectImage {
  /** Path under /public, e.g. "/projects/devflow/board.png" */
  src: string
  /** Describes the image for screen readers. Required. */
  alt: string
  caption?: string
}

export interface DesignDecision {
  title: string
  body: string
}

export interface ArchitectureLayer {
  name: string
  description: string
}

export interface Challenge {
  challenge: string
  /** What was done (built projects) or the intended approach (planned ones). */
  approach: string
  tradeOff?: string
}

export interface CaseStudy {
  overview: string
  problem: string
  goals: string[]
  designDecisions: DesignDecision[]
  architecture: {
    summary: string
    layers: ArchitectureLayer[]
  }
  challenges: Challenge[]
  /**
   * For live projects: lessons actually learned.
   * For in-development/planned projects: learning goals (shown with matching wording).
   */
  learnings: string[]
  futureImprovements: string[]
}

export interface Project {
  /** Stable unique id. */
  id: string
  /** URL segment: /projects/<slug>. Lowercase letters, numbers and hyphens only. */
  slug: string
  title: string
  /** Subtitle, e.g. "Team project and issue management platform". */
  tagline: string
  shortDescription: string
  longDescription: string
  category: ProjectCategoryId
  technologies: string[]
  features: ProjectFeature[]
  /** What you personally did on this project. */
  role: string
  status: ProjectStatus
  /** Real screenshot. When omitted, the built-in illustration for `mockup` is shown, labelled as a concept preview. */
  thumbnail?: ProjectImage
  mockup: MockupKind
  gallery?: ProjectImage[]
  /** Only set when a verified live demo exists. If absent, no button is shown. */
  liveUrl?: string
  /** Only set when a real repository exists. If absent, no button is shown. */
  githubUrl?: string
  /** Optional extra reference link, e.g. the original version of a rebuilt project. */
  relatedLink?: { label: string; url: string }
  featured: boolean
  /** ISO date (YYYY-MM-DD). Optional: leave out unless you know it. */
  dateCreated?: string
  caseStudy: CaseStudy
}
