"use client";

import { useState } from "react";
import { toast } from "sonner";

import { StageTrack } from "@/components/app/stage-track";
import { businessIntroductions, introductionSteps } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

// Écran 32 · Introductions : suivi des étapes, identité visible seulement après double accord.
export function IntroductionsTracker() {
  const [planned, setPlanned] = useState(false);

  return (
    <ul className="flex flex-col gap-4">
      {businessIntroductions.map((intro) => {
        const stage = intro.id === "b2" && planned ? 4 : intro.stage;
        const actionable = intro.id === "b2";
        return (
          <li key={intro.id} className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span
                aria-hidden
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  intro.revealed ? "bg-primary text-white" : "bg-[#e4e4e4] text-muted-foreground",
                )}
              >
                {intro.ini}
              </span>
              <div className="flex min-w-[200px] flex-1 flex-col">
                <span className="text-base font-semibold">{intro.who}</span>
                <span className="text-sm text-muted-foreground">{intro.need}</span>
              </div>
              {actionable ? (
                <button
                  type="button"
                  onClick={() => {
                    setPlanned(!planned);
                    if (!planned) toast("Appel noté (démonstration)", { description: "Aucune invitation n'est envoyée." });
                  }}
                  className={cn(
                    "h-10 rounded-[10px] px-4 text-sm",
                    planned ? "border border-field-border bg-white text-foreground" : "bg-action font-semibold text-white hover:brightness-[.88]",
                  )}
                >
                  {planned ? "Appel le [DATE] à 10 h" : "Planifier l'appel"}
                </button>
              ) : (
                <span className="flex h-10 items-center rounded-[10px] border border-field-border px-4 text-sm text-label">
                  {intro.stage === 2 ? "En attente de l'expert" : "En revue AfriCand"}
                </span>
              )}
            </div>
            <StageTrack
              label={`Avancement de l'introduction ${intro.who}`}
              stages={introductionSteps.map((label) => ({ label }))}
              current={stage}
            />
          </li>
        );
      })}
    </ul>
  );
}
