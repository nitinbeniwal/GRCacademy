import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, Flame, Crown, Wifi, WifiOff } from 'lucide-react'
import { supabaseAnon, supabaseEnabled } from '../lib/supabase'
import { useStore, rankFor } from '../store/useStore'
import { compact } from '../lib/format'

type Scope = 'all' | 'season'

interface Row {
  rank: number
  username: string
  xp: number
  streak: number
  country?: string | null
  you?: boolean
}

// Shown when Supabase isn't wired yet — lets you preview the arena UI.
const DEMO: Row[] = [
  { rank: 1, username: 'zeroTrust_kira', xp: 14820, streak: 96 },
  { rank: 2, username: 'auditor_ace', xp: 12110, streak: 61 },
  { rank: 3, username: 'nist_ninja', xp: 9940, streak: 44 },
  { rank: 4, username: 'gdpr_ghost', xp: 8300, streak: 30 },
  { rank: 5, username: 'soc2_samurai', xp: 7020, streak: 22 },
  { rank: 6, username: 'risk_raven', xp: 5610, streak: 18 },
  { rank: 7, username: 'iso_isha', xp: 4400, streak: 12 },
  { rank: 8, username: 'pci_pilot', xp: 3120, streak: 9 },
]

function medal(rank: number) {
  if (rank === 1) return <Crown size={16} className="text-neon-amber" />
  if (rank === 2) return <span className="text-arena-muted">🥈</span>
  if (rank === 3) return <span className="text-arena-muted">🥉</span>
  return null
}

export default function Leaderboard() {
  const [scope, setScope] = useState<Scope>('all')
  const [rows, setRows] = useState<Row[]>(DEMO)
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(supabaseEnabled)
  const xp = useStore((s) => s.xp)
  const streak = useStore((s) => s.streak)
  const rank = rankFor(xp)

  useEffect(() => {
    if (!supabaseAnon) return
    let alive = true
    setLoading(true)
    supabaseAnon
      .from(scope === 'season' ? 'season_leaderboard' : 'leaderboard')
      .select('rank, username, xp, streak, country')
      .order('rank', { ascending: true })
      .limit(100)
      .then(({ data, error }) => {
        if (!alive) return
        setLoading(false)
        if (!error && data && data.length) {
          setRows(data as Row[])
          setLive(true)
        } else if (!error) {
          setRows([])
          setLive(true)
        }
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
              Earn XP from lessons, checkpoints and labs. Climb the ranks. Every point is awarded
              server-side — no shortcuts.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {live ? (
                <span className="chip-dark text-neon-green">
                  <Wifi size={13} /> Live rankings
                </span>
              ) : (
                <span className="chip-dark text-neon-amber">
                  <WifiOff size={13} /> {loading ? 'Connecting…' : 'Demo data — connect Supabase to go live'}
                </span>
              )}
              {/* scope toggle */}
              <div className="inline-flex overflow-hidden rounded-lg border border-arena-line">
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
            </div>
          </div>

          {/* your standing */}
          <div className="mx-auto mt-8 max-w-3xl panel p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rank-badge">{rank.icon} {rank.name}</span>
                <span className="hidden text-sm text-arena-muted sm:inline">your current rank</span>
              </div>
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

          {/* table */}
          <div className="mx-auto mt-6 max-w-3xl panel overflow-hidden">
            <div className="flex items-center gap-4 border-b border-arena-line px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-arena-muted">
              <span className="w-8 text-center">#</span>
              <span className="flex-1">Player</span>
              <span className="w-16 text-right">Streak</span>
              <span className="w-20 text-right">XP</span>
            </div>
            {rows.map((r) => (
              <div key={r.rank} className="lb-row">
                <span className="lb-rank flex items-center justify-center gap-1">
                  {medal(r.rank) ?? r.rank}
                </span>
                <Link
                  to={`/u/${encodeURIComponent(r.username)}`}
                  className="flex flex-1 items-center gap-2 font-semibold text-arena-text hover:text-neon-green"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-night-700 font-mono text-xs text-neon-cyan">
                    {r.username.slice(0, 2).toUpperCase()}
                  </span>
                  {r.username}
                </Link>
                <span className="w-16 text-right text-sm text-neon-amber">{r.streak}🔥</span>
                <span className="w-20 text-right font-mono font-bold text-neon-green">{compact(r.xp)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
