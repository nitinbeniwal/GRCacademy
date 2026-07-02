import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Flame, Crown } from 'lucide-react'
import { supabaseAnon } from '../lib/supabase'
import { useStore, rankFor } from '../store/useStore'
import { compact } from '../lib/format'

type Scope = 'all' | 'season'
type Status = 'loading' | 'live' | 'unconfigured'

interface Row {
  rank: number
  username: string
  xp: number
  streak: number
  country?: string | null
}

function medal(rank: number) {
  if (rank === 1) return <Crown size={16} className="text-neon-amber" />
  if (rank === 2) return <span className="text-arena-muted">2</span>
  if (rank === 3) return <span className="text-arena-muted">3</span>
  return null
}

export default function Leaderboard() {
  const [scope, setScope] = useState<Scope>('all')
  const [rows, setRows] = useState<Row[]>([])
  const [status, setStatus] = useState<Status>(supabaseAnon ? 'loading' : 'unconfigured')
  const xp = useStore((s) => s.xp)
  const streak = useStore((s) => s.streak)
  const rank = rankFor(xp)

  useEffect(() => {
    if (!supabaseAnon) {
      setStatus('unconfigured')
      return
    }
    let alive = true
    setStatus('loading')
    supabaseAnon
      .from(scope === 'season' ? 'season_leaderboard' : 'leaderboard')
      .select('rank, username, xp, streak, country')
      .order('rank', { ascending: true })
      .limit(100)
      .then(({ data, error }) => {
        if (!alive) return
        if (error) {
          setStatus('unconfigured')
          return
        }
        setRows((data as Row[]) ?? [])
        setStatus('live')
      })
    return () => {
      alive = false
    }
  }, [scope])

  return (
    <div className="arena min-h-screen">
      <div className="bg-radial-glow">
        <div className="container-x py-14">
          <div className="mx-auto max-w-2xl text-center">
            <span className="tier-pill">Global ranking</span>
            <h1 className="mt-4 font-mono text-4xl font-extrabold text-arena-text sm:text-5xl">
              The <span className="text-neon-green">Leaderboard</span>
            </h1>
            <p className="mt-3 text-arena-muted">
              Earn XP from lessons, checkpoints and labs. Every point is awarded server-side.
            </p>
            {status === 'live' && (
              <div className="mt-4 inline-flex overflow-hidden rounded-lg border border-arena-line">
                {(['all', 'season'] as Scope[]).map((sc) => (
                  <button
                    key={sc}
                    onClick={() => setScope(sc)}
                    className={`px-3 py-1 text-xs font-bold transition ${
                      scope === sc ? 'bg-neon-green text-night-950' : 'bg-night-800 text-arena-muted hover:text-arena-text'
                    }`}
                  >
                    {sc === 'all' ? 'All-time' : 'This season'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* your standing */}
          <div className="mx-auto mt-8 max-w-3xl panel p-5">
            <div className="flex items-center justify-between">
              <span className="rank-badge">{rank.name}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 font-bold text-neon-amber">
                  <Flame size={15} /> {streak}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-neon-green">
                  <Trophy size={15} /> {compact(xp)} XP
                </span>
              </div>
            </div>
          </div>

          {/* table / states */}
          <div className="mx-auto mt-6 max-w-3xl panel overflow-hidden">
            {status === 'loading' && (
              <div className="grid place-items-center py-16">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-arena-line border-t-neon-green" />
              </div>
            )}

            {status === 'unconfigured' && (
              <div className="px-6 py-16 text-center text-arena-muted">
                <p className="font-semibold text-arena-text">Rankings aren&apos;t connected yet</p>
                <p className="mt-1 text-sm">The live leaderboard turns on once the backend is set up.</p>
              </div>
            )}

            {status === 'live' && rows.length === 0 && (
              <div className="px-6 py-16 text-center text-arena-muted">
                <p className="font-semibold text-arena-text">No rankings yet</p>
                <p className="mt-1 text-sm">Be the first — earn XP and claim the top spot.</p>
              </div>
            )}

            {status === 'live' && rows.length > 0 && (
              <>
                <div className="flex items-center gap-4 border-b border-arena-line px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-arena-muted">
                  <span className="w-8 text-center">#</span>
                  <span className="flex-1">Player</span>
                  <span className="w-16 text-right">Streak</span>
                  <span className="w-20 text-right">XP</span>
                </div>
                {rows.map((r) => (
                  <div key={r.rank} className="lb-row">
                    <span className="lb-rank flex items-center justify-center">{medal(r.rank) ?? r.rank}</span>
                    <Link
                      to={`/u/${encodeURIComponent(r.username)}`}
                      className="flex flex-1 items-center gap-2 font-semibold text-arena-text hover:text-neon-green"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-night-700 font-mono text-xs text-neon-cyan">
                        {r.username.slice(0, 2).toUpperCase()}
                      </span>
                      {r.username}
                    </Link>
                    <span className="w-16 text-right text-sm text-neon-amber">{r.streak}</span>
                    <span className="w-20 text-right font-mono font-bold text-neon-green">{compact(r.xp)}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
