import { UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { Panel } from "@/components/app/panel";
import { StageTrack } from "@/components/app/stage-track";
import { StatusBadge } from "@/components/app/status-badge";
import { needDetail } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Détail du besoin" };

// Écran 28 · Business · Détail d'un besoin (exemple [B-031]).
export default function BesoinDetailPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Besoins", needDetail.ref]}
        title={needDetail.title}
        actions={<StatusBadge tone="info">Matching en cours</StatusBadge>}
      />
      <div className="rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <StageTrack label="Avancement du besoin" stages={needDetail.stages} current={needDetail.current + 1} size="md" />
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="flex flex-col gap-5">
          {needDetail.blocks.map((block) => (
            <Panel key={block.title} title={block.title}>
              <dl className="flex flex-col">
                {block.rows.map((row) => (
                  <div key={row.k} className="flex flex-wrap gap-x-6 gap-y-0.5 border-b border-secondary px-5 py-3 last:border-0 sm:px-6">
                    <dt className="w-40 text-sm text-muted-foreground">{row.k}</dt>
                    <dd className="min-w-0 flex-1 text-[15px]">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          ))}
          <div className="flex gap-3 rounded-2xl bg-action-subtle p-5">
            <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">AC</span>
            <p className="text-[15px] text-primary">
              <strong>Note de qualification AfriCand :</strong> {needDetail.note}
            </p>
          </div>
        </div>
        <Panel title="Profils proposés" action={{ label: "Explorer", href: "/business/profils" }}>
          <ul>
            {needDetail.proposed.map((profile) => (
              <li key={profile.code} className="border-b border-border last:border-0">
                <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ref-ice">
                    <UserRound className="size-5 text-muted-foreground" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    {profile.code === "Expert A-1042" ? (
                      <Link href="/business/profils/a-1042" className="text-[15px] font-semibold hover:text-foreground">{profile.code}</Link>
                    ) : (
                      <span className="text-[15px] font-semibold">{profile.code}</span>
                    )}
                    <span className="text-[13px] text-muted-foreground">{profile.title}</span>
                  </span>
                  <span className="text-xl font-bold text-foreground tabular-nums" aria-label={`Score ${profile.score} sur 100`}>
                    {profile.score}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/business/shortlists" className="border-t border-border px-5 py-4 text-[15px] font-semibold text-foreground sm:px-6">
            Voir la shortlist (3)
          </Link>
        </Panel>
      </div>
    </>
  );
}
