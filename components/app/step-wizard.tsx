"use client";

import { Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface WizardStep {
  name: string;
  intro: string;
  tip: string;
  fields: { label: string; placeholder: string; full?: boolean }[];
}

// Formulaire en étapes (écrans 13 et 27). Les saisies restent dans le navigateur : rien n'est envoyé.
export function StepWizard({
  steps,
  finishLabel,
  finishMessage,
  savedLabel,
}: {
  steps: WizardStep[];
  finishLabel: string;
  finishMessage: string;
  savedLabel: string;
}) {
  const [step, setStep] = useState(1);
  const current = steps[step - 1];
  const last = step === steps.length;

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {savedLabel} · Étape {step} sur {steps.length}
      </p>
      <ol className={cn("grid grid-cols-3 gap-2", steps.length === 6 ? "sm:grid-cols-6" : "sm:grid-cols-5")}>
        {steps.map((item, index) => {
          const n = index + 1;
          const active = n === step;
          const done = n < step;
          return (
            <li key={item.name} className="flex flex-col gap-2">
              <span aria-hidden className={cn("h-1.5 rounded-full", done || active ? "bg-action" : "bg-field-border")} />
              <button
                type="button"
                onClick={() => setStep(n)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "text-left text-sm outline-none focus-visible:underline",
                  active ? "font-semibold text-action" : done ? "font-medium text-foreground" : "font-medium text-muted-foreground",
                )}
              >
                {n}. {item.name}
              </button>
            </li>
          );
        })}
      </ol>
      <section aria-labelledby="etape-titre" className="flex max-w-[880px] flex-col gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-7">
        <div className="flex flex-col gap-1.5">
          <h2 id="etape-titre" className="text-[22px] font-bold text-foreground">
            {current.name}
          </h2>
          <p className="text-[15px] text-muted-foreground">{current.intro}</p>
        </div>
        <div key={current.name} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {current.fields.map((field) => (
            <label
              key={field.label}
              className={cn("flex flex-col gap-1.5 text-sm font-semibold text-label", field.full && "sm:col-span-2")}
            >
              {field.label}
              <input
                placeholder={field.placeholder}
                className="h-12 rounded-[10px] border border-field-border px-3.5 text-base font-normal text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15"
              />
            </label>
          ))}
        </div>
        <div className="flex items-start gap-3 rounded-[10px] bg-muted px-4 py-3.5 text-sm text-label">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-action" />
          <span>{current.tip}</span>
        </div>
        <div className="flex flex-wrap justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="h-12 rounded-[10px] border-field-border px-5 text-base"
          >
            Précédent
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (last) {
                toast(finishMessage, { description: "Démonstration : rien n'est envoyé ni enregistré." });
              } else {
                setStep((s) => s + 1);
              }
            }}
            className="h-12 rounded-[10px] bg-action px-6 text-base font-semibold hover:bg-action hover:brightness-[.88]"
          >
            {last ? finishLabel : "Continuer"}
          </Button>
        </div>
      </section>
    </>
  );
}
