// Miroir JS des tokens motion de app/styles/tokens.css (Motion / GSAP ont besoin de nombres).
// Toute modification doit être faite des deux côtés : le test de parité échoue sinon.

/** Durées en millisecondes. */
export const durations = {
  instant: 100,
  fast: 150,
  base: 220,
  slow: 350,
  scene: 600,
} as const;

/** Courbes cubic-bezier [x1, y1, x2, y2]. */
export const easings = {
  out: [0.22, 1, 0.36, 1],
  in: [0.4, 0, 1, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export type DurationToken = keyof typeof durations;
export type EasingToken = keyof typeof easings;

/** Durée en secondes (unité attendue par Motion et GSAP). */
export function seconds(token: DurationToken): number {
  return durations[token] / 1000;
}
