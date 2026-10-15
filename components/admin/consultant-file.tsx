"use client";

import { useState } from "react";

import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { consultantFile } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

const tabs = ["Profil", "Vérifications", "Historique"] as const;
type Decision = "ok" | "more" | "no" | null;
const decisionLabel: Record<Exclude<Decision, null>, [string, StatusTone]> = {
  ok: ["Validé", "success"],
  more: ["Compléments demandés", "info"],
  no: ["Refusé", "danger"],
};

// Écran 38 · Fiche consultant complète (données personnelles visibles : espace interne, accès audité).
export function ConsultantFile() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Vérifications");
  const [decision, setDecision] = useState<Decision>(null);
  const [label, tone] = decision ? decisionLabel[decision] : ["En validation", "info" as StatusTone];
  const { header } = consultantFile;

  return (
    <>
      <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <span aria-hidden className="flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">{header.ini}</span>
        <span className="flex min-w-[220px] flex-1 flex-col gap-0.5">
          <span className="text-[15px] text-label">{header.title}</span>
          <span className="text-[13px] break-all text-muted-foreground">{header.contact}</span>
        </span>
        <StatusBadge tone={tone}>{label}</StatusBadge>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
        <section aria-label="Dossier" className="overflow-hidden rounded-2xl bg-card shadow-card">
          <div role="tablist" aria-label="Sections" className="flex border-b border-border px-2">
            {tabs.map((item) => (
              <button
                key={item}
                role="tab"
                type="button"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={cn(
                  "-mb-px h-12 border-b-[3px] px-4 text-base outline-none focus-visible:bg-action-subtle",
                  tab === item ? "border-action font-semibold text-action" : "border-transparent font-medium text-label",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <dl role="tabpanel" aria-label={tab}>
            {consultantFile.tabs[tab].map((row) => (
              <div key={row.k} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-3.5 last:border-0 sm:px-6">
                <span className="flex min-w-[200px] flex-1 flex-col">
                  <dt className="text-[15px] font-semibold">{row.k}</dt>
                  <dd className="text-[13px] text-muted-foreground">{row.v}</dd>
                </span>
                {row.s ? <StatusBadge tone={row.tone}>{row.s}</StatusBadge> : null}
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="decision" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
          <h2 id="decision" className="text-lg font-bold">Décision</h2>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
            Note interne (non visible du consultant)
            <textarea
              rows={5}
              placeholder="Synthèse de l'entretien, points forts, réserves..."
              className="rounded-[10px] border border-field-border px-3.5 py-3 text-[15px] font-normal text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15"
            />
          </label>
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => setDecision("ok")} className="h-11 rounded-[10px] bg-action text-[15px] font-semibold text-white hover:brightness-[.88]">
              Valider le profil
            </button>
            <button type="button" onClick={() => setDecision("more")} className="h-11 rounded-[10px] border border-field-border bg-white text-[15px] hover:bg-secondary">
              Demander des compléments
            </button>
            <button type="button" onClick={() => setDecision("no")} className="h-11 rounded-[10px] border border-[#f1b8b8] bg-white text-[15px] text-destructive hover:bg-destructive/5">
              Refuser
            </button>
          </div>
          <p className="text-[13px] text-muted-foreground">
            En production, la décision est horodatée, signée par votre compte et consignée au journal d&apos;audit. Ici, rien n&apos;est enregistré.
          </p>
        </section>
      </div>
    </>
  );
}
