# AWS — Design System (fondations)

## 1. Principes
Premium, sobre, international. Clarté > décoration. Hiérarchie forte, densité maîtrisée, français/anglais prêts (i18n).

## 2. Tokens (Tailwind + CSS vars)
- Couleurs : neutres (slate) dominants + 1 accent profond (ex. bleu nuit `#0F2A44`) + 1 accent or sobre pour premium ; succès/avertissement/erreur sémantiques. Contraste AA min.
- Typo : Inter (texte) + serif ou grotesque sobre pour titres si besoin. Échelle 12/14/16/20/24/32. Interlignage 1.5 texte.
- Espacements : base 4px, rayons 8-12px, ombres discrètes.
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

## 7. Figma (si disponible)
1 fichier : tokens, composants base, cartes/tables métier, 3 dashboards. Les specs Figma font foi avant code. Pas de génération massive de pages avant validation tokens.
