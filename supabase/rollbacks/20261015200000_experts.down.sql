-- Retour arrière de 20261015200000_experts.sql (ordre inverse).
drop trigger if exists trg_public_profiles_updated on public.consultant_public_profiles;
drop trigger if exists trg_consultants_updated on public.consultants;
drop view if exists public.qualified_consultants;
drop table if exists public.consultant_references;
drop table if exists public.consultant_experiences;
drop table if exists public.consultant_skills;
drop table if exists public.consultant_public_profiles;
drop table if exists public.consultants;
