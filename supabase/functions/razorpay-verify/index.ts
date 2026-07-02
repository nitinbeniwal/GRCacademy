// ============================================================================
//  razorpay-verify — validates the payment signature, then grants access.
//  Signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret).
//  Only a matching signature flips the purchase to 'paid'.
//  Deploy:  supabase functions deploy razorpay-verify
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, userIdFromJwt, PLAN_DAYS } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const uid = userIdFromJwt(req.headers.get('Authorization'))
    if (!uid) return json({ verified: false, error: 'unauthorized' }, 401)

    const { orderId, paymentId, signature } = await req.json()
    if (!orderId || !paymentId || !signature) return json({ verified: false }, 400)

    const secret = Deno.env.get('RAZORPAY_KEY_SECRET')!
    const expected = await hmacSha256Hex(secret, `${orderId}|${paymentId}`)

    if (!timingSafeEqual(expected, signature)) {
      return json({ verified: false }, 400)
    }

    // Signature valid — mark paid (service role, scoped to this user's order).
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const { data: purchase, error } = await admin
      .from('purchases')
      .update({ status: 'paid', razorpay_payment_id: paymentId })
      .eq('razorpay_order_id', orderId)
      .eq('user_id', uid)
      .select('cert_id')
      .maybeSingle()
    if (error || !purchase) return json({ verified: false, error: error?.message }, 500)

    // Extend the Pro subscription. Stack onto remaining time if still active.
    const days = PLAN_DAYS[purchase.cert_id] ?? 30
    const { data: prof } = await admin.from('profiles').select('pro_until').eq('id', uid).maybeSingle()
    const base = prof?.pro_until && new Date(prof.pro_until) > new Date() ? new Date(prof.pro_until) : new Date()
    const proUntil = new Date(base.getTime() + days * 864e5).toISOString()
    await admin.from('profiles').update({ pro_until: proUntil }).eq('id', uid)

    return json({ verified: true, proUntil })
  } catch (e) {
    return json({ verified: false, error: String(e) }, 500)
  }
})

async function hmacSha256Hex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Constant-time string compare to avoid signature timing leaks. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let out = 0
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return out === 0
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
