# CLAUDE.md — Instructions pour Claude Code

Lis en priorité `AGENTS.md` puis `docs/` :
- `architecture-generale.md` (stack Next.js modulaire, Supabase)
- `architecture-fonctionnelle.md` (20 modules + permissions)
- `modele-donnees.md`, `securite-et-confidentialite.md`, `roadmap-technique.md`, `decisions-architecture.md`

## Conduite
- Implémente uniquement la phase/issue assignée (voir roadmap). Respecte les APIs, schémas Zod et composants existants (`shadcn/ui`).
- Accès données : uniquement via services serveur avec vérif session + rôle + validation. Jamais de query directe depuis composant client. Jamais de RLS comme seule protection.
- Anonymat : n'expose que `consultant_public_profiles` au Business. PII interdite côté Business.
- Tests : ajoute/actualise Vitest + Playwright. Exécute `npm run build` / tests concernés et rapporte le résultat réel.
- Migrations : crée un fichier versionné, teste up/down en local.
- Ne commite aucun secret. Demande validation avant action destructive ou déploiement.
