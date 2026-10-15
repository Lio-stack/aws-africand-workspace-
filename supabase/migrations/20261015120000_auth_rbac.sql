-- Phase 3 (Auth & RBAC) : utilisateurs applicatifs, entreprises, rattachements, rôles, audit.
-- Retour arrière : supabase/rollbacks/20261015120000_auth_rbac.down.sql
-- Défense en profondeur (ADR-002) : RLS activée SANS politique permissive (refus par défaut).
-- L'accès applicatif passe par le service role + filtres company_id/user_id/rôle côté serveur.

-- 7 rôles (docs/architecture-fonctionnelle.md §2).
do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum (
      'expert',
      'company_admin',
      'company_member',
      'africand_ops',
      'africand_reviewer',
      'africand_finance',
      'superadmin'
    );
  end if;
end $$;

-- Utilisateur applicatif, lié 1-1 à auth.users.
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email citext not null unique,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Rôles (0-n par utilisateur).
create table if not exists public.user_roles (
  user_id uuid not null references public.users (id) on delete cascade,
  role public.app_role not null,
  granted_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Entreprises (validation humaine obligatoire : statut prospect par défaut).
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null default '',
  status text not null default 'prospect' check (status in ('prospect', 'validee', 'suspendue')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Rattachement membre ↔ entreprise (isolation company_id).
create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete restrict,
  user_id uuid not null references public.users (id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member', 'finance', 'readonly')),
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended')),
  created_at timestamptz not null default now(),
  unique (company_id, user_id)
);

-- Journal d'audit append-only (3 ans min, jamais UPDATE/DELETE).
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  actor text not null default 'system',
  category text not null,
  action text not null,
  object text not null default '',
  meta jsonb not null default '{}'::jsonb
);

-- updated_at automatiques.
drop trigger if exists trg_users_updated on public.users;
create trigger trg_users_updated before update on public.users
  for each row execute function public.set_updated_at();
drop trigger if exists trg_companies_updated on public.companies;
create trigger trg_companies_updated before update on public.companies
  for each row execute function public.set_updated_at();

-- RLS : activée partout, aucune politique permissive (refus par défaut).
alter table public.users enable row level security;
alter table public.user_roles enable row level security;
alter table public.companies enable row level security;
alter table public.company_members enable row level security;
alter table public.audit_logs enable row level security;

-- Durcissement : aucun droit direct aux rôles applicatifs (tout passe par le service role).
revoke all on public.users from public, anon, authenticated;
revoke all on public.user_roles from public, anon, authenticated;
revoke all on public.companies from public, anon, authenticated;
revoke all on public.company_members from public, anon, authenticated;
revoke all on public.audit_logs from public, anon, authenticated;

comment on table public.audit_logs is 'Phase 3 : journal append-only. Écriture via service role uniquement.';
