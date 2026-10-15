-- Phase 4 (Experts) : consultants (PII), profils publics anonymisés, compétences,
-- expériences, références. Statuts : candidat → en_verification → qualifie/suspendu/rejete.
-- Seul un consultant qualifié est matchable (vue qualified_consultants).
-- Retour arrière : supabase/rollbacks/20261015200000_experts.down.sql

-- PII : jamais exposée côté Business (profils publics seuls, ADR-002 + contexte métier).
create table if not exists public.consultants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id) on delete set null,
  status text not null default 'candidat'
    check (status in ('candidat', 'en_verification', 'qualifie', 'suspendu', 'rejete')),
  first_name text not null default '',
  last_name text not null default '',
  email citext not null default '',
  phone text not null default '',
  city text not null default '',
  country text not null default '',
  title text not null default '',
  bio text not null default '',
  availability text not null default '' check (availability in ('', 'disponible', 'partiel', 'indisponible')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists consultants_status_idx on public.consultants (status);
create index if not exists consultants_user_idx on public.consultants (user_id);

-- Profil public anonymisé : code EXP-XXX, pays (jamais la ville), pas de PII.
create table if not exists public.consultant_public_profiles (
  consultant_id uuid primary key references public.consultants (id) on delete cascade,
  code text not null unique,
  title text not null default '',
  country text not null default '',
  summary text not null default '',
  completion integer not null default 0 check (completion between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Compétences (domaine + années + niveau 1-5, taxonomie AfriCand en phase 4+).
create table if not exists public.consultant_skills (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultants (id) on delete cascade,
  domain text not null,
  name text not null,
  years integer not null default 0 check (years >= 0),
  level integer not null default 1 check (level between 1 and 5),
  unique (consultant_id, name)
);

-- Expériences : employeur réel (PII) + version anonymisée exposable.
create table if not exists public.consultant_experiences (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultants (id) on delete cascade,
  role text not null default '',
  organization text not null default '',
  organization_public text not null default '',
  period text not null default '',
  description text not null default '',
  created_at timestamptz not null default now()
);

-- Références (vérification AfriCand, jamais exposées).
create table if not exists public.consultant_references (
  id uuid primary key default gen_random_uuid(),
  consultant_id uuid not null references public.consultants (id) on delete cascade,
  name text not null default '',
  relation text not null default '',
  contact text not null default '',
  status text not null default 'a_verifier'
    check (status in ('a_verifier', 'en_cours', 'verifiee', 'injoignable')),
  created_at timestamptz not null default now()
);

-- Seuls les qualifiés sont matchables.
create or replace view public.qualified_consultants as
  select c.id, c.status, p.code, p.title, p.country, p.summary, p.completion
  from public.consultants c
  join public.consultant_public_profiles p on p.consultant_id = c.id
  where c.status = 'qualifie';

drop trigger if exists trg_consultants_updated on public.consultants;
create trigger trg_consultants_updated before update on public.consultants
  for each row execute function public.set_updated_at();
drop trigger if exists trg_public_profiles_updated on public.consultant_public_profiles;
create trigger trg_public_profiles_updated before update on public.consultant_public_profiles
  for each row execute function public.set_updated_at();

-- RLS + 0 grant : accès service role uniquement, filtres applicatifs (ADR-002).
alter table public.consultants enable row level security;
alter table public.consultant_public_profiles enable row level security;
alter table public.consultant_skills enable row level security;
alter table public.consultant_experiences enable row level security;
alter table public.consultant_references enable row level security;
revoke all on public.consultants from public, anon, authenticated;
revoke all on public.consultant_public_profiles from public, anon, authenticated;
revoke all on public.consultant_skills from public, anon, authenticated;
revoke all on public.consultant_experiences from public, anon, authenticated;
revoke all on public.consultant_references from public, anon, authenticated;

comment on table public.consultants is 'Phase 4 : PII consultants. Jamais exposée côté Business.';
comment on table public.consultant_public_profiles is 'Phase 4 : seule source exposée côté Business (code EXP-XXX, pays, jamais la ville).';
