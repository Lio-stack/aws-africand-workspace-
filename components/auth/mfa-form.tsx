"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

// Écran 06 · Vérification MFA (équipe AfriCand). Démonstration : aucune vérification réelle.
export function MfaForm() {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        const code = String(new FormData(event.currentTarget).get("code") ?? "").replace(/\s/g, "");
        if (!/^\d{6}$/.test(code)) {
          setError("Saisissez le code à 6 chiffres affiché dans votre application.");
          return;
        }
        setError(null);
        toast("Code non vérifié (démonstration)", { description: "La MFA sera branchée avec Supabase Auth (phase 3)." });
      }}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="mfa" className="text-sm font-semibold text-label">
          Code d&apos;authentification
        </label>
        <input
          id="mfa"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="000 000"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "mfa-error" : undefined}
          className="h-[60px] rounded-[10px] border border-field-border text-center text-2xl tracking-[0.3em] text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15 aria-invalid:border-destructive"
        />
        {error ? (
          <p id="mfa-error" role="alert" className="text-[13px] text-destructive">
            {error}
          </p>
        ) : null}
      </div>
      <label className="flex items-center gap-3 text-[15px] text-label">
        <input type="checkbox" name="trust" className="size-[18px] accent-action" />
        Faire confiance à cet appareil pendant 30 jours
      </label>
      <Button type="submit" size="xl" className="w-full hover:bg-primary hover:brightness-[.88]">
        Vérifier
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <button type="button" onClick={() => toast("Codes de secours disponibles en phase 3")} className="text-action hover:text-primary">
          Utiliser un code de secours
        </button>
        <Link href="/connexion" className="text-muted-foreground hover:text-foreground">
          Changer de compte
        </Link>
      </div>
    </form>
  );
}
