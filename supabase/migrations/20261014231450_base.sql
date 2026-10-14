-- Migration de base (phase 2) : extensions et utilitaires partagés.
-- Retour arrière : supabase/rollbacks/20261014231450_base.down.sql

-- Emails insensibles à la casse (users.email, etc.).
create extension if not exists citext with schema extensions;

-- Mise à jour automatique de updated_at, utilisée par les tables métier (phase 3+).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is 'Trigger BEFORE UPDATE : met updated_at à now().';

-- Fonction de trigger uniquement : aucun appel direct via l'API.
revoke execute on function public.set_updated_at() from public, anon, authenticated;
