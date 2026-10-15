"use client";

import { useId, useState } from "react";

import { cn } from "@/lib/utils";

function sparkPath(values: number[], w: number, h: number, pad = 2): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

function points(values: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values.map((v, i) => ({
    x: pad + (i * (w - pad * 2)) / (values.length - 1),
    y: h - pad - ((v - min) / span) * (h - pad * 2),
    v,
  }));
}

export function Sparkline({
  values,
  tone = "up",
  label,
}: {
  values: number[];
  tone?: "up" | "down" | "neutral";
  label: string;
}) {
  const w = 120;
  const h = 36;
  const d = sparkPath(values, w, h);
  const stroke = tone === "down" ? "#9aa0a6" : tone === "neutral" ? "#6b7280" : "#1a5fd0";
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const last = points(values, w, h, 2).at(-1);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="shrink-0">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity={0.18} />
          <stop offset="100%" stopColor={stroke} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w - 2} ${h} L 2 ${h} Z`} fill={`url(#${id}-fill)`} stroke="none" />
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
      {last ? <circle cx={last.x} cy={last.y} r={3} fill={stroke} stroke="#fff" strokeWidth={1.5} /> : null}
    </svg>
  );
}

export function AreaChart({
  series,
  labels,
  label,
  height = 180,
  formatValue = (v) => String(v),
}: {
  series: number[];
  labels: string[];
  label: string;
  height?: number;
  formatValue?: (v: number) => string;
}) {
  const w = 560;
  const h = height;
  const pad = 8;
  const innerH = h - 28;
  const d = sparkPath(series, w, innerH, pad);
  const pts = points(series, w, innerH, pad);
  const [hover, setHover] = useState<number | null>(null);
  const gid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const ticks = [0.25, 0.5, 0.75, 1].map((t) => innerH - t * (innerH - pad * 2));

  return (
    <figure className="flex flex-col gap-2">
      <div className="relative">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={label}
          className="h-auto w-full"
          onMouseMove={(e) => {
            const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const px = ((e.clientX - rect.left) / rect.width) * w;
            let best = 0;
            let bestDist = Infinity;
            pts.forEach((p, i) => {
              const dist = Math.abs(p.x - px);
              if (dist < bestDist) {
                bestDist = dist;
                best = i;
              }
            });
            setHover(best);
          }}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={`acw-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a5fd0" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#1a5fd0" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {ticks.map((y) => (
            <line key={y} x1={pad} x2={w - pad} y1={y} y2={y} stroke="#e8eaed" strokeWidth={1} strokeDasharray="3 5" />
          ))}
          <path d={`${d} L ${w - pad} ${innerH} L ${pad} ${innerH} Z`} fill={`url(#acw-${gid})`} />
          <path d={d} fill="none" stroke="#1a5fd0" strokeWidth={2.5} strokeLinecap="round" />
          {hover !== null ? (
            <line x1={pts[hover].x} x2={pts[hover].x} y1={pad} y2={innerH} stroke="#1a5fd0" strokeWidth={1} strokeDasharray="2 3" opacity={0.6} />
          ) : null}
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === hover ? 5.5 : i === pts.length - 1 ? 4.5 : 3}
              fill={i === hover || i === pts.length - 1 ? "#1a5fd0" : "#fff"}
              stroke="#1a5fd0"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover(i)}
            >
              <title>{`${labels[i] ?? i} : ${formatValue(p.v)}`}</title>
            </circle>
          ))}
        </svg>
        {hover !== null ? (
          <div
            aria-live="polite"
            className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-ref-line bg-white px-2.5 py-1.5 text-center shadow-lg"
            style={{
              left: `${Math.min(84, Math.max(16, (pts[hover].x / w) * 100))}%`,
              top: 0,
              transform: hover === 0 ? "translateX(-16%)" : hover === pts.length - 1 ? "translateX(-84%)" : "translateX(-50%)",
            }}
          >
            <p className="text-sm font-bold text-ref-ink tabular-nums">{formatValue(pts[hover].v)}</p>
            <p className="text-xs text-ref-muted">{labels[hover]}</p>
          </div>
        ) : null}
      </div>
      <figcaption className="flex justify-between text-xs text-ref-muted tabular-nums">
        {labels.map((l, i) => (
          <span key={`${l}-${i}`}>{l}</span>
        ))}
      </figcaption>
    </figure>
  );
}

export function Donut({
  segments,
  label,
  centerTop,
  centerBottom,
}: {
  segments: { value: number; color: string; name: string }[];
  label: string;
  centerTop: string;
  centerBottom: string;
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 54;
  const C = 2 * Math.PI * R;
  const [hover, setHover] = useState<string | null>(null);
  const starts: number[] = [];
  segments.reduce((acc, s) => {
    starts.push(acc);
    return acc + s.value / total;
  }, 0);
  return (
    <div className="flex items-center gap-5">
      <svg width={140} height={140} viewBox="0 0 140 140" role="img" aria-label={label} className="shrink-0">
        <circle cx={70} cy={70} r={R} fill="none" stroke="#f1f2f4" strokeWidth={16} />
        {segments.map((s, si) => {
          const frac = s.value / total;
          const start = starts[si];
          const active = hover === s.name;
          return (
            <circle
              key={s.name}
              cx={70}
              cy={70}
              r={R}
              fill="none"
              stroke={s.color}
              strokeWidth={active ? 19 : 16}
              strokeLinecap="round"
              strokeDasharray={`${frac * C - 6} ${C - frac * C + 6}`}
              strokeDashoffset={-start * C}
              transform="rotate(-90 70 70)"
              style={{ cursor: "pointer", transition: "stroke-width 150ms" }}
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
            >
              <title>{`${s.name} : ${Math.round((s.value / total) * 100)}%`}</title>
            </circle>
          );
        })}
        <text x={70} y={64} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800 }} className="fill-ref-ink">
          {hover ? `${Math.round(((segments.find((s) => s.name === hover)?.value ?? 0) / total) * 100)}%` : centerTop}
        </text>
        <text x={70} y={86} textAnchor="middle" style={{ fontSize: 12 }} className="fill-ref-muted">
          {hover ?? centerBottom}
        </text>
      </svg>
      <ul className="flex min-w-0 flex-1 flex-col gap-2">
        {segments.map((s) => (
          <li key={s.name}>
            <button
              type="button"
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(s.name)}
              onBlur={() => setHover(null)}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-1 py-0.5 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-ref-blue/40",
                hover === s.name && "bg-ref-ice",
              )}
              aria-label={`${s.name}, ${Math.round((s.value / total) * 100)} pour cent`}
            >
              <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="min-w-0 flex-1 truncate text-ref-ink">{s.name}</span>
              <span className="font-semibold text-ref-ink tabular-nums">{Math.round((s.value / total) * 100)}%</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BarRow({ label, value, max, display }: { label: string; value: number; max: number; display: string }) {
  const pct = Math.max(4, Math.round((value / max) * 100));
  const [hover, setHover] = useState(false);
  return (
    <div
      className={cn("flex flex-col gap-1.5 rounded-md px-1 py-0.5", hover && "bg-ref-ice")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={`${label} : ${display}`}
    >
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="min-w-0 truncate text-ref-ink">{label}</span>
        <span className="shrink-0 font-semibold text-ref-ink tabular-nums">{display}</span>
      </div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className="h-2 overflow-hidden rounded-full bg-ref-chip">
        <div
          className="h-full rounded-full bg-ref-blue transition-[width] duration-500"
          style={{ width: `${hover ? Math.min(100, pct + 3) : pct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layout proposé : mini-visuels KPI + barres groupées interactives.   */
/* Palette référence : bleus + ardoise, aucun vert/rouge vif.          */
/* ------------------------------------------------------------------ */

const BLUES = ["#1a5fd0", "#051c2c", "#7fa6e6", "#9aa0a6"];

/** Mini aire empilée (carte Visits de la maquette) : 3 nappes superposées. */
export function MiniStack({ series, label }: { series: number[][]; label: string }) {
  const w = 220;
  const h = 64;
  const pad = 2;
  const n = series[0].length;
  const totals = Array.from({ length: n }, (_, i) => series.reduce((s, r) => s + r[i], 0));
  const max = Math.max(...totals) || 1;
  const xs = (i: number) => pad + (i * (w - pad * 2)) / (n - 1);
  const ys = (cum: number[]) => cum.map((c) => h - pad - (c / max) * (h - pad * 2));
  const cumulated: number[][] = series.map((_, s) => Array.from({ length: n }, (_, i) => series.slice(0, s + 1).reduce((acc, r) => acc + r[i], 0)));
  const layers = cumulated.map((upper, s) => {
    const lower = s === 0 ? new Array(n).fill(0) : cumulated[s - 1];
    const top = ys(upper);
    const bot = ys(lower).reverse();
    const d = `M ${top.map((y, i) => `${xs(i).toFixed(1)} ${y.toFixed(1)}`).join(" L ")} L ${bot.map((y, i) => `${xs(n - 1 - i).toFixed(1)} ${y.toFixed(1)}`).join(" L ")} Z`;
    return d;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label} className="h-16 w-full">
      {layers.map((d, i) => (
        <path key={i} d={d} fill={BLUES[i % BLUES.length]} opacity={i === 0 ? 0.85 : 0.75 - i * 0.12} />
      ))}
    </svg>
  );
}

/** Mini barres (carte Payments de la maquette), survol = valeur. */
export function MiniBars({ values, labels, label }: { values: number[]; labels: string[]; label: string }) {
  const max = Math.max(...values) || 1;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div role="img" aria-label={label} className="flex h-16 items-end gap-2" onMouseLeave={() => setHover(null)}>
      {values.map((v, i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHover(i)}
          onFocus={() => setHover(i)}
          onBlur={() => setHover(null)}
          className="flex flex-1 flex-col items-center justify-end gap-1 outline-none"
          aria-label={`${labels[i] ?? i} : ${v}`}
          title={`${labels[i] ?? i} : ${v}`}
        >
          {hover === i ? <span className="text-xs font-bold text-ref-ink tabular-nums">{v}</span> : null}
          <span
            className={cn("w-full max-w-7 rounded-sm transition-all", hover === i ? "bg-navy-950" : "bg-ref-blue")}
            style={{ height: `${Math.max(12, Math.round((v / max) * 52))}px`, opacity: hover === null || hover === i ? 1 : 0.45 }}
          />
        </button>
      ))}
    </div>
  );
}

/** Barres groupées (Store Sales Trend) : 2 séries × N périodes, tooltip au survol. */
export function GroupedBars({
  groups,
  label,
}: {
  groups: { period: string; a: number; b: number; legendA: string; legendB: string }[];
  label: string;
}) {
  const max = Math.max(...groups.flatMap((g) => [g.a, g.b])) || 1;
  const H = 200;
  const [hover, setHover] = useState<string | null>(null);
  return (
    <figure className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center gap-4 text-xs text-ref-muted" aria-hidden={false}>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-ref-blue" />{groups[0]?.legendA}</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm bg-[#bcd2f5]" />{groups[0]?.legendB}</span>
      </div>
      <div role="img" aria-label={label} className="flex h-[220px] items-stretch gap-1" onMouseLeave={() => setHover(null)}>
        <div aria-hidden className="flex flex-col justify-between py-0 pr-1 text-right text-[11px] text-ref-faint tabular-nums">
          {[1, 0.75, 0.5, 0.25, 0].map((t) => (
            <span key={t}>{Math.round(max * t)}</span>
          ))}
        </div>
        {groups.map((g) => (
          <div key={g.period} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full flex-1 items-end justify-center gap-1.5">
              {[
                { v: g.a, name: g.legendA, cls: "bg-ref-blue" },
                { v: g.b, name: g.legendB, cls: "bg-[#bcd2f5]" },
              ].map((b) => {
                const key = `${g.period}-${b.name}`;
                const active = hover === key;
                return (
                  <button
                    key={b.name}
                    type="button"
                    onMouseEnter={() => setHover(key)}
                    onFocus={() => setHover(key)}
                    onBlur={() => setHover(null)}
                    className={cn("w-full max-w-9 rounded-t-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-ref-blue/40", b.cls)}
                    style={{ height: `${Math.max(4, (b.v / max) * H)}px`, opacity: hover === null || active ? 1 : 0.4 }}
                    aria-label={`${g.period}, ${b.name} : ${b.v}`}
                    title={`${g.period}, ${b.name} : ${b.v}`}
                  />
                );
              })}
            </div>
            <span className="shrink-0 text-[11px] text-ref-muted">{g.period}</span>
          </div>
        ))}
      </div>
      <figcaption aria-live="polite" className="min-h-5 text-sm text-ref-ink">
        {hover ? hover.replace("-", " · ") : "Survolez une barre pour le détail."}
      </figcaption>
    </figure>
  );
}
