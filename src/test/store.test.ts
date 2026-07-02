import { beforeEach, describe, expect, it } from 'vitest'
import { useStore, rankFor, nextRank, RANKS, XP } from '../store/useStore'

const reset = () => useStore.getState().resetAll()

describe('rank helpers', () => {
  it('maps XP to the right rank', () => {
    expect(rankFor(0).name).toBe('GRC Novice')
    expect(rankFor(299).name).toBe('GRC Novice')
    expect(rankFor(300).name).toBe('Risk Apprentice')
    expect(rankFor(850).name).toBe('Control Analyst')
    expect(rankFor(999999).name).toBe('Chief Risk Officer')
  })

  it('returns the next rank, or null at the top', () => {
    expect(nextRank(0)?.name).toBe('Risk Apprentice')
    expect(nextRank(RANKS[RANKS.length - 1]!.xp)).toBeNull()
  })
})

describe('store scoring', () => {
  beforeEach(reset)

  it('awards lesson XP once (idempotent)', () => {
    const s = useStore.getState()
    s.completeLesson('lesson-a')
    expect(useStore.getState().xp).toBe(XP.lesson)
    useStore.getState().completeLesson('lesson-a')
    expect(useStore.getState().xp).toBe(XP.lesson)
  })

  it('awards quiz XP only on first correct answer', () => {
    const s = useStore.getState()
    s.markQuiz('quiz-a', 0, true)
    expect(useStore.getState().xp).toBe(XP.quiz)
    useStore.getState().markQuiz('quiz-a', 0, true)
    expect(useStore.getState().xp).toBe(XP.quiz)
    useStore.getState().markQuiz('quiz-a', 0, false)
    expect(useStore.getState().xp).toBe(XP.quiz)
  })

  it('does not award quiz XP for a wrong answer', () => {
    useStore.getState().markQuiz('quiz-b', 0, false)
    expect(useStore.getState().xp).toBe(0)
  })

  it('keeps the best lab score and only bonuses once', () => {
    const s = useStore.getState()
    s.finishLab('lab-a', 40)
    expect(useStore.getState().labsDone['lab-a']).toBe(40)
    expect(useStore.getState().xp).toBe(XP.lab)
    useStore.getState().finishLab('lab-a', 90)
    expect(useStore.getState().labsDone['lab-a']).toBe(90)
    expect(useStore.getState().xp).toBe(XP.lab) // no second bonus
    useStore.getState().finishLab('lab-a', 10)
    expect(useStore.getState().labsDone['lab-a']).toBe(90) // best retained
  })

  it('enroll is idempotent', () => {
    const s = useStore.getState()
    s.enroll('c-x')
    s.enroll('c-x')
    expect(Object.keys(useStore.getState().enrolled)).toEqual(['c-x'])
  })
})
