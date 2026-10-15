"use client";

import { Trophy } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { GroupedBars } from "./charts";

const PERIODS = {
  "7 j": {
    groups: [
      { period: "Lun", a: 1, b: 0 },
      { period: "Mar", a: 2, b: 1 },
      { period: "Mer", a: 1, b: 0 },
      { period: "Jeu", a: 3, b: 1 },
      { period: "Ven", a: 2, b: 1 },
      { period: "Sam", a: 4, b: 2 },
      { period: "Dim", a: 2, b: 1 },
    ],
  },
  "30 j": {
    groups: [
      { period: "S1", a: 5, b: 1 },
      { period: "S2", a: 7, b: 2 },
      { period: "S3", a: 6, b: 2 },
      { period: "S4", a: 9, b: 3 },
    ],
  },
  "12 mois": {
    groups: [
      { period: "T1", a: 12, b: 4 },
      { period: "T2", a: 15, b: 6 },
      { period: "T3", a: 14, b: 7 },
      { period: "T4", a: 18, b: 9 },
    ],
  },
} as const;

type Period = keyof typeof PERIODS;

/** Panneau tendance façon maquette : onglets métrique + période, barres groupées + classement. */
export function TrendPanel({
  title,
  rankingTitle,
  ranking,
}: {
  title: string;
  rankingTitle: string;
  ranking: { k: string; v: number }[];
}) {
  const [metric, setMetric] = useState<"Besoins" | "Missions">("Besoins");
  const [period, setPeriod] = useState<Period>("12 mois");
  const maxRank = Math.max(...ranking.map((r) => r.v)) || 1;

  return (
    <section
      aria-label={title}
      className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]"
    >
      <div className="flex flex-wrap items-center gap-2 border-b border-ref-line px-5 py-3 sm:px-6">
        <div role="tablist" aria-label="Métrique" className="flex gap-1">
          {(["Besoins", "Missions"] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={metric === m}
              onClick={() => setMetric(m)}
              className={cn(
                "h-10 rounded-full px-4 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ref-blue/40",
                metric === m ? "font-semibold text-ref-ink" : "text-ref-muted hover:text-ref-ink",
              )}
            >
              {m}
              {metric === m ? <span aria-hidden className="mt-0.5 block h-0.5 rounded-full bg-ref-ink" /> : null}
            </button>
          ))}
        </div>
        <div role="tablist" aria-label="Période" className="flex gap-1 sm:ml-auto">
          {(Object.keys(PERIODS) as Period[]).map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "h-9 rounded-full px-3.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ref-blue/40",
                period === p ? "font-semibold text-ref-ink" : "text-ref-muted hover:text-ref-ink",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 px-5 py-5 sm:px-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(220px,1fr)]">
        <GroupedBars
          label={`${title} — ${metric}, ${period}. Survolez pour le détail.`}
          groups={PERIODS[period].groups.map((g) => ({
            period: g.period,
            a: metric === "Besoins" ? g.a : g.b,
            b: metric === "Besoins" ? g.b : g.a,
            legendA: metric,
            legendB: metric === "Besoins" ? "Missions signées" : "Besoins soumis",
          }))}
        />
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="flex items-center gap-2 pb-2 text-[17px] font-bold text-ref-ink"><Trophy aria-hidden className="size-[18px] text-ref-muted" />{rankingTitle}</h3>
          <ol className="flex flex-col">
            {ranking.map((r, i) => (
              <li
                key={r.k}
                className="flex items-center gap-3 border-b border-ref-line py-2.5 text-[15px] last:border-0"
                title={`${r.k} : ${r.v} missions`}
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums",
                    i < 3 ? "bg-navy-950 text-white" : "bg-ref-chip text-ref-muted",
                  )}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-ref-ink">{r.k}</span>
                <span className="shrink-0 font-semibold tabular-nums" aria-label={`${r.v} missions`}>
                  {r.v}
                </span>
                <span aria-hidden className="h-1.5 w-16 overflow-hidden rounded-full bg-ref-chip">
                  <span className="block h-full rounded-full bg-ref-blue" style={{ width: `${Math.round((r.v / maxRank) * 100)}%` }} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
