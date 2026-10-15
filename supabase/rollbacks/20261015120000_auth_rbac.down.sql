-- Retour arrière de 20261015120000_auth_rbac.sql (ordre inverse).
drop trigger if exists trg_companies_updated on public.companies;
drop trigger if exists trg_users_updated on public.users;
drop table if exists public.audit_logs;
drop table if exists public.company_members;
drop table if exists public.companies;
drop table if exists public.user_roles;
drop table if exists public.users;
drop type if exists public.app_role;
