import { useState } from 'react'
import { motion } from 'framer-motion'
import LabShell from './LabShell'

const SCEN = {
  title: 'Missing MFA on the admin portal',
  desc: 'Your fintech’s admin portal has no multi-factor authentication. Anyone with a leaked password gets full control.',
  control: 'Enforce phishing-resistant MFA on all admin accounts',
  inherentL: 4,
  inherentI: 5,
  residualL: 2,
  residualI: 5,
  treatment: 'mitigate',
}

const band = (s: number) => (s <= 4 ? 'Low' : s <= 9 ? 'Medium' : s <= 15 ? 'High' : 'Critical')
const color = (s: number) => (s <= 4 ? '#28e07a' : s <= 9 ? '#fbbf24' : s <= 15 ? '#fb923c' : '#f43f5e')

export default function RiskRegisterLab({ onComplete }: { onComplete?: () => void }) {
  return (
    <LabShell
      labId="risk-register"
      title="LAB: Risk Register"
      brief="📋 Work one risk end-to-end: score inherent risk, apply a control, score residual, then choose the treatment."
      onComplete={onComplete}
    >
      {({ submit }) => <Flow submit={submit} />}
    </LabShell>
  )
}

function Slider({ label, val, set }: { label: string; val: number; set: (n: number) => void }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400">
        <span>{label}</span>
        <span className="font-bold text-white">{val}</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        value={val}
        onChange={(e) => set(+e.target.value)}
        aria-label={label}
        className="w-full accent-cyan-400"
      />
    </div>
  )
}

function Flow({ submit }: { submit: (score: number) => void }) {
  const [stage, setStage] = useState(0)
  const [iL, setIL] = useState(3)
  const [iI, setII] = useState(3)
  const [rL, setRL] = useState(3)
  const [rI, setRI] = useState(3)
  const [score, setScore] = useState(0)

  const near = (a: number, b: number) => Math.abs(a - b) <= 1

  const submitInherent = () => {
    const ok = near(iL, SCEN.inherentL) && near(iI, SCEN.inherentI)
    setScore((s) => s + (ok ? 40 : near(iL, SCEN.inherentL) || near(iI, SCEN.inherentI) ? 20 : 0))
    setStage(1)
  }
  const submitResidual = () => {
    const ok = near(rL, SCEN.residualL) && near(rI, SCEN.residualI)
    setScore((s) => s + (ok ? 40 : 20))
    setStage(2)
  }
  const chooseTreatment = (t: string) => {
    const ok = t === SCEN.treatment
    submit(Math.min(100, score + (ok ? 20 : 0)))
  }

  const iScore = iL * iI
  const rScore = rL * rI

  return (
    <div>
      <div className="mb-4 rounded-xl border border-night-600 bg-night-800 p-4">
        <div className="font-bold text-white">{SCEN.title}</div>
        <div className="mt-1 text-sm text-slate-300">{SCEN.desc}</div>
      </div>

      {stage === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-2 text-sm font-bold text-slate-200">Step 1 — Score INHERENT risk (before controls)</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Likelihood" val={iL} set={setIL} />
            <Slider label="Impact" val={iI} set={setII} />
          </div>
          <div className="mt-3 text-sm">
            Score:{' '}
            <b style={{ color: color(iScore) }}>
              {iScore} · {band(iScore)}
            </b>
          </div>
          <button onClick={submitInherent} className="btn-primary mt-4">
            Lock inherent score →
          </button>
        </motion.div>
      )}

      {stage === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-3 rounded-lg bg-neon-cyan/10 px-4 py-2 text-sm text-cyan-200">
            Apply control: <b>{SCEN.control}</b>
          </div>
          <div className="mb-2 text-sm font-bold text-slate-200">Step 2 — Score RESIDUAL risk (after the control)</div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Slider label="Likelihood" val={rL} set={setRL} />
            <Slider label="Impact" val={rI} set={setRI} />
          </div>
          <div className="mt-2 text-xs text-slate-400">
            Tip: MFA cuts likelihood hard, but impact of admin compromise stays high.
          </div>
          <div className="mt-2 text-sm">
            Residual:{' '}
            <b style={{ color: color(rScore) }}>
              {rScore} · {band(rScore)}
            </b>
          </div>
          <button onClick={submitResidual} className="btn-primary mt-4">
            Lock residual score →
          </button>
        </motion.div>
      )}

      {stage === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="mb-2 text-sm font-bold text-slate-200">Step 3 — Choose the treatment</div>
          <div className="grid grid-cols-2 gap-3">
            {([
              ['mitigate', 'Mitigate'],
              ['accept', 'Accept'],
              ['transfer', 'Transfer'],
              ['avoid', 'Avoid'],
            ] as [string, string][]).map(([id, l]) => (
              <button
                key={id}
                onClick={() => chooseTreatment(id)}
                className="rounded-xl border border-night-600 bg-night-800 py-4 font-bold text-slate-100 hover:border-neon-green hover:bg-night-700"
              >
                {l}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-400">
            We added a control to reduce the risk — which treatment does that represent?
          </div>
        </motion.div>
      )}
    </div>
  )
}
