// ============================================================================
//  Domain model types — the contract every data file and component relies on.
// ============================================================================

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Lead'
export type LessonType = 'reading' | 'quiz' | 'lab' | 'video'
export type Availability = 'available' | 'coming-soon'

export interface QuizQuestion {
  type: 'mc' | 'input'
  q: string
  /** present for multiple-choice */
  options?: string[]
  /** index (mc) or accepted string answer(s) (input) */
  answer: number | string | string[]
  explain: string
}

/** Authored body/quiz keyed by lesson id in the lessons/* files. */
export interface LessonContent {
  body?: string
  quiz?: QuizQuestion[]
}

export interface Lesson extends LessonContent {
  id: string
  type: LessonType
  title: string
  minutes: number
  /** set for type === 'lab' */
  labId?: LabId
  /** attached at build time in curriculum */
  moduleId?: string
}

export interface CourseModule {
  id: string
  title: string
  weekLabel: string
  lessons: Lesson[]
}

export interface Course {
  id: string
  certId: string
  domainId: DomainId
  icon: string
  level: CourseLevel
  title: string
  subtitle: string
  rating: number
  learners: number
  weeks: number
  hours: number
  tags: string[]
  skills: string[]
  description: string
  modules: CourseModule[]
}

export interface Certification {
  id: string
  /** short code shown on the badge, e.g. "GRC1" */
  code: string
  domainId: DomainId
  title: string
  /** numeric level within its domain */
  level: number
  /** human tier label, e.g. "Foundation" */
  tier: string
  icon: string
  /** tailwind gradient classes, e.g. "from-sky-500 to-cblue" */
  color: string
  blurb: string
  outcomes: string[]
  /** ordered course ids that make up the certification */
  courseIds: string[]
  status: Availability
  /** access tier: 'free' unlocks after login; 'pro' requires a subscription. */
  access: 'free' | 'pro'
}

export type DomainId = 'core' | 'ai' | 'cloud'

export interface Domain {
  id: DomainId
  title: string
  tagline: string
  icon: string
  color: string
  status: Availability
}

export type LabId =
  | 'risk-matrix'
  | 'risk-register'
  | 'arch-review'
  | 'shadow-ai'
  | 'policy'
  | 'mapping'
  | 'incident'
  | 'evidence'
  | 'crosswalk'
  | 'vendor'
  | 'audit-sim'
  | 'interview'
  | 'bias'
  | 'capstone'

export interface ScenarioOption {
  t: string
  ok: boolean
  fb?: string
}
export interface ScenarioStep {
  prompt: string
  context?: string
  options: ScenarioOption[]
}
export interface ScenarioConfig {
  title: string
  brief: string
  /** seconds; when set the lab is timed */
  timed?: number
  steps: ScenarioStep[]
}
