-- ============================================================
-- bliscy — schema DB (Iteracja 1)
-- Wykonaj w Supabase SQL Editor (nowy projekt).
-- ============================================================

-- ------------------------------------------------------------
-- 1) profiles: rozszerzenie auth.users o rolę i dane podstawowe
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  full_name   text,
  city        text,
  phone       text,
  role        text check (role in ('klient','bliski','admin')),
  avatar_url  text
);

alter table public.profiles enable row level security;

-- każdy widzi tylko swój profil
create policy "own profile read"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "own profile insert"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "own profile update"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ------------------------------------------------------------
-- 2) seniors: osoby, którymi opiekuje się klient
-- ------------------------------------------------------------
create table if not exists public.seniors (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  owner_id       uuid not null references public.profiles(id) on delete cascade,
  full_name      text not null,
  city           text,
  address        text,
  phone          text,
  birth_year     int,
  notes          text
);

alter table public.seniors enable row level security;

create policy "senior owner all"
  on public.seniors for all
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

-- ------------------------------------------------------------
-- 3) helpers: publiczny profil Bliskiego (1:1 z profiles.role='bliski')
-- ------------------------------------------------------------
create table if not exists public.helpers (
  id                uuid primary key references public.profiles(id) on delete cascade,
  created_at        timestamptz not null default now(),
  bio               text,
  city              text,
  hourly_rate       numeric(10,2),
  verified          boolean not null default false,
  transport         boolean not null default false,
  languages         text[] default '{"pl"}',
  services          text[] default '{}'  -- np. spacer, zakupy, transport
);

alter table public.helpers enable row level security;

-- każdy zalogowany może przeglądać zweryfikowanych bliskich
create policy "helpers public read"
  on public.helpers for select
  to authenticated
  using (verified = true or id = auth.uid());

-- bliski edytuje tylko swój profil
create policy "helpers own upsert"
  on public.helpers for insert
  to authenticated
  with check (id = auth.uid());

create policy "helpers own update"
  on public.helpers for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- ------------------------------------------------------------
-- 4) availability: sloty dostępności Bliskiego
-- ------------------------------------------------------------
create table if not exists public.availability (
  id          uuid primary key default gen_random_uuid(),
  helper_id   uuid not null references public.helpers(id) on delete cascade,
  starts_at   timestamptz not null,
  ends_at     timestamptz not null,
  created_at  timestamptz not null default now(),
  constraint valid_slot check (ends_at > starts_at)
);

create index if not exists availability_helper_time_idx
  on public.availability(helper_id, starts_at);

alter table public.availability enable row level security;

-- klient widzi dostępność zweryfikowanych bliskich (do rezerwacji)
create policy "availability read"
  on public.availability for select
  to authenticated
  using (
    exists (select 1 from public.helpers h where h.id = helper_id and (h.verified = true or h.id = auth.uid()))
  );

-- bliski zarządza swoją dostępnością
create policy "availability own manage"
  on public.availability for all
  to authenticated
  using (helper_id = auth.uid())
  with check (helper_id = auth.uid());

-- ------------------------------------------------------------
-- 5) visits: rezerwacje wizyt
-- ------------------------------------------------------------
create table if not exists public.visits (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  client_id    uuid not null references public.profiles(id),
  senior_id    uuid not null references public.seniors(id),
  helper_id    uuid not null references public.helpers(id),
  starts_at    timestamptz not null,
  ends_at      timestamptz not null,
  status       text not null default 'pending'
               check (status in ('pending','confirmed','completed','cancelled_by_client','cancelled_by_helper','no_show')),
  note_client  text,
  note_helper  text,
  constraint valid_visit check (ends_at > starts_at)
);

create index if not exists visits_client_idx  on public.visits(client_id, starts_at desc);
create index if not exists visits_helper_idx  on public.visits(helper_id, starts_at desc);

alter table public.visits enable row level security;

-- klient widzi/tworzy swoje wizyty
create policy "visits client read"
  on public.visits for select
  to authenticated
  using (client_id = auth.uid() or helper_id = auth.uid());

create policy "visits client insert"
  on public.visits for insert
  to authenticated
  with check (client_id = auth.uid());

-- klient może zaktualizować swoją wizytę (np. anulować)
create policy "visits client update"
  on public.visits for update
  to authenticated
  using (client_id = auth.uid())
  with check (client_id = auth.uid());

-- bliski może zmienić status (accept/reject/complete)
create policy "visits helper update"
  on public.visits for update
  to authenticated
  using (helper_id = auth.uid())
  with check (helper_id = auth.uid());

-- ------------------------------------------------------------
-- 6) triggery updated_at
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists visits_touch on public.visits;
create trigger visits_touch before update on public.visits
  for each row execute function public.touch_updated_at();
