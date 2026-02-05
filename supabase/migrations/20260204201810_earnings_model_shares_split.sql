-- =========================================
-- Earnings model: shares + split commissions
-- =========================================

-- 1) Post shares table (who shared what)
create table if not exists public.post_shares (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (post_id, user_id)
);

alter table public.post_shares enable row level security;

drop policy if exists "post_shares_select_own" on public.post_shares;
create policy "post_shares_select_own"
on public.post_shares for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "post_shares_insert_own" on public.post_shares;
create policy "post_shares_insert_own"
on public.post_shares for insert
to authenticated
with check (auth.uid() = user_id);

-- 2) Extend associated_sales to include ownership + referrer + split
alter table public.associated_sales
  add column if not exists post_owner_id uuid,
  add column if not exists referrer_user_id uuid,
  add column if not exists commission_total numeric(12,2),
  add column if not exists commission_owner numeric(12,2),
  add column if not exists commission_referrer numeric(12,2);

alter table public.associated_sales
  add constraint associated_sales_post_owner_fk
  foreign key (post_owner_id) references public.profiles(id) on delete cascade;

alter table public.associated_sales
  add constraint associated_sales_referrer_fk
  foreign key (referrer_user_id) references public.profiles(id) on delete set null;

create index if not exists idx_associated_sales_owner on public.associated_sales(post_owner_id);
create index if not exists idx_associated_sales_referrer on public.associated_sales(referrer_user_id);

-- Backfill existing seeded rows:
-- - owner is the post's user_id
-- - total commission = old commission
-- - owner gets 100% initially, referrer gets 0%
update public.associated_sales s
set
  post_owner_id = p.user_id,
  commission_total = s.commission,
  commission_owner = s.commission,
  commission_referrer = 0
from public.posts p
where p.id = s.post_id
  and (s.post_owner_id is null or s.commission_total is null);

-- 3) Tighten RLS on associated_sales (privacy)
-- Remove public read, allow only owners/referrers to see row-level sales
drop policy if exists "associated_sales_select_public" on public.associated_sales;

drop policy if exists "associated_sales_select_owner_or_referrer" on public.associated_sales;
create policy "associated_sales_select_owner_or_referrer"
on public.associated_sales for select
to authenticated
using (auth.uid() = post_owner_id or auth.uid() = referrer_user_id);

-- Optional (future): writing sales should be server-side only.
-- For now: no insert/update policies are granted.

-- 4) Public “performance” access via SECURITY DEFINER functions (aggregates only)

create or replace function public.get_post_owner_earnings_for_post(post_legacy text)
returns table (
  post_id text,
  owner_commission_total numeric,
  sales_total numeric,
  sales_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.legacy_id as post_id,
    coalesce(sum(s.commission_owner), 0)::numeric as owner_commission_total,
    coalesce(sum(s.sale_amount), 0)::numeric as sales_total,
    count(*)::bigint as sales_count
  from public.posts p
  left join public.associated_sales s on s.post_id = p.id
  where p.legacy_id = post_legacy
  group by p.legacy_id;
$$;

grant execute on function public.get_post_owner_earnings_for_post(text) to anon, authenticated;

create or replace function public.get_my_owner_earnings_all_posts()
returns table (
  owner_commission_total numeric,
  sales_total numeric,
  sales_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(sum(s.commission_owner), 0)::numeric as owner_commission_total,
    coalesce(sum(s.sale_amount), 0)::numeric as sales_total,
    count(*)::bigint as sales_count
  from public.associated_sales s
  where s.post_owner_id = auth.uid();
$$;

grant execute on function public.get_my_owner_earnings_all_posts() to authenticated;

create or replace function public.get_my_owner_earnings_for_post(post_legacy text)
returns table (
  post_id text,
  owner_commission_total numeric,
  sales_total numeric,
  sales_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.legacy_id as post_id,
    coalesce(sum(s.commission_owner), 0)::numeric as owner_commission_total,
    coalesce(sum(s.sale_amount), 0)::numeric as sales_total,
    count(*)::bigint as sales_count
  from public.posts p
  left join public.associated_sales s on s.post_id = p.id
  where p.legacy_id = post_legacy
    and s.post_owner_id = auth.uid()
  group by p.legacy_id;
$$;

grant execute on function public.get_my_owner_earnings_for_post(text) to authenticated;

create or replace function public.get_my_referrer_earnings_for_post(post_legacy text)
returns table (
  post_id text,
  referrer_commission_total numeric,
  sales_total numeric,
  sales_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.legacy_id as post_id,
    coalesce(sum(s.commission_referrer), 0)::numeric as referrer_commission_total,
    coalesce(sum(s.sale_amount), 0)::numeric as sales_total,
    count(*)::bigint as sales_count
  from public.posts p
  left join public.associated_sales s on s.post_id = p.id
  where p.legacy_id = post_legacy
    and s.referrer_user_id = auth.uid()
  group by p.legacy_id;
$$;

grant execute on function public.get_my_referrer_earnings_for_post(text) to authenticated;
