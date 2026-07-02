# GRC Academy — Full Setup & Go-Live Guide

Take the app from "demo mode" to fully live: accounts, keys, where each key
goes, and the order to do it in.

Payments now use **Clerk Billing** (Clerk's built-in subscriptions, powered by
Stripe). There is **no Razorpay, no edge functions, and no payment secret in
your code** — Clerk handles checkout, recurring billing and entitlement.

The app **runs without any of this** (demo mode: no login, demo leaderboard,
static pricing). The steps below turn on real auth, data, leaderboard and Pro
subscriptions.

---

## 1. Accounts you need (all have free tiers)

| Platform | Purpose | Sign up |
|---|---|---|
| **Clerk** | Login / signup / email OTP / **Billing** | https://dashboard.clerk.com |
| **Supabase** | Database + leaderboard | https://supabase.com |
| **Netlify** | Hosting (already connected to the GitHub repo) | https://app.netlify.com |
| Domain registrar | `grcacademy.in` DNS | wherever you bought the domain |

Stripe is used *under the hood* by Clerk Billing — you connect it from inside
Clerk, you don't wire Stripe keys yourself.

---

## 2. Every key — what it is and where it goes

All three keys are **public** (`VITE_` = shipped to the browser, safe to expose).
There are **no secrets** to manage — Clerk Billing keeps payment secrets on its
side.

| Key | Platform | Where you get it | Where you paste it |
|---|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk | Clerk → API Keys → Publishable key | `.env` (local) **and** Netlify env vars |
| `VITE_SUPABASE_URL` | Supabase | Supabase → Settings → API → Project URL | `.env` **and** Netlify env vars |
| `VITE_SUPABASE_ANON_KEY` | Supabase | Supabase → Settings → API → `anon` public key | `.env` **and** Netlify env vars |

---

## 3. Clerk — auth + OTP + Billing

1. Create an application in Clerk.
2. **Enable OTP:** Clerk → **User & Authentication → Email, Phone, Username** →
   turn on **Email verification code**. (This is the OTP login.)
3. **Enable Billing:** Clerk → **Billing** → turn it on. Follow the prompt to
   connect a payment gateway (Stripe). You can use Clerk's shared test gateway
   first, then connect your own Stripe account for live payments.
4. **Create the Pro plan:** Clerk → **Billing → Plans → Add plan**.
   - Name: **Pro**
   - **Slug: `pro`**  ← must be exactly this (the code checks `has({ plan: 'pro' })`)
   - Add two prices:
     - **Monthly** — ₹150
     - **Annual** — ₹1200
   - Save and publish the plan.
5. **Trust Supabase (for the leaderboard):** Clerk → **JWT Templates → New**.
   - Name it exactly **`supabase`**, algorithm **RS256**.
   - Add claim: `{ "role": "authenticated" }` → Save.
6. Copy **API Keys → Publishable key** → `VITE_CLERK_PUBLISHABLE_KEY`.
7. Note your **Clerk issuer domain** (e.g. `https://your-app.clerk.accounts.dev`)
   — needed in step 4.

The `<PricingTable />` on the `/pricing` page renders your Clerk plans
automatically, and checkout/upgrades/cancellations are handled by Clerk.

---

## 4. Supabase — database + Clerk auth (leaderboard only)

Supabase now only powers XP, progress and the leaderboard. No payments here.

1. Create a Supabase project. Copy from **Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **`anon` public key** → `VITE_SUPABASE_ANON_KEY`
2. **Create the database:** Supabase → **SQL Editor → New query** → paste all of
   [`supabase/schema.sql`](supabase/schema.sql) → **Run**. Creates the profiles
   and xp_events tables, row-level security, the `award_xp` function, and the
   leaderboard views.
3. **Add Clerk as an auth provider:** Supabase → **Authentication → Sign In /
   Providers → Third-Party Auth → Add Clerk** → paste the Clerk issuer domain
   from step 3.7. Save.

---

## 5. Local development

Copy `.env.example` to `.env` and fill the three public keys:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Then:

```bash
npm install
npm run dev
```

`.env` is git-ignored — it never gets committed.

---

## 6. Netlify — production env vars + deploy

The repo already auto-deploys to Netlify on every `git push`. Add the same three
keys so the production build can use them:

1. Netlify → your site → **Site configuration → Environment variables**.
2. Add all three `VITE_` keys (use your **live** Clerk key for production).
3. **Important:** Vite bakes env vars at build time, so after adding them go to
   **Deploys → Trigger deploy → Clear cache and deploy site**.

---

## 7. Domain — grcacademy.in

1. Netlify → **Domain management → Add a domain** → `grcacademy.in`.
2. At your registrar, set the DNS records Netlify shows (nameservers, or the
   A/CNAME records it lists).
3. HTTPS is issued automatically once DNS resolves.

---

## 8. Do-it-in-this-order checklist

- [ ] Clerk app created; **Email OTP enabled**
- [ ] Clerk **Billing enabled** + payment gateway connected
- [ ] Clerk **Pro plan** created with slug `pro` (₹150/mo, ₹1200/yr)
- [ ] Clerk **`supabase` JWT template** added
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` copied
- [ ] Supabase project created; URL + anon key copied
- [ ] `supabase/schema.sql` run in SQL Editor
- [ ] Clerk added under Supabase **Third-Party Auth**
- [ ] `.env` filled → `npm run dev` works (login + pricing + leaderboard live)
- [ ] Three `VITE_` keys added in **Netlify** → **rebuild with cache cleared**
- [ ] `grcacademy.in` DNS pointed to Netlify

When all boxes are ticked: real login/OTP, cross-device progress, live
server-ranked leaderboard, and auto-renewing ₹150/mo · ₹1200/yr Pro
subscriptions are all active.

---

## Quick reference — what each piece powers

- **No keys:** demo mode — browse UI, demo leaderboard, static pricing, no login.
- **Clerk only:** real login/signup + OTP; progress local to the browser;
  Pro checkout works via Clerk Billing.
- **Clerk + Supabase:** adds cross-device progress and the live leaderboard.

## Notes

- **Free vs Pro split:** Free (any logged-in user) = the GRC1 foundation path.
  Pro = GRC2, GRC Lead, AI Governance and Cloud GRC. Gating lives in
  `src/lib/entitlement.ts` and `src/components/ContentGuard.tsx`.
- **UPI caveat:** Clerk Billing runs on Stripe. Cards work everywhere; UPI
  recurring for Indian customers is limited on Stripe. If UPI becomes a
  priority, switching the billing layer to Razorpay Subscriptions is the
  alternative.
