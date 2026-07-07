// ============================================================================
//  Supabase client — data, leaderboard and progress persistence.
//
//  Auth model: Clerk owns identity + OTP. Supabase trusts a Clerk-issued JWT.
//  Set up (one time, in dashboards):
//    1. Clerk → Integrations → Supabase → activate. This adds the claim
//       { "role": "authenticated" } to session tokens (no JWT template).
//    2. Supabase → Authentication → Sign In / Providers → Third-Party Auth →
//       add Clerk, paste your Clerk Frontend API / issuer domain.
//    3. RLS policies key off  auth.jwt() ->> 'sub'  (the Clerk user id).
//
//  Everything degrades gracefully: with no env vars the app runs on local
//  (localStorage) state only — great for previewing the UI before keys exist.
// ============================================================================
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

/** True only when a real Supabase project is configured. */
export const supabaseEnabled = Boolean(url && anon)

/**
 * Anonymous client — safe for public reads (leaderboard, public profiles).
 * Null when Supabase is not configured.
 */
export const supabaseAnon: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, anon as string, { auth: { persistSession: false } })
  : null

/**
 * Build an authenticated client that forwards a Clerk session token on every
 * request, so Postgres RLS sees the signed-in user. Pass Clerk's `getToken`.
 */
export function makeAuthedClient(
  getToken: () => Promise<string | null>
): SupabaseClient | null {
  if (!supabaseEnabled) return null
  return createClient(url as string, anon as string, {
    auth: { persistSession: false },
    async accessToken() {
      return (await getToken()) ?? null
    },
  })
}
