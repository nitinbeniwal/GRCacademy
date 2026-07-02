// ============================================================================
//  Formatting helpers — shared across pricing, dashboard and leaderboard UI.
// ============================================================================

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** ₹5,999 — no decimals, Indian digit grouping. */
export function formatINR(rupees: number): string {
  return inr.format(rupees)
}

/** Percentage saved vs list price, rounded — e.g. 40 for "40% off". */
export function discountPct(price: number, listPrice?: number): number | null {
  if (!listPrice || listPrice <= price) return null
  return Math.round(((listPrice - price) / listPrice) * 100)
}

/** 48210 -> "48.2k" for learner counts. */
export function compact(n: number): string {
  return Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}
