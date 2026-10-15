import { ChevronRight, Eye, Lock, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { Tag } from "@/components/app/panel";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { dossierRows, expertProfile, hiddenUntilIntroduction } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Mon dossier" };

// Écran 14 · Experts · Mon dossier, avec l'aperçu de ce que voient les entreprises.
export default function DossierPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Mon dossier"]}
        title="Mon dossier"
        actions={
          <Button asChild className="h-10 rounded-[10px] bg-action px-4 font-semibold hover:bg-action hover:brightness-[.88]">
            <Link href="/experts/candidature">Modifier mon dossier</Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)]">
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-card p-6 shadow-card">
            <span aria-hidden className="flex size-24 items-center justify-center rounded-full bg-primary text-[32px] font-semibold text-white">
              {expertProfile.initials}
            </span>
            <div className="flex min-w-[220px] flex-1 flex-col gap-1">
              <span className="text-2xl font-bold text-foreground">{expertProfile.name}</span>
              <span className="text-base text-label">{expertProfile.title}</span>
              <span className="text-sm text-muted-foreground">{expertProfile.location}</span>
              <span className="mt-1.5 self-start rounded-full bg-action px-2.5 py-1 text-[13px] font-semibold text-white">
                Profil validé par AfriCand
              </span>
            </div>
          </div>
          <section aria-labelledby="bio" className="flex flex-col gap-2.5 rounded-2xl bg-card p-6 shadow-card">
            <h2 id="bio" className="text-lg font-bold">Bio</h2>
            <p className="text-base leading-relaxed text-label">
              [Texte de présentation rédigé par le consultant : parcours, types de missions, secteurs, résultats marquants.]
            </p>
          </section>
          <ul aria-label="Sections du dossier" className="overflow-hidden rounded-2xl bg-card shadow-card">
            {dossierRows.map((row) => (
              <li key={row.label} className="border-b border-secondary last:border-0">
                <Link href={row.href} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/60">
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-base font-semibold text-foreground">{row.label}</span>
                    <span className="text-sm text-muted-foreground">{row.sub}</span>
                  </span>
                  <StatusBadge tone={row.done ? "success" : "info"}>{row.done ? "Complet" : "À compléter"}</StatusBadge>
                  <ChevronRight aria-hidden className="size-[18px] text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <aside aria-labelledby="vue-entreprise" className="overflow-hidden rounded-2xl border-2 border-action bg-card">
          <div className="flex items-center gap-2.5 bg-action-subtle px-5 py-3.5">
            <Eye aria-hidden className="size-5 text-muted-foreground" />
            <h2 id="vue-entreprise" className="text-[15px] font-semibold text-primary">
              Ce que voient les entreprises
            </h2>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3.5">
              <span aria-hidden className="flex size-16 shrink-0 items-center justify-center rounded-full bg-ref-ice">
                <UserRound className="size-7 text-muted-foreground" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-[17px] font-semibold">{expertProfile.publicCode}</span>
                <span className="text-[15px] text-label">{expertProfile.publicTitle}</span>
                <span className="text-sm text-muted-foreground">{expertProfile.publicCountry}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {expertProfile.publicTags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="flex flex-col gap-2.5 border-t border-secondary pt-3.5">
              <span className="text-[13px] font-semibold tracking-[0.04em] text-muted-foreground uppercase">Visible</span>
              <span className="text-sm text-label">
                Titre, séniorité, pays, compétences, secteurs, expériences sans nom d&apos;organisation, disponibilité
              </span>
              <span className="mt-1.5 text-[13px] font-semibold tracking-[0.04em] text-muted-foreground uppercase">
                Masqué jusqu&apos;à l&apos;introduction
              </span>
              <ul className="flex flex-col gap-2">
                {hiddenUntilIntroduction.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-label">
                    <Lock aria-hidden className="size-4 text-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
