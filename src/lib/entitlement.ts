// ============================================================================
//  Entitlement — who can see what.
//    not authed         → nothing (login wall)
//    authed, free tier  → 'free' certifications only
//    authed, Pro tier   → everything
// ============================================================================
import { useStore } from '../store/useStore'
import { CERT_BY_ID, COURSE_BY_ID, LESSON_INDEX } from '../data/curriculum'

export function useEntitlement() {
  const authed = useStore((s) => s.authed)
  const isPro = useStore((s) => s.isPro)
  return { authed, isPro }
}

/** Is a certification unlocked for a member with the given Pro status? */
export function certUnlocked(certId: string | undefined, isPro: boolean): boolean {
  if (!certId) return false
  return CERT_BY_ID[certId]?.access === 'free' || isPro
}

export function courseUnlocked(courseId: string | undefined, isPro: boolean): boolean {
  if (!courseId) return false
  return certUnlocked(COURSE_BY_ID[courseId]?.certId, isPro)
}

export function lessonUnlocked(lessonId: string | undefined, isPro: boolean): boolean {
  if (!lessonId) return false
  return courseUnlocked(LESSON_INDEX[lessonId]?.courseId, isPro)
}
