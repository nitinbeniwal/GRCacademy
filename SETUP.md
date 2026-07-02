# GRC Academy — Full Setup & Go-Live Guide

Everything you need to take the app from "demo mode" to fully live: accounts,
API keys, where each key goes, and the exact order to do it in.

The app **runs without any of this** (demo mode: no login, demo leaderboard,
checkout disabled). You only need the steps below to turn on real auth, data,
leaderboard and payments.

---

## 1. Accounts you need (all have free tiers)

| Platform | Purpose | Sign up |
|---|---|---|
| **Clerk** | Login / signup / email OTP | https://dashboard.clerk.com |
| **Supabase** | Database, leaderboard, edge functions | https://supabase.com |
| **Razorpay** | Payments (UPI / cards) | https://dashboard.razorpay.com |
| **Netlify** | Hosting (already connected to the GitHub repo) | https://app.netlify.com |
| Domain registrar | `grcacademy.in` DNS | wherever you bought the domain |

---

## 2. Every key — what it is and where it goes

**Rule: `VITE_` keys are PUBLIC** (shipped to the browser, safe to expose).
**Everything else is a SECRET** — it goes only into Supabase edge-function
secrets, NEVER into `.env` or the frontend.

| Key | Platform | Public/Secret | Where you get it | Where you paste it |
|---|---|---|---|---|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk | Public | Clerk → API Keys → Publishable key | `.env` (local) **and** Netlify env vars |
| `VITE_SUPABASE_URL` | Supabase | Public | Supabase → Settings → API → Project URL | `.env` **and** Netlify env vars |
| `VITE_SUPABASE_ANON_KEY` | Supabase | Public | Supabase → Settings → API → `anon` public key | `.env` **and** Netlify env vars |
| `VITE_RAZORPAY_KEY_ID` | Razorpay | Public | Razorpay → Settings → API Keys → Key Id | `.env` **and** Netlify env vars (optional — the order function also returns it) |
| `RAZORPAY_KEY_ID` | Razorpay | Secret* | same Key Id | Supabase edge secret (CLI, step 6) |
| `RAZORPAY_KEY_SECRET` | Razorpay | **Secret** | Razorpay → Settings → API Keys → Key Secret (shown once) | Supabase edge secret (CLI, step 6) |
| `SUPABASE_URL` | Supabase | auto | — | Injected automatically into edge functions — **do not set** |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | auto | — | Injected automatically into edge functions — **do not set** |

\* Key Id is not really secret, but the edge function needs it too.

---

## 3. Clerk — auth + OTP + Supabase trust

1. Create an application in Clerk.
2. **Enable OTP:** Clerk → **User & Authentication → Email, Phone, Username** →
   turn on **Email verification code** (this is the OTP login the user asked for).
3. **Let Supabase trust Clerk:** Clerk → **JWT Templates → New template**.
   - Name it exactly **`supabase`**.
   - Signing algorithm: **RS256** (default).
   - Add this claim, then Save:
     ```json
     { "role": "authenticated" }
     ```
4. Copy **API Keys → Publishable key** → this is `VITE_CLERK_PUBLISHABLE_KEY`.
5. Note your **Clerk Frontend API / issuer domain** (looks like
   `https://your-app.clerk.accounts.dev`) — you need it in step 4.

---

## 4. Supabase — database + Clerk auth

1. Create a Supabase project. Copy from **Settings → API**:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **`anon` public key** → `VITE_SUPABASE_ANON_KEY`
2. **Create the database:** Supabase → **SQL Editor → New query** → paste the
   entire contents of [`supabase/schema.sql`](supabase/schema.sql) → **Run**.
   This creates tables (profiles, xp_events, purchases), row-level security,
   the `award_xp` function, and the leaderboard views.
3. **Add Clerk as an auth provider:** Supabase → **Authentication → Sign In /
   Providers → Third-Party Auth → Add Clerk** → paste the Clerk issuer domain
   from step 3.5. Save.

---

## 5. Razorpay — get keys

1. Razorpay → **Settings → API Keys → Generate Key** (use **Test Mode** first).
2. Copy:
   - **Key Id** (e.g. `rzp_test_xxxx`) → `VITE_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_ID`
   - **Key Secret** (shown once — save it now) → `RAZORPAY_KEY_SECRET`
3. Switch to **Live Mode** later to get `rzp_live_...` keys for real payments.

---

## 6. Supabase edge functions — deploy + secrets

The Razorpay logic (order creation + signature verification) runs as two edge
functions. The secret key lives only here.

Install the CLI and log in (run these in your local terminal, in the project folder):

```bash
npm install -g supabase
supabase login
supabase link --project-ref <YOUR_PROJECT_REF>   # ref is in your Supabase project URL
```

Set the secrets (only these two — the SUPABASE_* ones are automatic):

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxx RAZORPAY_KEY_SECRET=your_secret
```

Deploy both functions:

```bash
supabase functions deploy razorpay-order
supabase functions deploy razorpay-verify
```

---

## 7. Local development

Create a `.env` file in the project root (copy `.env.example`) and fill in the
four `VITE_` keys:

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_RAZORPAY_KEY_ID=rzp_test_xxxx
```

Then:

```bash
npm install
npm run dev
```

`.env` is git-ignored — it never gets committed.

---

## 8. Netlify — production env vars + deploy

The repo already auto-deploys to Netlify on every `git push`. Add the same four
public keys so the production build can use them:

1. Netlify → your site → **Site configuration → Environment variables**.
2. Add all four `VITE_` keys (same values as `.env`; use **live** keys for prod).
3. **Important:** Vite bakes env vars at build time, so after adding them go to
   **Deploys → Trigger deploy → Clear cache and deploy site**. A normal push
   also works, but you must rebuild once after adding the vars.

---

## 9. Domain — grcacademy.in

1. Netlify → **Domain management → Add a domain** → `grcacademy.in`.
2. At your registrar, set the DNS records Netlify shows (either point the
   nameservers to Netlify, or add the A/CNAME records it lists).
3. HTTPS is issued automatically (Let's Encrypt) once DNS resolves.

---

## 10. Do-it-in-this-order checklist

- [ ] Clerk app created; **Email OTP enabled**; **`supabase` JWT template** added
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` copied
- [ ] Supabase project created; `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` copied
- [ ] `supabase/schema.sql` run in SQL Editor
- [ ] Clerk added under Supabase **Third-Party Auth**
- [ ] Razorpay Key Id + Key Secret obtained
- [ ] `supabase login / link`, secrets set, **both edge functions deployed**
- [ ] `.env` filled locally → `npm run dev` works (login + leaderboard live)
- [ ] Four `VITE_` keys added in **Netlify** → **rebuild with cache cleared**
- [ ] `grcacademy.in` DNS pointed to Netlify

When all boxes are ticked: real login/OTP, cross-device progress, live
server-ranked leaderboard, and ₹150/mo or ₹1200/yr Pro checkout are all active.

---

## Quick reference — what each piece powers

- **No keys:** demo mode — browse UI, demo leaderboard, no login, no checkout.
- **Clerk only:** real login/signup + OTP; progress still local to the browser.
- **Clerk + Supabase:** cross-device progress, real leaderboard, Free/Pro gating.
- **+ Razorpay + edge functions:** live Pro subscription checkout.
