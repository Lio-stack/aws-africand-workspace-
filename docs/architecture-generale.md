# ACW — Architecture Générale

## 1. État initial constaté (14/10/2026)
- Dépôt / workspace vide : 0 fichier, pas de git, pas de dépendance, pas de config.
- Aucune décision technique antérieure à préserver.
- Liberté totale de cadrage, sous contrainte MVP + sécurité.

## 2. Architecture cible : monolithe modulaire
```
Next.js App Router (TypeScript)
├── app/(experts|business|admin|auth|api)
├── modules/<domaine>/ (domain + service + schema + actions)
├── components/ (shadcn/ui + composants métier)
├── lib/ (auth, db, storage, mail, audit, matching)
└── supabase/ (migrations SQL versionnées)
```

Un seul déploiement. Séparation logique par modules, pas par services.
Pas de microservices pour le MVP.

## 3. Stack recommandée (MVP)

| Couche | Retenu | Justification | Alternative écartée |
|---|---|---|---|
| Frontend + Backend | Next.js 14+ App Router, TypeScript strict, Server Components + Server Actions + Route Handlers `/api` | 1 repo, 1 déploiement, contrôle serveur natif, équipe réduite | SPA React + API séparée : double déploiement, complexité auth inutile |
| UI | Tailwind CSS + shadcn/ui (Radix) | Premium, accessible, cohérent, rapide | UI custom from scratch : coût élevé |
| Données | PostgreSQL via Supabase | Postgres managé, backups, Auth, Storage privé intégrés | Neon + Auth.js : viable mais intégration à assembler |
| Auth | Supabase Auth (email + OTP/magic link, sessions HttpOnly) | Éprouvé, RLS, MFA possible | Auth maison : à proscrire |
| Stockage | Supabase Storage privé + signed URLs courte durée | CV/contrats jamais publics | S3 direct : OK phase 2 si besoin |
| Validation | Zod côté serveur + client | Contrats stricts | Yup/Joi : moins TS-native |
| Mail | Resend ou Postmark (transactionnel) | Templates, traçabilité | SMTP artisanal : non |
| Logs/Erreurs | Sentry + logs structurés | Observabilité | Console seule : non |
| Tests | Vitest + Playwright + pgTAP (contraintes critiques) | Couverture utile | 100% coverage dogmatique : non |
| Déploiement | Vercel (app) + Supabase (data) | Simple, preview branches | VPS initial : charge ops inutile |

Décisions ouvertes (à valider humainement) : voir `decisions-architecture.md`.

## 4. Organisation du code
- `modules/auth|users|consultants|skills|companies|needs|matching|shortlists|intros|proposals|contracts|missions|deliverables|documents|billing|notifications|reporting|audit|settings`
- Chaque module : `schema.ts (Zod)`, `service.ts (logique serveur)`, `queries.ts`, `actions.ts`, `components/`.
- Aucun accès DB direct depuis Client Components. Passage obligé par service serveur.
- Toute lecture sensible filtre par `company_id / user_id / rôle` côté serveur.

## 5. Flux de données type
Client → Server Action / Route Handler → vérif session + rôle → validation Zod → service → PostgreSQL (RLS + filtre applicatif) → audit log → réponse minimale.

## 6. Environnements
`local → preview (PR) → staging → production`. Migrations versionnées `supabase/migrations/*.sql`. Jamais de modification manuelle en prod. Secrets uniquement en variables d'environnement (jamais commités).
