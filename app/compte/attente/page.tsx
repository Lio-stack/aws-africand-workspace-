import { Check, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AccessCard, AcwLogo, DemoNotice } from "@/components/auth/access-layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Compte en attente de validation" };

const steps = [
  { label: "Compte créé", state: "done" },
  { label: "Adresse e-mail confirmée", state: "done" },
  { label: "Vérification par AfriCand", state: "current" },
  { label: "Accès ouvert à la plateforme", state: "next" },
] as const;

// Écran 09 · Compte en attente de validation.
export default function AttentePage() {
  return (
    <AccessCard width="max-w-[560px]">
      <AcwLogo />
      <span aria-hidden className="flex size-16 items-center justify-center rounded-full border border-action">
        <Clock className="size-7 text-action" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-[28px] leading-tight font-bold tracking-tight">Votre compte est en cours de validation</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          L&apos;équipe AfriCand vérifie vos informations. Vous recevrez un e-mail dès que votre accès sera ouvert. Délai indicatif : [DÉLAI DE VALIDATION].
        </p>
      </div>
      <DemoNotice>Démonstration : cet écran illustre le parcours, aucun compte n&apos;a été créé.</DemoNotice>
      <ol aria-label="Étapes de validation" className="overflow-hidden rounded-xl border border-border">
        {steps.map((step) => (
          <li
            key={step.label}
            aria-current={step.state === "current" ? "step" : undefined}
            className={cn("flex items-center gap-3.5 border-b border-border px-4 py-3.5 last:border-0", step.state === "current" && "bg-[#f4f7fd]")}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full",
                step.state === "done" && "bg-action text-white",
                step.state === "current" && "border-2 border-action",
                step.state === "next" && "border border-field-border",
              )}
            >
              {step.state === "done" ? <Check className="size-4" /> : step.state === "current" ? <span className="size-2.5 rounded-full bg-action" /> : null}
            </span>
            <span className={cn("flex-1 text-[15px]", step.state === "next" ? "text-muted-foreground" : "font-semibold")}>{step.label}</span>
            {step.state === "current" ? (
              <span className="rounded-full border border-action px-2 py-0.5 text-[13px] font-semibold text-action">En cours</span>
            ) : (
              <span className="text-[13px] text-muted-foreground">{step.state === "done" ? "Terminé" : "À venir"}</span>
            )}
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-3">
        <Link href="/experts/candidature" className="flex h-[52px] flex-1 items-center justify-center rounded-[10px] bg-primary px-5 text-base font-semibold text-white hover:brightness-[.88]">
          Compléter mon dossier
        </Link>
        <Link href="/connexion" className="flex h-[52px] flex-1 items-center justify-center rounded-[10px] border border-field-border px-5 text-base hover:bg-secondary">
          Se déconnecter
        </Link>
      </div>
      <p className="text-sm text-muted-foreground">
        Une question ? Écrivez à{" "}
        <a href="mailto:contact@africand.com" className="text-action hover:text-primary">
          contact@africand.com
        </a>
      </p>
    </AccessCard>
  );
}
