# ACW — Motion Design (architecture et conventions)

Décision associée : ADR-006 (`decisions-architecture.md`). Complète `design-system.md`.

## 1. Principes
Premium, sobre, intentionnel. Une animation explique un changement d'état, guide l'attention ou confirme une action ; sinon elle n'existe pas. Espaces Experts / Business / Admin : sobriété stricte. Immersif réservé au site vitrine public `app/(marketing)`.

## 2. Architecture modulaire (niveaux)

| Niveau | Contenu | Activation |
|---|---|---|
| 0 — Natif (toujours) | Transitions CSS, variantes Tailwind `motion-safe:` / `motion-reduce:`, `tw-animate-css` (shadcn) pour les `data-state` Radix | Phase 2, aucune dépendance ajoutée |
| 1 — Motion (défaut) | `motion` (`motion/react`), `LazyMotion` + `domAnimation` (~4,6 ko initial) | Au-delà du CSS : présence, layout, navigation |
| 2 — Scroll avancé | `gsap` + `@gsap/react` (ScrollTrigger, SplitText) | Pages vitrine narratives uniquement, jamais dans les espaces métier |
| 3 — Illustrations animées | **Une seule** : `@lottiefiles/dotlottie-react` **ou** `@rive-app/react-webgl2` | Premier besoin réel. Lottie si After Effects, Rive si interactif |
| 4 — Immersif 3D | `three` + `@react-three/fiber@9` (+ `@react-three/drei`) | Expérience précise, chargée à la demande, image de repli |

Règles :
- Jamais Motion et GSAP sur le même élément.
- Pas de bibliothèque de smooth scroll (Lenis, ScrollSmoother) : pas de détournement du scroll.
- Niveaux 3 et 4 chargés via `next/dynamic` (`ssr: false`), niveaux 2+ limités à `app/(marketing)`.
- Toute nouvelle dépendance motion passe par une mise à jour de l'ADR-006.

### Synthèse des bibliothèques (docs officielles, 10/2026)

| Bibliothèque | Coût | Points d'attention |
|---|---|---|
| Motion | Gratuit. Motion+ (399 $, exemples premium) non requis | Composants clients. `MotionConfig reducedMotion="user"` |
| GSAP | Gratuit, plugins inclus (licence « Standard No Charge », Webflow). Interdit seulement pour un outil d'animation visuelle no-code concurrent de Webflow | `'use client'`, `useGSAP` (nettoyage auto), `gsap.matchMedia()` |
| Rive | Éditeur payant par siège ; Free = splash screen en production ; Cadet 9 $/siège/mois pour le retirer | Runtime WASM, fichiers `.riv` créés dans l'éditeur Rive |
| dotLottie | Runtime gratuit | WASM + canvas, `ssr: false` dans Next.js, interactivité limitée |
| Three.js + R3F | Gratuit | R3F 9 ↔ React 19, `transpilePackages: ['three']`, coût GPU élevé |

## 3. Chaîne design system

```
Figma Variables (Primitives → Sémantique → Motion)
  └─ get_variable_defs (1 appel par mise à jour, quota MCP limité)
       └─ app/styles/tokens.css   source unique CSS (@theme Tailwind + --duration-*, --ease-*)
            ├─ lib/motion/tokens.ts  miroir JS, test Vitest de parité
            ├─ components/ui/*       shadcn (primitives inchangées)
            ├─ components/motion/*   Reveal, Stagger, Presence, RouteTransition
            └─ components/<métier>/* composent ui + motion
```

- Figma : collection « Motion » (durées en nombres, noms de courbes). Le prototypage (Smart Animate) montre l'intention ; les tokens font foi.
- Pas de Style Dictionary : CSS + TS + test de parité suffisent.
- Responsive : mobile-first, breakpoints Tailwind par défaut, container queries pour les cartes, cibles tactiles ≥ 44 px, amplitudes réduites sur mobile.

## 4. Tokens motion

| Token | Valeur | Usage |
|---|---|---|
| `--duration-instant` | 100 ms | Survol, appui |
| `--duration-fast` | 150 ms | Sorties, menus |
| `--duration-base` | 220 ms | Entrées standard |
| `--duration-slow` | 350 ms | Panneaux, layout |
| `--duration-scene` | 600 ms | Vitrine uniquement |
| `--ease-out` | entrée | Éléments qui apparaissent |
| `--ease-in` | sortie | Éléments qui disparaissent |
| `--ease-in-out` | déplacement | Changement de position |

Sortie ≈ 70 % de l'entrée. Translations 8–24 px. Stagger 40–60 ms ; au-delà de 6 éléments, animer le groupe. Pas de rebond visible dans les espaces métier.

## 5. Conventions par pattern

| Pattern | Convention | Outil |
|---|---|---|
| Transitions entre sections | Vitrine seulement : fondu + translation légère, épinglage ponctuel | GSAP |
| Scroll | Déclenchement unique, pas de scroll-jacking, contenu visible sans JS (pas d'`opacity:0` rendu serveur) | Motion `whileInView` / ScrollTrigger |
| Apparitions / sorties | `AnimatePresence`, sortie plus courte, jamais bloquante | Motion |
| Micro-interactions | 100–150 ms, `scale: 0.98` à l'appui, retour immédiat | CSS d'abord |
| Menus / modales | `data-state` Radix + `tw-animate-css`, focus piégé, Échap, sortie ≤ 150 ms | CSS / shadcn |
| Navigation | Shell fixe (sidebar, breadcrumb), fondu court de la zone de contenu ; View Transitions API en amélioration progressive ultérieure | Motion |
| Immersif | Isolé, lazy, pause hors écran, image de repli | R3F / Rive / Lottie |

Chaque composant animé expose `data-motion="entering|entered|exiting"` pour les tests.

## 6. Réduction des animations (`prefers-reduced-motion`)
1. CSS : règle globale `@media (prefers-reduced-motion: reduce)` neutralisant les durées + variantes `motion-reduce:`.
2. Motion : `<MotionConfig reducedMotion="user">` dans le provider racine (transform/layout coupés, opacité conservée).
3. GSAP : toujours via `gsap.matchMedia()` avec une condition `reduceMotion` ; état final immédiat, scroll animé désactivé.
4. Rive / Lottie / 3D : pas d'autoplay, image fixe ou image de repli.

## 7. Performance (appareils modestes, réseaux mobiles)
- Animer uniquement `transform` et `opacity`. Pas de `filter`, `blur` ni `box-shadow` animés sur des listes.
- `will-change` ponctuel, retiré après l'animation.
- 3D : `dpr={[1, 1.5]}`, `frameloop="demand"`, pause hors écran.
- Respecter `navigator.connection.saveData` : pas de médias animés lourds.
- Charger les niveaux 2–4 uniquement sur les routes qui en ont besoin.

## 8. Contrôle visuel (Playwright)
- MCP Playwright : exploration pendant le développement. `@playwright/test` : régression en CI.
- Projets : 375×812, 768×1024, 1280×800, 1440×900 ; Chromium + WebKit.
- Captures stables : `toHaveScreenshot({ animations: 'disabled', caret: 'hide', mask })`, `reducedMotion: 'reduce'`, polices `next/font`, exécution dans l'image Docker Playwright, baselines mises à jour seulement après validation.
- États animés : tests séparés sans réduction, attente de `data-motion="entered"` via `expect.poll`, vérification de l'état final.
- Débordements : comparaison `scrollWidth` / `clientWidth` à chaque viewport + liste des éléments hors cadre.
- Erreurs JS : fixture qui échoue sur `pageerror` et `console.error`.
- Interactions : clavier, menus/modales, retour du focus, `getByRole`.
- Accessibilité (option) : `@axe-core/playwright`.
- Sorties Playwright hors dépôt ou ignorées (`test-results/`, `playwright-report/`, `.playwright-mcp/`).

## 9. Plan d'exécution (chaque étape sur validation)

| Étape | Dépendances | Fichiers |
|---|---|---|
| A. Documentation | — | ce fichier, ADR-006 |
| B. Fondations motion (après phase 2 roadmap) | `motion` | `app/styles/tokens.css`, `lib/motion/{tokens,presets}.ts`, `components/motion/*`, provider dans `app/layout.tsx`, `lib/motion/tokens.test.ts` |
| C. Contrôle visuel | `@playwright/test`, option `@axe-core/playwright` | `playwright.config.ts`, `e2e/fixtures.ts`, `e2e/visual/*`, `e2e/responsive/overflow.spec.ts`, `.gitignore` ; option `--output-dir` du MCP Playwright |
| D. Scroll vitrine (si confirmé) | `gsap`, `@gsap/react` | `lib/motion/gsap.ts`, `components/marketing/scroll/*` |
| E. Illustrations (si besoin) | une seule : dotLottie ou Rive | `components/media/animated-illustration.tsx` |
| F. Immersif (si besoin) | `three`, `@react-three/fiber@9`, `@react-three/drei` | `next.config.ts`, `components/immersive/*` |

## 10. Décisions ouvertes
1. Site vitrine dans la même app Next.js (`app/(marketing)`) ou séparé.
2. Outil du motion designer : After Effects (→ Lottie) ou Rive.
3. Siège Figma Dev/Full (le siège View limite le MCP à 20 appels de lecture par mois).
