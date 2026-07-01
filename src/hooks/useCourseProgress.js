import { useStore } from '../store/useStore.js'
import { allLessons } from '../data/curriculum.js'

// percent of a course's lessons completed
export function useCourseProgress(course) {
  const lessonsDone = useStore((s) => s.lessonsDone)
  const labsDone = useStore((s) => s.labsDone)
  if (!course) return 0
  const lessons = allLessons(course)
  if (!lessons.length) return 0
  let done = 0
  for (const l of lessons) {
    if (l.type === 'lab') {
      if ((labsDone[l.labId] || 0) > 0) done++
    } else if (lessonsDone[l.id]) done++
  }
  return Math.round((done / lessons.length) * 100)
}
