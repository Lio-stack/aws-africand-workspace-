"use client";

import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DemoAction } from "@/components/app/demo-action";
import { Pills } from "@/components/app/pills";
import { StatusBadge } from "@/components/app/status-badge";
import {
  adminUsers,
  auditEntries,
  averageDelays,
  funnel,
  matchingCriteria,
  missionsByDomain,
  permissionMatrix,
  roleNames,
  securityToggles,
} from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

const periods = ["Mois", "Trimestre", "Année"] as const;
const factor: Record<(typeof periods)[number], number> = { Mois: 1, Trimestre: 3, Année: 11 };

// Écran 48 · Reporting : entonnoir, délais et missions par domaine (chiffres fictifs).
export function ReportingBoard() {
  const [period, setPeriod] = useState<string>("Trimestre");
  const k = factor[period as (typeof periods)[number]];
  const top = funnel[0].v * k;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Pills label="Période" options={periods} value={period} onChange={setPeriod} />
        <DemoAction variant="outline" className="h-10 rounded-[10px] border-field-border px-4">Exporter</DemoAction>
      </div>
      <section aria-labelledby="entonnoir" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="entonnoir" className="text-lg font-bold">Entonnoir de conversion</h2>
        <ul className="flex flex-col gap-3">
          {funnel.map((step) => (
            <li key={step.label} className="grid grid-cols-[minmax(140px,200px)_1fr_48px] items-center gap-3 text-[15px]">
              <span>{step.label}</span>
              <span aria-hidden className="h-7 overflow-hidden rounded-lg bg-secondary">
                <span className="block h-full rounded-lg bg-action" style={{ width: `${Math.round(((step.v * k) / top) * 100)}%` }} />
              </span>
              <span className="text-right font-semibold tabular-nums">{step.v * k}</span>
            </li>
          ))}
        </ul>
      </section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <section aria-labelledby="delais" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
          <h2 id="delais" className="text-lg font-bold">Délais moyens</h2>
          <dl className="flex flex-col divide-y divide-secondary">
            {averageDelays.map((delay) => (
              <div key={delay.k} className="flex justify-between py-2.5 text-[15px]">
                <dt className="text-label">{delay.k}</dt>
                <dd className="font-semibold">{delay.v}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="domaines" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
          <h2 id="domaines" className="text-lg font-bold">Missions par domaine</h2>
          <ul className="flex flex-col gap-3">
            {missionsByDomain.map((domain) => (
              <li key={domain.k} className="grid grid-cols-[100px_1fr_40px] items-center gap-3 text-[15px]">
                <span>{domain.k}</span>
                <span aria-hidden className="h-2.5 overflow-hidden rounded-full bg-secondary">
                  <span className="block h-full bg-action" style={{ width: `${Math.round((domain.v / 5) * 100)}%` }} />
                </span>
                <span className="text-right font-semibold tabular-nums">{domain.v * k}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

const auditFilters = ["Tout", "Validation", "Introduction", "Contrat", "Accès"] as const;

// Écran 49 · Journal d'audit (lecture seule).
export function AuditLog() {
  const [filter, setFilter] = useState<string>("Tout");
  const rows = auditEntries.filter((entry) => filter === "Tout" || entry.cat === filter);

  return (
    <>
      <Pills label="Filtrer par catégorie" options={auditFilters} value={filter} onChange={setFilter} />
      <section aria-label="Entrées du journal" className="relative overflow-x-auto rounded-2xl bg-card shadow-card">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <caption className="sr-only">Journal d&apos;audit</caption>
          <thead>
            <tr className="border-b border-border">
              {["Horodatage", "Acteur", "Catégorie", "Action", "Objet"].map((header) => (
                <th key={header} scope="col" className="px-4 py-3 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase first:pl-6">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((entry) => (
              <tr key={`${entry.t}-${entry.act}`} className="border-b border-border last:border-0 hover:bg-[#f8f8f8]">
                <td className="py-3.5 pr-4 pl-6 font-mono text-[13px] whitespace-nowrap">{entry.t}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">{entry.who}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge tone={entry.cat === "Accès" ? "neutral" : "info"}>{entry.cat}</StatusBadge>
                </td>
                <td className="px-4 py-3.5">{entry.act}</td>
                <td className="px-4 py-3.5 text-label">{entry.obj}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

const userTabs = ["Utilisateurs", "Rôles et permissions"] as const;

// Écran 50 · Utilisateurs et rôles : matrice RBAC (docs/architecture-fonctionnelle.md §2).
export function UsersAndRoles() {
  const [tab, setTab] = useState<(typeof userTabs)[number]>("Utilisateurs");
  const [suspended, setSuspended] = useState<number[]>([]);

  return (
    <section aria-label="Utilisateurs et rôles" className="overflow-hidden rounded-2xl bg-card shadow-card">
      <div role="tablist" aria-label="Sections" className="flex border-b border-border px-2">
        {userTabs.map((label) => (
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
      {tab === "Utilisateurs" ? (
        <ul role="tabpanel" aria-label="Utilisateurs">
          {adminUsers.map((user) => {
            const off = suspended.includes(user.id);
            return (
              <li key={user.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
                <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">{user.ini}</span>
                <span className="flex min-w-[160px] flex-1 flex-col">
                  <span className="text-[15px] font-semibold">{user.name}</span>
                  <span className="text-[13px] text-muted-foreground">{user.email}</span>
                </span>
                <span className="w-44 text-sm">{user.role}</span>
                <StatusBadge tone={user.mfa ? "success" : "danger"}>{user.mfa ? "MFA activé" : "MFA non configuré"}</StatusBadge>
                <span className="w-24 text-sm text-label">{user.last}</span>
                <button
                  type="button"
                  onClick={() => setSuspended(off ? suspended.filter((id) => id !== user.id) : [...suspended, user.id])}
                  className={cn(
                    "h-9 rounded-[10px] border bg-white px-3.5 text-sm",
                    off ? "border-action text-action" : "border-[#f1b8b8] text-destructive",
                  )}
                >
                  {off ? "Réactiver" : "Suspendre"}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div role="tabpanel" aria-label="Rôles et permissions" className="relative overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-3 pr-4 pl-6 text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">Permission</th>
                {roleNames.map((role) => (
                  <th key={role} scope="col" className="px-4 py-3 text-center text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                    {role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-0">
                  <th scope="row" className="py-3 pr-4 pl-6 font-normal">{row.label}</th>
                  {row.allowed.map((allowed, index) => (
                    <td key={roleNames[index]} className="px-4 py-3 text-center">
                      <span aria-label={allowed ? "Autorisé" : "Non autorisé"} className={allowed ? "text-base font-bold text-action" : "text-base text-[#9aa0a6]"}>
                        {allowed ? "✓" : "·"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const fieldClass =
  "h-11 rounded-[10px] border border-field-border bg-white px-3 text-[15px] font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15";

// Écran 51 · Paramètres. Les règles imposées par les specs (MFA admin, anonymisation, consentement) ne sont pas désactivables.
export function SettingsForm() {
  const [ipRestriction, setIpRestriction] = useState(false);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        toast("Paramètres non enregistrés", { description: "Démonstration : en production, chaque modification est versionnée et auditée." });
      }}
    >
      <section aria-labelledby="commercial" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="commercial" className="text-lg font-bold">Commercial</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
            Commission AfriCand par défaut (%)
            <input defaultValue="[TAUX]" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
            Délai de paiement client (jours)
            <input defaultValue="30" inputMode="numeric" className={fieldClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
            Devise
            <select className={fieldClass} defaultValue="FCFA (XOF)">
              <option>FCFA (XOF)</option>
              <option>Euro (EUR)</option>
              <option>Dirham (MAD)</option>
            </select>
          </label>
        </div>
      </section>
      <section aria-labelledby="matching-params" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="matching-params" className="text-lg font-bold">Matching</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {matchingCriteria.map((criterion) => (
            <label key={criterion.label} className="flex flex-col gap-1.5 text-[13px] font-semibold text-label">
              {criterion.label}
              <input defaultValue={criterion.max} inputMode="numeric" className={fieldClass} />
            </label>
          ))}
        </div>
        <span className="text-[13px] text-muted-foreground">
          Pondérations par défaut, ajustables pour chaque besoin lors de la qualification. L&apos;ADR-003 prévoit 8 critères : arbitrage en cours.
        </span>
      </section>
      <section aria-labelledby="securite" className="flex flex-col gap-1 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="securite" className="mb-2 text-lg font-bold">Sécurité et conformité</h2>
        {securityToggles.map((toggle) => {
          const locked = toggle.key !== "ip";
          const on = locked ? toggle.on : ipRestriction;
          return (
            <div key={toggle.key} className="flex items-center justify-between gap-4 border-b border-secondary py-3 last:border-0">
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold">{toggle.label}</span>
                <span className="text-[13px] text-muted-foreground">{toggle.sub}</span>
                {locked ? (
                  <span className="mt-1 flex items-center gap-1 text-xs text-label">
                    <Lock aria-hidden className="size-3" />
                    Imposé par la politique de sécurité ACW
                  </span>
                ) : null}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={toggle.label}
                disabled={locked}
                onClick={() => setIpRestriction(!ipRestriction)}
                className={cn("flex h-[30px] w-[52px] shrink-0 rounded-full p-[3px] disabled:cursor-not-allowed disabled:opacity-70", on ? "justify-end bg-action" : "justify-start bg-[#c4c4c4]")}
              >
                <span aria-hidden className="block size-6 rounded-full bg-white" />
              </button>
            </div>
          );
        })}
      </section>
      <div className="flex justify-end gap-3">
        <button type="reset" onClick={() => setIpRestriction(false)} className="h-11 rounded-[10px] border border-field-border bg-white px-5 text-[15px] hover:bg-secondary">
          Annuler
        </button>
        <button type="submit" className="h-11 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-white hover:brightness-[.88]">
          Enregistrer
        </button>
      </div>
    </form>
  );
}
