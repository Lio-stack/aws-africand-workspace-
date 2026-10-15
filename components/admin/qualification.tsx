"use client";

import Link from "next/link";
import { useState } from "react";

import { DemoAction } from "@/components/app/demo-action";
import { matchingCriteria, needsToQualify } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

const inputClass =
  "h-11 rounded-[10px] border border-field-border px-3 text-[15px] font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15";

// Écran 40 · Qualification des besoins : pondérations (total contrôlé) et version anonymisée.
export function NeedQualification() {
  const [selected, setSelected] = useState(0);
  const [weights, setWeights] = useState(matchingCriteria.map((criterion) => criterion.max));
  const current = needsToQualify[selected];
  const total = weights.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);

  return (
    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
      <section aria-label="Besoins à qualifier" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <div role="listbox" aria-label="Besoins à qualifier">
          {needsToQualify.map((need, index) => (
            <button
              key={need.ref}
              type="button"
              role="option"
              aria-selected={selected === index}
              onClick={() => setSelected(index)}
              className={cn(
                "flex w-full flex-col items-start gap-0.5 border-b border-secondary px-[18px] py-3.5 text-left last:border-0",
                selected === index ? "bg-[#f4f7fd] shadow-[inset_3px_0_0_var(--acw-blue-600)]" : "bg-white hover:bg-[#f8f8f8]",
              )}
            >
              <span className="text-xs text-muted-foreground">
                {need.ref} · {need.age}
              </span>
              <span className="text-[15px] font-semibold">{need.title}</span>
              <span className="text-[13px] text-muted-foreground">{need.client}</span>
            </button>
          ))}
        </div>
      </section>
      <section aria-labelledby="besoin-courant" className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-[13px] text-muted-foreground">
            {current.ref} · {current.client}
          </span>
          <h2 id="besoin-courant" className="text-[22px] font-bold">{current.title}</h2>
        </div>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-sm font-semibold text-foreground">Pondération des critères de matching</legend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {matchingCriteria.map((criterion, index) => (
              <label key={criterion.label} className="flex flex-col gap-1.5 text-[13px] font-semibold text-label">
                {criterion.label}
                <input
                  inputMode="numeric"
                  value={weights[index]}
                  onChange={(event) => setWeights(weights.map((value, i) => (i === index ? Number(event.target.value.replace(/\D/g, "")) : value)))}
                  className={inputClass}
                />
              </label>
            ))}
          </div>
          <span className={cn("text-sm font-semibold", total === 100 ? "text-success" : "text-destructive")} aria-live="polite">
            Total : {total} points{total === 100 ? "" : " (doit être égal à 100)"}
          </span>
        </fieldset>
        <label key={`anon-${current.ref}`} className="flex flex-col gap-1.5 text-sm font-semibold text-label">
          Version anonymisée visible des experts
          <textarea rows={4} defaultValue={current.anon} className="rounded-[10px] border border-field-border px-3.5 py-3 text-[15px] font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
          Note de qualification (interne)
          <textarea rows={3} placeholder="Échange avec le client, priorités, risques..." className="rounded-[10px] border border-field-border px-3.5 py-3 text-[15px] font-normal text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15" />
        </label>
        <div className="flex flex-wrap gap-3">
          {total === 100 ? (
            <Link href="/admin/matching" className="flex h-11 items-center rounded-[10px] bg-action px-5 text-[15px] font-semibold text-white hover:brightness-[.88]">
              Qualifier et lancer le matching
            </Link>
          ) : (
            <span aria-disabled className="flex h-11 cursor-not-allowed items-center rounded-[10px] bg-action/40 px-5 text-[15px] font-semibold text-white">
              Qualifier et lancer le matching
            </span>
          )}
          <DemoAction variant="outline" className="h-11 rounded-[10px] border-field-border px-5" message="Besoin renvoyé au client (démonstration)">
            Renvoyer au client
          </DemoAction>
        </div>
      </section>
    </div>
  );
}
