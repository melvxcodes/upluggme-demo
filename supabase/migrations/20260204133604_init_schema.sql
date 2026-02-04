-- =========================================
-- UPLUGGME: Initial schema (local dev)
-- =========================================

-- Extensions
create extension if not exists pgcrypto;

-- Enum for associated sale source
do $$ begin
  create type public.sale_source_type as enum ('post', 'comment');
exception
  when duplicate_object then null;
end $$;

-- =========================
-- PROFILES
-- =========================
create table if not exists public.profiles (
  id uuid primary key,
  legacy_id text unique,
  name text not null,
  username text not null unique,
  avatar text not null,
  bio text,
  followers_count integer,
  following_count integer,
  created_at timestamptz not null default now()
);

-- =========================
-- MARKETPLACE ITEMS
-- =========================
create table if not exists public.marketplace_items (
  id uuid primary key,
  legacy_id text unique,
  title text not null,
  price numeric(12,2) not null,
  image text not null,
  images text[] default '{}',
  seller_username text not null,
  category text not null,
  likes integer not null default 0,
  is_new boolean not null default false,
  description text,
  in_stock boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists idx_marketplace_items_category on public.marketplace_items(category);
create index if not exists idx_marketplace_items_seller_username on public.marketplace_items(seller_username);

-- =========================
-- POSTS
-- =========================
create table if not exists public.posts (
  id uuid primary key,
  legacy_id text unique,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  image text,
  likes integer not null default 0,
  comments integer not null default 0,
  shares integer not null default 0,
  created_at timestamptz not null default now(),
  is_ad boolean not null default false,
  marketplace_item_id uuid references public.marketplace_items(id) on delete set null
);

create index if not exists idx_posts_created_at on public.posts(created_at desc);
create index if not exists idx_posts_user_id on public.posts(user_id);

-- =========================
-- COMMENTS
-- =========================
create table if not exists public.comments (
  id uuid primary key,
  legacy_id text unique,
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  likes integer not null default 0,
  created_at timestamptz not null default now(),
  is_ad boolean not null default false,
  marketplace_item_id uuid references public.marketplace_items(id) on delete set null
);

create index if not exists idx_comments_post_id_created_at on public.comments(post_id, created_at desc);

-- =========================
-- ASSOCIATED SALES
-- =========================
create table if not exists public.associated_sales (
  id uuid primary key,
  legacy_id text unique,
  item_id uuid not null references public.marketplace_items(id) on delete restrict,
  buyer_username text not null,
  sale_amount numeric(12,2) not null,
  commission numeric(12,2) not null,
  created_at timestamptz not null default now(),
  post_id uuid not null references public.posts(id) on delete cascade,
  source_type public.sale_source_type not null
);

create index if not exists idx_associated_sales_post_id_created_at on public.associated_sales(post_id, created_at desc);

-- =========================================
-- RLS (safe-but-dev-friendly)
-- Public read, authenticated write (basic)
-- =========================================
alter table public.profiles enable row level security;
alter table public.marketplace_items enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.associated_sales enable row level security;

-- PROFILES: anyone can read
drop policy if exists "profiles_select_public" on public.profiles;
create policy "profiles_select_public"
on public.profiles for select
to public
using (true);

-- PROFILES: authenticated user can insert/update their own profile row
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- MARKETPLACE: public read
drop policy if exists "marketplace_select_public" on public.marketplace_items;
create policy "marketplace_select_public"
on public.marketplace_items for select
to public
using (true);

-- POSTS: public read
drop policy if exists "posts_select_public" on public.posts;
create policy "posts_select_public"
on public.posts for select
to public
using (true);

-- POSTS: authenticated insert/update/delete own
drop policy if exists "posts_insert_own" on public.posts;
create policy "posts_insert_own"
on public.posts for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own"
on public.posts for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "posts_delete_own" on public.posts;
create policy "posts_delete_own"
on public.posts for delete
to authenticated
using (auth.uid() = user_id);

-- COMMENTS: public read
drop policy if exists "comments_select_public" on public.comments;
create policy "comments_select_public"
on public.comments for select
to public
using (true);

-- COMMENTS: authenticated insert/update/delete own
drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own"
on public.comments for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "comments_update_own" on public.comments;
create policy "comments_update_own"
on public.comments for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own"
on public.comments for delete
to authenticated
using (auth.uid() = user_id);

-- ASSOCIATED SALES: public read (for demo analytics)
drop policy if exists "associated_sales_select_public" on public.associated_sales;
create policy "associated_sales_select_public"
on public.associated_sales for select
to public
using (true);
