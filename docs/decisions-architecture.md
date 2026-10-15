# AWS — Décisions d'Architecture (ADR light)

## ADR-001 — Monolithe modulaire Next.js
Statut : retenu. Contexte : équipe réduite, MVP rapide. Choix : 1 app Next.js App Router + modules. Rejeté : microservices (ops prématurée). Conséquence : discipline d'import inter-modules.

## ADR-002 — Supabase (Postgres + Auth + Storage)
Statut : retenu sous réserve validation humaine. Contexte : besoin intégré rapide. Choix : Supabase. Alternative : Neon + Auth.js + S3. Risque : lock-in modéré, RLS mal utilisée. Mitigation : filtres applicatifs systématiques + migrations SQL exportables.

## ADR-003 — Matching explicable pondéré, pas d'IA décisionnelle
Statut : retenu. Poids initiaux : compétences 30, expérience 20, secteur 12, dispo 12, langues 8, budget 8, certifs 5, localisation 5. Réglables en `settings` + audit. Aucune attribution auto.

## ADR-004 — Double contrat (client + expert), pas de contrat direct entreprise-consultant (MVP)
Statut : retenu. Simplifie juridique et confidentialité.

## ADR-005 — Documents privés + signed URLs
Statut : retenu. Buckets privés, URLs 5-15 min, contrôle serveur par fichier.

## ADR-006 — Motion design modulaire par niveaux
Statut : retenu (architecture) ; dépendances installées étape par étape sur validation. Contexte : interfaces premium et sobres, appareils et réseaux hétérogènes, accessibilité. Choix : niveau 0 CSS/Tailwind/`tw-animate-css` (toujours) ; niveau 1 Motion (`motion`) par défaut ; niveau 2 GSAP + ScrollTrigger limité à `app/(marketing)` ; niveau 3 une seule bibliothèque d'illustrations (dotLottie ou Rive) ; niveau 4 Three.js + R3F chargé à la demande. `prefers-reduced-motion` respecté à chaque niveau. Rejeté : installer toutes les bibliothèques d'emblée (poids, doublons), smooth scroll (Lenis/ScrollSmoother), Motion+ et Builder.io (coût sans valeur ajoutée). Conséquence : jamais Motion et GSAP sur le même élément ; toute nouvelle dépendance motion met à jour cet ADR. Détails : `motion-design.md`.

## Décisions ouvertes (humain requis)
1. Hébergeur mail : Resend vs Postmark.
2. Déploiement : Vercel vs VPS souveraineté.
3. MFA : TOTP vs SMS.
4. i18n initial : FR seul vs FR/EN.
5. Facturation : suivi manuel MVP vs Stripe/paiement mobile post-MVP.
6. Connexion Google / LinkedIn (présente dans le prototype ACW) : en plus de l'e-mail + OTP, ou non. Impacts : fournisseurs OAuth Supabase, rattachement aux comptes validés, MFA admin.
