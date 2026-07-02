// ============================================================================
//  Badges — achievement catalog + pure earn logic.
//  Earned state is derived from the local store snapshot so it works offline;
//  when Supabase is live the same XP feeds the server leaderboard.
// ============================================================================
import { CERTIFICATIONS, coursesInCert, allLessons, courseLessonCount } from './curriculum'

export interface Badge {
  id: string
  icon: string
  name: string
  desc: string
  /** tailwind text colour for the earned glow */
  tone: string
}

export interface ProgressSnapshot {
  xp: number
  streak: number
  lessonsDone: Record<string, boolean>
  quizCorrect: Record<string, boolean>
  labsDone: Record<string, number>
}

export const BADGES: Badge[] = [
  { id: 'first-steps', icon: '👣', name: 'First Steps', desc: 'Complete your first lesson', tone: 'text-neon-cyan' },
  { id: 'quiz-ace', icon: '🎯', name: 'Quiz Ace', desc: 'Answer 10 checkpoint questions correctly', tone: 'text-neon-amber' },
  { id: 'lab-rat', icon: '🧪', name: 'Lab Rat', desc: 'Complete 5 hands-on labs', tone: 'text-neon-green' },
  { id: 'week-warrior', icon: '🔥', name: 'Week Warrior', desc: 'Hold a 7-day streak', tone: 'text-orange-400' },
  { id: 'iron-streak', icon: '⚡', name: 'Iron Streak', desc: 'Hold a 30-day streak', tone: 'text-neon-red' },
  { id: 'grc-analyst', icon: '🧭', name: 'GRC Analyst', desc: 'Earn the GRC1 certification', tone: 'text-sky-400' },
  { id: 'ai-governor', icon: '🤖', name: 'AI Governor', desc: 'Earn an AI Governance certification', tone: 'text-fuchsia-400' },
  { id: 'cloud-keeper', icon: '☁️', name: 'Cloud Keeper', desc: 'Earn the Cloud GRC certification', tone: 'text-cyan-400' },
  { id: 'high-roller', icon: '💎', name: 'High Roller', desc: 'Reach 5,000 XP', tone: 'text-neon-purple' },
  { id: 'the-ceo', icon: '👑', name: 'Chief Risk Officer', desc: 'Reach 12,000 XP', tone: 'text-yellow-300' },
]

/** Is a certification fully complete for this snapshot? */
export function certEarned(certId: string, s: ProgressSnapshot): boolean {
  const courses = coursesInCert(certId)
  let total = 0
  let done = 0
  for (const c of courses) {
    total += courseLessonCount(c)
    for (const l of allLessons(c)) {
      if (l.type === 'lab') {
        if ((s.labsDone[l.labId as string] || 0) > 0) done++
      } else if (s.lessonsDone[l.id]) done++
    }
  }
  return total > 0 && done === total
}

/** Set of earned badge ids for a progress snapshot. */
export function earnedBadges(s: ProgressSnapshot): Set<string> {
  const out = new Set<string>()
  const lessons = Object.values(s.lessonsDone).filter(Boolean).length
  const quizzes = Object.values(s.quizCorrect).filter(Boolean).length
  const labs = Object.values(s.labsDone).filter((n) => n > 0).length

  if (lessons >= 1) out.add('first-steps')
  if (quizzes >= 10) out.add('quiz-ace')
  if (labs >= 5) out.add('lab-rat')
  if (s.streak >= 7) out.add('week-warrior')
  if (s.streak >= 30) out.add('iron-streak')
  if (s.xp >= 5000) out.add('high-roller')
  if (s.xp >= 12000) out.add('the-ceo')

  if (certEarned('GRC1', s)) out.add('grc-analyst')
  if (CERTIFICATIONS.some((c) => c.domainId === 'ai' && certEarned(c.id, s))) out.add('ai-governor')
  if (certEarned('CLD1', s)) out.add('cloud-keeper')

  return out
}
