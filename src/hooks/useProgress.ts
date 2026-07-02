import { useStore } from '../store/useStore'
import { allLessons, coursesInCert, courseLessonCount } from '../data/curriculum'
import type { Course } from '../types'

/** Percent of a course's lessons/labs completed (0–100). */
export function useCourseProgress(course: Course | undefined): number {
  const lessonsDone = useStore((s) => s.lessonsDone)
  const labsDone = useStore((s) => s.labsDone)
  if (!course) return 0
  const lessons = allLessons(course)
  if (!lessons.length) return 0
  let done = 0
  for (const l of lessons) {
    if (l.type === 'lab') {
      if ((labsDone[l.labId as string] || 0) > 0) done++
    } else if (lessonsDone[l.id]) done++
  }
  return Math.round((done / lessons.length) * 100)
}

/** Percent of a whole certification completed, weighted by lesson count. */
export function useCertProgress(certId: string): { percent: number; earned: boolean } {
  const lessonsDone = useStore((s) => s.lessonsDone)
  const labsDone = useStore((s) => s.labsDone)
  const courses = coursesInCert(certId)
  let total = 0
  let done = 0
  for (const course of courses) {
    total += courseLessonCount(course)
    for (const l of allLessons(course)) {
      if (l.type === 'lab') {
        if ((labsDone[l.labId as string] || 0) > 0) done++
      } else if (lessonsDone[l.id]) done++
    }
  }
  const percent = total ? Math.round((done / total) * 100) : 0
  return { percent, earned: total > 0 && done === total }
}
