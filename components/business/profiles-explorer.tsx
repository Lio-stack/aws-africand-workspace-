"use client";

import { UserRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { EmptyState, Tag } from "@/components/app/panel";
import { Pills, SearchField } from "@/components/app/pills";
import { anonymizedProfiles } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

const categories = ["Tous", "Stratégie", "Finance", "M&A", "Opérations"] as const;
const sorts = ["Score de matching", "Séniorité"] as const;

// Écran 29 · Exploration de profils anonymisés : recherche, filtres, tri, shortlist locale.
export function ProfilesExplorer() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string>("Tous");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Score de matching");
  const [saved, setSaved] = useState<string[]>([]);

  const q = query.trim().toLowerCase();
  const list = anonymizedProfiles
    .filter((profile) => category === "Tous" || profile.cat === category)
    .filter((profile) => !q || [profile.title, profile.country, ...profile.tags].some((text) => text.toLowerCase().includes(q)))
    .sort((a, b) =>
      sort === "Score de matching" ? b.score - a.score : Number(b.title.match(/(\d+) ans/)?.[1] ?? 0) - Number(a.title.match(/(\d+) ans/)?.[1] ?? 0),
    );

  return (
    <>
      <div className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-4 shadow-[0_1px_2px_rgb(16_24_40/0.05)] sm:p-5">
        <SearchField label="Rechercher une expertise" placeholder="Rechercher une expertise, ex. private equity" value={query} onChange={setQuery} />
        <Pills label="Filtrer par domaine" options={categories} value={category} onChange={setCategory} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-ref-ink" aria-live="polite">
          <strong className="tabular-nums">{list.length} résultat{list.length > 1 ? "s" : ""}</strong> <span className="text-ref-muted">· triés par {sort === "Score de matching" ? "Pertinence" : "Séniorité"}</span>
        </p>
        <label className="flex items-center gap-2 text-[15px] text-ref-ink">
          Trier par
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as (typeof sorts)[number])}
            className="h-10 rounded-full border border-ref-softborder bg-white px-3.5 text-[15px] outline-none focus-visible:border-ref-blue"
          >
            {sorts.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      <section aria-label="Profils anonymisés" className="overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]">
        {list.length === 0 ? (
          <EmptyState title="Aucun profil" description="Élargissez la recherche ou retirez un filtre." />
        ) : (
          <ul>
            {list.map((profile) => {
              const inShortlist = saved.includes(profile.code);
              return (
                <li key={profile.code} className="flex flex-wrap items-center gap-4 border-b border-ref-line px-5 py-5 last:border-0 sm:px-6">
                  <span aria-hidden className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ref-ice">
                    <UserRound className="size-7 text-navy-950" />
                  </span>
                  <div className="flex min-w-[200px] flex-1 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      {profile.slug === "a-1042" ? (
                        <Link href="/business/profils/a-1042" className="text-lg font-bold text-ref-ink hover:text-ref-ink">
                          {profile.code}
                        </Link>
                      ) : (
                        <span className="text-lg font-bold text-ref-ink">{profile.code}</span>
                      )}
                      <span className="rounded-md bg-ref-chip px-2 py-0.5 text-xs font-medium text-ref-ink">Anonymisé</span>
                    </div>
                    <span className="text-[15px] text-ref-muted">{profile.title}</span>
                    <span className="text-sm text-ref-muted">{profile.country}</span>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {profile.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="flex flex-col items-center">
                      <span className="text-[28px] leading-none font-bold text-ref-ink tabular-nums">{profile.score}</span>
                      <span className="text-xs text-ref-muted">score / 100</span>
                    </span>
                    <button
                      type="button"
                      aria-pressed={inShortlist}
                      onClick={() => setSaved(inShortlist ? saved.filter((code) => code !== profile.code) : [...saved, profile.code])}
                      className={cn(
                        "h-10 rounded-lg border px-4 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-action/25",
                        inShortlist ? "border-ref-blue bg-ref-blue text-white" : "border-ref-blue bg-white text-ref-blue",
                      )}
                    >
                      {inShortlist ? "Dans la shortlist" : "Ajouter à la shortlist"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
