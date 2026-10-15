# ACW — Roadmap Technique

## MVP réaliste (phases 1-7 partielles + 8 minimale)
Auth + RBAC + candidatures/validation + entreprises/validation + besoins + profils anonymisés + matching explicable + shortlists + introductions + propositions simples + suivi missions/livrables + documents privés. Facturation : suivi manuel simple. Pas de paiement en ligne.

| Phase | Objectifs | Gate (passage) |
|---|---|---|
| 1. Architecture & docs | Présent lot documentaire + décisions | Docs relus, MVP figé |
| 2. Fondations + design system | Next.js+TS+Tailwind+shadcn, CI, migrations base, tokens | `npm run build`, migration up/down OK |
| 3. Auth & permissions | Supabase Auth, RBAC, MFA admin, audit | Matrice RBAC testée, MFA OK |
| 4. Experts | Candidature, dossier, statut qualification, profil anonymisé | PII non exposée vérifiée |
| 5. Business | Entreprises, besoins, recherche anonymisée | Isolation inter-entreprise testée |
| 6. Admin | Queues validation, comparateur, audit UI | Parcours validation < 2j simulé |
| 7. Matching & intros | Scoring pondéré + explications, double opt-in | Scores reproductibles, raisons lisibles |
| 8. Missions/contrats/docs | Contrats, missions, livrables, Storage signé | 403 sans droit vérifié |
| 9. Facturation/reporting | Factures/paiements suivi, dashboards | Rapprochement manuel OK |
| 10. Sécurité/déploiement | Pentest léger, perf, backups, go-live | Checklist sécurité verte |

Dépendances : 3 bloque 4/5, 4+5 bloquent 6, 6 bloque 7, 7 bloque 8 (partiel parallélisable), 8 bloque 9.

Risques majeurs : fuite PII, RLS seule barrière, taxonomie floue, scope creep paiement temps réel → renvoyé post-MVP.

Tests par phase : Vitest (services/matching), Playwright (parcours critiques), pgTAP ou scripts SQL (contraintes), revue sécurité avant gate 10.
