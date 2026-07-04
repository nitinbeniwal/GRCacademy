import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { clerkEnabled } from '../auth/config'

// XP awards
export const XP = { lesson: 20, quiz: 30, lab: 80, courseComplete: 200 } as const

export interface Rank {
  name: string
  xp: number
  icon: string
}

export const RANKS: Rank[] = [
  { name: 'GRC Novice', xp: 0, icon: '🐣' },
  { name: 'Risk Apprentice', xp: 300, icon: '📋' },
  { name: 'Control Analyst', xp: 800, icon: '🛡️' },
  { name: 'Compliance Specialist', xp: 1600, icon: '🧭' },
  { name: 'Audit Lead', xp: 3000, icon: '🔎' },
  { name: 'GRC Manager', xp: 5000, icon: '🏛️' },
  { name: 'GRC Architect', xp: 8000, icon: '🏗️' },
  { name: 'Chief Risk Officer', xp: 12000, icon: '👑' },
]

type BoolMap = Record<string, boolean>
type NumMap = Record<string, number>

interface StoreState {
  enrolled: BoolMap
  lessonsDone: BoolMap
  quizCorrect: BoolMap
  labsDone: NumMap
  xp: number
  streak: number
  lastActive: string | null
  offerDismissed: boolean

  // entitlement — set by ServerSync from Clerk (Billing).
  // In preview (no Clerk) the user is treated as a signed-in free member.
  authed: boolean
  isPro: boolean

  // true when the signed-in user has no completed onboarding on the server.
  // Not persisted meaningfully — re-derived by ServerSync every session.
  needsOnboarding: boolean

  setAuth: (authed: boolean, isPro: boolean) => void
  setNeedsOnboarding: (v: boolean) => void
  /**
   * Merge server-side progress into local state (cross-device restore).
   * Marks items done WITHOUT awarding local XP — the server's XP total is
   * authoritative and replaces the local counter.
   */
  hydrate: (data: { lessons: string[]; quizzes: string[]; labs: string[]; xp: number; streak: number }) => void
  enroll: (courseId: string) => void
  completeLesson: (lessonId: string, award?: number) => void
  markQuiz: (lessonId: string, qIndex: number, correct: boolean) => void
  finishLab: (labId: string, score: number) => void
  touch: () => void
  dismissOffer: () => void
  resetAll: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      enrolled: {},
      lessonsDone: {},
      quizCorrect: {},
      labsDone: {},
      xp: 0,
      streak: 0,
      lastActive: null,
      offerDismissed: false,

      // Preview (Clerk off) = signed-in free member so the UI is explorable.
      authed: !clerkEnabled,
      isPro: false,
      needsOnboarding: false,

      setAuth: (authed, isPro) => set({ authed, isPro }),
      setNeedsOnboarding: (v) => set({ needsOnboarding: v }),

      hydrate: ({ lessons, quizzes, labs, xp, streak }) =>
        set((s) => {
          const lessonsDone = { ...s.lessonsDone }
          for (const id of lessons) lessonsDone[id] = true
          const quizCorrect = { ...s.quizCorrect }
          for (const key of quizzes) quizCorrect[key] = true
          const labsDone = { ...s.labsDone }
          // Server stores completion, not scores — keep any local best score.
          for (const id of labs) if (!labsDone[id]) labsDone[id] = 1
          return {
            lessonsDone,
            quizCorrect,
            labsDone,
            xp: Math.max(xp, s.xp),
            streak: Math.max(streak, s.streak),
          }
        }),

      enroll: (courseId) => set((s) => (s.enrolled[courseId] ? {} : { enrolled: { ...s.enrolled, [courseId]: true } })),

      completeLesson: (lessonId, award = XP.lesson) =>
        set((s) =>
          s.lessonsDone[lessonId]
            ? {}
            : { lessonsDone: { ...s.lessonsDone, [lessonId]: true }, xp: s.xp + award }
        ),

      markQuiz: (lessonId, qIndex, correct) =>
        set((s) => {
          const key = `${lessonId}|${qIndex}`
          if (correct && !s.quizCorrect[key]) {
            return { quizCorrect: { ...s.quizCorrect, [key]: true }, xp: s.xp + XP.quiz }
          }
          return {}
        }),

      finishLab: (labId, score) =>
        set((s) => {
          const prev = s.labsDone[labId] || 0
          const best = Math.max(prev, score)
          const bonus = prev === 0 ? XP.lab : 0
          return { labsDone: { ...s.labsDone, [labId]: best }, xp: s.xp + bonus }
        }),

      touch: () =>
        set((s) => {
          const today = new Date().toDateString()
          if (s.lastActive === today) return {}
          const yesterday = new Date(Date.now() - 864e5).toDateString()
          const streak = s.lastActive === yesterday ? s.streak + 1 : 1
          return { lastActive: today, streak }
        }),

      dismissOffer: () => set({ offerDismissed: true }),

      resetAll: () =>
        set({
          enrolled: {},
          lessonsDone: {},
          quizCorrect: {},
          labsDone: {},
          xp: 0,
          streak: 0,
          lastActive: null,
        }),
    }),
    { name: 'grc-academy-v2' }
  )
)

export function rankFor(xp: number): Rank {
  let r = RANKS[0]!
  for (const x of RANKS) if (xp >= x.xp) r = x
  return r
}
export function nextRank(xp: number): Rank | null {
  return RANKS.find((x) => x.xp > xp) ?? null
}

// re-export the shallow helper so components can select multiple slices cheaply
export { useShallow }
