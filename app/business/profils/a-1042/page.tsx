import { AlertTriangle, Check, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { DemoAction } from "@/components/app/demo-action";
import { PageHeader } from "@/components/app/page-header";
import { Meter, Panel } from "@/components/app/panel";
import { profileDetail } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Profil anonymisé" };

// Écran 30 · Profil anonymisé : score, critères et raisons (matching explicable, ADR-003).
export default function ProfilDetailPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Explorer", profileDetail.code]} title={profileDetail.code} />
      <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <span aria-hidden className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#e4e4e4]">
          <UserRound className="size-9 text-muted-foreground" />
        </span>
        <div className="flex min-w-[220px] flex-1 flex-col gap-1">
          <span className="self-start rounded-md bg-secondary px-2 py-0.5 text-xs text-label">Anonymisé</span>
          <span className="text-lg text-foreground">{profileDetail.title}</span>
          <span className="text-sm text-muted-foreground">{profileDetail.meta}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <DemoAction variant="outline" className="h-11 rounded-[10px] border-action px-4 font-semibold text-action" message="Ajouté à la shortlist (démonstration)">
            Ajouter à la shortlist
          </DemoAction>
          <Link href="/business/introductions" className="flex h-11 items-center rounded-[10px] bg-action px-4 text-[15px] font-semibold text-white hover:brightness-[.88]">
            Demander une introduction
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(300px,1fr)_minmax(0,1.6fr)]">
        <Panel title="Score de matching" bodyClassName="gap-4 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-action tabular-nums">{profileDetail.score}</span>
            <span className="flex flex-col text-sm">
              <span className="font-semibold">sur 100</span>
              <span className="text-muted-foreground">pour le besoin {profileDetail.need}</span>
            </span>
          </div>
          <ul className="flex flex-col gap-3">
            {profileDetail.criteria.map((criterion) => (
              <li key={criterion.label} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span>{criterion.label}</span>
                  <span className="font-semibold tabular-nums">
                    {criterion.pts} / {criterion.max}
                  </span>
                </div>
                <Meter value={Math.round((criterion.pts / criterion.max) * 100)} label={`${criterion.label} : ${criterion.pts} sur ${criterion.max}`} />
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-muted-foreground">Méthode de scoring AfriCand. Pondérations fixées lors de la qualification du besoin.</p>
        </Panel>
        <div className="flex flex-col gap-5">
          <Panel title="Pourquoi ce profil" bodyClassName="gap-2.5 px-5 py-5 sm:px-6">
            <ul className="flex flex-col gap-2.5">
              {profileDetail.pros.map((pro) => (
                <li key={pro} className="flex gap-2.5 text-[15px] text-label">
                  <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-success" />
                  {pro}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Points d'attention" bodyClassName="gap-2.5 px-5 py-5 sm:px-6">
            <ul className="flex flex-col gap-2.5">
              {profileDetail.cons.map((con) => (
                <li key={con} className="flex gap-2.5 text-[15px] text-label">
                  <AlertTriangle aria-hidden className="mt-0.5 size-[18px] shrink-0 text-warning" />
                  {con}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Expériences (anonymisées)">
            <ul>
              {profileDetail.experiences.map((experience) => (
                <li key={experience.role} className="flex flex-wrap justify-between gap-2 border-b border-secondary px-5 py-3.5 last:border-0 sm:px-6">
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold">{experience.role}</span>
                    <span className="text-[13px] text-muted-foreground">{experience.org}</span>
                  </span>
                  <span className="text-[13px] text-muted-foreground">{experience.period}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
