"use client";

import { UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { EmptyState } from "@/components/app/panel";
import { shortlists } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

// Écran 31 · Shortlists par besoin, avec comparaison et retrait local.
export function ShortlistTabs() {
  const [tab, setTab] = useState(shortlists[0].id);
  const [removed, setRemoved] = useState<string[]>([]);
  const current = shortlists.find((list) => list.id === tab) ?? shortlists[0];
  const cards = current.cards.filter((card) => !removed.includes(`${tab}:${card.code}`));

  return (
    <div className="flex flex-col gap-5">
      <div role="tablist" aria-label="Shortlists par besoin" className="relative flex overflow-x-auto border-b border-border">
        {shortlists.map((list) => (
          <button
            key={list.id}
            role="tab"
            type="button"
            aria-selected={tab === list.id}
            onClick={() => setTab(list.id)}
            className={cn(
              "-mb-px h-12 shrink-0 border-b-[3px] px-4 text-[15px] whitespace-nowrap outline-none focus-visible:bg-action-subtle",
              tab === list.id ? "border-action font-semibold text-action" : "border-transparent font-medium text-label",
            )}
          >
            {list.label}
          </button>
        ))}
      </div>
      {cards.length === 0 ? (
        <div className="rounded-2xl bg-card shadow-card">
          <EmptyState title="Shortlist vide" description="Ajoutez des profils depuis l'exploration pour les comparer ici." />
        </div>
      ) : (
        <div role="tabpanel" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.code} className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <span aria-hidden className="flex size-14 items-center justify-center rounded-full bg-[#e4e4e4]">
                  <UserRound className="size-6 text-muted-foreground" />
                </span>
                <span className="flex flex-col items-end">
                  <span className="text-[28px] leading-none font-bold text-action tabular-nums">{card.score}</span>
                  <span className="text-xs text-muted-foreground">score / 100</span>
                </span>
              </div>
              <div className="flex flex-col">
                {card.code === "Expert A-1042" ? (
                  <Link href="/business/profils/a-1042" className="text-[17px] font-semibold hover:text-action">
                    {card.code}
                  </Link>
                ) : (
                  <span className="text-[17px] font-semibold">{card.code}</span>
                )}
                <span className="text-[15px] text-label">{card.title}</span>
              </div>
              <dl className="flex flex-col divide-y divide-secondary border-y border-secondary">
                {card.rows.map((row) => (
                  <div key={row.k} className="flex justify-between gap-3 py-2 text-sm">
                    <dt className="text-muted-foreground">{row.k}</dt>
                    <dd className="text-right font-medium">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex items-center gap-2">
                <Link
                  href="/business/introductions"
                  className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-action px-4 text-sm font-semibold text-white hover:brightness-[.88]"
                >
                  Demander l&apos;introduction
                </Link>
                <button
                  type="button"
                  aria-label={`Retirer ${card.code} de la shortlist`}
                  onClick={() => setRemoved([...removed, `${tab}:${card.code}`])}
                  className="flex size-10 items-center justify-center rounded-[10px] border border-field-border text-muted-foreground hover:bg-secondary"
                >
                  <X className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Link href="/business/profils" className="self-start text-[15px] font-semibold text-action hover:text-primary">
        Ajouter des profils depuis l&apos;exploration
      </Link>
    </div>
  );
}
