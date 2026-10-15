import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { AccountSettings } from "@/components/auth/account-settings";
import { AcwLogo, BackLink } from "@/components/auth/access-layout";

export const metadata: Metadata = { title: "Mon compte" };

// Écran 10 · Mon compte (commun aux trois espaces).
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
        <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
          <span aria-hidden className="flex size-[88px] items-center justify-center rounded-full bg-primary text-[30px] font-semibold text-white">AO</span>
          <span className="flex min-w-[200px] flex-1 flex-col gap-0.5">
            <span className="text-2xl font-bold">[Prénom Nom]</span>
            <span className="text-[15px] text-label">[Titre professionnel]</span>
            <span className="text-sm text-muted-foreground">Abidjan, Côte d&apos;Ivoire</span>
          </span>
          <span className="rounded-full bg-action px-3 py-1 text-[13px] font-semibold text-white">Compte validé</span>
        </div>
        <AccountSettings />
      </main>
    </div>
  );
}
