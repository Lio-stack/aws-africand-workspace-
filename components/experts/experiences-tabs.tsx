"use client";

import { Briefcase, Eye } from "lucide-react";
import { useState } from "react";

import { DemoAction } from "@/components/app/demo-action";
import { StatusBadge } from "@/components/app/status-badge";
import { expertExperiences, expertReferences } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

const tabs = ["Expériences", "Références"] as const;

// Écran 16 · Expériences et références.
export function ExperiencesTabs() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Expériences");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border">
        <div role="tablist" aria-label="Sections" className="flex">
          {tabs.map((label) => (
            <button
              key={label}
              role="tab"
              type="button"
              aria-selected={tab === label}
              onClick={() => setTab(label)}
              className={cn(
                "-mb-px h-12 border-b-[3px] px-4 text-base outline-none focus-visible:bg-action-subtle",
                tab === label ? "border-action font-semibold text-foreground" : "border-transparent font-medium text-label",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <DemoAction className="mb-2 h-10 rounded-[10px] bg-action px-4 font-semibold hover:bg-action hover:brightness-[.88]">
          {tab === "Expériences" ? "Ajouter une expérience" : "Ajouter une référence"}
        </DemoAction>
      </div>

      {tab === "Expériences" ? (
        <div role="tabpanel" aria-label="Expériences" className="flex flex-col gap-4">
          {expertExperiences.map((experience) => (
            <article key={experience.role} className="flex gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
              <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <Briefcase className="size-5 text-label" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-[17px] font-semibold">{experience.role}</h3>
                  <span className="text-sm text-muted-foreground">{experience.period}</span>
                </div>
                <span className="text-[15px] text-label">{experience.org}</span>
                <p className="text-[15px] text-muted-foreground">{experience.desc}</p>
                <span className="mt-2 flex items-center gap-2 self-start rounded-lg bg-action-subtle px-2.5 py-1 text-[13px] text-primary">
                  <Eye aria-hidden className="size-3.5" />
                  Vue entreprise : {experience.anon}
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div role="tabpanel" aria-label="Références" className="flex flex-col gap-4">
          <ul className="overflow-hidden rounded-2xl bg-card shadow-card">
            {expertReferences.map((reference) => (
              <li key={reference.ini} className="flex flex-wrap items-center gap-4 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-label">
                  {reference.ini}
                </span>
                <div className="flex min-w-[180px] flex-1 flex-col">
                  <span className="text-base font-semibold">{reference.name}</span>
                  <span className="text-sm text-muted-foreground">{reference.role}</span>
                </div>
                <StatusBadge tone={reference.tone}>{reference.status}</StatusBadge>
                <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-4">
                  {reference.action}
                </DemoAction>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            AfriCand contacte vos références uniquement avec votre accord. Elles ne sont jamais montrées aux entreprises.
          </p>
        </div>
      )}
    </div>
  );
}
