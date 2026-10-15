"use client";

import { useState } from "react";

import { DemoAction } from "@/components/app/demo-action";
import { Pills } from "@/components/app/pills";
import { StatusBadge } from "@/components/app/status-badge";
import { expertDocuments } from "@/lib/demo/experts";

const categories = ["Tous", "Dossier", "Contrats", "Missions", "Factures"] as const;

// Écran 21 · Documents : filtrage par catégorie.
export function DocumentsList() {
  const [category, setCategory] = useState<string>("Tous");
  const docs = expertDocuments.filter((doc) => category === "Tous" || doc.cat === category);

  return (
    <>
      <Pills label="Filtrer par catégorie" options={categories} value={category} onChange={setCategory} />
      <section aria-label="Documents" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <ul>
          {docs.map((doc) => (
            <li key={doc.name} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span aria-hidden className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-muted-foreground">
                {doc.ext}
              </span>
              <div className="flex min-w-[180px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{doc.name}</span>
                <span className="text-[13px] text-muted-foreground">
                  {doc.cat} · {doc.date}
                </span>
              </div>
              <StatusBadge tone={doc.tone}>{doc.status}</StatusBadge>
              <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5" message={`${doc.action} : action de démonstration`}>
                {doc.action}
              </DemoAction>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
