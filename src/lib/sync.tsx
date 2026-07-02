import { useEffect, useRef } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useStore } from '../store/useStore'
import { clerkEnabled } from '../auth/config'
import { useSupabase } from './SupabaseProvider'

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
  return out
}

/**
 * Best-effort mirror of local progress into Supabase. XP amounts are decided
 * server-side by award_xp(); this only tells the server *which* actions
 * happened. Replays are free (idempotent), so we also cache what we've sent.
 */
function ClerkSync() {
  const client = useSupabase()
  const { user, isSignedIn, isLoaded } = useUser()
  const streak = useStore((s) => s.streak)
  const setAuth = useStore((s) => s.setAuth)
  const syncing = useRef(false)

  // Reflect Clerk auth state into the store as soon as it settles.
  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) setAuth(false, null)
  }, [isLoaded, isSignedIn, setAuth])

  // Ensure a profile row exists, then read back the Pro entitlement.
  useEffect(() => {
    if (!isSignedIn || !user) return
    // No Supabase yet: still a signed-in free member.
    if (!client) return setAuth(true, null)

    const username =
      user.username ||
      user.primaryEmailAddress?.emailAddress?.split('@')[0] ||
      `grc-${user.id.slice(-6)}`
    client
      .from('profiles')
      .upsert({ id: user.id, username, avatar_url: user.imageUrl, streak }, { onConflict: 'id' })
      .select('pro_until')
      .maybeSingle()
      .then(({ data }) => setAuth(true, data?.pro_until ?? null))
  }, [client, isSignedIn, user, streak, setAuth])

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
