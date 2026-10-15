import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { KpiCard, Panel } from "@/components/app/panel";
import { StageTrack } from "@/components/app/stage-track";
import { Button } from "@/components/ui/button";
import { activeNeeds, businessFeed, businessKpis, needStages } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Tableau de bord" };

// Écran 23 · Business · Tableau de bord.
export default function BusinessDashboardPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Tableau de bord"]}
        title="Bonjour, [Prénom]"
        actions={
          <Button asChild className="h-10 rounded-[10px] bg-action px-4 font-semibold hover:bg-action hover:brightness-[.88]">
            <Link href="/business/besoins/nouveau">Nouveau besoin</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {businessKpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <Panel title="Vos besoins en cours" action={{ label: "Tout voir", href: "/business/besoins" }}>
          <ul>
            {activeNeeds.map((need) => (
              <li key={need.ref} className="flex flex-col gap-3 border-b border-border px-5 py-5 last:border-0 sm:px-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-base font-semibold">{need.title}</span>
                  <span className="text-[13px] text-muted-foreground">{need.ref}</span>
                </div>
                <StageTrack label={`Avancement du besoin ${need.ref}`} stages={needStages.map((label) => ({ label }))} current={need.stage} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Activité récente">
          <ul>
            {businessFeed.map((item) => (
              <li key={item.text} className="flex gap-3 border-b border-border px-5 py-4 last:border-0 sm:px-6">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-action" />
                <span className="flex flex-col">
                  <span className="text-[15px] text-foreground">{item.text}</span>
                  <span className="text-[13px] text-muted-foreground">{item.when}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
