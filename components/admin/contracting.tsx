"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Pills } from "@/components/app/pills";
import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { adminMissions, contracts, invoices, proposalDiff, type InvoiceStatus, type MissionHealth } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

// Écran 44 · Propositions avec versions : historique et comparaison v1 / v2.
export function ProposalVersions() {
  const [drafts, setDrafts] = useState(0);
  const [selected, setSelected] = useState(2);
  const versions = [
    ...Array.from({ length: drafts }, (_, i) => ({ n: 2 + drafts - i, status: "Brouillon", tone: "neutral" as StatusTone, sub: "Créée par vous, non envoyée" })),
    { n: 2, status: "Envoyée", tone: "info" as StatusTone, sub: "Envoyée le [DATE], en attente du client" },
    { n: 1, status: "Remplacée", tone: "neutral" as StatusTone, sub: "Envoyée le [DATE], commentée par le client" },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-muted-foreground">[Entreprise fictive SA] · [Candidat 2], B-2217 · Besoin [B-028]</p>
        <button
          type="button"
          onClick={() => {
            setDrafts(drafts + 1);
            setSelected(3 + drafts);
          }}
          className="h-10 rounded-[10px] bg-action px-4 text-sm font-semibold text-white hover:brightness-[.88]"
        >
          Créer la version {3 + drafts}
        </button>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <section aria-labelledby="historique-versions" className="overflow-hidden rounded-2xl bg-card shadow-card">
          <h2 id="historique-versions" className="border-b border-border px-5 py-4 text-lg font-semibold">Historique des versions</h2>
          <div role="radiogroup" aria-labelledby="historique-versions">
            {versions.map((version) => (
              <button
                key={version.n}
                type="button"
                role="radio"
                aria-checked={selected === version.n}
                onClick={() => setSelected(version.n)}
                className={cn(
                  "flex w-full flex-col items-start gap-1 border-b border-secondary px-5 py-3.5 text-left last:border-0",
                  selected === version.n ? "bg-[#f4f7fd] shadow-[inset_3px_0_0_var(--acw-blue-600)]" : "bg-white",
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold">Version {version.n}</span>
                  <StatusBadge tone={version.tone}>{version.status}</StatusBadge>
                </span>
                <span className="text-[13px] text-muted-foreground">{version.sub}</span>
              </button>
            ))}
          </div>
        </section>
        <div className="flex flex-col gap-5">
          <section aria-label="Comparaison des versions 1 et 2" className="relative overflow-x-auto rounded-2xl bg-card shadow-card">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Section", "Version 1", "Version 2"].map((header) => (
                    <th key={header} scope="col" className="px-4 py-3 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase first:pl-6">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposalDiff.map((row) => {
                  const changed = row.a !== row.b;
                  return (
                    <tr key={row.k} className="border-b border-border last:border-0">
                      <th scope="row" className="py-3.5 pr-4 pl-6 font-semibold">{row.k}</th>
                      <td className="px-4 py-3.5 leading-relaxed">{row.a}</td>
                      <td className={cn("px-4 py-3.5 leading-relaxed", changed && "bg-action-subtle font-semibold")}>
                        {row.b}
                        {changed ? <span className="sr-only"> (modifié)</span> : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <div className="flex flex-col gap-1 rounded-2xl bg-action-subtle p-5">
            <span className="text-sm font-semibold text-primary">Commentaire de l&apos;entreprise sur la version 1</span>
            <span className="text-[15px] text-primary">« Nous souhaitons une durée de 4 mois et une facturation mensuelle. »</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Écran 45 · Contrats. ADR-004 : un contrat AfriCand ↔ entreprise et un contrat AfriCand ↔ expert.
export function ContractsTable() {
  const [countersigned, setCountersigned] = useState<number[]>([]);

  return (
    <section aria-label="Contrats" className="overflow-hidden rounded-2xl bg-card shadow-card">
      <ul>
        {contracts.map((contract) => {
          const signed = [contract.signed[0], contract.signed[1] || countersigned.includes(contract.id)];
          const done = signed.every(Boolean);
          const mine = signed[0] && !signed[1];
          return (
            <li key={contract.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span className="flex min-w-[200px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{contract.obj}</span>
                <span className="text-[13px] text-muted-foreground">
                  {contract.ref} · AfriCand ↔ {contract.party.toLowerCase()}
                </span>
              </span>
              <dl className="flex gap-5 text-sm">
                <div className="flex flex-col">
                  <dt className="text-xs text-muted-foreground">{contract.party}</dt>
                  <dd className={signed[0] ? "font-semibold text-action" : "text-action"}>{signed[0] ? "Signé" : "En attente"}</dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-xs text-muted-foreground">AfriCand</dt>
                  <dd className={signed[1] ? "font-semibold text-action" : "text-action"}>{signed[1] ? "Signé" : "En attente"}</dd>
                </div>
              </dl>
              <StatusBadge tone={done ? "success" : "info"}>{done ? "Actif" : "Signatures en cours"}</StatusBadge>
              <button
                type="button"
                onClick={() => {
                  if (mine) {
                    setCountersigned([...countersigned, contract.id]);
                    toast("Contresignature simulée", { description: "Aucune signature électronique n'est réalisée." });
                  } else {
                    toast(done ? "Téléchargement indisponible en démonstration" : "Relance non envoyée (démonstration)");
                  }
                }}
                className={cn(
                  "h-9 rounded-[10px] px-3.5 text-sm",
                  mine ? "bg-action font-semibold text-white hover:brightness-[.88]" : "border border-field-border bg-white hover:bg-secondary",
                )}
              >
                {done ? "Télécharger" : mine ? "Contresigner" : "Relancer"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const healthTone: Record<MissionHealth, StatusTone> = { "À l'heure": "success", "À risque": "warning", "En retard": "danger" };
const healthFilters = ["Toutes", "À l'heure", "À risque", "En retard"] as const;

// Écran 46 · Missions : santé et avancement.
export function MissionsBoard() {
  const [filter, setFilter] = useState<string>("Toutes");
  const rows = adminMissions.filter((mission) => filter === "Toutes" || mission.health === filter);

  return (
    <>
      <Pills label="Filtrer par santé" options={healthFilters} value={filter} onChange={setFilter} />
      <section aria-label="Missions" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <ul>
          {rows.map((mission) => (
            <li key={mission.ref} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span className="flex min-w-[180px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{mission.title}</span>
                <span className="text-[13px] text-muted-foreground">
                  {mission.ref} · {mission.co} · {mission.ex}
                </span>
              </span>
              <span className="flex w-36 items-center gap-2" aria-label={`Avancement ${mission.pct} %`}>
                <span aria-hidden className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <span className="block h-full bg-action" style={{ width: `${mission.pct}%` }} />
                </span>
                <span className="text-[13px] tabular-nums">{mission.pct} %</span>
              </span>
              <span className="w-52 text-sm text-label">{mission.next}</span>
              <StatusBadge tone={healthTone[mission.health]}>{mission.health}</StatusBadge>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

const invoiceStatus: Record<InvoiceStatus, [string, StatusTone, string]> = {
  due: ["À échéance", "info", "Marquer payée"],
  late: ["En retard", "danger", "Relancer"],
  paid: ["Payée", "success", "Télécharger"],
};
const flows = ["Factures clients", "Reversements experts"] as const;

// Écran 47 · Facturation : suivi et rapprochement manuel (pas de paiement en ligne au MVP).
export function BillingTabs() {
  const [tab, setTab] = useState<(typeof flows)[number]>("Factures clients");
  const [paid, setPaid] = useState<string[]>([]);

  return (
    <section aria-label="Facturation" className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div role="tablist" aria-label="Flux" className="flex border-b border-border px-2">
        {flows.map((label) => (
          <button
            key={label}
            role="tab"
            type="button"
            aria-selected={tab === label}
            onClick={() => setTab(label)}
            className={cn(
              "-mb-px h-12 border-b-[3px] px-4 text-base whitespace-nowrap outline-none focus-visible:bg-action-subtle",
              tab === label ? "border-action font-semibold text-action" : "border-transparent font-medium text-label",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <ul role="tabpanel" aria-label={tab}>
        {invoices[tab].map((invoice) => {
          const status = paid.includes(invoice.id) ? "paid" : invoice.status;
          const [label, tone, action] = invoiceStatus[status];
          return (
            <li key={invoice.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span className="flex min-w-[200px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{invoice.who}</span>
                <span className="text-[13px] text-muted-foreground">
                  {invoice.ref} · {invoice.m} · échéance {invoice.due}
                </span>
              </span>
              <span className="w-24 text-sm tabular-nums">[MONTANT]</span>
              <StatusBadge tone={tone}>{label}</StatusBadge>
              <button
                type="button"
                onClick={() => {
                  if (status === "due") setPaid([...paid, invoice.id]);
                  else toast(`${action} : action de démonstration`);
                }}
                className={cn(
                  "h-9 rounded-[10px] px-3.5 text-sm",
                  status === "due" ? "bg-action font-semibold text-white hover:brightness-[.88]" : "border border-field-border bg-white hover:bg-secondary",
                )}
              >
                {action}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
