"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Meter } from "@/components/app/panel";
import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { currentMission } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

const statusMap: Record<"ok" | "todo" | "review" | "later", { label: string; tone: StatusTone; action: string; primary: boolean }> = {
  ok: { label: "Validé", tone: "success", action: "Télécharger", primary: false },
  todo: { label: "À déposer", tone: "info", action: "Déposer", primary: true },
  review: { label: "En revue", tone: "info", action: "Voir", primary: false },
  later: { label: "À venir", tone: "neutral", action: "Préparer", primary: false },
};

// Écran 20 · Missions et livrables (dépôt simulé localement).
export function MissionDeliverables() {
  const [submitted, setSubmitted] = useState<number[]>([]);
  const progress = submitted.includes(2) ? 45 : currentMission.progress;

  return (
    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(260px,1fr)_minmax(0,2fr)]">
      <section aria-label="Informations de mission" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <dl className="flex flex-col gap-3.5">
          {currentMission.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-0.5">
              <dt className="text-[13px] text-muted-foreground">{fact.label}</dt>
              <dd className="text-[15px] font-semibold">{fact.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <dt className="flex justify-between text-[13px] text-muted-foreground">
              Avancement <span className="font-semibold text-action">{progress} %</span>
            </dt>
            <dd>
              <Meter value={progress} label="Avancement de la mission" />
            </dd>
          </div>
        </dl>
      </section>
      <section aria-labelledby="livrables" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <h2 id="livrables" className="text-lg font-semibold">Livrables</h2>
          <span className="text-sm text-muted-foreground">1 sur 4 validés</span>
        </div>
        <ul>
          {currentMission.deliverables.map((deliverable) => {
            const status = statusMap[submitted.includes(deliverable.id) ? "review" : deliverable.status];
            return (
              <li key={deliverable.id} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <div className="flex min-w-[180px] flex-1 flex-col">
                  <span className="text-[15px] font-semibold">{deliverable.name}</span>
                  <span className="text-[13px] text-muted-foreground">Échéance {deliverable.due}</span>
                </div>
                <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                <button
                  type="button"
                  onClick={() => {
                    if (deliverable.status === "todo" && !submitted.includes(deliverable.id)) {
                      setSubmitted([...submitted, deliverable.id]);
                      toast("Livrable marqué en revue (démonstration)", { description: "Aucun fichier n'est envoyé." });
                    } else {
                      toast("Action de démonstration", { description: "Les documents seront servis par URL signée (phase 8)." });
                    }
                  }}
                  className={cn(
                    "h-9 rounded-[10px] px-3.5 text-sm",
                    status.primary ? "bg-action font-semibold text-white hover:brightness-[.88]" : "border border-field-border bg-white text-foreground hover:bg-secondary",
                  )}
                >
                  {status.action}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
