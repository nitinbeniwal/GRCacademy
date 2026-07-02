import { useState } from 'react'
import { motion } from 'framer-motion'
import LabShell from './LabShell'

interface Round {
  txt: string
  L: number
  I: number
}
const ROUNDS: Round[] = [
  { txt: 'An automated system ranks job candidates. A bug could unfairly reject many qualified people.', L: 4, I: 5 },
  { txt: 'A rarely-used internal wiki might be briefly unavailable during a deploy.', L: 3, I: 1 },
  { txt: 'Unencrypted customer card data sits on a public-facing server.', L: 4, I: 5 },
  { txt: 'A backup job occasionally logs a warning but always completes successfully.', L: 2, I: 1 },
  { txt: 'A single cloud region hosts all production; the provider has had multi-hour outages.', L: 3, I: 4 },
]

function band(score: number) {
  if (score <= 4) return { t: 'Low', c: '#28e07a' }
  if (score <= 9) return { t: 'Medium', c: '#fbbf24' }
  if (score <= 15) return { t: 'High', c: '#fb923c' }
  return { t: 'Critical', c: '#f43f5e' }
}
const cellColor = (l: number, i: number) => band(l * i).c

export default function RiskMatrixLab({ onComplete }: { onComplete?: () => void }) {
  return (
    <LabShell
      labId="risk-matrix"
      title="LAB: Risk Assessment Matrix"
      brief="📊 For each scenario, click the cell that best matches its likelihood × impact. Aim within one cell of the expert score."
      onComplete={onComplete}
    >
      {({ submit }) => <Game submit={submit} />}
    </LabShell>
  )
}

function Game({ submit }: { submit: (score: number) => void }) {
  const [round, setRound] = useState(0)
  const [pick, setPick] = useState<{ l: number; i: number } | null>(null)
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const r = ROUNDS[round]!

  const choose = (l: number, i: number) => {
    if (locked) return
    setPick({ l, i })
    setLocked(true)
    const dist = Math.abs(l - r.L) + Math.abs(i - r.I)
    const pts = dist === 0 ? 1 : dist <= 2 ? 0.5 : 0
    const ns = score + pts
    setScore(ns)
    setTimeout(() => {
      if (round + 1 >= ROUNDS.length) submit((ns / ROUNDS.length) * 100)
      else {
        setRound(round + 1)
        setPick(null)
        setLocked(false)
      }
    }, 1700)
  }

  return (
    <div>
      <div className="mb-4 text-sm text-slate-400">
        Scenario {round + 1} / {ROUNDS.length}
      </div>
      <div className="mb-5 rounded-xl border border-night-600 bg-night-800 px-4 py-3 text-slate-200">{r.txt}</div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center">
          <span
            className="rotate-180 text-xs font-bold tracking-wide text-slate-400"
            style={{ writingMode: 'vertical-rl' }}
          >
            IMPACT →
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-1.5">
            {[5, 4, 3, 2, 1].map((i) =>
              [1, 2, 3, 4, 5].map((l) => {
                const isPick = pick && pick.l === l && pick.i === i
                const isAns = locked && l === r.L && i === r.I
                return (
                  <motion.button
                    key={`${l}-${i}`}
                    whileHover={{ scale: locked ? 1 : 1.08 }}
                    onClick={() => choose(l, i)}
                    disabled={locked}
                    aria-label={`Likelihood ${l}, impact ${i}`}
                    className="relative aspect-square rounded-md text-[11px] font-bold text-black/70"
                    style={{
                      background: cellColor(l, i),
                      opacity: locked && !isPick && !isAns ? 0.35 : 1,
                      outline: isPick ? '3px solid #fff' : isAns ? '3px solid #22d3ee' : 'none',
                    }}
                  >
                    {l * i}
                    {isAns && <span className="absolute -right-1 -top-2 text-base">🎯</span>}
                  </motion.button>
                )
              })
            )}
          </div>
          <div className="mt-1 text-center text-xs font-bold tracking-wide text-slate-400">LIKELIHOOD →</div>
        </div>
      </div>

      {locked && pick && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 rounded-lg bg-night-800 px-4 py-3 text-sm">
          You picked{' '}
          <b style={{ color: cellColor(pick.l, pick.i) }}>
            {band(pick.l * pick.i).t}
          </b>{' '}
          ({pick.l * pick.i}). Expert:{' '}
          <b style={{ color: cellColor(r.L, r.I) }}>{band(r.L * r.I).t}</b> ({r.L * r.I}).
        </motion.div>
      )}
    </div>
  )
}
