"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requestLoginCode, type LoginRequestState } from "../actions";

const initialState: LoginRequestState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(requestLoginCode, initialState);
  const invalid = state.status === "invalid";

  return (
    <form action={formAction} noValidate className="flex w-full max-w-[420px] flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[30px] leading-tight font-semibold tracking-tight text-foreground">Connexion</h1>
        <p className="text-base text-muted-foreground">Accédez à votre compte ACW</p>
      </div>

      <Field className="gap-2">
        <FieldLabel htmlFor="email" className="text-sm font-semibold text-label">
          Adresse e-mail
        </FieldLabel>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="nom@entreprise.com"
          defaultValue={state.status === "idle" ? undefined : state.email}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? "email-error" : "email-hint"}
          className="h-13 rounded-[10px] border-field-border px-4 text-base placeholder:text-placeholder focus-visible:border-action focus-visible:ring-action/15 md:text-base"
        />
        {invalid ? (
          <FieldError id="email-error" className="text-[13px]">
            {state.error}
          </FieldError>
        ) : (
          <FieldDescription id="email-hint" className="text-[13px] text-muted-foreground">
            Nous vous envoyons un code à 6 chiffres. Aucun mot de passe à retenir.
          </FieldDescription>
        )}
      </Field>

      {state.status === "unavailable" ? (
        <div
          role="status"
          className="flex gap-3 rounded-[10px] border border-action/25 bg-action-subtle px-4 py-3 text-sm text-foreground"
        >
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-action" />
          <p>
            Envoi impossible à{" "}
            <span className="font-medium break-all">{state.email}</span>. Vérifiez l&apos;adresse ou réessayez.{" "}
            <Link href="/connexion/code" className="font-semibold text-action underline-offset-4 hover:underline">
              Réessayer
            </Link>
          </p>
        </div>
      ) : null}

      <Button type="submit" size="xl" disabled={pending} className="w-full hover:bg-primary hover:brightness-[.88]">
        {pending ? "Vérification…" : "Recevoir mon code"}
      </Button>

      <div className="flex flex-col gap-2 pt-1 text-center">
        <p className="text-[15px] text-label">
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/inscription/consultant" className="text-action hover:text-primary">
            S&apos;inscrire
          </Link>
        </p>
        <p className="text-[13px] text-muted-foreground">
          Membre de l&apos;équipe AfriCand ?{" "}
          <Link href="/connexion/mfa" className="text-action hover:text-primary">
            Une vérification MFA vous sera demandée.
          </Link>
        </p>
      </div>
    </form>
  );
}
