// ============================================================================
//  Subscription plans. One Pro tier, billed monthly or yearly (INR).
//  Free tier needs no plan — it unlocks automatically after login.
// ============================================================================
export interface Plan {
  id: 'PRO_MONTHLY' | 'PRO_YEARLY'
  label: string
  price: number
  per: 'month' | 'year'
  /** subscription length granted on payment, in days */
  days: number
}

export const PLANS: Record<'monthly' | 'yearly', Plan> = {
  monthly: { id: 'PRO_MONTHLY', label: 'Monthly', price: 150, per: 'month', days: 30 },
  yearly: { id: 'PRO_YEARLY', label: 'Yearly', price: 1200, per: 'year', days: 365 },
}

/** Amount saved per year by paying yearly vs 12 monthly payments. */
export const YEARLY_SAVING = PLANS.monthly.price * 12 - PLANS.yearly.price
