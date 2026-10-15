"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { EmptyState, Tag } from "@/components/app/panel";
import { Pills, SearchField } from "@/components/app/pills";
import { expertOpportunities } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

const filters = ["Toutes", "Stratégie", "Finance", "Opérations", "Mes intérêts"] as const;

// Écran 18 · Opportunités : filtres, recherche et intérêt (local au navigateur).
export function OpportunitiesList() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [filter, setFilter] = useState<string>("Toutes");
  const [interests, setInterests] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const list = expertOpportunities.filter((o) => {
    const byFilter = filter === "Toutes" ? true : filter === "Mes intérêts" ? interests.includes(o.id) : o.cat === filter;
    const byQuery = !q || [o.title, o.desc, ...o.tags].some((text) => text.toLowerCase().includes(q));
    return byFilter && byQuery;
  });

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-4 shadow-[0_1px_2px_rgb(16_24_40/0.05)] sm:p-5">
        <SearchField label="Rechercher des missions" placeholder="Rechercher une mission..." value={query} onChange={setQuery} />
        <Pills label="Filtrer les opportunités" options={filters} value={filter} onChange={setFilter} />
      </div>
      <p className="text-[15px] text-ref-ink" aria-live="polite">
        <strong className="tabular-nums">{list.length} résultat{list.length > 1 ? "s" : ""}</strong> <span className="text-ref-muted">· Pertinence</span>
      </p>
      {list.length === 0 ? (
        <div className="rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]">
          <EmptyState title="Aucune opportunité" description="Modifiez votre recherche ou vos filtres. Les nouveaux besoins qualifiés apparaissent ici." />
        </div>
      ) : (
        <ul className="overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]">
          {list.map((opportunity) => {
            const sent = interests.includes(opportunity.id);
            return (
              <li key={opportunity.id} className="flex flex-col gap-3 border-b border-ref-line px-5 py-5 last:border-0 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-[17px] font-bold text-ref-ink">{opportunity.title}</h2>
                  <span className="shrink-0 text-[13px] text-ref-muted">{opportunity.when}</span>
                </div>
                <p className="max-w-2xl text-[15px] text-ref-muted">{opportunity.desc}</p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {opportunity.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-pressed={sent}
                    onClick={() => {
                      setInterests(sent ? interests.filter((id) => id !== opportunity.id) : [...interests, opportunity.id]);
                      if (!sent) toast("Intérêt noté (démonstration)", { description: "Rien n'est transmis à AfriCand pour l'instant." });
                    }}
                    className={cn(
                      "h-10 shrink-0 rounded-lg border border-ref-blue px-4 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-action/25",
                      sent ? "bg-ref-blue text-white" : "bg-white text-ref-blue",
                    )}
                  >
                    {sent ? "Intérêt envoyé" : "Manifester mon intérêt"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
