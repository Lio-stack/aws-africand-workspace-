"use client";

import { useState } from "react";

import { DemoAction } from "@/components/app/demo-action";
import { StatusBadge } from "@/components/app/status-badge";
import { businessDocuments } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

const tabs = ["Factures", "Contrats", "Livrables"] as const;

// Écran 35 · Documents et factures. Pas de paiement en ligne au MVP : règlement hors plateforme.
export function DocumentsTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Factures");
  const rows = businessDocuments[tab];

  return (
    <section aria-label="Documents" className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div role="tablist" aria-label="Catégorie" className="flex border-b border-border px-2">
        {tabs.map((label) => (
          <button
            key={label}
            role="tab"
            type="button"
            aria-selected={tab === label}
            onClick={() => setTab(label)}
            className={cn(
              "-mb-px h-12 border-b-[3px] px-4 text-base outline-none focus-visible:bg-action-subtle",
              tab === label ? "border-action font-semibold text-action" : "border-transparent font-medium text-label",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <ul role="tabpanel" aria-label={tab}>
        {rows.map((row) => (
          <li key={row.ref} className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
            <span className="flex min-w-[220px] flex-1 flex-col">
              <span className="text-[15px] font-semibold">{row.obj}</span>
              <span className="text-[13px] text-muted-foreground">
                {row.ref} · {row.date}
              </span>
            </span>
            <span className="w-28 text-sm tabular-nums text-label">{row.amount}</span>
            <StatusBadge tone={row.tone}>{row.status}</StatusBadge>
            <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5" message={`${row.action} : action de démonstration`}>
              {row.action}
            </DemoAction>
          </li>
        ))}
      </ul>
      {tab === "Factures" ? (
        <p className="border-t border-border px-5 py-3 text-sm text-muted-foreground sm:px-6">
          Règlement par virement selon les modalités de la facture. Le paiement en ligne n&apos;est pas prévu au MVP.
        </p>
      ) : null}
    </section>
  );
}
