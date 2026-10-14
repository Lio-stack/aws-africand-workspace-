# AGENTS.md — Instructions communes (OpenCode / Claude Code / Copilot)

Source de vérité : GitHub + `docs/`. Lire `docs/vision-produit.md`, `architecture-generale.md`, `architecture-fonctionnelle.md`, `securite-et-confidentialite.md` avant toute tâche.

## Règles communes
1. Ne pas inventer d'architecture parallèle. Respecter `decisions-architecture.md`. Toute divergence = ADR + validation humaine.
2. Scope strict : ne modifier que les modules liés à la tâche. Pas de refactoring opportuniste.
3. Branches : `feat/<module>-<sujet>`, `fix/...`. Jamais de push direct sur `main`. PR + revue humaine.
4. Sécurité : contrôle serveur obligatoire, validation Zod, filtre `company_id/user_id/rôle`, Storage privé + signed URL, jamais de PII dans logs/mails. Ne jamais commiter `.env*`, clés, tokens.
5. Tests : Vitest + Playwright pour tout changement important. Ne jamais prétendre avoir testé sans exécution réelle.
6. Migrations : versionnées `supabase/migrations/`, réversibles, jamais d'édit manuel en prod.
7. Docs : mettre à jour `docs/` + ADR si décision structurante.
8. Opérations risquées (déploiement prod, suppression données, changement rôles) : validation humaine explicite. Déploiement prod jamais automatique.

## Répartition
- OpenCode : architecture, roadmap, analyse risques, cohérence docs.
- Claude Code : implémentation planifiée + tests.
- Copilot : assistance ciblée, tests, revue.

Détail : voir `CLAUDE.md` et `.github/copilot-instructions.md`.
