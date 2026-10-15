"use client";

import { useState } from "react";
import { toast } from "sonner";

import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { proposal } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

type Decision = "accepted" | "change" | null;

// Écran 33 · Proposition avec versions : comparaison et décision locale (aucune signature réelle).
export function ProposalViewer() {
  const [version, setVersion] = useState(2);
  const [decision, setDecision] = useState<Decision>(null);
  const sections = proposal.sections(version === 2);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge tone={decision === "accepted" ? "success" : decision === "change" ? "neutral" : "info"}>
          {decision === "accepted" ? "Acceptée (démonstration)" : decision === "change" ? "Modification demandée" : "En attente de votre décision"}
        </StatusBadge>
        <p className="text-sm text-muted-foreground">{proposal.context}</p>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <section aria-labelledby="versions" className="overflow-hidden rounded-2xl bg-card shadow-card">
          <h2 id="versions" className="border-b border-border px-5 py-4 text-lg font-semibold">Versions</h2>
          <div role="radiogroup" aria-labelledby="versions">
            {proposal.versions.map((item) => (
              <button
                key={item.n}
                type="button"
                role="radio"
                aria-checked={version === item.n}
                onClick={() => setVersion(item.n)}
                className={cn(
                  "flex w-full flex-col items-start gap-0.5 border-b border-secondary px-5 py-3.5 text-left last:border-0",
                  version === item.n ? "bg-[#f4f7fd] shadow-[inset_3px_0_0_var(--acw-blue-600)]" : "bg-white",
                )}
              >
                <span className="text-[15px] font-semibold">{item.label}</span>
                <span className="text-[13px] text-muted-foreground">{item.sub}</span>
              </button>
            ))}
          </div>
        </section>
        <section aria-label={`Contenu de la version ${version}`} className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
          {sections.map((section) => (
            <div key={section.title} className={cn("flex flex-col gap-1.5", section.changed && "border-l-[3px] border-action pl-3.5")}>
              <h3 className="flex items-center gap-2 text-base font-semibold">
                {section.title}
                {section.changed ? <span className="rounded-full bg-action-subtle px-2 py-0.5 text-[11px] font-semibold text-action">Modifié en v2</span> : null}
              </h3>
              <p className="text-[15px] leading-relaxed text-label">{section.text}</p>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
            <Button
              disabled={version !== 2}
              onClick={() => {
                setDecision("accepted");
                toast("Proposition acceptée (démonstration)", { description: "Aucune signature n'est réalisée." });
              }}
              className="h-11 rounded-[10px] bg-action px-5 font-semibold hover:bg-action hover:brightness-[.88]"
            >
              Accepter et signer
            </Button>
            <Button variant="outline" disabled={version !== 2} onClick={() => setDecision("change")} className="h-11 rounded-[10px] border-field-border px-5">
              Demander une modification
            </Button>
            <button
              type="button"
              onClick={() => toast("Téléchargement indisponible", { description: "Les documents seront servis par URL signée (phase 8)." })}
              className="text-[15px] font-semibold text-action hover:text-primary"
            >
              Télécharger en PDF
            </button>
          </div>
          {version !== 2 ? <p className="text-sm text-muted-foreground">La version 1 a été remplacée : la décision porte sur la version 2.</p> : null}
        </section>
      </div>
    </>
  );
}
