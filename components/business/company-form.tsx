"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { companyFields } from "@/lib/demo/business";
import { cn } from "@/lib/utils";

// Écran 24 · Fiche entreprise : mode lecture / édition (rien n'est enregistré).
export function CompanyForm() {
  const [editing, setEditing] = useState(false);

  return (
    <section aria-labelledby="informations" className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="informations" className="text-lg font-bold">Informations</h2>
        <Button
          onClick={() => {
            if (editing) toast("Modifications non enregistrées", { description: "Démonstration : la fiche n'est pas mise à jour." });
            setEditing(!editing);
          }}
          className={cn(
            "h-10 rounded-[10px] px-4 font-semibold",
            editing ? "bg-action hover:bg-action hover:brightness-[.88]" : "border border-field-border bg-white text-foreground hover:bg-secondary",
          )}
        >
          {editing ? "Enregistrer" : "Modifier la fiche"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {companyFields.map((field) => (
          <label key={field.label} className="flex flex-col gap-1.5 text-sm font-semibold text-label">
            {field.label}
            <input
              defaultValue={field.value}
              readOnly={!editing}
              className={cn(
                "h-[46px] rounded-[10px] border px-3.5 text-[15px] font-normal text-foreground outline-none focus-visible:ring-3 focus-visible:ring-action/15",
                editing ? "border-action bg-white" : "border-border bg-[#f8f8f8]",
              )}
            />
          </label>
        ))}
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-label sm:col-span-2">
          Présentation
          <textarea
            rows={4}
            readOnly={!editing}
            defaultValue="[Présentation de l'entreprise : activité, marchés, effectifs, ambitions.]"
            className={cn(
              "rounded-[10px] border px-3.5 py-3 text-[15px] font-normal text-foreground outline-none focus-visible:ring-3 focus-visible:ring-action/15",
              editing ? "border-action bg-white" : "border-border bg-[#f8f8f8]",
            )}
          />
        </label>
      </div>
    </section>
  );
}
