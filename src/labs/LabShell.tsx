import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, RotateCcw, Trophy } from 'lucide-react'
import { useStore } from '../store/useStore'

interface Props {
  labId: string
  title: string
  brief?: string
  children: (api: { submit: (score: number) => void }) => ReactNode
  onComplete?: () => void
}

/** Dark "game zone" wrapper. Children get a `submit(score)` render prop. */
export default function LabShell({ labId, title, brief, children, onComplete }: Props) {
  const finishLab = useStore((s) => s.finishLab)
  const best = useStore((s) => s.labsDone[labId] || 0)
  const [score, setScore] = useState<number | null>(null)
  const [runKey, setRunKey] = useState(0)

  const submit = (s: number) => {
    const val = Math.max(0, Math.min(100, Math.round(s)))
    setScore(val)
    finishLab(labId, val)
    if (val >= 60) onComplete?.()
  }
  const replay = () => {
    setScore(null)
    setRunKey((k) => k + 1)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-night-600 bg-night-900 text-slate-100 shadow-cardhover">
      <div className="flex items-center gap-3 border-b border-night-600 bg-night-800 px-5 py-3">
        <Gamepad2 className="text-neon-purple" size={18} />
        <span className="font-bold">{title}</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-slate-400">
          <Trophy size={13} className="text-amber-400" /> Best: {best}%
        </span>
      </div>

      {brief && <div className="border-b border-night-700 bg-night-800/50 px-5 py-3 text-sm text-slate-300">{brief}</div>}

      <div className="p-5">
        {score === null ? (
          <div key={runKey}>{children({ submit })}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <div className="text-6xl">{score >= 85 ? '🏆' : score >= 60 ? '✅' : '💪'}</div>
            <div className="mt-3 text-3xl font-extrabold">{score}%</div>
            <p className="mt-2 text-slate-300">
              {score >= 85
                ? 'Outstanding — you nailed it.'
                : score >= 60
                  ? 'Passed. Solid work.'
                  : 'Not quite 60% — replay to master it.'}
            </p>
            <button onClick={replay} className="btn mt-6 border border-neon-purple text-neon-purple hover:bg-neon-purple/10">
              <RotateCcw size={15} /> Replay
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
