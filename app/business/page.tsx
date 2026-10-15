import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, FileText, HeartHandshake, FileSearch, PhoneCall, Rocket, Users, Video } from "lucide-react";

import { Panel } from "@/components/app/panel";
import { BarRow, ChartCard, Donut, FeedItem, Hero, KpiPro } from "@/components/app/dashboard";
import { Button } from "@/components/ui/button";
import { activeNeeds, businessFeed, needStages } from "@/lib/demo/business";

// Cases calendrier McKinsey : 3 bleus alternés (nuit, action, acier).
const needStyles = [
  { head: "bg-navy-950", block: "bg-white/15", sub: "text-white/70", chip: "bg-white/15 text-white" },
  { head: "bg-ref-blue", block: "bg-white/20", sub: "text-white/80", chip: "bg-white/20 text-white" },
  { head: "bg-navy-800", block: "bg-white/15", sub: "text-white/70", chip: "bg-white/15 text-white" },
];

export const metadata: Metadata = { title: "Business · Tableau de bord" };

// Écran 23 · Business · Tableau de bord premium ACW.
export default function BusinessDashboardPage() {
  return (
    <>
      <Hero
        breadcrumb={["ACW Business", "Tableau de bord"]}
        eyebrow="ACW Business"
        title="Bonjour, [Prénom]"
        description="3 besoins actifs · 7 profils en shortlist · 1 introduction en cours. AfriCand a qualifié votre besoin [B-035] il y a 2 heures."
        actions={
          <>
            <Button asChild className="h-11 rounded-full bg-ref-blue px-5 font-semibold text-white hover:bg-ref-blue/90">
              <Link href="/business/besoins/nouveau">+ Nouveau besoin</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-full border-ref-blue bg-white px-5 font-semibold text-ref-blue hover:bg-ref-ice">
              <Link href="/business/profils">Explorer les profils</Link>
            </Button>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiPro label="Besoins actifs" value="3" sub="dont 1 en qualification" delta="+1 ce mois" deltaTone="up" icon={FileSearch} href="/business/besoins" cta="Voir les besoins" />
        <KpiPro label="Profils en shortlist" value="7" sub="2 besoins couverts" delta="+3 cette semaine" deltaTone="up" icon={HeartHandshake} href="/business/shortlists" cta="Comparer" />
        <KpiPro label="Introductions en cours" value="1" sub=" Expert B-2217 · acceptée" delta="stable" deltaTone="neutral" icon={Video} href="/business/introductions" cta="Suivre" />
        <KpiPro label="Missions en cours" value="1" sub="semaine 6 sur 16 · 38%" delta="à l'heure" deltaTone="up" icon={Rocket} href="/business/missions" cta="Voir la mission" />
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Vos besoins en cours" action={{ label: "Tout voir", href: "/business/besoins" }}>
            <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 md:grid-cols-3">
              {activeNeeds.map((need, i) => {
                const c = needStyles[i % needStyles.length];
                const pct = Math.round(((need.stage + 1) / needStages.length) * 100);
                return (
                  <Link
                    key={need.ref}
                    href="/business/besoins"
                    aria-label={`${need.title}, ${need.ref}, étape ${need.stage + 1} sur ${needStages.length}`}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)] transition-all duration-(--duration-fast) outline-none hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-12px_rgb(5_28_44/0.35)] focus-visible:ring-3 focus-visible:ring-ref-blue/30"
                  >
                    <div className={`flex items-center gap-3 px-4 py-4 ${c.head}`}>
                      <span aria-hidden className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-xl leading-none ${c.block}`}>
                        <span className="text-xl font-extrabold text-white tabular-nums">{need.stage + 1}</span>
                        <span className={`text-[10px] font-semibold tracking-wider uppercase ${c.sub}`}>étape</span>
                      </span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className={`w-fit rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular-nums ${c.chip}`}>{need.ref}</span>
                        <span className="text-xs text-white/80">sur {needStages.length} étapes</span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2.5 p-4">
                      <h3 className="line-clamp-2 min-h-11 text-[15px] leading-snug font-bold text-ref-ink">{need.title}</h3>
                      <div role="progressbar" aria-label={`Avancement ${need.ref}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} className="h-1.5 overflow-hidden rounded-full bg-ref-chip">
                        <div className="h-full rounded-full bg-ref-blue transition-[width] duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[13px] text-ref-muted">
                        Étape {need.stage + 1}/{needStages.length} · {needStages[need.stage]}
                      </p>
                      <span className="pt-0.5 text-sm font-semibold text-ref-ink transition-transform group-hover:translate-x-0.5">Ouvrir →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Panel>
        </div>
        <div className="flex min-w-0 flex-col gap-5">
          <ChartCard title="Répartition par domaine" subtitle="Vos 4 besoins · booked + pipeline">
            <Donut
              label="Répartition : Finance 2, M&A 1, Stratégie 1"
              centerTop="4"
              centerBottom="besoins"
              segments={[
                { value: 2, color: "#1a5fd0", name: "Finance" },
                { value: 1, color: "#051c2c", name: "M&A" },
                { value: 1, color: "#9aa0a6", name: "Stratégie" },
              ]}
            />
            <div className="flex flex-col gap-2.5 pt-4">
              <BarRow label="Matching en cours" value={2} max={4} display="2 / 4" />
              <BarRow label="Introductions acceptées" value={1} max={4} display="1 / 4" />
              <BarRow label="Missions signées" value={1} max={4} display="1 / 4" />
            </div>
          </ChartCard>
          <section aria-label="Activité récente" className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_1px_2px_rgb(5_28_44/0.06)]">
            <div className="flex items-center justify-between px-5 py-4 sm:px-6">
              <h2 className="text-[17px] font-semibold">Activité récente</h2>
              <span aria-hidden className="flex size-2 rounded-full bg-ref-blue"><span className="size-2 animate-ping rounded-full bg-ref-blue/60" /></span>
            </div>
            <ul className="flex flex-col">{businessFeed.map((item, i) => <FeedItem key={item.text} text={item.text} when={item.when} icon={[BadgeCheck, Users, PhoneCall, FileText][i]} />)}</ul>
          </section>
        </div>
      </div>
    </>
  );
}
