"use client";

import { useState } from "react";

import { DemoAction } from "@/components/app/demo-action";
import { Meter } from "@/components/app/panel";
import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { businessMission } from "@/lib/demo/business";

type Status = "review" | "ok" | "fix" | "later";
const labels: Record<Status, [string, StatusTone]> = {
  review: ["À valider", "info"],
  ok: ["Validé", "success"],
  fix: ["Corrections demandées", "warning"],
  later: ["À venir", "neutral"],
};

// Écran 34 · Missions : validation des livrables (décisions locales).
export function MissionReview() {
  const [statuses, setStatuses] = useState<Record<number, Status>>({});

  return (
    <>
      <section aria-labelledby="mission-courante" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col">
            <h2 id="mission-courante" className="text-lg font-bold">{businessMission.title}</h2>
            <span className="text-sm text-muted-foreground">{businessMission.meta}</span>
          </div>
          <StatusBadge tone="info">{businessMission.progressLabel}</StatusBadge>
        </div>
        <Meter value={businessMission.progress} label="Avancement de la mission" />
      </section>
      <section aria-labelledby="a-valider" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <h2 id="a-valider" className="border-b border-border px-5 py-4 text-lg font-semibold sm:px-6">Livrables à valider</h2>
        <ul>
          {businessMission.deliverables.map((deliverable) => {
            const status = statuses[deliverable.id] ?? deliverable.status;
            const [label, tone] = labels[status];
            return (
              <li key={deliverable.id} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <span className="flex min-w-[200px] flex-1 flex-col">
                  <span className="text-[15px] font-semibold">{deliverable.name}</span>
                  <span className="text-[13px] text-muted-foreground">{deliverable.sub}</span>
                </span>
                <StatusBadge tone={tone}>{label}</StatusBadge>
                {status === "review" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStatuses({ ...statuses, [deliverable.id]: "fix" })}
                      className="h-9 rounded-[10px] border border-field-border px-3.5 text-sm hover:bg-secondary"
                    >
                      Demander des corrections
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatuses({ ...statuses, [deliverable.id]: "ok" })}
                      className="h-9 rounded-[10px] bg-action px-3.5 text-sm font-semibold text-white hover:brightness-[.88]"
                    >
                      Valider
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby="terminees" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <h2 id="terminees" className="border-b border-border px-5 py-4 text-lg font-semibold sm:px-6">Missions terminées</h2>
        <ul>
          {businessMission.finished.map((mission) => (
            <li key={mission.title} className="flex flex-wrap items-center gap-3 px-5 py-4 sm:px-6">
              <span className="flex min-w-[200px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{mission.title}</span>
                <span className="text-[13px] text-muted-foreground">{mission.meta}</span>
              </span>
              <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5">
                Évaluer l&apos;expert
              </DemoAction>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
