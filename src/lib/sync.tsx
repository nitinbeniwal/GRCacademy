import { useEffect, useRef } from 'react'
import { useUser, useAuth } from '@clerk/clerk-react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useStore } from '../store/useStore'
import { clerkEnabled } from '../auth/config'
import { useSupabase } from './SupabaseProvider'
import { COURSES, allLessons } from '../data/curriculum'

const SYNCED_KEY = 'grc-synced-v1'

type Award = { kind: 'lesson' | 'quiz' | 'lab' | 'course'; ref: string }

function loadSynced(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(SYNCED_KEY) || '[]'))
  } catch {
    return new Set()
  }
}
function saveSynced(s: Set<string>) {
  try {
    localStorage.setItem(SYNCED_KEY, JSON.stringify([...s]))
  } catch {
    /* ignore quota */
  }
}

/** Collect every award the local store currently reflects. */
function collectAwards(s: ReturnType<typeof useStore.getState>): Award[] {
  const out: Award[] = []
  for (const id of Object.keys(s.lessonsDone)) if (s.lessonsDone[id]) out.push({ kind: 'lesson', ref: id })
  for (const key of Object.keys(s.quizCorrect)) if (s.quizCorrect[key]) out.push({ kind: 'quiz', ref: key })
  for (const labId of Object.keys(s.labsDone)) if ((s.labsDone[labId] || 0) > 0) out.push({ kind: 'lab', ref: labId })
  // Course completion = every lesson/lab of the course done.
  for (const course of COURSES) {
    const lessons = allLessons(course)
    if (!lessons.length) continue
    const complete = lessons.every((l) =>
      l.type === 'lab' ? (s.labsDone[l.labId as string] || 0) > 0 : Boolean(s.lessonsDone[l.id])
    )
    if (complete) out.push({ kind: 'course', ref: course.id })
  }
  return out
}

/**
 * Make sure a profile row exists WITHOUT clobbering a user-chosen username.
 * Insert-only; if the row exists we merely refresh streak + avatar.
 * Returns the profile row (or null when offline/failed).
 */
async function ensureProfile(
  client: SupabaseClient,
  user: { id: string; username: string | null; email?: string; imageUrl: string },
  streak: number
) {
  const { data: existing } = await client
    .from('profiles')
    .select('id, username, country, goal, onboarded, xp, streak')
    .eq('id', user.id)
    .maybeSingle()

  if (existing) {
    await client
      .from('profiles')
      .update({ streak: Math.max(streak, existing.streak ?? 0), avatar_url: user.imageUrl })
      .eq('id', user.id)
    return existing
  }

  const base =
    user.username || user.email?.split('@')[0] || `grc-${user.id.slice(-6)}`
  // Two attempts: preferred name, then a suffixed fallback for collisions.
  for (const username of [base, `${base}-${user.id.slice(-4)}`]) {
    const { data, error } = await client
      .from('profiles')
      .insert({ id: user.id, username, avatar_url: user.imageUrl, streak })
      .select('id, username, country, goal, onboarded, xp, streak')
      .single()
    if (!error && data) return data
    // 23505 = unique violation. If the *id* raced (award_xp created it), re-read.
    if (error?.code === '23505') {
      const { data: raced } = await client
        .from('profiles')
        .select('id, username, country, goal, onboarded, xp, streak')
        .eq('id', user.id)
        .maybeSingle()
      if (raced) return raced
      continue // username collision — try the suffixed variant
    }
    break
  }
  return null
}

/**
 * Best-effort two-way sync with Supabase.
 *  Down (once per sign-in): replay xp_events into the local store so progress
 *    follows the account across devices; server XP total is authoritative.
 *  Up (on every store change): send new completions through award_xp(); the
 *    server decides the XP amount. Replays are free (idempotent).
 */
function ClerkSync() {
  const client = useSupabase()
  const { user, isSignedIn, isLoaded } = useUser()
  const { has } = useAuth()
  const streak = useStore((s) => s.streak)
  const setAuth = useStore((s) => s.setAuth)
  const setNeedsOnboarding = useStore((s) => s.setNeedsOnboarding)
  const syncing = useRef(false)
  const hydratedFor = useRef<string | null>(null)

  // Pro entitlement comes straight from Clerk Billing.
  const isPro = Boolean(isSignedIn && has?.({ plan: 'pro' }))

  // Reflect Clerk auth + plan into the store as soon as it settles.
  useEffect(() => {
    if (!isLoaded) return
    setAuth(Boolean(isSignedIn), isPro)
    if (!isSignedIn) setNeedsOnboarding(false)
  }, [isLoaded, isSignedIn, isPro, setAuth, setNeedsOnboarding])

  // Profile + downward hydration, once per signed-in user per session.
  useEffect(() => {
    if (!client || !isSignedIn || !user) return
    if (hydratedFor.current === user.id) return
    hydratedFor.current = user.id
    let alive = true
    ;(async () => {
      const profile = await ensureProfile(
        client,
        {
          id: user.id,
          username: user.username,
          email: user.primaryEmailAddress?.emailAddress,
          imageUrl: user.imageUrl,
        },
        useStore.getState().streak
      )
      if (!alive) return
      setNeedsOnboarding(profile ? !profile.onboarded : true)

      // Replay server-side awards into local state (cross-device restore).
      const { data: events } = await client.from('xp_events').select('kind, ref')
      if (!alive || !events) return
      const lessons: string[] = []
      const quizzes: string[] = []
      const labs: string[] = []
      const synced = loadSynced()
      for (const e of events) {
        synced.add(`${e.kind}:${e.ref}`)
        if (e.kind === 'lesson') lessons.push(e.ref)
        else if (e.kind === 'quiz') quizzes.push(e.ref)
        else if (e.kind === 'lab') labs.push(e.ref)
      }
      saveSynced(synced)
      useStore.getState().hydrate({
        lessons,
        quizzes,
        labs,
        xp: profile?.xp ?? 0,
        streak: profile?.streak ?? 0,
      })
    })()
    return () => {
      alive = false
    }
  }, [client, isSignedIn, user, setNeedsOnboarding])

  // Keep the server streak fresh as it changes locally.
  useEffect(() => {
    if (!client || !isSignedIn || !user || !streak) return
    client.from('profiles').update({ streak }).eq('id', user.id).then(() => {})
  }, [client, isSignedIn, user, streak])

  // Flush any unsynced awards whenever the store changes.
  useEffect(() => {
    if (!client || !isSignedIn) return
    const flush = async () => {
      if (syncing.current) return
      syncing.current = true
      try {
        const synced = loadSynced()
        const pending = collectAwards(useStore.getState()).filter(
          (a) => !synced.has(`${a.kind}:${a.ref}`)
        )
        for (const a of pending) {
          const { error } = await client.rpc('award_xp', { p_kind: a.kind, p_ref: a.ref })
          if (!error) synced.add(`${a.kind}:${a.ref}`)
        }
        if (pending.length) saveSynced(synced)
      } finally {
        syncing.current = false
      }
    }
    flush()
    const unsub = useStore.subscribe(flush)
    return unsub
  }, [client, isSignedIn])

  return null
}

/** Mounted once in App. No-op unless Clerk + Supabase are both configured. */
export function ServerSync() {
  if (!clerkEnabled) return null
  return <ClerkSync />
}
