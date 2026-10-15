"use client";

import { useState } from "react";

import { comparatorCandidates, comparatorRows } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

// Écran 42 · Comparateur : meilleure valeur par ligne surlignée, recommandation locale.
export function Comparator() {
  const [recommended, setRecommended] = useState(0);

  return (
    <section aria-label="Comparaison des profils" className="relative overflow-x-auto rounded-2xl bg-card shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="py-4 pr-4 pl-6 align-bottom text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">Critère</th>
            {comparatorCandidates.map((candidate, index) => (
              <th key={candidate.code} scope="col" className="px-4 py-4 align-bottom">
                <span className="flex flex-col gap-1.5">
                  <span className="text-[28px] leading-none font-bold text-foreground tabular-nums">{candidate.score}</span>
                  <span className="text-[15px] font-semibold">{candidate.name}</span>
                  <span className="text-[13px] font-normal text-muted-foreground">{candidate.code}</span>
                  <button
                    type="button"
                    aria-pressed={recommended === index}
                    onClick={() => setRecommended(index)}
                    className={cn(
                      "mt-1 h-10 self-start rounded-[10px] border border-action px-4 text-sm font-semibold",
                      recommended === index ? "bg-action text-white" : "bg-white text-action",
                    )}
                  >
                    {recommended === index ? "Recommandé" : "Recommander"}
                  </button>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparatorRows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th scope="row" className="py-3.5 pr-4 pl-6 font-normal text-label">{row.label}</th>
              {row.values.map((value, index) => (
                <td key={`${row.label}-${index}`} className={cn("px-4 py-3.5", index === row.best && "bg-action-subtle font-bold text-primary")}>
                  {value}
                  {index === row.best ? <span className="sr-only"> (meilleure valeur)</span> : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
