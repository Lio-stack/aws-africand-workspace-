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
      <div className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-card sm:p-5">
        <SearchField label="Rechercher des missions" placeholder="Rechercher des missions..." value={query} onChange={setQuery} />
        <Pills label="Filtrer les opportunités" options={filters} value={filter} onChange={setFilter} />
      </div>
      <p className="text-[15px] text-label" aria-live="polite">
        {list.length} opportunité{list.length > 1 ? "s" : ""}
      </p>
      {list.length === 0 ? (
        <div className="rounded-2xl bg-card shadow-card">
          <EmptyState title="Aucune opportunité" description="Modifiez votre recherche ou vos filtres. Les nouveaux besoins qualifiés apparaissent ici." />
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {list.map((opportunity) => {
            const sent = interests.includes(opportunity.id);
            return (
              <li key={opportunity.id} className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:flex-row sm:p-6">
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <h2 className="text-lg font-semibold">{opportunity.title}</h2>
                  <p className="text-[15px] text-muted-foreground">{opportunity.desc}</p>
                  <p className="text-sm text-label">{opportunity.meta}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opportunity.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="text-[13px] text-muted-foreground">{opportunity.when}</span>
                  <button
                    type="button"
                    aria-pressed={sent}
                    onClick={() => {
                      setInterests(sent ? interests.filter((id) => id !== opportunity.id) : [...interests, opportunity.id]);
                      if (!sent) toast("Intérêt noté (démonstration)", { description: "Rien n'est transmis à AfriCand pour l'instant." });
                    }}
                    className={cn(
                      "h-10 rounded-[10px] border border-action px-4 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-action/25",
                      sent ? "bg-action text-white" : "bg-white text-action",
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
