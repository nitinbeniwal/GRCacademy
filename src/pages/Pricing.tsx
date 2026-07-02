import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { formatINR } from '../lib/format'
import { PLANS, YEARLY_SAVING } from '../lib/plans'
import { useCheckout, type PlanKey } from '../lib/checkout'
import { useEntitlement } from '../lib/entitlement'

const FREE_INCLUDES = [
  'The GRC1 foundation path',
  'Governance, risk & compliance fundamentals',
  'Risk registers & core controls',
  'Progress tracking, XP and the leaderboard',
]

const PRO_INCLUDES = [
  'Everything in Free',
  'GRC2 Practitioner — 11 frameworks (ISO 27001, SOC 2, GDPR, PCI, more)',
  'GRC Lead — audit, continuity, financial & IT governance',
  'AI Governance — EU AI Act, NIST AI RMF, ISO 42001',
  'Cloud GRC — shared responsibility, CSPM, FedRAMP',
  'Every hands-on scenario lab',
]

export default function Pricing() {
  const [cycle, setCycle] = useState<PlanKey>('yearly')
  const { startCheckout } = useCheckout()
  const { isPro } = useEntitlement()
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null)

  const plan = PLANS[cycle]

  const upgrade = async () => {
    setBusy(true)
    const res = await startCheckout(cycle)
    setBusy(false)
    setToast({ ok: res.ok, msg: res.message })
    setTimeout(() => setToast(null), 6000)
  }

  return (
    <div className="bg-cbg">
      {toast && (
        <div
          className={`fixed inset-x-0 top-4 z-50 mx-auto w-fit max-w-[90%] rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-card ${
            toast.ok ? 'border-emerald-300 bg-white text-emerald-700' : 'border-amber-300 bg-white text-amber-700'
          }`}
          role="status"
        >
          {toast.msg}
        </div>
      )}

      <div className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-cink sm:text-4xl">Simple, honest pricing</h1>
          <p className="mt-3 text-cslate">
            Start free after you sign up. Upgrade to Pro when you&apos;re ready for the advanced paths and
            the AI Governance track. One subscription, everything included.
          </p>
        </div>

        {/* billing cycle toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-semibold ${cycle === 'monthly' ? 'text-cink' : 'text-cslate'}`}>Monthly</span>
          <button
            onClick={() => setCycle((c) => (c === 'monthly' ? 'yearly' : 'monthly'))}
            className="relative h-7 w-12 rounded-full bg-cblue transition"
            aria-label="Toggle billing cycle"
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                cycle === 'yearly' ? 'left-6' : 'left-1'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold ${cycle === 'yearly' ? 'text-cink' : 'text-cslate'}`}>
            Yearly
            <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              save {formatINR(YEARLY_SAVING)}
            </span>
          </span>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* FREE */}
          <div className="flex flex-col rounded-2xl border border-cline bg-white p-8 shadow-card">
            <h2 className="text-lg font-bold text-cink">Free</h2>
            <p className="mt-1 text-sm text-cslate">The foundation, on the house.</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-cink">{formatINR(0)}</span>
              <span className="mb-1 text-sm text-cslate">forever</span>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {FREE_INCLUDES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-cink">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex-1" />
            <Link to="/certifications" className="btn-ghost w-full">Start with GRC1</Link>
          </div>

          {/* PRO */}
          <div className="relative flex flex-col rounded-2xl border-2 border-cblue bg-white p-8 shadow-cardhover">
            <span className="absolute -top-3 left-8 rounded-full bg-cblue px-3 py-1 text-xs font-bold text-white">
              Most popular
            </span>
            <h2 className="text-lg font-bold text-cink">Pro</h2>
            <p className="mt-1 text-sm text-cslate">The complete GRC curriculum.</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-cink">{formatINR(plan.price)}</span>
              <span className="mb-1 text-sm text-cslate">/{plan.per}</span>
            </div>
            <p className="mt-1 text-xs text-cslate">
              {cycle === 'yearly'
                ? `Billed yearly · works out to ${formatINR(Math.round(plan.price / 12))}/month`
                : `Billed monthly · switch to yearly and save ${formatINR(YEARLY_SAVING)}`}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {PRO_INCLUDES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-cink">
                  <Check size={16} className="mt-0.5 shrink-0 text-cblue" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex-1" />
            {isPro ? (
              <button disabled className="btn w-full cursor-default bg-emerald-600 text-white">
                You&apos;re on Pro
              </button>
            ) : (
              <button onClick={upgrade} disabled={busy} className="btn-primary w-full">
                {busy ? 'Opening checkout…' : `Go Pro — ${formatINR(plan.price)}/${plan.per}`}
              </button>
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-cslate">
          Prices in INR, inclusive of taxes. Secure checkout via Razorpay (UPI, cards, netbanking).
          Cancel anytime — Pro stays active until the end of your billing period.
        </p>
      </div>
    </div>
  )
}
