"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { candidates, companiesToValidate, introductionsToApprove, type CandidateStatus } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

const candidateStatus: Record<CandidateStatus, [string, StatusTone]> = {
  wait: ["En attente", "info"],
  itw: ["Entretien prévu", "info"],
  ok: ["Validé", "success"],
  no: ["Refusé", "danger"],
};

function DecisionButtons({ onReject, onAccept, acceptLabel = "Valider", rejectLabel = "Refuser" }: { onReject: () => void; onAccept: () => void; acceptLabel?: string; rejectLabel?: string }) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onReject} className="h-9 rounded-[10px] border border-[#f1b8b8] bg-white px-3.5 text-sm text-destructive hover:bg-destructive/5">
        {rejectLabel}
      </button>
      <button type="button" onClick={onAccept} className="h-9 rounded-[10px] bg-action px-3.5 text-sm font-semibold text-white hover:brightness-[.88]">
        {acceptLabel}
      </button>
    </div>
  );
}

// Écran 37 · Validation des consultants : décisions locales (en production, inscrites au journal d'audit).
export function CandidatesQueue() {
  const [decisions, setDecisions] = useState<Record<number, CandidateStatus>>({});
  const pending = candidates.filter((c) => {
    const status = decisions[c.id] ?? c.status;
    return status === "wait" || status === "itw";
  }).length;

  return (
    <>
      <p className="text-base text-muted-foreground" aria-live="polite">
        {pending} candidatures en attente. En production, chaque décision est inscrite au journal d&apos;audit.
      </p>
      <section aria-label="Candidatures" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <ul>
          {candidates.map((candidate) => {
            const status = decisions[candidate.id] ?? candidate.status;
            const [label, tone] = candidateStatus[status];
            const open = status === "wait" || status === "itw";
            return (
              <li key={candidate.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <span className="flex min-w-[180px] flex-1 flex-col">
                  {candidate.id === 1 ? (
                    <Link href="/admin/consultants/c-1" className="text-[15px] font-semibold hover:text-foreground">{candidate.name}</Link>
                  ) : (
                    <span className="text-[15px] font-semibold">{candidate.name}</span>
                  )}
                  <span className="text-[13px] text-muted-foreground">
                    {candidate.place} · déposé {candidate.date}
                  </span>
                </span>
                <span className="w-24 text-sm">{candidate.dom}</span>
                <span className="w-16 text-sm text-label">{candidate.years}</span>
                <span className="flex w-32 items-center gap-2" aria-label={`Dossier complété à ${candidate.pct} %`}>
                  <span aria-hidden className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <span className="block h-full bg-action" style={{ width: `${candidate.pct}%` }} />
                  </span>
                  <span className="text-[13px] text-label tabular-nums">{candidate.pct} %</span>
                </span>
                <StatusBadge tone={tone}>{label}</StatusBadge>
                {open ? (
                  <DecisionButtons
                    onReject={() => setDecisions({ ...decisions, [candidate.id]: "no" })}
                    onAccept={() => setDecisions({ ...decisions, [candidate.id]: "ok" })}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setDecisions({ ...decisions, [candidate.id]: candidate.status })}
                    className="text-sm font-semibold text-foreground"
                  >
                    Annuler
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

type CompanyStatus = "wait" | "ok" | "more" | "no";
const companyStatus: Record<CompanyStatus, [string, StatusTone]> = {
  wait: ["À examiner", "info"],
  ok: ["Validée", "success"],
  more: ["Pièce demandée", "info"],
  no: ["Refusée", "danger"],
};

// Écran 39 · Validation des entreprises : contrôles d'identité et de conformité.
export function CompaniesQueue() {
  const [decisions, setDecisions] = useState<Record<number, CompanyStatus>>({});

  return (
    <ul className="flex flex-col gap-4">
      {companiesToValidate.map((company) => {
        const status = decisions[company.id] ?? "wait";
        const [label, tone] = companyStatus[status];
        return (
          <li key={company.id} className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
            <div className="flex flex-wrap items-center gap-4">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-xl bg-action text-lg font-semibold text-white">{company.ini}</span>
              <span className="flex min-w-[200px] flex-1 flex-col">
                <span className="text-base font-semibold">{company.name}</span>
                <span className="text-[13px] text-muted-foreground">{company.meta}</span>
              </span>
              <StatusBadge tone={tone}>{label}</StatusBadge>
            </div>
            <ul aria-label="Contrôles" className="flex flex-wrap gap-2">
              {company.checks.map((check) => (
                <li
                  key={check.label}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px]",
                    check.ok ? "bg-action text-white" : "bg-white text-action shadow-[inset_0_0_0_1px_var(--acw-blue-600)]",
                  )}
                >
                  {check.ok ? <Check aria-hidden className="size-3.5" /> : <X aria-hidden className="size-3.5" />}
                  {check.ok ? "Conforme" : "Manquant"} : {check.label}
                </li>
              ))}
            </ul>
            {status === "wait" ? (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setDecisions({ ...decisions, [company.id]: "ok" })} className="h-10 rounded-[10px] bg-action px-4 text-sm font-semibold text-white hover:brightness-[.88]">
                  Valider l&apos;entreprise
                </button>
                <button type="button" onClick={() => setDecisions({ ...decisions, [company.id]: "more" })} className="h-10 rounded-[10px] border border-field-border bg-white px-4 text-sm hover:bg-secondary">
                  Demander une pièce
                </button>
                <button type="button" onClick={() => setDecisions({ ...decisions, [company.id]: "no" })} className="h-10 rounded-[10px] border border-[#f1b8b8] bg-white px-4 text-sm text-destructive hover:bg-destructive/5">
                  Refuser
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setDecisions({ ...decisions, [company.id]: "wait" })} className="self-start text-sm font-semibold text-foreground">
                Annuler la décision
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

type IntroStatus = "wait" | "ok" | "no";
const introStatus: Record<IntroStatus, [string, StatusTone]> = {
  wait: ["À approuver", "info"],
  ok: ["Approuvée, envoyée à l'expert", "success"],
  no: ["Refusée", "danger"],
};

// Écran 43 · Approbation des introductions.
export function IntroductionsApproval() {
  const [decisions, setDecisions] = useState<Record<number, IntroStatus>>({});

  return (
    <ul className="flex flex-col gap-4">
      {introductionsToApprove.map((intro) => {
        const status = decisions[intro.id] ?? "wait";
        const [label, tone] = introStatus[status];
        return (
          <li key={intro.id} className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">Entreprise</span>
                <span className="text-[15px] font-semibold">{intro.company}</span>
              </span>
              <span aria-hidden className="text-muted-foreground">⇄</span>
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">Expert</span>
                <span className="text-[15px] font-semibold">{intro.expert}</span>
              </span>
              <span className="flex flex-col">
                <span className="text-xs text-muted-foreground">Besoin</span>
                <span className="text-[15px]">{intro.need}</span>
              </span>
              <span className="ml-auto">
                <StatusBadge tone={tone}>{label}</StatusBadge>
              </span>
            </div>
            <ul aria-label="Contrôles" className="flex flex-wrap gap-2">
              {intro.checks.map((check) => (
                <li
                  key={check.label}
                  className={cn(
                    "rounded-lg px-2.5 py-1.5 text-[13px]",
                    check.ok ? "bg-action text-white" : "bg-white text-action shadow-[inset_0_0_0_1px_var(--acw-blue-600)]",
                  )}
                >
                  {check.label}
                </li>
              ))}
            </ul>
            {status === "wait" ? (
              <DecisionButtons
                acceptLabel="Approuver"
                onReject={() => setDecisions({ ...decisions, [intro.id]: "no" })}
                onAccept={() => setDecisions({ ...decisions, [intro.id]: "ok" })}
              />
            ) : (
              <button type="button" onClick={() => setDecisions({ ...decisions, [intro.id]: "wait" })} className="self-start text-sm font-semibold text-foreground">
                Annuler la décision
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
