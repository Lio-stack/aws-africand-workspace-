#!/usr/bin/env bash
# Vérifie les migrations en local : up (db reset), down (rollbacks en ordre inverse), puis up à nouveau.
# Prérequis : Docker démarré et `npx supabase start` lancé.
set -euo pipefail

cd "$(dirname "$0")/.."
DB_CONTAINER="supabase_db_$(sed -n 's/^project_id = "\(.*\)"/\1/p' supabase/config.toml)"

psql_exec() {
  docker exec -i "$DB_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d postgres -qAt "$@"
}

check_base() {
  psql_exec -c "select count(*) from pg_proc where proname = 'set_updated_at' and pronamespace = 'public'::regnamespace;"
}

echo "▶ up : supabase db reset"
npx supabase db reset >/dev/null
[ "$(check_base)" = "1" ] || { echo "✗ set_updated_at absente après up"; exit 1; }
echo "✓ up OK"

echo "▶ down : rollbacks en ordre inverse"
for file in $(ls supabase/rollbacks/*.down.sql | sort -r); do
  echo "  - $file"
  psql_exec < "$file"
done
[ "$(check_base)" = "0" ] || { echo "✗ set_updated_at encore présente après down"; exit 1; }
echo "✓ down OK"

echo "▶ up à nouveau : supabase db reset"
npx supabase db reset >/dev/null
[ "$(check_base)" = "1" ] || { echo "✗ set_updated_at absente après re-up"; exit 1; }
echo "✓ migrations up/down/up OK"
