import { Link } from 'react-router-dom'
import { SignUpButton } from '@clerk/clerk-react'
import { Sparkles, X } from 'lucide-react'
import { useStore } from '../store/useStore'
import { clerkEnabled } from '../auth/config'

// Founding-member campaign: first 100,000 (1 lakh) learners.
const CAP = 100_000
const LAUNCH = new Date('2026-06-15T00:00:00Z').getTime()

/** Deterministic "claimed" counter that grows slowly over time so it feels live. */
function claimedSeats(): number {
  const days = Math.max(0, Math.floor((Date.now() - LAUNCH) / 864e5))
  const seats = 41_280 + days * 137 + Math.floor((Date.now() / 36e5) % 60)
  return Math.min(CAP - 1, seats)
}

export default function EarlyBird() {
  const dismissed = useStore((s) => s.offerDismissed)
  const dismiss = useStore((s) => s.dismissOffer)
  if (dismissed) return null

  const claimed = claimedSeats()
  const remaining = CAP - claimed
  const pct = Math.round((claimed / CAP) * 100)

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-[1.5px] shadow-cardhover">
      <div className="relative rounded-2xl bg-night-900 p-5 text-white sm:p-6">
        <button
          onClick={dismiss}
          aria-label="Dismiss offer"
          className="absolute right-3 top-3 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex-1 min-w-[220px]">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
              <Sparkles size={13} /> FOUNDING-MEMBER OFFER
            </div>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight">
              40% off — forever. <span className="text-amber-300">First 1 lakh learners only.</span>
            </h3>
            <p className="mt-1 text-sm text-white/75">
              Lock the founding-member price on every certification, for life. No card needed to
              start — claim your seat before it&apos;s gone.
            </p>

            <div className="mt-4 max-w-md">
              <div className="mb-1 flex justify-between text-xs text-white/70">
                <span>{claimed.toLocaleString('en-IN')} claimed</span>
                <span className="font-bold text-amber-300">{remaining.toLocaleString('en-IN')} seats left</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-400 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {clerkEnabled ? (
                <SignUpButton mode="modal">
                  <button className="btn bg-white text-night-900 hover:bg-white/90">Claim my founding seat</button>
                </SignUpButton>
              ) : (
                <Link to="/certifications" className="btn bg-white text-night-900 hover:bg-white/90">
                  Claim my founding seat
                </Link>
              )}
              <button onClick={dismiss} className="btn border border-white/30 text-white hover:bg-white/10">
                Maybe later
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-3xl font-extrabold text-amber-300">40%</div>
              <div className="text-[11px] text-white/60">off, for life</div>
            </div>
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <div className="text-3xl font-extrabold">₹0</div>
              <div className="text-[11px] text-white/60">to start</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
