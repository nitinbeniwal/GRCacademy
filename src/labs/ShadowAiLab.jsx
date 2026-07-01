import { useState } from 'react'
import { motion } from 'framer-motion'
import LabShell from './LabShell.jsx'

const ITEMS = [
  { e: '💬', name: 'Marketing using ChatGPT for customer emails', ai: true },
  { e: '📊', name: 'Finance Excel spreadsheet', ai: false },
  { e: '🤖', name: 'Support team’s unapproved AI chatbot', ai: true },
  { e: '📧', name: 'Company email server', ai: false },
  { e: '🧠', name: 'HR resume-screening ML tool (no sign-off)', ai: true },
  { e: '🖨️', name: 'Office printer', ai: false },
  { e: '🎨', name: 'Designer using Midjourney on client data', ai: true },
  { e: '📅', name: 'Shared calendar', ai: false },
  { e: '📞', name: 'AI sales-call transcription bot', ai: true },
]

export default function ShadowAiLab({ onComplete }) {
  return (
    <LabShell labId="shadow-ai" title="LAB: Shadow AI Discovery"
      brief="🔍 Scan the office. For each thing you find, decide: is it Shadow AI (unsanctioned AI that must go in the registry) or a normal tool?"
      onComplete={onComplete}>
      {({ submit }) => <Scan submit={submit} />}
    </LabShell>
  )
}

function Scan({ submit }) {
  const [i, setI] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [flash, setFlash] = useState(null) // 'ok'|'no'
  const item = ITEMS[i]

  const decide = (isAI) => {
    if (flash) return
    const ok = isAI === item.ai
    if (ok) setCorrect((c) => c + 1)
    setFlash(ok ? 'ok' : 'no')
    setTimeout(() => {
      if (i + 1 >= ITEMS.length) submit(((correct + (ok ? 1 : 0)) / ITEMS.length) * 100)
      else { setI(i + 1); setFlash(null) }
    }, 900)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
        <span>Scanning… {i + 1}/{ITEMS.length}</span>
        <span>Registry entries logged: <b className="text-neon-green">{correct}</b></span>
      </div>

      <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className={`mb-5 grid place-items-center rounded-2xl border-2 py-10 transition
          ${flash === 'ok' ? 'border-neon-green bg-neon-green/10' : flash === 'no' ? 'border-neon-red bg-neon-red/10' : 'border-night-600 bg-night-800'}`}>
        <div className="text-6xl">{item.e}</div>
        <div className="mt-3 max-w-md text-center font-semibold text-slate-100">{item.name}</div>
        {flash && (
          <div className={`mt-2 text-sm font-bold ${flash === 'ok' ? 'text-neon-green' : 'text-neon-red'}`}>
            {flash === 'ok' ? 'Correct!' : `Wrong — it ${item.ai ? 'IS' : 'is NOT'} shadow AI`}
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => decide(true)} disabled={!!flash}
          className="rounded-xl border border-neon-red/60 bg-night-800 py-4 font-bold text-neon-red hover:bg-neon-red/10">
          🚨 Shadow AI → log it
        </button>
        <button onClick={() => decide(false)} disabled={!!flash}
          className="rounded-xl border border-night-600 bg-night-800 py-4 font-bold text-slate-200 hover:bg-night-700">
          ✅ Normal tool
        </button>
      </div>
    </div>
  )
}
