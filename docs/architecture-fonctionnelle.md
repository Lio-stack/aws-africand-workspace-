# ACW — Architecture Fonctionnelle (20 modules)

Convention par module : Objectif / Responsabilités / Données / Dépendances / Rôles / Règles métier / Risques / Acceptation.

## Permissions par espace (synthèse)
- **Expert** : son dossier seul. Voit opportunités explicitement partagées, ses contrats/missions/livrables, paiements le concernant. Jamais d'autre consultant, jamais d'autre entreprise, jamais d'identité d'entreprise non autorisée.
- **Business (Admin Entreprise / Membre)** : son entreprise seule. Admin gère membres. Membre crée besoins, voit profils anonymisés autorisés, gère shortlists de son org, suit propositions/missions de son org.
- **AfriCand Admin (Ops / Reviewer / Finance / SuperAdmin)** : transversal. Reviewer qualifie, Ops matche/introduit/propose, Finance facture, SuperAdmin configure. Toute action sensible auditée.

---

### 1. Authentification et sessions
Objectif : identifier de façon sûre. Responsabilités : inscription, login, OTP, MFA admin, sessions, révocation. Données : `auth.users`, sessions, MFA. Dépendances : mail. Rôles : tous + invité. Règles : HttpOnly secure, expiry courte, verrouillage anti-bruteforce, MFA obligatoire admin. Risques : fixation/hijack session. Acceptation : pas d'accès sans session valide, révocation < 5 min.

### 2. Utilisateurs, rôles et permissions
Objectif : moindre privilège. Responsabilités : rôles `expert, company_admin, company_member, africand_ops, africand_reviewer, africand_finance, superadmin`, matrice RBAC. Données : `users, roles, memberships`. Dépendances : auth, audit. Règles : rôle assigné uniquement par AfriCand, pas d'auto-élévation, changement de rôle audité. Risques : élévation privilèges. Acceptation : test matriciel 100% routes sensibles.

### 3. Gestion des consultants
Objectif : dossier consultant qualifié. Responsabilités : candidature, statut (`candidat, en_verification, qualifie, suspendu, rejete`), profil anonymisé dérivé. Données : `consultants, consultant_profiles`. Dépendances : documents, skills, audit. Rôles : expert (sien), admin. Règles : seul qualifié est matchable, suspension exclut matching. Risques : fuite PII. Acceptation : PII jamais exposée au Business.

### 4. Gestion des compétences
Objectif : référentiel structuré. Responsabilités : taxonomie `domaine > compétence > niveau`, tags. Données : `skill_taxonomy, consultant_skills`. Dépendances : consultants, needs. Règles : référentiel édité par AfriCand seul, niveaux 1-5 normalisés. Risques : taxonomie anarchique. Acceptation : recherche par compétence + niveau fonctionnelle.

### 5. Expériences et références
Objectif : preuve d'expérience. Responsabilités : expériences, références vérifiables, statut vérification. Données : `experiences, references`. Règles : référence vérifiée par AfriCand avant valorisation matching. Risques : fausses références. Acceptation : badge vérifié traçable.

### 6. Gestion des entreprises
Objectif : entreprises validées. Responsabilités : fiche entreprise, validation (`prospect, validee, suspendue`), membres. Données : `companies, company_members`. Règles : validation humaine obligatoire avant tout accès Business. Risques : mélange inter-entreprise. Acceptation : isolation `company_id` vérifiée.

### 7. Demandes de missions (Besoins)
Objectif : besoin structuré et qualifié. Responsabilités : objectifs, livrables attendus, budget, calendrier, compétences requises, statut (`brouillon, soumis, qualifie, matche, clos`). Données : `needs, need_criteria`. Dépendances : companies, skills. Règles : soumission → qualification AfriCand obligatoire. Risques : besoin flou non matchable. Acceptation : besoin qualifié déclenche matching.

### 8. Moteur de matching
Objectif : rapprochement explicable. Voir `architecture-generale.md` + §4 du prompt. Responsabilités : scoring pondéré, explications, snapshot. Données : `match_runs, match_results`. Règles : aucun effet contractuel automatique, admin valide. Détail pondérations : à définir dans service `lib/matching` (proposition : compétences 30, expérience 20, secteur 12, dispo 12, langues 8, budget 8, certifications 5, localisation 5). Acceptation : chaque résultat a score + raisons lisibles.

### 9. Shortlists
Objectif : présélection. Responsabilités : listes par besoin, ajout/retrait profils anonymisés, statut. Données : `shortlists, shortlist_items`. Règles : shortlist scoped `need.company_id`, pas de PII. Risques : fuite. Acceptation : entreprise ne voit que ses shortlists.

### 10. Introductions
Objectif : médiation AfriCand. Responsabilités : demande entreprise → approbation AfriCand → proposition expert → consentements. Données : `introductions`. Règles : double opt-in, identité révélée seulement après double accord + admin. Acceptation : pas de contact direct sans introduction acceptée.

### 11. Propositions commerciales
Objectif : offre formelle. Responsabilités : versioning, périmètre, prix, planning, statut (`brouillon, envoyee, acceptee, refusee`). Données : `proposals`. Dépendances : needs, shortlists, intros. Règles : seul AfriCand émet, entreprise accepte/refuse. Acceptation : traçabilité versions.

### 12. Contrats
Objectif : cadre juridique. Responsabilités : contrats AfriCand↔entreprise et AfriCand↔consultant (pas de contrat direct entreprise-consultant en MVP). Données : `contracts`. Règles : signature avant démarrage mission, documents privés. Acceptation : mission bloquée sans contrat signé.

### 13. Missions
Objectif : exécution pilotée. Responsabilités : statut, jalons, avancement. Données : `missions`. Dépendances : contrats, livrables. Règles : statuts contrôlés par admin + visibilité restreinte. Acceptation : chaque partie ne voit que ses missions.

### 14. Livrables
Objectif : preuve de production. Responsabilités : dépôt, version, validation. Données : `deliverables`. Règles : dépôt expert → validation entreprise via AfriCand. Acceptation : historique versions.

### 15. Gestion documentaire
Objectif : coffre-fort. Responsabilités : CV, références, contrats, livrables, factures. Données : `documents` (métadonnées) + Storage privé. Règles : bucket privé, signed URL 5-15 min, contrôle serveur par document. Risques : URL publique. Acceptation : accès direct sans autorisation = 403.

### 16. Notifications
Objectif : informer sans fuir. Responsabilités : in-app + email transactionnel, préférences. Données : `notifications`. Règles : jamais de PII d'autrui dans email, liens avec auth. Acceptation : notification critique < 5 min.

### 17. Facturation et paiements
Objectif : suivi admin/finance. Responsabilités : factures émises/reçues, échéances, statuts, rapprochement manuel MVP. Données : `invoices, payments`. Règles : pas de paiement en ligne MVP, Finance seule modifie. Risques : exposition montants. Acceptation : entreprise/consultant ne voient que leurs pièces.

### 18. Reporting
Objectif : pilotage AfriCand. Responsabilités : pipeline, délais, taux conversion, charge. Données : vues agrégées, pas de PII inutile. Règles : agrégats par défaut. Acceptation : dashboards Ops/Finance.

### 19. Audit et sécurité
Objectif : traçabilité. Responsabilités : `audit_logs` append-only (qui, quoi, quand, objet, avant/après). Données : audit_logs. Règles : toute opération sensible loggée, logs non modifiables par applicatif, rétention 3 ans min. Acceptation : revue audit possible par SuperAdmin.

### 20. Paramètres et configuration
Objectif : paramétrage contrôlé. Responsabilités : taxonomies, pondérations matching, templates mail, seuils. Données : `settings`. Règles : modification SuperAdmin + auditée, versionnée. Acceptation : changement pondération tracé et réversible.
