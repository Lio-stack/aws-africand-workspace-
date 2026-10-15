/* Symbole ACW « Signal W » (Figma 3 · Signal W) + badge de validation.
   W : polyline 10,32 30,72 50,40 70,72 84,44 · pastille : cercle 86,32 r8. */

export function SignalW({
  size = 22,
  stroke = "var(--color-brand-mark)",
  dot = "var(--color-brand-navy)",
  label = "Symbole ACW",
}: {
  size?: number;
  stroke?: string;
  dot?: string;
  label?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={label} className="shrink-0">
      <polyline
        points="10,32 30,72 50,40 70,72 84,44"
        fill="none"
        stroke={stroke}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={86} cy={32} r={8} fill={dot} />
    </svg>
  );
}

/** Pastille de validation (Figma 52 · Profil consultant complet). */
export function VerifiedBadge({ size = 22, label = "Profil validé" }: { size?: number; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={label} className="shrink-0">
      <path
        d="M12 1.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 22.5l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3-1-3 2.6-1.9 1-3 3.2.1z"
        fill="var(--color-ref-blue)"
      />
      <path
        d="M7.8 12.2l2.9 2.9 5.5-5.6"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
