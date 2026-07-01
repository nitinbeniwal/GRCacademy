import ScenarioLab from './ScenarioLab.jsx'
import { SCENARIOS } from './scenarios.js'
import RiskMatrixLab from './RiskMatrixLab.jsx'
import RiskRegisterLab from './RiskRegisterLab.jsx'
import ArchReviewLab from './ArchReviewLab.jsx'
import ShadowAiLab from './ShadowAiLab.jsx'
import PolicyLab from './PolicyLab.jsx'
import MappingLab from './MappingLab.jsx'

// bespoke visual/canvas labs
const BESPOKE = {
  'risk-matrix': RiskMatrixLab,
  'risk-register': RiskRegisterLab,
  'arch-review': ArchReviewLab,
  'shadow-ai': ShadowAiLab,
  'policy': PolicyLab,
  'mapping': MappingLab,
}

export default function LabHost({ labId, onComplete }) {
  const Bespoke = BESPOKE[labId]
  if (Bespoke) return <Bespoke onComplete={onComplete} />

  const scenario = SCENARIOS[labId]
  if (scenario) return <ScenarioLab labId={labId} config={scenario} onComplete={onComplete} />

  // fallback — unknown lab id
  return (
    <div className="rounded-2xl border border-night-600 bg-night-900 p-8 text-center text-slate-300">
      <div className="text-4xl">🛠️</div>
      <p className="mt-2 font-semibold">This scenario lab is being crafted.</p>
      <p className="text-sm text-slate-500">Lab id: {labId}</p>
    </div>
  )
}
