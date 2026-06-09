-- Lumina — `courses` table, public read access (RLS), and seed data.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query),
-- or via the Supabase CLI, for your project.

-- gen_random_uuid() is provided by pgcrypto (already enabled on Supabase projects).
create extension if not exists pgcrypto;

create table if not exists public.courses (
  id          uuid         primary key default gen_random_uuid(),
  title       text         not null,
  progress    integer      not null default 0 check (progress between 0 and 100),
  icon_name   text         not null,
  created_at  timestamptz  not null default now()
);

-- Row Level Security: allow read-only access so the public anon key can SELECT,
-- while inserts/updates/deletes stay locked down.
alter table public.courses enable row level security;

drop policy if exists "Public read access" on public.courses;
create policy "Public read access"
  on public.courses
  for select
  using (true);

-- Seed data. icon_name values map to Lucide icons via src/components/ui/DynamicIcon.tsx.
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',          75, 'Atom'),
  ('TypeScript Deep Dive',             42, 'Code'),
  ('Animation with Framer Motion',     88, 'Sparkles'),
  ('Database Design with Postgres',    30, 'Database');
