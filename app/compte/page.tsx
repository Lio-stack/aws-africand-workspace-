import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { VerifiedBadge } from "@/components/app/acw-symbol";
import { AccountSettings } from "@/components/auth/account-settings";
import { AcwLogo, BackLink } from "@/components/auth/access-layout";
import { dossierRows, expertProfile, expertSkills } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Mon compte" };

// Écran 10 · Mon compte (commun aux trois espaces).
// Pour un expert : profil consultant complet + paramètres.
export default function ComptePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-muted">
      <header className="flex h-[72px] items-center gap-3 border-b border-border bg-white px-4 sm:px-6">
        <BackLink href="/experts" label="Retour à mon espace" />
        <AcwLogo />
        <Link href="/compte" aria-label="Mon compte" className="ml-auto flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
          AO
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-[920px] flex-col gap-5 px-4 py-8 sm:px-6">
        <PageHeader breadcrumb={["ACW Experts", "Mon compte"]} title="Mon compte" />
        <section aria-label="Mon profil consultant" className="overflow-hidden rounded-2xl border border-ref-line bg-white">
          <div className="relative h-[140px] overflow-hidden bg-[linear-gradient(120deg,#1D5FFD_0%,#0749D7_40%,#003EAE_75%,#002C74_100%)]">
            <svg viewBox="0 0 1100 140" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 h-full w-full">
              <path d="M0 110 C 220 70, 380 130, 600 95 S 960 50, 1100 75" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" />
              <path d="M0 130 C 260 95, 420 145, 640 115 S 980 70, 1100 95" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-5 pb-5 sm:px-6">
            <span aria-hidden className="relative -mt-10 flex size-20 items-center justify-center rounded-full border-4 border-white bg-ref-deep text-xl font-bold text-white">
              {expertProfile.initials}
            </span>
            <div className="flex min-w-[200px] flex-1 flex-col gap-0.5">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-bold tracking-[-0.02em] text-ref-ink">{expertProfile.name}</span>
                <VerifiedBadge size={20} />
              </span>
              <span className="text-[15px] text-ref-ink">{expertProfile.title}</span>
              <span className="text-sm text-ref-muted">{expertProfile.location}</span>
              <span className="mt-1.5 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-ref-success-bg px-2.5 py-1 text-xs font-semibold text-ref-success">Compte validé</span>
                <span className="rounded-full bg-ref-warn-bg px-2.5 py-1 text-xs font-semibold text-ref-warn">Dossier {expertProfile.completion}%</span>
                <span className="rounded-full bg-ref-chip px-2.5 py-1 text-xs text-ref-ink">{expertProfile.publicCode} · vu par les entreprises</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/experts/dossier" className="flex h-11 items-center rounded-xl bg-ref-blue px-4 text-[15px] font-semibold text-white hover:bg-ref-blue-hover">
                Voir mon dossier
              </Link>
              <Link href="/experts/competences" className="flex h-11 items-center rounded-xl border border-ref-blue bg-white px-4 text-[15px] font-semibold text-ref-blue hover:bg-ref-tint">
                Modifier
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-ref-line px-5 py-4 sm:px-6">
            <div className="flex min-w-0 flex-1 basis-64 flex-col gap-2">
              <h2 className="text-sm font-bold text-ref-ink">Mes compétences clés</h2>
              <div className="flex flex-wrap gap-1.5">
                {expertSkills.slice(0, 5).map((s) => (
                  <span key={s.name} className="rounded-full bg-ref-chip px-2.5 py-1 text-[13px] text-ref-ink">{s.name}</span>
                ))}
              </div>
            </div>
            <div className="flex min-w-0 flex-1 basis-64 flex-col gap-2">
              <h2 className="text-sm font-bold text-ref-ink">Dossier ({expertProfile.completion}%)</h2>
              <ul className="flex flex-col gap-1">
                {dossierRows.map((row) => (
                  <li key={row.label} className="flex items-center gap-2 text-[13px]">
                    <span aria-hidden className={row.done ? "text-ref-success" : "text-ref-warn"}>{row.done ? "✓" : "○"}</span>
                    <Link href={row.href} className="min-w-0 flex-1 truncate text-ref-ink hover:underline">{row.label}</Link>
                    <span className="shrink-0 text-ref-muted">{row.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <AccountSettings />
      </main>
    </div>
  );
}
