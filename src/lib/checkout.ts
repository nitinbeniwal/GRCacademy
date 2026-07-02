// ============================================================================
//  Razorpay checkout (frontend half).
//  The secret key never touches the browser. This calls two Supabase edge
//  functions:  razorpay-order  (creates a server-side order) and
//  razorpay-verify (validates the payment signature, marks the purchase paid).
// ============================================================================
import { useCallback } from 'react'
import { useSupabase } from './SupabaseProvider'
import { supabaseEnabled } from './supabase'
import { toPaise } from './format'
import type { Certification } from '../types'

/** Payments require Supabase (edge functions hold the Razorpay secret). */
export const paymentsEnabled = supabaseEnabled

let scriptPromise: Promise<boolean> | null = null
function loadRazorpay(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true)
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
  return scriptPromise
}

export type CheckoutResult = { ok: boolean; message: string }

export function useCheckout() {
  const client = useSupabase()

  const startCheckout = useCallback(
    async (cert: Pick<Certification, 'id' | 'title' | 'price'>): Promise<CheckoutResult> => {
      if (!paymentsEnabled || !client) {
        return { ok: false, message: 'Checkout is not configured yet. Add Supabase + Razorpay keys.' }
      }
      const loaded = await loadRazorpay()
      if (!loaded) return { ok: false, message: 'Could not load the payment gateway. Check your connection.' }

      // 1) Server creates the order (amount is validated server-side).
      const { data: order, error } = await client.functions.invoke('razorpay-order', {
        body: { certId: cert.id, amountInr: cert.price },
      })
      if (error || !order?.orderId) {
        return { ok: false, message: 'Could not start the order. Please try again.' }
      }

      // 2) Open Razorpay checkout.
      return new Promise<CheckoutResult>((resolve) => {
        const rzp = new window.Razorpay!({
          key: order.keyId,
          order_id: order.orderId,
          amount: toPaise(cert.price),
          currency: 'INR',
          name: 'GRC Academy',
          description: cert.title,
          theme: { color: '#28e07a' },
          handler: async (resp: unknown) => {
            const r = resp as Record<string, string>
            // 3) Server verifies the signature before granting access.
            const { data: v, error: verr } = await client.functions.invoke('razorpay-verify', {
              body: {
                orderId: r.razorpay_order_id,
                paymentId: r.razorpay_payment_id,
                signature: r.razorpay_signature,
                certId: cert.id,
              },
            })
            if (verr || !v?.verified) {
              resolve({ ok: false, message: 'Payment could not be verified. If charged, contact support.' })
            } else {
              resolve({ ok: true, message: 'Payment successful — access unlocked!' })
            }
          },
          modal: { ondismiss: () => resolve({ ok: false, message: 'Checkout cancelled.' }) },
        })
        rzp.open()
      })
    },
    [client]
  )

  return { startCheckout, paymentsEnabled }
}
