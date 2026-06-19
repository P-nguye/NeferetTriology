-- ============================================================
-- Neferet Trilogy — Supabase Schema
-- Run this in your Supabase SQL Editor to create all tables.
-- ============================================================

create extension if not exists "pgcrypto";

-- BOOKS
create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  short_description text,
  "order" int not null,
  status text not null default 'published' check (status in ('published','coming_soon')),
  created_at timestamptz default now()
);

-- CHAPTERS
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references books(id) on delete cascade,
  slug text not null,
  title text not null,
  "order" int not null,
  content text not null,
  published_at timestamptz,
  unique(book_id, slug)
);

-- CHARACTERS
create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age text,
  role text not null check (role in ('main','royal_family')),
  description text,
  personality text,
  story_role text,
  book_ids text[] default '{}',
  "order" int not null default 0
);

-- LORE ARTICLES
create table if not exists lore_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text,
  category text,
  "order" int not null default 0
);

-- BLOG POSTS
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  content text,
  published_at timestamptz,
  excerpt text
);

-- ============================================================
-- ROW LEVEL SECURITY — public read access for all tables
-- ============================================================
alter table books enable row level security;
alter table chapters enable row level security;
alter table characters enable row level security;
alter table lore_articles enable row level security;
alter table blog_posts enable row level security;

create policy "Public read books" on books for select using (true);
create policy "Public read chapters" on chapters for select using (true);
create policy "Public read characters" on characters for select using (true);
create policy "Public read lore_articles" on lore_articles for select using (true);
create policy "Public read blog_posts" on blog_posts for select using (published_at is not null);
