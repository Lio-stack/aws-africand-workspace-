# Copilot Instructions — AfriCand Work Space

Lire `AGENTS.md` et `docs/architecture-generale.md`, `docs/securite-et-confidentialite.md` avant toute suggestion.

- Stack : Next.js App Router + TypeScript strict + Tailwind + shadcn/ui + Supabase (Postgres/Auth/Storage). Monolithe modulaire `modules/<domaine>`.
- Sécurité : validation Zod serveur, contrôle rôle côté serveur, isolation `company_id`, profils anonymisés seuls côté Business, Storage privé + signed URLs courtes. Aucun secret dans le code.
- Style : composants shadcn existants, tokens Tailwind, accessibilité AA, FR/EN prêt.
- Rôle Copilot : suggestions ciblées, tests Vitest/Playwright, revues. Pas de changement d'architecture, pas de refactoring hors scope, pas de code non testé présenté comme testé.
