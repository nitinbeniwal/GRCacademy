// Shared CORS + server-side price table for the Razorpay edge functions.
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// SERVER-AUTHORITATIVE prices (INR). The client can never set its own price.
// Keep in sync with src/lib/plans.ts.
export const PRICES: Record<string, number> = {
  PRO_MONTHLY: 150,
  PRO_YEARLY: 1200,
}

// Subscription length granted per plan, in days.
export const PLAN_DAYS: Record<string, number> = {
  PRO_MONTHLY: 30,
  PRO_YEARLY: 365,
}

/** Extract the Clerk user id (sub) from the Bearer JWT without trusting the client body. */
export function userIdFromJwt(authHeader: string | null): string | null {
  if (!authHeader?.startsWith('Bearer ')) return null
  try {
    const token = authHeader.slice(7)
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.sub === 'string' ? payload.sub : null
  } catch {
    return null
  }
}
