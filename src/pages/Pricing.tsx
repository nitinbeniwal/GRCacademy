import { useState } from 'react'
import { Check, Zap, Shield, Trophy, Loader2 } from 'lucide-react'
import { CERTIFICATIONS, coursesInCert, DOMAIN_BY_ID } from '../data/curriculum'
import { formatINR, discountPct } from '../lib/format'
import { useCheckout } from '../lib/checkout'
import type { Certification } from '../types'

// All-access bundle: sum of live certs, then a headline discount.
const LIVE = CERTIFICATIONS.filter((c) => c.status === 'available')
const BUNDLE_LIST = LIVE.reduce((n, c) => n + (c.listPrice ?? c.price), 0)
const BUNDLE_PRICE = 19999

function PriceCard({
  cert,
  onBuy,
  busy,
}: {
  cert: Certification
  onBuy: (c: Pick<Certification, 'id' | 'title' | 'price'>) => void
  busy: boolean
}) {
  const pct = discountPct(cert.price, cert.listPrice)
  const courses = coursesInCert(cert.id)
  const soon = cert.status === 'coming-soon'
  const domain = DOMAIN_BY_ID[cert.domainId]

  return (
    <div className="panel panel-hover flex flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="tier-pill">
          {cert.code} · {cert.tier}
        </span>
        {pct && !soon && <span className="save-badge">{pct}% off</span>}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${cert.color} text-2xl`}>
          {cert.icon}
        </span>
        <div>
          <h3 className="font-bold leading-tight text-arena-text">{cert.title}</h3>
          <p className="text-xs text-arena-muted">{domain?.title}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-arena-muted">{cert.blurb}</p>

      <div className="mt-5 flex items-end gap-2">
        <span className="text-3xl font-extrabold text-arena-text">{formatINR(cert.price)}</span>
        {cert.listPrice && <span className="price-strike text-sm">{formatINR(cert.listPrice)}</span>}
      </div>
      {cert.priceNote && <p className="mt-1 text-xs text-arena-muted">{cert.priceNote}</p>}

      <ul className="mt-4 space-y-2 text-sm">
        <li className="flex items-center gap-2 text-arena-text">
          <Check size={15} className="text-neon-green" /> {courses.length || '—'} courses · hands-on labs
        </li>
        {cert.outcomes.slice(0, 3).map((o) => (
          <li key={o} className="flex items-start gap-2 text-arena-muted">
            <Check size={15} className="mt-0.5 shrink-0 text-neon-green" /> {o}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex-1" />
      {soon ? (
        <button
          disabled
          className="btn w-full cursor-not-allowed border border-arena-line bg-night-800 text-arena-muted"
        >
          Coming soon
        </button>
      ) : (
        <button onClick={() => onBuy(cert)} disabled={busy} className="btn-neon w-full">
          {busy ? <Loader2 size={16} className="animate-spin" /> : `Enroll · ${formatINR(cert.price)}`}
        </button>
      )}
    </div>
  )
}

export default function Pricing() {
  const { startCheckout } = useCheckout()
  const [busy, setBusy] = useState<string | null>(null)
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null)

  const onBuy = async (c: Pick<Certification, 'id' | 'title' | 'price'>) => {
    setBusy(c.id)
    const res = await startCheckout(c)
    setBusy(null)
    setToast({ ok: res.ok, msg: res.message })
    setTimeout(() => setToast(null), 6000)
  }

  return (
    <div className="arena min-h-screen">
      {toast && (
        <div
          className={`fixed inset-x-0 top-4 z-50 mx-auto w-fit max-w-[90%] rounded-lg border px-4 py-2.5 text-sm font-semibold shadow-panel ${
            toast.ok
              ? 'border-neon-green/40 bg-night-800 text-neon-green'
              : 'border-neon-amber/40 bg-night-800 text-neon-amber'
          }`}
          role="status"
        >
          {toast.msg}
        </div>
      )}
      <div className="bg-radial-glow">
        <div className="container-x py-16">
          {/* hero */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="tier-pill">Pricing</span>
            <h1 className="mt-4 font-mono text-4xl font-extrabold text-arena-text sm:text-5xl">
              One-time price. <span className="text-neon-green">Lifetime</span> access.
            </h1>
            <p className="mt-4 text-arena-muted">
              No subscriptions, no per-seat traps. Buy a certification path once, keep it forever —
              every course, every lab, and every future update inside that path.
            </p>
          </div>

          {/* trust strip */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-arena-muted">
            <span className="flex items-center gap-2"><Zap size={15} className="text-neon-cyan" /> Instant access</span>
            <span className="flex items-center gap-2"><Trophy size={15} className="text-neon-amber" /> XP, ranks & leaderboard</span>
            <span className="flex items-center gap-2"><Shield size={15} className="text-neon-green" /> Secure UPI / card checkout</span>
          </div>

          {/* all-access bundle */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="panel relative overflow-hidden p-8 shadow-glow">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-radial-glow" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <span className="rank-badge">👑 Best value</span>
                  <h2 className="mt-3 font-mono text-2xl font-extrabold text-arena-text">All-Access Pass</h2>
                  <p className="mt-1 max-w-md text-sm text-arena-muted">
                    Every live certification path — Core GRC, AI Governance and all future launches.
                    The full arena, unlocked.
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-end gap-2 md:justify-end">
                    <span className="text-4xl font-extrabold text-neon-green">{formatINR(BUNDLE_PRICE)}</span>
                    <span className="price-strike text-sm">{formatINR(BUNDLE_LIST)}</span>
                  </div>
                  <p className="mt-1 text-xs text-arena-muted">
                    Save {formatINR(BUNDLE_LIST - BUNDLE_PRICE)} vs buying separately
                  </p>
                  <button
                    onClick={() => onBuy({ id: 'ALL_ACCESS', title: 'All-Access Pass', price: BUNDLE_PRICE })}
                    disabled={busy === 'ALL_ACCESS'}
                    className="btn-neon mt-3"
                  >
                    {busy === 'ALL_ACCESS' ? <Loader2 size={16} className="animate-spin" /> : 'Get All-Access'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* individual certs */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CERTIFICATIONS.map((cert) => (
              <PriceCard key={cert.id} cert={cert} onBuy={onBuy} busy={busy === cert.id} />
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-arena-muted">
            Prices in INR, inclusive of taxes. Secure checkout via Razorpay (UPI, cards, netbanking).
          </p>
        </div>
      </div>
    </div>
  )
}
