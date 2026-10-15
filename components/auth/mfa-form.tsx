"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { confirmMfaEnroll, enrollMfa, type MfaState } from "@/modules/auth/mfa-actions";

const initialState: MfaState = { status: "idle" };

// Écran 06 · MFA TOTP obligatoire pour l'équipe AfriCand (ADR-011).
// 1) Enrôlement : secret à saisir dans l'app d'authentification. 2) Confirmation par code.
export function MfaForm() {
  const [enrollment, setEnrollment] = useState<{ factorId: string; secret: string } | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(confirmMfaEnroll, initialState);

  if (state.status === "ok") redirect("/admin");

  return (
    <div className="flex flex-col gap-5">
      {!enrollment ? (
        <Button
          type="button"
          size="xl"
          disabled={enrolling}
          className="w-full hover:bg-primary hover:brightness-[.88]"
          onClick={async () => {
            setEnrolling(true);
            setEnrollError(null);
            const result = await enrollMfa();
            setEnrolling(false);
            if (result.status === "enrolled") {
              setEnrollment({ factorId: result.factorId, secret: result.secret });
            } else if (result.status === "invalid") {
              setEnrollError(result.error);
            }
          }}
        >
          {enrolling ? "Génération…" : "Activer la vérification en 2 étapes"}
        </Button>
      ) : (
        <form action={formAction} noValidate className="flex flex-col gap-5">
          <input type="hidden" name="factorId" value={enrollment.factorId} />
          <p className="rounded-[10px] bg-secondary px-4 py-3 text-sm">
            Saisissez ce secret dans votre application d&apos;authentification :{" "}
            <code className="font-mono font-semibold break-all">{enrollment.secret}</code>
          </p>
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
              aria-invalid={state.status === "invalid" ? true : undefined}
              aria-describedby={state.status === "invalid" ? "mfa-error" : undefined}
              className="h-[60px] rounded-[10px] border border-field-border text-center text-2xl tracking-[0.3em] text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15 aria-invalid:border-destructive"
            />
            {state.status === "invalid" ? (
              <p id="mfa-error" role="alert" className="text-[13px] text-destructive">
                {state.error}
              </p>
            ) : null}
          </div>
          <Button type="submit" size="xl" disabled={pending} className="w-full hover:bg-primary hover:brightness-[.88]">
            {pending ? "Vérification…" : "Vérifier"}
          </Button>
        </form>
      )}
      {enrollError ? (
        <p role="alert" className="text-[13px] text-destructive">
          {enrollError}
        </p>
      ) : null}
      <label className="flex items-center gap-3 text-[15px] text-label">
        <input type="checkbox" name="trust" className="size-[18px] accent-action" />
        Faire confiance à cet appareil pendant 30 jours
      </label>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">Codes de secours : contactez un superadmin.</span>
        <Link href="/connexion" className="text-muted-foreground hover:text-foreground">
          Changer de compte
        </Link>
      </div>
    </div>
  );
}
