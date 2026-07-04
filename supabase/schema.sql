-- ============================================================================
--  GRC ACADEMY — Supabase schema (v2)
--  Run in: Supabase Dashboard → SQL Editor → paste → Run.
--  Safe to re-run: every statement is idempotent, so paste the whole file
--  again after any update.
--  Identity comes from Clerk. auth.jwt()->>'sub' = the Clerk user id.
-- ============================================================================

-- Helper: current Clerk user id from the verified JWT.
create or replace function public.clerk_uid() returns text
language sql stable as $$
  select coalesce(auth.jwt() ->> 'sub', '')
$$;

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id           text primary key,               -- Clerk user id (sub)
  username     text unique not null,
  avatar_url   text,
  country      text,
  xp           integer not null default 0,
  streak       integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
-- Note: Pro entitlement is owned by Clerk Billing, not stored here.

-- Onboarding fields (added v2 — `if not exists` keeps re-runs safe).
alter table public.profiles add column if not exists goal text;
alter table public.profiles add column if not exists onboarded boolean not null default false;

alter table public.profiles enable row level security;

-- Anyone may read profiles (public leaderboard / profile pages).
drop policy if exists "profiles are public" on public.profiles;
create policy "profiles are public" on public.profiles
  for select using (true);

-- A user may create/update only their own row.
drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile" on public.profiles
  for insert with check (id = public.clerk_uid());
drop policy if exists "update own profile" on public.profiles;
create policy "update own profile" on public.profiles
  for update using (id = public.clerk_uid());

-- ---------------------------------------------------------------- xp_events
-- One row per awarded action. Unique (user, ref) makes XP idempotent:
-- replaying the same completion never double-awards. This is the anti-cheat
-- backbone — the *amount* is decided server-side, not sent by the client.
create table if not exists public.xp_events (
  id         bigint generated always as identity primary key,
  user_id    text not null references public.profiles(id) on delete cascade,
  kind       text not null check (kind in ('lesson','quiz','lab','course')),
  ref        text not null,                     -- lesson id / quiz key / lab id
  amount     integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref)
);

alter table public.xp_events enable row level security;
drop policy if exists "read own events" on public.xp_events;
create policy "read own events" on public.xp_events
  for select using (user_id = public.clerk_uid());
-- No direct insert policy: events are written only by the SECURITY DEFINER RPC.
-- Payments/subscriptions are handled entirely by Clerk Billing (no table here).

-- ---------------------------------------------------------------- feedback
-- Lesson ratings + free-text comments + content requests. This is how we
-- learn which content lands and what is missing. Users write their own rows;
-- reading them back is limited to the author (review submissions in the
-- Supabase dashboard, which bypasses RLS via the service role).
create table if not exists public.feedback (
  id         bigint generated always as identity primary key,
  user_id    text not null references public.profiles(id) on delete cascade,
  lesson_id  text,                              -- null = general/site feedback
  rating     integer check (rating between 1 and 5),
  comment    text,
  created_at timestamptz not null default now()
);

alter table public.feedback enable row level security;
drop policy if exists "insert own feedback" on public.feedback;
create policy "insert own feedback" on public.feedback
  for insert with check (user_id = public.clerk_uid());
drop policy if exists "read own feedback" on public.feedback;
create policy "read own feedback" on public.feedback
  for select using (user_id = public.clerk_uid());

-- ============================================================================
--  award_xp — the only way XP enters the system from the app.
--  Server owns the amount per kind. Idempotent via the unique constraint.
--  Creates a minimal profile row if none exists yet, so a fresh sign-up can
--  never hit a foreign-key error (the app upgrades the username later).
-- ============================================================================
create or replace function public.award_xp(p_kind text, p_ref text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid    text := public.clerk_uid();
  v_amount integer;
  v_total  integer;
begin
  if v_uid = '' then
    raise exception 'not authenticated';
  end if;

  v_amount := case p_kind
    when 'lesson' then 20
    when 'quiz'   then 30
    when 'lab'    then 80
    when 'course' then 200
    else 0
  end;
  if v_amount = 0 then
    raise exception 'unknown xp kind: %', p_kind;
  end if;

  -- Ensure the profile exists (placeholder username; app replaces it during
  -- onboarding). Random suffix avoids unique-username collisions.
  insert into public.profiles (id, username)
  values (v_uid, 'user-' || substr(md5(v_uid || clock_timestamp()::text), 1, 8))
  on conflict (id) do nothing;

  -- Idempotent insert; if it already exists, award nothing.
  insert into public.xp_events (user_id, kind, ref, amount)
  values (v_uid, p_kind, p_ref, v_amount)
  on conflict (user_id, kind, ref) do nothing;

  if not found then
    select xp into v_total from public.profiles where id = v_uid;
    return coalesce(v_total, 0);
  end if;

  update public.profiles
     set xp = xp + v_amount, updated_at = now()
   where id = v_uid
  returning xp into v_total;

  return coalesce(v_total, 0);
end;
$$;

grant execute on function public.award_xp(text, text) to authenticated, anon;

-- ============================================================================
--  Leaderboard — public, server-ranked. Never trusts a client-sent score.
-- ============================================================================
create or replace view public.leaderboard as
  select
    row_number() over (order by xp desc, updated_at asc) as rank,
    id, username, avatar_url, country, xp, streak
  from public.profiles
  order by xp desc, updated_at asc;

grant select on public.leaderboard to anon, authenticated;

-- Seasonal (current calendar month) ranking, summed from xp_events.
create or replace view public.season_leaderboard as
  select
    row_number() over (order by e.season_xp desc) as rank,
    p.id, p.username, p.avatar_url, p.country,
    e.season_xp as xp, p.streak
  from public.profiles p
  join (
    select user_id, sum(amount)::int as season_xp
    from public.xp_events
    where created_at >= date_trunc('month', now())
    group by user_id
  ) e on e.user_id = p.id
  order by e.season_xp desc;

grant select on public.season_leaderboard to anon, authenticated;
