-- Retour arrière de supabase/migrations/20261014231450_base.sql
-- Ordre inverse de la migration.

drop function if exists public.set_updated_at();
drop extension if exists citext;
