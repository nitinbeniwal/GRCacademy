import { useState } from 'react'
import { motion } from 'framer-motion'
import LabShell from './LabShell.jsx'

const FUNCS = [
  { id: 'govern', label: 'GOVERN', c: '#a78bfa' },
  { id: 'map', label: 'MAP', c: '#22d3ee' },
  { id: 'measure', label: 'MEASURE', c: '#fbbf24' },
  { id: 'manage', label: 'MANAGE', c: '#28e07a' },
]
const CONTROLS = [
  { t: 'Define an AI policy, roles and accountability', f: 'govern' },
  { t: 'Inventory where the AI is used and who it affects', f: 'map' },
  { t: 'Benchmark the model for bias and accuracy', f: 'measure' },
  { t: 'Prioritise and remediate identified AI risks', f: 'manage' },
  { t: 'Set organisational risk tolerance for AI', f: 'govern' },
  { t: 'Test robustness against adversarial inputs', f: 'measure' },
  { t: 'Identify the context and intended use of the system', f: 'map' },
  { t: 'Respond to an AI incident and allocate resources', f: 'manage' },
]

export default function MappingLab({ onComplete }) {
  return (
    <LabShell labId="mapping" title="LAB: Control Mapping — NIST AI RMF"
      brief="🧩 Drag each control to the correct NIST AI RMF function. Tap a control, then tap its function."
      onComplete={onComplete}>
      {({ submit }) => <Map submit={submit} />}
    </LabShell>
  )
}

function Map({ submit }) {
  const [sel, setSel] = useState(null)
  const [placed, setPlaced] = useState({}) // controlIdx -> funcId
  const [correct, setCorrect] = useState(0)

  const assign = (fid) => {
    if (sel === null || placed[sel] !== undefined) return
    const ok = CONTROLS[sel].f === fid
    const np = { ...placed, [sel]: fid }
    setPlaced(np)
    const nc = correct + (ok ? 1 : 0)
    setCorrect(nc)
    setSel(null)
    if (Object.keys(np).length === CONTROLS.length) {
      setTimeout(() => submit((nc / CONTROLS.length) * 100), 700)
    }
  }

  return (
    <div>
      <div className="mb-3 text-sm text-slate-400">Placed {Object.keys(placed).length}/{CONTROLS.length}</div>

      {/* controls */}
      <div className="mb-5 flex flex-wrap gap-2">
        {CONTROLS.map((c, idx) => {
          const done = placed[idx] !== undefined
          const right = done && placed[idx] === c.f
          if (done) return (
            <span key={idx} className={`rounded-lg px-3 py-2 text-xs ${right ? 'bg-neon-green/15 text-emerald-300 line-through' : 'bg-neon-red/15 text-rose-300'}`}>
              {c.t}
            </span>
          )
          return (
            <button key={idx} onClick={() => setSel(idx)}
              className={`rounded-lg border px-3 py-2 text-left text-xs transition
                ${sel === idx ? 'border-white bg-night-700 ring-2 ring-white' : 'border-night-600 bg-night-800 hover:border-neon-cyan'}`}>
              {c.t}
            </button>
          )
        })}
      </div>

      {/* function buckets */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FUNCS.map((f) => {
          const count = Object.entries(placed).filter(([k, v]) => v === f.id && CONTROLS[k].f === f.id).length
          return (
            <motion.button key={f.id} whileHover={{ scale: sel !== null ? 1.04 : 1 }} onClick={() => assign(f.id)}
              disabled={sel === null}
              className="rounded-xl border-2 border-dashed p-4 text-center transition disabled:opacity-60"
              style={{ borderColor: f.c, background: '#141d30' }}>
              <div className="text-sm font-extrabold" style={{ color: f.c }}>{f.label}</div>
              <div className="mt-1 text-xs text-slate-400">{count} correct</div>
            </motion.button>
          )
        })}
      </div>
      {sel !== null && <div className="mt-3 text-center text-xs text-slate-400">Now tap the function this control belongs to.</div>}
    </div>
  )
}
