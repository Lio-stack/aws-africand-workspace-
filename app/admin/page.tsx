import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { KpiCard, Panel } from "@/components/app/panel";
import { adminAlerts, adminKpis, pipelineColumns } from "@/lib/demo/admin";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin · Pipeline" };

// Écran 36 · Admin · Tableau de bord du pipeline.
export default function AdminPipelinePage() {
  return (
    <>
      <PageHeader breadcrumb={["Administration", "Pilotage", "Tableau de bord du pipeline"]} title="Tableau de bord du pipeline" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <section aria-label="Pipeline" className="relative flex gap-3 overflow-x-auto pb-1">
        {pipelineColumns.map((column) => (
          <div key={column.title} className="flex w-[220px] shrink-0 flex-col gap-2 rounded-2xl bg-secondary p-3 xl:w-auto xl:flex-1">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[15px] font-semibold">{column.title}</h2>
              <span className="text-sm text-muted-foreground tabular-nums">{column.count}</span>
            </div>
            {column.cards.map((card) => (
              <Link key={card.ref} href={column.href} className="flex flex-col gap-0.5 rounded-xl bg-white p-3 shadow-card hover:shadow-md">
                <span className="text-xs text-muted-foreground">{card.ref}</span>
                <span className="text-[15px] font-semibold">{card.title}</span>
                <span className="text-[13px] text-muted-foreground">{card.who}</span>
              </Link>
            ))}
          </div>
        ))}
      </section>
      <Panel title="Alertes">
        <ul>
          {adminAlerts.map((alert) => (
            <li key={alert.text} className="border-b border-border last:border-0">
              <Link href={alert.href} className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#f8f8f8] sm:px-6">
                <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", alert.severity === "danger" ? "bg-[#d92d20]" : "bg-nav-indicator")} />
                <span className="flex-1 text-[15px]">
                  {alert.severity === "danger" ? <span className="sr-only">Critique : </span> : null}
                  {alert.text}
                </span>
                <span className="text-[13px] text-muted-foreground">{alert.when}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}
