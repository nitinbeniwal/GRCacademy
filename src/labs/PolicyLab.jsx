import { useState } from 'react'
import { motion } from 'framer-motion'
import LabShell from './LabShell.jsx'

const CLAUSES = [
  { t: 'All access to production systems shall require multi-factor authentication.', keep: true },
  { t: 'Employees should generally try to be careful with data when possible.', keep: false },
  { t: 'Access rights must be reviewed at least quarterly by the system owner.', keep: true },
  { t: 'We value security and take it very seriously as a company.', keep: false },
  { t: 'Security incidents must be reported to the IR team within 1 hour of detection.', keep: true },
  { t: 'Good security is everyone’s job and we all care about it.', keep: false },
  { t: 'Customer data shall be encrypted at rest using AES-256 or stronger.', keep: true },
  { t: 'Staff are encouraged to think about passwords from time to time.', keep: false },
]

export default function PolicyLab({ onComplete }) {
  return (
    <LabShell labId="policy" title="LAB: Policy Builder"
      brief="📜 Assemble an enforceable Access & Security Policy. KEEP the clauses with clear, mandatory ‘shall/must’ requirements. REJECT vague filler."
      onComplete={onComplete}>
      {({ submit }) => <Build submit={submit} />}
    </LabShell>
  )
}

function Build({ submit }) {
  const [i, setI] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [flash, setFlash] = useState(null)
  const c = CLAUSES[i]

  const decide = (keep) => {
    if (flash) return
    const ok = keep === c.keep
    if (ok) setCorrect((x) => x + 1)
    setFlash(ok ? 'ok' : 'no')
    setTimeout(() => {
      if (i + 1 >= CLAUSES.length) submit(((correct + (ok ? 1 : 0)) / CLAUSES.length) * 100)
      else { setI(i + 1); setFlash(null) }
    }, 950)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
        <span>Clause {i + 1}/{CLAUSES.length}</span>
        <span>Enforceable clauses kept: <b className="text-neon-green">{correct}</b></span>
      </div>
      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className={`mb-5 rounded-xl border-2 px-5 py-6 text-center text-lg font-medium
          ${flash === 'ok' ? 'border-neon-green bg-neon-green/10' : flash === 'no' ? 'border-neon-red bg-neon-red/10' : 'border-night-600 bg-night-800'}`}>
        “{c.t}”
        {flash && <div className={`mt-3 text-sm font-bold ${flash === 'ok' ? 'text-neon-green' : 'text-neon-red'}`}>
          {flash === 'ok' ? 'Correct!' : c.keep ? 'This one was enforceable — keep it.' : 'This was filler — reject it.'}
        </div>}
      </motion.div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => decide(true)} disabled={!!flash}
          className="rounded-xl border border-neon-green/60 bg-night-800 py-4 font-bold text-neon-green hover:bg-neon-green/10">
          ✅ Keep (enforceable)
        </button>
        <button onClick={() => decide(false)} disabled={!!flash}
          className="rounded-xl border border-neon-red/60 bg-night-800 py-4 font-bold text-neon-red hover:bg-neon-red/10">
          🗑️ Reject (filler)
        </button>
      </div>
    </div>
  )
}
