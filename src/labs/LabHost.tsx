import type { ComponentType } from 'react'
import type { LabId } from '../types'
import ScenarioLab from './ScenarioLab'
import { SCENARIOS } from './scenarios'
import RiskMatrixLab from './RiskMatrixLab'
import RiskRegisterLab from './RiskRegisterLab'
import ArchReviewLab from './ArchReviewLab'
import ShadowAiLab from './ShadowAiLab'
import PolicyLab from './PolicyLab'
import MappingLab from './MappingLab'

interface LabProps {
  onComplete?: () => void
}

const BESPOKE: Partial<Record<LabId, ComponentType<LabProps>>> = {
  'risk-matrix': RiskMatrixLab,
  'risk-register': RiskRegisterLab,
  'arch-review': ArchReviewLab,
  'shadow-ai': ShadowAiLab,
  policy: PolicyLab,
  mapping: MappingLab,
}

export default function LabHost({ labId, onComplete }: { labId: LabId; onComplete?: () => void }) {
  const Bespoke = BESPOKE[labId]
  if (Bespoke) return <Bespoke onComplete={onComplete} />

  const scenario = SCENARIOS[labId]
  if (scenario) return <ScenarioLab labId={labId} config={scenario} onComplete={onComplete} />

  return (
    <div className="rounded-2xl border border-night-600 bg-night-900 p-8 text-center text-slate-300">
      <div className="text-4xl">🛠️</div>
      <p className="mt-2 font-semibold">This scenario lab is being crafted.</p>
      <p className="text-sm text-slate-500">Lab id: {labId}</p>
    </div>
  )
}
