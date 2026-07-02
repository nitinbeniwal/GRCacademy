import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Check } from 'lucide-react'
import LabShell from './LabShell'

interface Node {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  flaw: boolean
  note: string
}
const NODES: Node[] = [
  { id: 'lb', x: 60, y: 90, w: 120, h: 46, label: 'Load Balancer', flaw: false, note: 'Fine — terminates TLS.' },
  { id: 'web', x: 240, y: 40, w: 120, h: 46, label: 'Web Server\n(0.0.0.0 open)', flaw: true, note: 'Security group allows 0.0.0.0/0 on all ports — wide open.' },
  { id: 'app', x: 240, y: 140, w: 120, h: 46, label: 'App Server\n(admin/admin)', flaw: true, note: 'Default credentials still set on the app.' },
  { id: 'db', x: 430, y: 40, w: 120, h: 46, label: 'Database\n(unencrypted)', flaw: true, note: 'Data at rest is not encrypted.' },
  { id: 'bkp', x: 430, y: 140, w: 120, h: 46, label: 'Backups\n(public S3)', flaw: true, note: 'Backup bucket is publicly readable.' },
  { id: 'logs', x: 620, y: 90, w: 120, h: 46, label: 'Logging', flaw: false, note: 'Central logging — good.' },
  { id: 'iam', x: 620, y: 180, w: 120, h: 46, label: 'IAM: MFA on', flaw: false, note: 'MFA enforced — good.' },
]
const FLAWS = NODES.filter((n) => n.flaw).length
const EDGES: [string, string][] = [
  ['lb', 'web'], ['lb', 'app'], ['web', 'db'], ['app', 'db'], ['app', 'bkp'], ['db', 'logs'], ['bkp', 'logs'],
]

export default function ArchReviewLab({ onComplete }: { onComplete?: () => void }) {
  return (
    <LabShell
      labId="arch-review"
      title="LAB: Cloud Architecture Review"
      brief={`🏗️ Click every security flaw in this cloud architecture. There are ${FLAWS} to find. Wrong clicks cost points.`}
      onComplete={onComplete}
    >
      {({ submit }) => <Diagram submit={submit} />}
    </LabShell>
  )
}

function Diagram({ submit }: { submit: (score: number) => void }) {
  const [found, setFound] = useState<Record<string, boolean>>({})
  const [wrong, setWrong] = useState<Record<string, boolean>>({})
  const [msg, setMsg] = useState('Inspect the diagram…')

  const foundCount = Object.keys(found).length
  const done = foundCount === FLAWS

  const click = (n: Node) => {
    if (found[n.id] || wrong[n.id]) return
    if (n.flaw) {
      const nf = { ...found, [n.id]: true }
      setFound(nf)
      setMsg(`⚠️ ${n.note}`)
      if (Object.keys(nf).length === FLAWS) {
        const penalty = Object.keys(wrong).length * 15
        setTimeout(() => submit(Math.max(0, 100 - penalty)), 900)
      }
    } else {
      setWrong({ ...wrong, [n.id]: true })
      setMsg(`✅ ${n.note} (not a flaw — that click cost you)`)
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-slate-300">
          Flaws found: <b className="text-neon-green">{foundCount}/{FLAWS}</b>
        </span>
        <span className="text-slate-400">
          Wrong clicks: <b className="text-neon-red">{Object.keys(wrong).length}</b>
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-night-600 bg-night-800 p-3">
        <svg viewBox="0 0 760 250" className="w-full min-w-[640px]" role="img" aria-label="Cloud architecture diagram">
          {EDGES.map(([a, b], i) => {
            const na = NODES.find((n) => n.id === a)!
            const nb = NODES.find((n) => n.id === b)!
            return (
              <line key={i} x1={na.x + na.w / 2} y1={na.y + na.h / 2} x2={nb.x + nb.w / 2} y2={nb.y + nb.h / 2} stroke="#2a3550" strokeWidth="2" />
            )
          })}
          {NODES.map((n) => {
            const isFound = found[n.id]
            const isWrong = wrong[n.id]
            const stroke = isFound ? '#f43f5e' : isWrong ? '#28e07a' : '#3a4a6a'
            const fill = isFound ? '#3b1420' : isWrong ? '#0f2a1c' : '#141d30'
            const multiline = n.label.includes('\n')
            return (
              <g key={n.id} onClick={() => click(n)} style={{ cursor: 'pointer' }}>
                <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8" fill={fill} stroke={stroke} strokeWidth="2" />
                {n.label.split('\n').map((line, li) => (
                  <text
                    key={li}
                    x={n.x + n.w / 2}
                    y={n.y + (multiline ? 20 : 28) + li * 15}
                    textAnchor="middle"
                    fontSize="12"
                    fill={isFound ? '#fca5a5' : '#cbd5e1'}
                    fontWeight={li === 0 ? 700 : 400}
                  >
                    {line}
                  </text>
                ))}
                {isFound && <text x={n.x + n.w - 10} y={n.y + 16} fontSize="16">⚠️</text>}
                {isWrong && <text x={n.x + n.w - 10} y={n.y + 16} fontSize="14">✓</text>}
              </g>
            )
          })}
        </svg>
      </div>

      <motion.div
        key={msg}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-3 flex items-center gap-2 rounded-lg bg-night-800 px-4 py-3 text-sm text-slate-200"
      >
        {done ? <Check size={16} className="text-neon-green" /> : <AlertTriangle size={16} className="text-amber-400" />}
        {msg}
      </motion.div>
    </div>
  )
}
