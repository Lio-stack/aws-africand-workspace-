import { CalendarDays, ChevronRight, Compass, Factory, Calculator, HandCoins, Reply, Rocket, Target, Upload } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DemoAction } from "@/components/app/demo-action";
import { Meter, Panel, Tag } from "@/components/app/panel";
import { ChartCard, Donut, Hero, KpiPro } from "@/components/app/dashboard";
import { dashboardOpportunities, expertProfile, nextActions } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Tableau de bord" };

// Écran 12 · Experts · Tableau de bord premium ACW.

export default function ExpertsDashboardPage() {
  return (
    <>
      <Hero
        breadcrumb={["ACW Experts", "Tableau de bord"]}
        eyebrow="ACW Experts · Dossier 65%"
        title="Bonjour, [Prénom]"
        description="3 opportunités ouvertes · 1 introduction à traiter (expire dans 3 jours) · votre profil est visible des matchings AfriCand."
        actions={
          <>
            <Link href="/experts/opportunites" className="inline-flex h-11 items-center rounded-full bg-ref-blue px-5 text-sm font-semibold text-white hover:bg-ref-blue/90">
              Voir les opportunités
            </Link>
            <Link href="/experts/disponibilites" className="inline-flex h-11 items-center rounded-full border border-ref-blue bg-white px-5 text-sm font-semibold text-ref-blue hover:bg-ref-ice">
              Mettre à jour mes dispos
            </Link>
          </>
        }
        meta={
          <span className="inline-flex items-center gap-2 text-[13px] text-ref-muted">
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-ref-chip text-xs font-bold text-ref-ink">AO</span>
            {expertProfile.title} · {expertProfile.publicCode}
          </span>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiPro label="Opportunités ouvertes" value="3" sub="dont 1 à 91% de match" delta="+2 cette semaine" deltaTone="up" icon={Compass} href="/experts/opportunites" cta="Voir les opportunités" />
        <KpiPro label="Introductions en attente" value="1" sub="expire dans 3 jours" delta="à traiter" deltaTone="neutral" icon={Reply} href="/experts/introductions" cta="Répondre" />
        <KpiPro label="Missions en cours" value="1" sub="[M-014] · 30% · à l'heure" delta="30% complété" deltaTone="up" icon={Rocket} href="/experts/missions" cta="Voir les livrables" />
        <KpiPro label="Paiements à venir" value="[MONTANT]" sub="1 facture en validation" delta="versé sous ~7 j" deltaTone="up" icon={HandCoins} href="/experts/paiements" cta="Voir les paiements" />
      </div>
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Opportunités pour vous" action={{ label: "Tout voir", href: "/experts/opportunites" }}>
            <ul>
              {dashboardOpportunities.map((opportunity, i) => {
                const score = [91, 84, 77][i] ?? 80;
                const CatIcon = [Target, Calculator, Factory][i] ?? Target;
                return (
                  <li key={opportunity.title} className="flex flex-col gap-4 border-b border-border/60 px-5 py-5 last:border-0 sm:px-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 flex-1 gap-3">
                        <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ref-chip text-ref-muted">
                          <CatIcon className="size-5" />
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                          <h3 className="text-[16px] font-semibold text-foreground">{opportunity.title}</h3>
                          <p className="text-sm text-muted-foreground">{opportunity.desc}</p>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {opportunity.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1" aria-label={`Score de matching ${score} pour cent`}>
                        <span className="text-2xl font-bold text-ref-ink tabular-nums">{score}</span>
                        <span className="text-xs text-muted-foreground">match</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div role="progressbar" aria-label={`Matching ${opportunity.title}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={score} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ref-chip">
                        <div className="h-full rounded-full bg-ref-blue" style={{ width: `${score}%` }} />
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">{opportunity.when}</span>
                      <DemoAction variant="outline" className="h-10 shrink-0 rounded-[10px] border-primary px-4 text-sm font-semibold text-primary" message="Intérêt manifesté">
                        Manifester mon intérêt
                      </DemoAction>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>
        </div>
        <div className="flex flex-col gap-5">
          <ChartCard title="Votre dossier" subtitle="Complété à 65% · +2 références = +8 pts">
            <Donut label="Dossier complété à 65 pour cent" centerTop="65%" centerBottom="complété" segments={[{ value: 65, color: "#1a5fd0", name: "Complété" }, { value: 35, color: "#e8eaed", name: "Restant" }]} />
            <div className="pt-4">
              <Meter value={expertProfile.completion} label="Dossier complété" />
              <p className="pt-2 text-sm text-muted-foreground">Ajoutez deux références pour améliorer votre score de matching.</p>
              <Link href="/experts/experiences" className="pt-1 text-[15px] font-semibold text-ref-ink">Ajouter des références →</Link>
            </div>
          </ChartCard>
          <Panel title="Prochaines actions">
            <ul>
              {nextActions.map((action, i) => {
                const ActionIcon = [Reply, Upload, CalendarDays][i] ?? Reply;
                return (
                <li key={action.label} className="border-b border-border/60 last:border-0">
                  <Link href={action.href} className="group flex items-center gap-3 px-5 py-4 hover:bg-muted/60 sm:px-6">
                    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ref-chip text-ref-muted"><ActionIcon className="size-4" /></span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-[15px] font-semibold text-foreground">{action.label}</span>
                      <span className="text-[13px] text-muted-foreground">{action.sub}</span>
                    </span>
                    <ChevronRight aria-hidden className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
