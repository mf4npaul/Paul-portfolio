/**
 * Experience and education.
 *
 *  >>> Dates are left out on purpose: they were not verified. <<<
 *  Add `period` (e.g. 'Mar 2022 to Sep 2022') to any entry once you have the
 *  exact dates. Entries without `period` simply don't show one.
 *  Do not turn training into "certifications" unless a certificate was awarded.
 */
export type TimelineKind = 'work' | 'education'

export interface TimelineEntry {
  id: string
  kind: TimelineKind
  /** Role or qualification. */
  title: string
  /** Employer or school. */
  organisation: string
  /** Exact dates, only when verified. */
  period?: string
  /** Length when known but dates are not, e.g. "About six months". */
  duration?: string
  description: string
}

export const experience: TimelineEntry[] = [
  {
    id: 'tech-solutions',
    kind: 'work',
    title: 'Developer',
    organisation: 'Tech Solutions',
    description: 'Created and managed a website for the company.',
  },
  {
    id: 'dataskills',
    kind: 'work',
    title: 'Teaching role',
    organisation: 'Dataskills Computer School',
    description: 'Teaching experience at a computer training school.',
  },
  {
    id: 'ossill',
    kind: 'work',
    title: 'Computer operator',
    organisation: 'Ossill Ventures',
    duration: 'About six months',
    description: 'Worked as a computer operator.',
  },
  {
    id: 'club-photographer',
    kind: 'work',
    title: 'Club photographer',
    organisation: 'NIIT (during my studies)',
    description: 'Photographed club activities while studying at NIIT.',
  },
]

export const education: TimelineEntry[] = [
  {
    id: 'niit',
    kind: 'education',
    title: 'Diploma in Software Engineering (including DevOps)',
    organisation: 'NIIT',
    duration: 'About one year and six months',
    description: 'Training in software engineering with DevOps topics.',
  },
  {
    id: 'gcl',
    kind: 'education',
    title: 'Secondary education',
    organisation: 'Government College Lagos',
    description: 'Secondary school education.',
  },
  {
    id: 'rfcs',
    kind: 'education',
    title: 'Primary education',
    organisation: 'Right Foundation Children School',
    description: 'Primary school education.',
  },
]
