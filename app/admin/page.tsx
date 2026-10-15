import type { Metadata } from "next";
import Link from "next/link";
import { Check, ClipboardList, Clock, FileSearch, FileText, Flag, Percent, PhoneCall, Rocket, Shuffle } from "lucide-react";

import { Hero, StatCard } from "@/components/app/dashboard";
import { FeedItem } from "@/components/app/dashboard";
import { TrendPanel } from "@/components/app/trend-panel";
import { adminAlerts, adminMissions, funnel, missionsByDomain, pipelineColumns } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Pipeline" };

// Écran 36 · Admin · Pilotage façon maquette : KPI + tendance + classement + pipeline.
const conversion = Math.round(((funnel.at(-1)?.v ?? 0) / (funnel[0]?.v ?? 1)) * 100);

export default function AdminPipelinePage() {
  return (
    <>
      <Hero
        breadcrumb={["Administration", "Pilotage", "Tableau de bord du pipeline"]}
        eyebrow="Administration AfriCand · Ops"
        title="Pilotage du pipeline"
        description="12 consultants à valider · 4 entreprises · 3 besoins à qualifier · 1 livrable en retard critique sur [M-014]."
        actions={
          <>
            <Link href="/admin/consultants" className="inline-flex h-11 items-center rounded-full bg-ref-blue px-5 text-sm font-semibold text-white hover:bg-ref-blue/90">Traiter les validations</Link>
            <Link href="/admin/reporting" className="inline-flex h-11 items-center rounded-full border border-ref-softborder bg-white px-5 text-sm font-semibold text-ref-ink hover:border-ref-blue">Voir le reporting</Link>
          </>
        }
        meta={
          <span className="inline-flex items-center gap-1.5 rounded-md bg-ref-chip px-2.5 py-1 text-xs font-semibold text-ref-ink">
            <span aria-hidden className="size-1.5 rounded-full bg-ref-blue" /> Session MFA vérifiée · 5 ops en ligne
          </span>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Validations en attente"
          value="18"
          icon={ClipboardList}
          info="Consultants, entreprises, besoins et introductions en file de traitement."
          ratios={[
            { k: "Semaine", v: "+22%", up: true },
            { k: "Jour", v: "+6%", up: true },
          ]}
          footer="12 consultants à traiter"
          href="/admin/consultants"
        />
        <StatCard
          label="Besoins suivis"
          value="12"
          icon={FileSearch}
          info="Besoins soumis ce trimestre, par étape du pipeline."
          footer="9 besoins qualifiés"
          href="/admin/besoins"
        />
        <StatCard
          label="Introductions"
          value="8"
          icon={PhoneCall}
          info="Introductions approuvées ce trimestre, par semaine."
          footer="Taux d'acceptation 75%"
          href="/admin/introductions"
        />
        <StatCard
          label="Taux de conversion"
          value={`${conversion}%`}
          icon={Percent}
          info="Missions signées rapportées aux besoins soumis."
          ratios={[
            { k: "Trimestre", v: "+5 pts", up: true },
            { k: "Mois", v: "-1 pt", up: false },
          ]}
          footer={`${funnel.at(-1)?.v ?? 0} missions signées`}
          href="/admin/reporting"
        />
      </div>
      <TrendPanel title="Tendance des ventes" rankingTitle="Classement par domaine" ranking={missionsByDomain} />
      <section aria-label="Pipeline temps réel" className="flex min-w-0 flex-col gap-4 rounded-2xl border border-ref-line bg-white p-5 shadow-[0_1px_2px_rgb(16_24_40/0.05)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2.5 text-lg font-bold text-ref-ink">
            <span aria-hidden className="flex size-2.5 rounded-full bg-ref-blue"><span className="size-2.5 animate-ping rounded-full bg-ref-blue/60" /></span>
            Pipeline temps réel
          </h2>
          <span className="text-[13px] text-ref-muted tabular-nums">12 objets · vélocité +18%</span>
        </div>
        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {pipelineColumns.map((column, ci) => {
            const ColIcon = { Qualification: FileSearch, Matching: Shuffle, Introduction: PhoneCall, Proposition: FileText, Mission: Rocket }[column.title] ?? FileText;
            return (
              <li key={column.title} aria-label={`Étape ${ci + 1} : ${column.title}`} className="flex min-w-0 flex-col gap-2 rounded-xl bg-ref-chip/60 p-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-950 text-xs font-bold text-white tabular-nums">{ci + 1}</span>
                  <ColIcon aria-hidden className="size-4 shrink-0 text-ref-muted" />
                  <h3 className="min-w-0 flex-1 truncate text-sm font-bold text-ref-ink">{column.title}</h3>
                  <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-xs font-bold text-ref-ink tabular-nums shadow-sm">{column.count}</span>
                </div>
                <div aria-hidden className="h-1 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full bg-ref-ink" style={{ width: `${Math.min(100, column.count * 25)}%` }} />
                </div>
                {column.cards.map((card) => (
                  <Link key={card.ref} href={column.href} className="group flex flex-col gap-1 rounded-xl border border-ref-line bg-white p-3 shadow-sm transition-all hover:-translate-y-px hover:shadow-md">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-ref-muted tabular-nums">{card.ref}</span>
                      <span aria-hidden className="text-xs text-ref-faint transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                    <span className="text-sm leading-snug font-bold text-ref-ink group-hover:text-ref-ink">{card.title}</span>
                    <span className="text-xs text-ref-muted">{card.who}</span>
                  </Link>
                ))}
              </li>
            );
          })}
        </ol>
      </section>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-5">
          <section aria-label="Alertes" className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]">
            <div className="flex items-center justify-between border-b border-ref-line px-5 py-4 sm:px-6">
              <h2 className="flex items-center gap-2 text-[17px] font-bold text-ref-ink">Alertes <span className="rounded-full bg-ref-ink px-2 py-0.5 text-xs font-bold text-white tabular-nums">3</span></h2>
              <Link href="/admin/missions" className="text-sm font-semibold text-ref-ink">Tout voir</Link>
            </div>
            <ul className="flex flex-col">
              {adminAlerts.map((alert) => (
                <FeedItem key={alert.text} text={alert.text} when={alert.when} tone={alert.severity === "danger" ? "danger" : "info"} />
              ))}
            </ul>
          </section>
          <section aria-label="Santé des missions" className="flex flex-col gap-3 rounded-2xl border border-ref-line bg-white p-5 shadow-[0_1px_2px_rgb(16_24_40/0.05)] sm:px-6">
            <h2 className="text-[17px] font-bold text-ref-ink">Santé des missions</h2>
            {adminMissions.map((m) => {
              const HealthIcon = m.health === "En retard" ? Clock : m.health === "À risque" ? Flag : Check;
              return (
              <div key={m.ref} className="flex items-center gap-2.5" title={`${m.title} — ${m.co} · ${m.next}`}>
                <HealthIcon aria-hidden className="size-4 shrink-0 text-ref-muted" />
                <span className="w-14 shrink-0 text-xs font-semibold text-ref-ink tabular-nums">{m.ref}</span>
                <div role="progressbar" aria-label={`Mission ${m.ref} ${m.pct} pour cent, ${m.health}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={m.pct} className="h-2 flex-1 overflow-hidden rounded-full bg-ref-chip">
                  <div className={cn("h-full rounded-full", m.health === "En retard" ? "bg-navy-950" : m.health === "À risque" ? "bg-ref-muted" : "bg-ref-blue")} style={{ width: `${m.pct}%` }} />
                </div>
                <span className="w-14 shrink-0 text-right text-xs text-ref-ink tabular-nums">{m.pct}%</span>
              </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
