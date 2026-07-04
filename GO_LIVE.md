# Make it fully working — the exact list

Code is done and deployed. To make **every feature actually work**, complete
these dashboard/config steps. Nothing here is code — it's all account setup.

Status legend: 🔴 not done yet · 🟢 done

---

## A. Security (do first) 🔴
- [ ] Rotate the **Clerk secret key** (`sk_test_...`) — it was pasted in chat.
      Clerk → API Keys → regenerate.
- [ ] Rotate the **Supabase secret key** (`sb_secret_...`) — same reason.
      Supabase → Settings → API Keys → roll.
- These two are **not used by the app**, so rotating breaks nothing.

## B. Clerk — auth + OTP 🔴
- [ ] User & Authentication → Email → enable **Email verification code** (OTP).
- [ ] JWT Templates → New → name **`supabase`**, algorithm RS256,
      claim `{ "role": "authenticated" }`.

## C. Clerk — Billing (fixes "only Free plan shows") 🔴
- [ ] Billing → **Enable** → connect a payment gateway (Stripe; test gateway ok).
- [ ] Billing → Plans → **Create plan**:
      - Name **Pro**, **slug `pro`** (exact — code checks it)
      - **Publicly available: ON**
      - Prices: **150 / month** and **1200 / year** (currency **INR** — needs your
        own Stripe connected; test gateway may force USD)
      - **Publish**
- After this, `/pricing` shows Free **and** Pro.

## D. Supabase — data + leaderboard 🔴
- [ ] SQL Editor → paste all of `supabase/schema.sql` → **Run**.
      (Re-run the whole file after any update — it's idempotent. The v2 schema
      adds onboarding fields + a `feedback` table for lesson ratings.)
- [ ] Authentication → Sign In / Providers → **Third-Party Auth → Add Clerk** →
      paste issuer domain `https://nearby-treefrog-15.clerk.accounts.dev`.
- If the leaderboard shows an auth error, switch `VITE_SUPABASE_ANON_KEY` to the
  **legacy** `anon` JWT key (Supabase → Settings → API → Legacy keys) and tell me.

## E. Netlify — make the LIVE site use the keys 🔴
- [ ] Site configuration → Environment variables → add all three:
      - `VITE_CLERK_PUBLISHABLE_KEY`
      - `VITE_SUPABASE_URL`
      - `VITE_SUPABASE_ANON_KEY`
- [ ] Deploys → **Trigger deploy → Clear cache and deploy site**.
- [ ] Confirm the deploy succeeded (private repo must still be authorized for the
      Netlify GitHub app).

## F. Domain (when ready to launch) 🔴
- [ ] Netlify → Domain management → add `grcacademy.in` → set registrar DNS.
- [ ] Switch Clerk to a **production instance** (`pk_live_...`) and add the domain
      in Clerk. Update the Netlify env var to the live key, then rebuild.

---

## What each step turns on

| After you finish | This starts working |
|---|---|
| B (Clerk auth/OTP) | Real login/signup + email OTP |
| C (Billing + `pro` plan) | Pro plan visible + subscription checkout + Pro content unlock |
| D (schema + third-party auth) | Cross-device progress + live leaderboard + profiles |
| E (Netlify env + rebuild) | All of the above on the **live** site (not just localhost) |
| F (domain + prod instance) | Public launch on grcacademy.in without dev badge |

## Fastest path to "everything works" locally
B → C → D, then reload `http://localhost:5174/`. That gives you the full
experience on your machine. E and F are only for the public site.
