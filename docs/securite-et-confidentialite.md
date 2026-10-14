# AWS — Sécurité et Confidentialité

## 1. Lignes rouges
- Contrôle d'accès côté serveur uniquement. Aucune protection purement UI.
- RLS Postgres en défense en profondeur, jamais comme seule barrière : chaque service serveur refiltre par `user_id / company_id / rôle`.
- Isolation : consultant A ≠ consultant B, entreprise A ≠ entreprise B.
- Anonymat : Business ne voit que `consultant_public_profiles` (code `EXP-XXX`, pas de nom, contact, CV nominatif).
- Documents : buckets privés, signed URLs 5-15 min après vérification serveur.

## 2. Auth / sessions
- Supabase Auth, cookies HttpOnly Secure SameSite=Lax, expiry courte, refresh rotation.
- Rate-limit login/OTP, verrouillage anti-bruteforce, MFA obligatoire pour rôles AfriCand.
- Révocation immédiate à la suspension. Revue sessions trimestrielle.

## 3. RBAC (matrice opposable)
| Objet | Expert | Company Member/Admin | AfriCand |
|---|---|---|---|
| PII consultant | sien seul | non | Ops/Reviewer ciblé + audit |
| Profil anonymisé | sien | oui (autorisés) | oui |
| Besoin | non (sauf partagé) | son org | oui |
| Shortlist/intro | consentement sien | son org | oui |
| Contrat/mission/livrable | siens | siens (org) | oui |
| Facture/paiement | siens | siens (org) | Finance |
| Audit/settings | non | non | SuperAdmin (+Ops lecture) |

Tests matriciels obligatoires par route.

## 4. Validation et durcissement
- Zod strict côté serveur sur toute entrée, typage TS strict, requêtes paramétrées (pas de SQL concaténé).
- Upload : allowlist MIME, limite taille, scan antivirus phase 8+, jamais d'exécution.
- Headers : CSP, HSTS, X-Frame-Options, nosniff. CSRF via SameSite + tokens Server Actions.
- Secrets : `.env` local + gestionnaire Vercel/Supabase, jamais commités. `.gitignore` : `.env*`, `service_role`, clés.

## 5. Audit et traçabilité
- `audit_logs` append-only (REVOKE UPDATE/DELETE applicatif), incluant changements de rôles/permissions, accès documents sensibles, exports.
- Alertes : accès anormal massif, tentative inter-tenant.

## 6. Sauvegarde / reprise
- PITR Supabase daily + hebdo, test restauration trimestriel, RPO 24h / RTO 4h cible MVP.
- Procédure suppression : anonymisation + purge Storage.

## 7. Risques agents IA et MCP
- Agents (OpenCode/Claude/Copilot) : ne jamais coller secrets/tokens dans prompts, PR, issues. Pas d'accès prod. Branches + revue humaine obligatoire.
- Serveurs MCP : n'autoriser que serveurs versionnés et revus, moindre privilège, pas de MCP avec accès FS large + réseau + secrets simultanés, journaliser appels sensibles. Couper tout MCP non essentiel traitant des PII.
- Secrets exposés = rotation immédiate + audit.

## 8. Checklist go-live sécurité
RBAC testé, RLS + filtres vérifiés, Storage 403 sans autorisation, MFA admin, rate-limit, Sentry, backups testés, audit append-only, `.env` absent du git, revue dépendances (`npm audit`).
