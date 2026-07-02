import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Flame, Trophy, Hash } from 'lucide-react'
import { useStore, rankFor, nextRank, RANKS } from '../store/useStore'
import { supabaseAnon } from '../lib/supabase'
import { BADGES, earnedBadges, type ProgressSnapshot } from '../data/badges'
import { compact } from '../lib/format'

interface View {
  username: string
  xp: number
  streak: number
  rank?: number
  earned: Set<string>
}

export default function Profile() {
  const { username } = useParams()
  const isPublic = Boolean(username)

  // local ("me") snapshot
  const s = useStore((st) => ({
    xp: st.xp,
    streak: st.streak,
    lessonsDone: st.lessonsDone,
    quizCorrect: st.quizCorrect,
    labsDone: st.labsDone,
  })) as ProgressSnapshot

  const [view, setView] = useState<View | null>(null)
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    if (!isPublic) {
      setView({ username: 'You', xp: s.xp, streak: s.streak, earned: earnedBadges(s) })
      return
    }
    // public profile — needs Supabase
    if (!supabaseAnon) {
      setMissing(true)
      return
    }
    let alive = true
    supabaseAnon
      .from('leaderboard')
      .select('rank, username, xp, streak')
      .eq('username', username as string)
      .maybeSingle()
      .then(({ data }) => {
        if (!alive) return
        if (!data) return setMissing(true)
        // Public badges: only XP/streak thresholds are derivable server-side.
        const snap: ProgressSnapshot = { xp: data.xp, streak: data.streak, lessonsDone: {}, quizCorrect: {}, labsDone: {} }
        setView({ username: data.username, xp: data.xp, streak: data.streak, rank: data.rank, earned: earnedBadges(snap) })
      })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, isPublic, s.xp, s.streak])

  if (missing) {
    return (
      <div className="arena min-h-screen">
        <div className="container-x py-24 text-center">
          <div className="text-5xl">🕵️</div>
          <h1 className="mt-4 font-mono text-2xl font-bold text-arena-text">Profile not found</h1>
          <p className="mt-2 text-arena-muted">
            {supabaseAnon ? 'No player with that username.' : 'Public profiles need Supabase connected.'}
          </p>
          <Link to="/leaderboard" className="btn-neon-outline mt-6">Back to leaderboard</Link>
        </div>
      </div>
    )
  }
  if (!view) return <div className="arena min-h-screen" />

  const rank = rankFor(view.xp)
  const next = nextRank(view.xp)
  const rankIndex = RANKS.indexOf(rank)
  const floor = rank.xp
  const ceil = next?.xp ?? rank.xp
  const pct = next ? Math.round(((view.xp - floor) / (ceil - floor)) * 100) : 100

  return (
    <div className="arena min-h-screen">
      <div className="bg-radial-glow">
        <div className="container-x py-14">
          {/* header */}
          <div className="mx-auto max-w-3xl panel p-7">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-night-700 font-mono text-2xl text-neon-cyan">
                {view.username.slice(0, 2).toUpperCase()}
              </span>
              <div className="flex-1">
                <h1 className="font-mono text-2xl font-extrabold text-arena-text">{view.username}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="rank-badge">{rank.icon} {rank.name}</span>
                  {view.rank && (
                    <span className="chip-dark text-neon-green">
                      <Hash size={12} /> Global #{view.rank}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 font-bold text-neon-green">
                    <Trophy size={16} /> {compact(view.xp)}
                  </div>
                  <div className="text-xs text-arena-muted">XP</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1.5 font-bold text-neon-amber">
                    <Flame size={16} /> {view.streak}
                  </div>
                  <div className="text-xs text-arena-muted">streak</div>
                </div>
              </div>
            </div>

            {/* rank progress */}
            <div className="mt-6">
              <div className="mb-1 flex justify-between text-xs text-arena-muted">
                <span>Rank {rankIndex + 1} / {RANKS.length}</span>
                {next ? <span>{compact(ceil - view.xp)} XP to {next.name}</span> : <span>Max rank reached 👑</span>}
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-night-700">
                <div className="h-full rounded-full bg-neon-green shadow-glow transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>

          {/* badges */}
          <div className="mx-auto mt-8 max-w-3xl">
            <h2 className="mb-4 font-mono text-lg font-bold text-arena-text">
              Badges <span className="text-arena-muted">· {view.earned.size}/{BADGES.length}</span>
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {BADGES.map((b) => {
                const has = view.earned.has(b.id)
                return (
                  <div
                    key={b.id}
                    className={`panel flex flex-col items-center p-4 text-center transition ${
                      has ? 'panel-hover' : 'opacity-40 grayscale'
                    }`}
                    title={b.desc}
                  >
                    <span className={`text-3xl ${has ? b.tone : ''}`}>{b.icon}</span>
                    <span className="mt-2 text-xs font-bold text-arena-text">{b.name}</span>
                    <span className="mt-0.5 text-[10px] leading-tight text-arena-muted">{b.desc}</span>
                  </div>
                )
              })}
            </div>
            {isPublic && (
              <p className="mt-4 text-center text-xs text-arena-muted">
                Public profiles show XP-based badges. Course/lab badges are visible on your own profile.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
