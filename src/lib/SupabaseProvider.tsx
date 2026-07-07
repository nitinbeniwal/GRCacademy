import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/clerk-react'
import { clerkEnabled } from '../auth/config'
import { supabaseAnon, makeAuthedClient } from './supabase'

/**
 * Provides a Supabase client to the tree.
 *  - Clerk on  → client forwards the Clerk "supabase" JWT (RLS sees the user).
 *  - Clerk off → anonymous client (public reads only), or null if unconfigured.
 *
 * `clerkEnabled` is constant for the app's lifetime, so the branch below is
 * stable and never violates the rules of hooks.
 */
const SupabaseContext = createContext<SupabaseClient | null>(null)

function ClerkBridge({ children }: { children: ReactNode }) {
  const { getToken } = useAuth()
  const client = useMemo(
    // Clerk's native Supabase integration adds `role: authenticated` to the
    // session token itself — no JWT template needed.
    () => makeAuthedClient(() => getToken()),
    [getToken]
  )
  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
}

export function SupabaseProvider({ children }: { children: ReactNode }) {
  if (clerkEnabled) return <ClerkBridge>{children}</ClerkBridge>
  return <SupabaseContext.Provider value={supabaseAnon}>{children}</SupabaseContext.Provider>
}

/** Access the active Supabase client (null when unconfigured). */
// eslint-disable-next-line react-refresh/only-export-components
export function useSupabase(): SupabaseClient | null {
  return useContext(SupabaseContext)
}
