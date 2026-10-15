"use client";

import Link from "next/link";
import { useState } from "react";

import { EmptyState } from "@/components/app/panel";
import { Pills } from "@/components/app/pills";
import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { needs, type NeedStatus } from "@/lib/demo/business";

const filters = ["Tous", "Brouillon", "En qualification", "Matching", "Pourvu"] as const;
export const needTone: Record<NeedStatus, StatusTone> = {
  Brouillon: "neutral",
  "En qualification": "info",
  Matching: "info",
  Pourvu: "success",
};

// Écran 26 · Liste des besoins, filtrable par statut.
export function NeedsTable() {
  const [filter, setFilter] = useState<string>("Tous");
  const rows = needs.filter((need) => filter === "Tous" || need.status === filter);

  return (
    <>
      <Pills label="Filtrer par statut" options={filters} value={filter} onChange={setFilter} />
      <section aria-label="Besoins" className="overflow-hidden rounded-2xl bg-card shadow-card">
        {rows.length === 0 ? (
          <EmptyState title="Aucun besoin" description="Aucun besoin ne correspond à ce statut." />
        ) : (
          <ul>
            {rows.map((need) => (
              <li key={need.ref} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <div className="flex min-w-[220px] flex-1 flex-col">
                  {need.ref === "[B-031]" ? (
                    <Link href="/business/besoins/b-031" className="text-[15px] font-semibold text-foreground hover:text-foreground">
                      {need.title}
                    </Link>
                  ) : (
                    <span className="text-[15px] font-semibold text-foreground">{need.title}</span>
                  )}
                  <span className="text-[13px] text-muted-foreground">
                    {need.ref} · {need.dom} · créé le {need.date}
                  </span>
                </div>
                <span className="w-44 text-sm text-label">{need.profiles}</span>
                <StatusBadge tone={needTone[need.status]}>{need.status}</StatusBadge>
                {need.ref === "[B-031]" ? (
                  <Link href="/business/besoins/b-031" className="text-sm font-semibold text-foreground">
                    Ouvrir<span className="sr-only"> {need.title}</span>
                  </Link>
                ) : (
                  // Seul le besoin [B-031] dispose d'une fiche détaillée en démonstration.
                  <span className="text-sm text-muted-foreground">Détail en démo : [B-031]</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
