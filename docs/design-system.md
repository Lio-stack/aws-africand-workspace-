# AWS — Design System (fondations)

## 1. Principes
Premium, sobre, international. Clarté > décoration. Hiérarchie forte, densité maîtrisée, français/anglais prêts (i18n).

## 2. Tokens (Tailwind + CSS vars)
Source : `app/styles/tokens.css`, alignée sur le prototype ACW (voir §7).
- Couleurs : bleu nuit `#051C2C` (navigation, actions principales ; dégradé de sidebar `#0B2D45` → `#051C2C` → `#03131E`), bleu d'action `#1A5FD0` (liens, focus, éléments actifs ; fond doux `#E8EFFB`), neutres `#111111` / `#434343` / `#626262` / `#C9C9C9` / `#E6E6E6` / `#F5F5F5` ; erreur `#B42318`, pastille de notification `#E5242A`. Contraste AA min.
- Typo : Inter seule. Échelle 12/14/16/20/24/32 (titres d'écran 30). Interlignage 1.5 texte.
- Espacements : base 4px, rayons 10px (contrôles) et 16px (cartes), contrôles de formulaire 52px, ombres discrètes.
- Thème : clair par défaut, dark phase 2.

## 3. Navigation
- 3 shells distincts : `/experts`, `/business`, `/admin` avec sidebar + breadcrumb + sélecteur contexte (entreprise). Jamais de lien croisé non autorisé.
- Dashboards : cartes KPI + listes d'actions, pas de murs de données.

## 4. Composants (shadcn/ui + métier)
Base : Button, Input, Select, Dialog, Table, Tabs, Badge, Card, Form, Toast, Skeleton, EmptyState.
Métier : `ConsultantCard` (anonymisée : code, titre, compétences, dispo, score + raisons), `MatchScoreBar`, `ShortlistTable`, `NeedForm`, `Timeline` (intro/proposition/contrat), `DocumentRow` (accès signé), `AuditTable`.

## 5. États
Chargement : skeletons. Vide : illustration sobre + CTA. Erreur : message actionnable, pas de détail technique. Formulaires : validation inline Zod, erreurs FR/EN.

## 6. Accessibilité et responsive
- Clavier complet, focus visible, aria sur dialogs/menus, contraste AA, `lang` dynamique.
- Mobile-first : tableaux → cartes, filtres en drawer, touch 44px.

## 7. Référence visuelle
Le prototype HTML ACW (`ACW-prototype-web-inzone_6.html`, 50 écrans) fait foi pour la direction visuelle. Écarts volontaires avec le prototype, pour respecter les specs :
- Connexion : e-mail + code à usage unique seulement. Les boutons Google / LinkedIn du prototype attendent une décision (voir `decisions-architecture.md`).
- Profils anonymisés côté Business : pas de ville du consultant (donnée personnelle), au plus le pays ou la région.
- Introductions côté Experts : l'entreprise reste anonyme (secteur, pays) jusqu'au double accord.
- Factures Business : pas de bouton « Payer » (pas de paiement en ligne au MVP), règlement hors plateforme.
- Contrats Admin : double contrat AfriCand ↔ entreprise et AfriCand ↔ expert (ADR-004), pas de contrat tripartite.
- Paramètres Admin : MFA admin, anonymisation et consentement affichés comme non désactivables.

## 8. Écrans implémentés (démonstration)
Les 50 écrans du prototype existent dans l'application avec des données fictives (`lib/demo/*`), sans service branché :
- accès : `/connexion` (+ `/code`, `/mfa`), `/inscription/consultant|entreprise`, `/compte`, `/compte/attente`, erreurs 403 (`/acces-refuse`), 404, 500 ;
- espaces : `/experts/*`, `/business/*`, `/admin/*` (shells 01 à 03 dans les layouts).
Les actions affichent un message « démonstration » : rien n'est enregistré. En production, les espaces membres répondent 404 sauf si `ACW_DEMO=1` (préproduction, tests e2e) — voir `lib/demo/guard.ts`. Ils seront protégés par l'authentification et le RBAC en phase 3.

Chaque écran est développé, vérifié puis validé avant le suivant. Figma reste utilisable si un fichier est fourni.
