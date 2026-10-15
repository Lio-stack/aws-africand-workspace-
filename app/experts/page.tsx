import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DemoAction } from "@/components/app/demo-action";
import { PageHeader } from "@/components/app/page-header";
import { KpiCard, Meter, Panel, Tag } from "@/components/app/panel";
import { dashboardOpportunities, expertKpis, expertProfile, nextActions } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Tableau de bord" };

// Écran 12 · Experts · Tableau de bord.
export default function ExpertsDashboardPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Tableau de bord"]}
        title="Bonjour, [Prénom]"
        description="Voici l'état de votre activité sur ACW."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {expertKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <Panel title="Opportunités pour vous" action={{ label: "Tout voir", href: "/experts/opportunites" }}>
          <ul>
            {dashboardOpportunities.map((opportunity) => (
              <li
                key={opportunity.title}
                className="flex flex-col gap-4 border-b border-border px-5 py-5 last:border-0 sm:flex-row sm:items-start sm:px-6"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <h3 className="text-[17px] font-semibold text-foreground">{opportunity.title}</h3>
                  <p className="text-[15px] text-muted-foreground">{opportunity.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {opportunity.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <span className="text-[13px] text-muted-foreground">{opportunity.when}</span>
                  <DemoAction variant="outline" className="h-10 rounded-[10px] border-primary px-4 text-sm font-semibold text-primary" message="Intérêt manifesté">
                    Manifester mon intérêt
                  </DemoAction>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="flex flex-col gap-5">
          <Panel title="Votre dossier" bodyClassName="gap-3 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between text-[15px]">
              <span className="text-foreground">Complété à</span>
              <span className="font-semibold text-action">{expertProfile.completion} %</span>
            </div>
            <Meter value={expertProfile.completion} label="Dossier complété" />
            <p className="text-sm text-muted-foreground">Ajoutez deux références pour améliorer votre score de matching.</p>
            <Link href="/experts/experiences" className="text-[15px] font-semibold text-action hover:text-primary">
              Ajouter des références
            </Link>
          </Panel>
          <Panel title="Prochaines actions">
            <ul>
              {nextActions.map((action) => (
                <li key={action.label} className="border-b border-border last:border-0">
                  <Link href={action.href} className="flex items-center gap-3 px-5 py-4 hover:bg-[#f8f8f8] sm:px-6">
                    <span aria-hidden className="size-2 shrink-0 rounded-full bg-action" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[15px] font-semibold text-foreground">{action.label}</span>
                      <span className="text-[13px] text-muted-foreground">{action.sub}</span>
                    </span>
                    <ChevronRight aria-hidden className="size-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
