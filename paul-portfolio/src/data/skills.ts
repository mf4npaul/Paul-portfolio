/**
 * Skills, grouped by area. There are deliberately no percentages or progress
 * bars: they imply a precision nobody can measure. Each skill instead says
 * honestly how I use it.
 *
 *  core     = I use it regularly and am comfortable building with it
 *  growing  = I have built with it and am deepening my experience
 *  learning = I am actively learning it
 *
 *  >>> Review the `level` of each skill and adjust it to match reality. <<<
 */
export type SkillLevel = 'core' | 'growing' | 'learning'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillGroup {
  id: string
  title: string
  summary: string
  skills: Skill[]
}

export const skillLevels: Record<SkillLevel, { label: string; description: string }> = {
  core: { label: 'Work with regularly', description: 'Tools I reach for when building.' },
  growing: { label: 'Building experience', description: 'Used in projects, still deepening.' },
  learning: { label: 'Currently learning', description: 'Studying and practising now.' },
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    summary:
      'Building responsive websites and interfaces, from static pages to React applications and mobile app screens.',
    skills: [
      { name: 'HTML', level: 'core' },
      { name: 'CSS', level: 'core' },
      { name: 'Bootstrap', level: 'core' },
      { name: 'JavaScript', level: 'core' },
      { name: 'React', level: 'core' },
      { name: 'React Native', level: 'growing' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend and databases',
    summary:
      'Creating APIs and storing data for my application projects. This is the area I am growing into most actively.',
    skills: [
      { name: 'Python', level: 'growing' },
      { name: 'SQL', level: 'growing' },
      { name: 'MongoDB', level: 'growing' },
      { name: 'API development and integration', level: 'growing' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools and infrastructure',
    summary:
      'Version control is part of everyday work. Containers, delivery pipelines and cloud are where I am investing my learning time.',
    skills: [
      { name: 'Git and GitHub', level: 'core' },
      { name: 'Docker', level: 'learning' },
      { name: 'Kubernetes', level: 'learning' },
      { name: 'AWS', level: 'learning' },
      { name: 'CI/CD', level: 'learning' },
      { name: 'Linux and cloud fundamentals', level: 'learning' },
    ],
  },
]
