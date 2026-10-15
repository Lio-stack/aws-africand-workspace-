"use client";

import { Handshake } from "lucide-react";
import { useState } from "react";

import { StatusBadge, type StatusTone } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { expertIntroductions, sharedOnConsent } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

type Decision = "accepted" | "declined" | null;

// Écran 19 · Introductions et consentement : décision locale (démonstration, rien n'est horodaté).
export function IntroductionsConsent() {
  const [decision, setDecision] = useState<Decision>(null);
  const [shared, setShared] = useState(sharedOnConsent.map((item) => item.checked));

  const statusOf = (pending: boolean, status: string): [string, StatusTone] => {
    if (!pending) return [status, status === "Acceptée" ? "success" : "neutral"];
    if (decision === "accepted") return ["Acceptée", "success"];
    if (decision === "declined") return ["Déclinée", "neutral"];
    return ["À traiter", "info"];
  };

  return (
    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(280px,1fr)_minmax(0,1.6fr)]">
      <ul aria-label="Demandes d'introduction" className="overflow-hidden rounded-2xl bg-card shadow-card">
        {expertIntroductions.map((intro) => {
          const [label, tone] = statusOf(intro.pending, intro.status);
          return (
            <li key={intro.id} className={cn("flex flex-col gap-1 border-b border-secondary px-5 py-4 last:border-0", intro.pending && "bg-[#f4f7fd]")}>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[15px] font-semibold">{intro.title}</span>
                <StatusBadge tone={tone}>{label}</StatusBadge>
              </div>
              <span className="text-[13px] text-muted-foreground">{intro.sub}</span>
            </li>
          );
        })}
      </ul>
      <section aria-labelledby="demande" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <div className="flex items-center gap-3.5">
          <span aria-hidden className="flex size-12 items-center justify-center rounded-xl bg-action-subtle">
            <Handshake className="size-6 text-action" />
          </span>
          <div className="flex flex-col">
            <h2 id="demande" className="text-lg font-bold">Due diligence financière</h2>
            <span className="text-sm text-muted-foreground">Entreprise anonyme, secteur agro-industriel, Sénégal · Proposée par AfriCand</span>
          </div>
        </div>
        <p className="text-[15px] leading-relaxed text-label">
          L&apos;entreprise a retenu votre profil anonymisé dans sa shortlist et souhaite un premier échange de 30 minutes. AfriCand a
          validé la demande. Son identité vous sera communiquée si vous acceptez.
        </p>
        <fieldset className="flex flex-col gap-2.5 rounded-[10px] bg-muted p-4" disabled={decision !== null}>
          <legend className="mb-1 text-sm font-semibold text-foreground">Informations partagées si vous acceptez</legend>
          {sharedOnConsent.map((item, index) => (
            <label key={item.label} className="flex items-center gap-3 text-[15px] text-label">
              <input
                type="checkbox"
                checked={shared[index]}
                onChange={() => setShared(shared.map((value, i) => (i === index ? !value : value)))}
                className="size-[18px] accent-action"
              />
              {item.label}
            </label>
          ))}
        </fieldset>
        {decision === null ? (
          <>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setDecision("accepted")} className="h-12 rounded-[10px] bg-action px-6 text-base font-semibold hover:bg-action hover:brightness-[.88]">
                J&apos;accepte l&apos;introduction
              </Button>
              <Button variant="outline" onClick={() => setDecision("declined")} className="h-12 rounded-[10px] border-field-border px-6 text-base">
                Décliner
              </Button>
            </div>
            <span className="text-[13px] text-muted-foreground">Réponse attendue avant le [DATE]. En production, votre consentement est horodaté et consigné.</span>
          </>
        ) : (
          <div role="status" className={cn("flex flex-wrap items-center justify-between gap-3 rounded-[10px] px-4 py-3 text-[15px]", decision === "accepted" ? "bg-action-subtle text-action" : "bg-secondary text-label")}>
            <span>
              {decision === "accepted"
                ? "Introduction acceptée (démonstration). AfriCand vous mettrait en relation sous 24 heures."
                : "Introduction déclinée (démonstration). L'entreprise ne verrait pas votre identité."}
            </span>
            <button type="button" onClick={() => setDecision(null)} className="text-sm font-semibold underline-offset-4 hover:underline">
              Annuler
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
