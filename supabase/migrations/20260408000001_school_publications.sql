-- =====================================================================
-- school_publications: library of documents per school
-- Linked to schools by integer school_number (no FK — schools live in
-- src/data/schools.ts as a static array on the frontend).
-- =====================================================================

create extension if not exists "pgcrypto";

create table if not exists public.school_publications (
  id                 uuid primary key default gen_random_uuid(),
  school_number      integer not null,
  category           text    not null,
  category_slug      text    not null,
  original_filename  text    not null,
  storage_path       text    not null,
  mime_type          text,
  size_bytes         bigint,
  file_hash          text    not null,
  uploaded_at        timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  constraint school_publications_storage_path_unique unique (storage_path)
);

create index if not exists school_publications_school_number_idx
  on public.school_publications (school_number);

create index if not exists school_publications_category_slug_idx
  on public.school_publications (school_number, category_slug);

-- updated_at trigger ---------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists school_publications_set_updated_at on public.school_publications;
create trigger school_publications_set_updated_at
  before update on public.school_publications
  for each row execute function public.set_updated_at();

-- Row Level Security ---------------------------------------------------
alter table public.school_publications enable row level security;

drop policy if exists school_publications_select_anon on public.school_publications;
create policy school_publications_select_anon
  on public.school_publications
  for select
  to anon, authenticated
  using (true);

-- INSERT/UPDATE/DELETE — only via service_role (no policy = no access).

-- =====================================================================
-- Storage bucket: school-publications
-- Public read; writes only via service_role.
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('school-publications', 'school-publications', true)
on conflict (id) do update set public = excluded.public;

-- Storage policies -----------------------------------------------------
drop policy if exists "school-publications anon read"   on storage.objects;
drop policy if exists "school-publications anon select" on storage.objects;

create policy "school-publications anon select"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'school-publications');

-- INSERT/UPDATE/DELETE on storage.objects for this bucket — no policy,
-- which means only service_role (which bypasses RLS) can modify.
