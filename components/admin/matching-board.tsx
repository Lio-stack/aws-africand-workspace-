"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { matchingCandidates, matchingCriteria } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

// Écran 41 · Matching : scores détaillés, sélection et publication (aucune attribution automatique, ADR-003).
export function MatchingBoard() {
  const [selected, setSelected] = useState(matchingCandidates.filter((c) => c.selected).map((c) => c.id));
  const [published, setPublished] = useState(false);
  const rows = [...matchingCandidates]
    .map((candidate) => ({ ...candidate, score: candidate.pts.reduce((sum, value) => sum + value, 0) }))
    .sort((a, b) => b.score - a.score);

  const toggle = (id: number) => {
    setSelected(selected.includes(id) ? selected.filter((value) => value !== id) : [...selected, id]);
    setPublished(false);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-muted-foreground" aria-live="polite">
          [Entreprise fictive SA] · 128 consultants validés analysés · {selected.length} sélectionnés pour le client
        </p>
        <div className="flex gap-2">
          <Link href="/admin/comparateur" className="flex h-10 items-center rounded-[10px] border border-field-border bg-white px-4 text-sm hover:bg-secondary">
            Comparer
          </Link>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => {
              setPublished(true);
              toast("Sélection marquée publiée (démonstration)", { description: "Rien n'est transmis au client." });
            }}
            className="h-10 rounded-[10px] bg-action px-4 text-sm font-semibold text-white hover:brightness-[.88] disabled:opacity-50"
          >
            {published ? "Sélection publiée au client" : `Publier la sélection (${selected.length})`}
          </button>
        </div>
      </div>
      <section aria-label="Résultats du matching" className="relative overflow-x-auto rounded-2xl bg-card shadow-card">
        <table className="w-full min-w-[1150px] border-collapse text-left text-sm">
          <caption className="sr-only">Consultants classés par score de matching</caption>
          <thead>
            <tr className="border-b border-border">
              {["Proposer", "Consultant", "Score", ...matchingCriteria.map((criterion) => criterion.short)].map((header) => (
                <th key={header} scope="col" className="px-4 py-3 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase first:pl-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const on = selected.includes(row.id);
              return (
                <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                  <td className="py-3.5 pr-4 pl-6">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      aria-label={`Proposer ${row.name}`}
                      onClick={() => toggle(row.id)}
                      className={cn("flex size-[26px] items-center justify-center rounded-[7px]", on ? "bg-action text-white" : "border-2 border-[#9aa0a6] bg-white")}
                    >
                      {on ? <Check className="size-4" /> : null}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="flex flex-col">
                      {row.id === 1 ? (
                        <Link href="/admin/consultants/c-1" className="font-semibold hover:text-foreground">{row.name}</Link>
                      ) : (
                        <span className="font-semibold">{row.name}</span>
                      )}
                      <span className="text-[13px] text-muted-foreground">
                        {row.code} · {row.title}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xl font-bold text-foreground tabular-nums">{row.score}</td>
                  {row.pts.map((value, index) => (
                    <td key={matchingCriteria[index].label} className="px-4 py-3.5">
                      <span className="flex flex-col gap-1">
                        <span className="text-[13px] tabular-nums">
                          {value} / {matchingCriteria[index].max}
                        </span>
                        <span aria-hidden className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
                          <span className="block h-full bg-action" style={{ width: `${Math.round((value / matchingCriteria[index].max) * 100)}%` }} />
                        </span>
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
