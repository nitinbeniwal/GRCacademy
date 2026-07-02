// ============================================================================
//  razorpay-order — creates a Razorpay order with a SERVER-decided amount.
//  Deploy:  supabase functions deploy razorpay-order
//  Secrets: supabase secrets set RAZORPAY_KEY_ID=... RAZORPAY_KEY_SECRET=...
//           (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are injected automatically)
// ============================================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders, PRICES, userIdFromJwt } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const uid = userIdFromJwt(req.headers.get('Authorization'))
    if (!uid) return json({ error: 'unauthorized' }, 401)

    const { certId } = await req.json()
    const amountInr = PRICES[certId]
    if (!amountInr) return json({ error: 'unknown cert' }, 400)

    const keyId = Deno.env.get('RAZORPAY_KEY_ID')!
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')!

    // Create the order on Razorpay (amount in paise).
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${keyId}:${keySecret}`),
      },
      body: JSON.stringify({
        amount: amountInr * 100,
        currency: 'INR',
        receipt: `${uid}:${certId}:${Date.now()}`,
        notes: { certId, uid },
      }),
    })
    const order = await rzpRes.json()
    if (!rzpRes.ok) return json({ error: 'razorpay order failed', detail: order }, 502)

    // Record a 'created' purchase using the service role (bypasses RLS).
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    await admin.from('purchases').insert({
      user_id: uid,
      cert_id: certId,
      amount_inr: amountInr,
      razorpay_order_id: order.id,
      status: 'created',
    })

    return json({ orderId: order.id, amount: amountInr, keyId })
  } catch (e) {
    return json({ error: String(e) }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
