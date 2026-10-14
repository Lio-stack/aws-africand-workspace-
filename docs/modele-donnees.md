# AWS — Modèle de Données (proposition relationnelle)

## 1. Principes
- PostgreSQL, UUID PK (`gen_random_uuid()`), `created_at/updated_at`, soft-delete métier (`status`) + hard-delete RGPD sur demande.
- Clés étrangères avec `ON DELETE RESTRICT` par défaut pour pièces contractuelles.
- Index sur toutes FK + filtres (`company_id, consultant_id, need_id, status`).
- Séparation stricte : `consultants (PII)` ≠ `consultant_public_profiles (anonymisé)`.

## 2. Entités principales

```
users(id, email, role, status, mfa_enabled)
consultants(id, user_id→users, first_name*, last_name*, email_prive*, phone*, location*, tjm_indicatif*, availability_date, status)
  * = PII, jamais exposée au Business
consultant_public_profiles(id, consultant_id UNIQUE, code_anonyme ex. "EXP-042", titre, resume_anonymise, annees_experience, tjm_fourchette, langues, secteurs)
skills_taxonomy(id, domaine, libelle, parent_id)
consultant_skills(consultant_id, skill_id, niveau 1-5, annees)
experiences(id, consultant_id, poste, entreprise_anonymisable, secteur, debut, fin, description)
certifications(id, consultant_id, titre, organisme, annee, document_id)
references(id, consultant_id, contact_chiffre, statut_verification, commentaire_interne*)
companies(id, nom, secteur, taille, pays, statut)
company_members(id, company_id, user_id, role_company)
needs(id, company_id, titre, objectifs, livrables_attendus, budget_min/max, devise, debut_souhaite, duree, statut, criterios JSONB)
need_required_skills(need_id, skill_id, niveau_min, poids)
match_runs(id, need_id, params_json, poids_json, created_by)
match_results(id, run_id, consultant_id, score_global, scores_json, explications_json)
shortlists(id, need_id, created_by, statut)
shortlist_items(id, shortlist_id, public_profile_id, note_interne*)
introductions(id, need_id, public_profile_id, statut, consent_company, consent_expert)
proposals(id, need_id, company_id, version, montant, planning, document_id, statut)
contracts(id, proposal_id, type [client|expert], signataire, document_id, statut, signe_le)
missions(id, contract_client_id, contract_expert_id, need_id, consultant_id, company_id, statut, debut, fin)
deliverables(id, mission_id, titre, version, document_id, statut)
documents(id, owner_type, owner_id, bucket, path_chiffre, mime, taille, acces [prive], uploaded_by)
invoices(id, mission_id, emetteur, montant, echeance, statut)
payments(id, invoice_id, montant, date, reference, statut)
notifications(id, user_id, type, payload_json, lue)
audit_logs(id, actor_id, action, objet_type, objet_id, avant_json, apres_json, created_at) -- append-only
settings(cle, valeur_json, updated_by)
```

## 3. Relations clés
- `companies 1-N needs 1-N match_runs 1-N match_results`
- `consultants 1-1 consultant_public_profiles` (vue anonymisée régénérée à chaque qualification)
- `needs N-N skills` via `need_required_skills`
- `missions` lie 1 besoin + 1 entreprise + 1 consultant + 2 contrats (client et expert)
- `documents` centralise métadonnées, fichiers en Storage privé

## 4. Intégrité et index
- UNIQUE : `consultants.user_id`, `consultant_public_profiles.code_anonyme`, `company_members(company_id,user_id)`.
- CHECK : niveaux 1-5, `budget_min <= budget_max`, statuts ENUM.
- INDEX : `needs(company_id,status)`, `match_results(run_id,score_global DESC)`, `missions(company_id,consultant_id,status)`, `documents(owner_type,owner_id)`, `audit_logs(objet_type,objet_id,created_at)`.

## 5. Données sensibles et conservation
- PII consultants + références + pièces financières : accès Ops/Finance ciblé + audit.
- Rétention : candidatures rejetées 2 ans puis anonymisation, contrats/factures 10 ans (obligation comptable), audit 3 ans min, logs techniques 1 an.
- Droit à l'effacement : anonymisation `public_profiles` + suppression PII, conservation des agrégats non identifiants.

## 6. Non implémenté en phase 1
Documenter uniquement. Première migration (Phase 2/3) : `users, consultants, public_profiles, companies, members, needs, documents, audit_logs`. Reste phasé par roadmap.
