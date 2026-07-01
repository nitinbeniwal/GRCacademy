import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Timer } from 'lucide-react'
import LabShell from './LabShell.jsx'

// Generic multi-step decision engine. config: { title, brief, timed?, steps:[{prompt, context?, options:[{t,ok,fb}]}] }
function Runner({ config, submit }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [correct, setCorrect] = useState(0)
  const [timeLeft, setTimeLeft] = useState(config.timed || 0)
  const timerRef = useRef(null)
  const step = config.steps[i]

  useEffect(() => {
    if (!config.timed) return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); submit((correct / config.steps.length) * 100); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, []) // eslint-disable-line

  const choose = (oi) => {
    if (picked !== null) return
    setPicked(oi)
    const ok = step.options[oi].ok
    const nc = correct + (ok ? 1 : 0)
    if (ok) setCorrect(nc)
    setTimeout(() => {
      if (i + 1 >= config.steps.length) {
        clearInterval(timerRef.current)
        submit((nc / config.steps.length) * 100)
      } else { setI(i + 1); setPicked(null) }
    }, 1400)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 text-sm text-slate-400">
        <span>Step {i + 1} / {config.steps.length}</span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-night-700">
          <div className="h-full bg-neon-cyan transition-all" style={{ width: `${(i / config.steps.length) * 100}%` }} />
        </div>
        {!!config.timed && (
          <span className={`flex items-center gap-1 font-mono font-bold ${timeLeft <= 10 ? 'text-neon-red animate-pulseGlow' : 'text-amber-400'}`}>
            <Timer size={14} /> {timeLeft}s
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
          {step.context && <div className="mb-3 rounded-lg border border-night-600 bg-night-800 px-4 py-3 text-sm text-slate-300">{step.context}</div>}
          <h4 className="mb-4 text-lg font-bold text-white">{step.prompt}</h4>
          <div className="space-y-2.5">
            {step.options.map((o, oi) => {
              const isPicked = picked === oi
              const reveal = picked !== null
              const good = reveal && o.ok
              const bad = reveal && isPicked && !o.ok
              return (
                <button key={oi} disabled={reveal} onClick={() => choose(oi)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition
                    ${good ? 'border-neon-green bg-neon-green/10'
                      : bad ? 'border-neon-red bg-neon-red/10'
                      : 'border-night-600 bg-night-800 hover:border-neon-cyan hover:bg-night-700'}`}>
                  <span className="flex-1">{o.t}</span>
                  {good && <Check size={16} className="text-neon-green" />}
                  {bad && <X size={16} className="text-neon-red" />}
                </button>
              )
            })}
          </div>
          {picked !== null && step.options[picked].fb && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className={`mt-3 rounded-lg px-4 py-2.5 text-sm ${step.options[picked].ok ? 'bg-neon-green/10 text-emerald-300' : 'bg-neon-red/10 text-rose-300'}`}>
              {step.options[picked].fb}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ScenarioLab({ labId, config, onComplete }) {
  return (
    <LabShell labId={labId} title={config.title} brief={config.brief} onComplete={onComplete}>
      {({ submit }) => <Runner config={config} submit={submit} />}
    </LabShell>
  )
}
