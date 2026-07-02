import type { LessonContent } from '../../types'
import { foundations } from './foundations'
import { security } from './security'
import { frameworks } from './frameworks'
import { operations } from './operations'
import { enterprise } from './enterprise'
import { aigov } from './aigov'
import { aigov2 } from './aigov2'
import { payments } from './payments'
import { career } from './career'
import { cloud } from './cloud'
import { governance } from './governance'

export const lessonContent: Record<string, LessonContent> = {
  ...foundations,
  ...security,
  ...frameworks,
  ...operations,
  ...enterprise,
  ...aigov,
  ...aigov2,
  ...payments,
  ...career,
  ...cloud,
  ...governance,
}
