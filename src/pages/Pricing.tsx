import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PricingTable } from '@clerk/clerk-react'
import { clerkEnabled } from '../auth/config'
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

/** Static plan cards — shown in preview when Clerk Billing isn't configured. */
function StaticPlans({ isPro }: { isPro: boolean }) {
  return (
    <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
      <div className="flex flex-col rounded-2xl border border-cline bg-white p-8 shadow-card">
        <h2 className="text-lg font-bold text-cink">Free</h2>
        <p className="mt-1 text-sm text-cslate">The foundation, on the house.</p>
        <div className="mt-5 text-4xl font-extrabold text-cink">₹0</div>
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

      <div className="relative flex flex-col rounded-2xl border-2 border-cblue bg-white p-8 shadow-cardhover">
        <span className="absolute -top-3 left-8 rounded-full bg-cblue px-3 py-1 text-xs font-bold text-white">
          Most popular
        </span>
        <h2 className="text-lg font-bold text-cink">Pro</h2>
        <p className="mt-1 text-sm text-cslate">The complete GRC curriculum.</p>
        <div className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-extrabold text-cink">₹150</span>
          <span className="mb-1 text-sm text-cslate">/month · or ₹1200/year</span>
        </div>
        <ul className="mt-6 space-y-2.5 text-sm">
          {PRO_INCLUDES.map((f) => (
            <li key={f} className="flex items-start gap-2 text-cink">
              <Check size={16} className="mt-0.5 shrink-0 text-cblue" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex-1" />
        {isPro ? (
          <button disabled className="btn w-full cursor-default bg-emerald-600 text-white">You&apos;re on Pro</button>
        ) : (
          <p className="rounded-lg bg-cbg px-4 py-3 text-center text-sm text-cslate">
            Connect Clerk Billing to enable checkout.
          </p>
        )}
      </div>
    </div>
  )
}

export default function Pricing() {
  const { isPro } = useEntitlement()

  return (
    <div className="bg-cbg">
      <div className="container-x py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold text-cink sm:text-4xl">Simple, honest pricing</h1>
          <p className="mt-3 text-cslate">
            Start free after you sign up. Upgrade to Pro for the advanced paths and the AI Governance
            track. One subscription, everything included — cancel anytime.
          </p>
        </div>

        {clerkEnabled ? (
          <div className="mx-auto mt-10 max-w-4xl">
            {/* Clerk Billing renders plans + checkout from your dashboard config. */}
            <PricingTable />
          </div>
        ) : (
          <StaticPlans isPro={isPro} />
        )}

        <p className="mt-8 text-center text-xs text-cslate">
          Prices in INR, inclusive of taxes. Secure recurring billing handled by Clerk. Pro stays
          active until the end of your billing period.
        </p>
      </div>
    </div>
  )
}
