import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { Rocket, User, Globe2, Target, Loader2 } from 'lucide-react'
import { useSupabase } from '../lib/SupabaseProvider'
import { useStore } from '../store/useStore'
import { clerkEnabled } from '../auth/config'

const GOALS = [
  { id: 'first-job', label: 'Land my first GRC job', icon: '🎯' },
  { id: 'upskill', label: 'Upskill in my current role', icon: '📈' },
  { id: 'ai-governance', label: 'Move into AI governance', icon: '🤖' },
  { id: 'cert-prep', label: 'Prepare for a certification exam', icon: '📜' },
] as const

const COUNTRIES = [
  'India', 'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'Netherlands', 'Singapore', 'United Arab Emirates', 'Nigeria', 'Kenya',
  'Philippines', 'Pakistan', 'Bangladesh', 'Brazil', 'Other',
]

const USERNAME_RE = /^[a-zA-Z0-9_-]{3,20}$/

export default function Onboarding() {
  // Preview mode (no Clerk) has no accounts — nothing to onboard.
  if (!clerkEnabled) return <Navigate to="/dashboard" replace />
  return <OnboardingForm />
}

function OnboardingForm() {
  const nav = useNavigate()
  const client = useSupabase()
  const { user } = useUser()
  const setNeedsOnboarding = useStore((s) => s.setNeedsOnboarding)

  const [username, setUsername] = useState('')
  const [country, setCountry] = useState('')
  const [goal, setGoal] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // Prefill from the existing (possibly auto-generated) profile.
  useEffect(() => {
    if (!client || !user) return
    let alive = true
    client
      .from('profiles')
      .select('username, country, goal')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!alive || !data) return
        if (data.username && !data.username.startsWith('user-')) setUsername(data.username)
        if (data.country) setCountry(data.country)
        if (data.goal) setGoal(data.goal)
      })
    return () => {
      alive = false
    }
  }, [client, user])

  const submit = async () => {
    setError('')
    const name = username.trim()
    if (!USERNAME_RE.test(name)) {
      setError('Username must be 3–20 characters: letters, numbers, - or _.')
      return
    }
    if (!client || !user) {
      setError('Not connected — try reloading the page.')
      return
    }
    setSaving(true)
    try {
      // Availability check (excluding my own row).
      const { data: taken } = await client
        .from('profiles')
        .select('id')
        .eq('username', name)
        .neq('id', user.id)
        .maybeSingle()
      if (taken) {
        setError('That username is taken — try another.')
        return
      }
      const { error: upErr } = await client
        .from('profiles')
        .update({ username: name, country: country || null, goal: goal || null, onboarded: true })
        .eq('id', user.id)
      if (upErr) {
        setError(upErr.code === '23505' ? 'That username is taken — try another.' : 'Could not save. Try again.')
        return
      }
      setNeedsOnboarding(false)
      nav('/dashboard', { replace: true })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-cbg py-14">
      <div className="container-x max-w-xl">
        <div className="card p-8">
          <div className="mb-6 text-center">
            <div className="text-5xl">👋</div>
            <h1 className="mt-3 text-2xl font-extrabold">Welcome to GRC Academy</h1>
            <p className="mt-1 text-sm text-cslate">
              Two quick things and you&rsquo;re in. This is how you&rsquo;ll appear on the leaderboard.
            </p>
          </div>

          <label className="mb-1 flex items-center gap-1.5 text-sm font-semibold">
            <User size={14} className="text-cblue" /> Pick a username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="e.g. risk_ranger"
            maxLength={20}
            className="w-full rounded-xl border border-cline bg-white px-4 py-2.5 text-sm outline-none focus:border-cblue"
            autoFocus
          />

          <label className="mb-1 mt-5 flex items-center gap-1.5 text-sm font-semibold">
            <Globe2 size={14} className="text-cblue" /> Country <span className="font-normal text-cslate">(optional)</span>
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-xl border border-cline bg-white px-4 py-2.5 text-sm outline-none focus:border-cblue"
          >
            <option value="">Prefer not to say</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label className="mb-2 mt-5 flex items-center gap-1.5 text-sm font-semibold">
            <Target size={14} className="text-cblue" /> What brings you here? <span className="font-normal text-cslate">(optional)</span>
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGoal(goal === g.id ? '' : g.id)}
                className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                  goal === g.id
                    ? 'border-cblue bg-cblue-50 font-semibold text-cblue'
                    : 'border-cline bg-white text-cslate hover:border-cblue/50'
                }`}
              >
                <span className="mr-1.5">{g.icon}</span> {g.label}
              </button>
            ))}
          </div>

          {error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}

          <button onClick={submit} disabled={saving} className="btn-primary mt-6 w-full justify-center">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Rocket size={16} />}
            {saving ? 'Saving…' : 'Start learning'}
          </button>
        </div>
      </div>
    </div>
  )
}
