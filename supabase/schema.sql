-- ============================================================================
--  GRC ACADEMY — Supabase schema
--  Run in: Supabase Dashboard → SQL Editor → paste → Run.
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
  -- Pro subscription valid until this instant (null = free tier).
  pro_until    timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Existing projects: add the column if the table predates it.
alter table public.profiles add column if not exists pro_until timestamptz;

alter table public.profiles enable row level security;

-- Anyone may read profiles (public leaderboard / profile pages).
create policy "profiles are public" on public.profiles
  for select using (true);

-- A user may create/update only their own row.
create policy "insert own profile" on public.profiles
  for insert with check (id = public.clerk_uid());
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
create policy "read own events" on public.xp_events
  for select using (user_id = public.clerk_uid());
-- No direct insert policy: events are written only by the SECURITY DEFINER RPC.

-- ---------------------------------------------------------------- purchases
create table if not exists public.purchases (
  id                  bigint generated always as identity primary key,
  user_id             text not null references public.profiles(id) on delete cascade,
  cert_id             text not null,            -- 'GRC1' | 'ALL_ACCESS' | ...
  amount_inr          integer not null,
  razorpay_order_id   text,
  razorpay_payment_id text,
  status              text not null default 'created'
                      check (status in ('created','paid','failed','refunded')),
  created_at          timestamptz not null default now(),
  unique (razorpay_order_id)
);

alter table public.purchases enable row level security;
create policy "read own purchases" on public.purchases
  for select using (user_id = public.clerk_uid());
-- Writes happen only via the edge function using the service-role key
-- (service role bypasses RLS), so no client insert/update policy exists.

-- ============================================================================
--  award_xp — the only way XP enters the system from the app.
--  Server owns the amount per kind. Idempotent via the unique constraint.
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
