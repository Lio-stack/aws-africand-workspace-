import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { AccessCard, AcwLogo, DemoNotice } from "@/components/auth/access-layout";
import { MfaForm } from "@/components/auth/mfa-form";

export const metadata: Metadata = { title: "Vérification en deux étapes" };

// Écran 06 · Vérification MFA (équipe AfriCand).
export default function MfaPage() {
  return (
    <AccessCard tone="dark" footer="Accès réservé à l'administration ACW. Toutes les connexions sont inscrites au journal d'audit.">
      <div className="flex items-center justify-between gap-3">
        <AcwLogo />
        <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">Équipe AfriCand</span>
      </div>
      <span aria-hidden className="flex size-14 items-center justify-center rounded-xl bg-action-subtle">
        <ShieldCheck className="size-7 text-muted-foreground" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[26px] leading-tight font-bold tracking-tight">Vérification en deux étapes</h1>
        <p className="text-base text-muted-foreground">
          Ouvrez votre application d&apos;authentification et saisissez le code à 6 chiffres associé à votre compte AfriCand.
        </p>
      </div>
      <DemoNotice>Démonstration : la MFA sera branchée avec Supabase Auth (phase 3).</DemoNotice>
      <MfaForm />
    </AccessCard>
  );
}
