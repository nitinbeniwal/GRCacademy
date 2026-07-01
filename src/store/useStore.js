import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// XP awards
export const XP = { lesson: 20, quiz: 30, lab: 80, courseComplete: 200 }

export const RANKS = [
  { name: 'GRC Novice', xp: 0, icon: '🐣' },
  { name: 'Risk Apprentice', xp: 300, icon: '📋' },
  { name: 'Control Analyst', xp: 800, icon: '🛡️' },
  { name: 'Compliance Specialist', xp: 1600, icon: '🧭' },
  { name: 'Audit Lead', xp: 3000, icon: '🔎' },
  { name: 'GRC Manager', xp: 5000, icon: '🏛️' },
  { name: 'GRC Architect', xp: 8000, icon: '🏗️' },
  { name: 'Chief Risk Officer', xp: 12000, icon: '👑' },
]

export const useStore = create(
  persist(
    (set, get) => ({
      // progress maps
      enrolled: {},          // courseId -> true
      lessonsDone: {},       // lessonId -> true
      quizCorrect: {},       // "lessonId|qIndex" -> true
      labsDone: {},          // labId -> best score (0-100)
      xp: 0,
      streak: 0,
      lastActive: null,

      enroll: (courseId) =>
        set((s) => ({ enrolled: { ...s.enrolled, [courseId]: true } })),

      completeLesson: (lessonId, award = XP.lesson) =>
        set((s) => {
          if (s.lessonsDone[lessonId]) return {}
          return { lessonsDone: { ...s.lessonsDone, [lessonId]: true }, xp: s.xp + award }
        }),

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
          const y = new Date(Date.now() - 864e5).toDateString()
          const streak = s.lastActive === y ? s.streak + 1 : 1
          return { lastActive: today, streak }
        }),

      resetAll: () =>
        set({ enrolled: {}, lessonsDone: {}, quizCorrect: {}, labsDone: {}, xp: 0, streak: 0, lastActive: null }),
    }),
    { name: 'grc-academy-v1' }
  )
)

export function rankFor(xp) {
  let r = RANKS[0]
  for (const x of RANKS) if (xp >= x.xp) r = x
  return r
}
export function nextRank(xp) {
  return RANKS.find((x) => x.xp > xp) || null
}
