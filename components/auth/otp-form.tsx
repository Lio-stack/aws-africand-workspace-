"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { verifyLoginCode, type VerifyState } from "@/modules/auth/actions";

const LENGTH = 6;
const initialState: VerifyState = { status: "idle" };

// Écran 05 · Saisie du code : six cases, collage accepté, vérification Supabase Auth.
export function OtpForm() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [seconds, setSeconds] = useState(42);
  const [state, formAction, pending] = useActionState(verifyLoginCode, initialState);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  useEffect(() => {
    if (state.status === "ok") redirect(state.next);
  }, [state]);

  const setDigit = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");
    if (clean.length > 1) {
      const next = clean.slice(0, LENGTH).split("");
      setDigits(Array.from({ length: LENGTH }, (_, i) => next[i] ?? ""));
      inputs.current[Math.min(next.length, LENGTH - 1)]?.focus();
      return;
    }
    setDigits(digits.map((digit, i) => (i === index ? clean : digit)));
    if (clean && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const invalid = state.status === "invalid" ? state.error : null;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={digits.join("")} />
      {!email ? (
        <p role="alert" className="text-[13px] text-destructive">
          Adresse e-mail manquante. <Link href="/connexion" className="font-semibold underline">Recommencez depuis la connexion</Link>.
        </p>
      ) : null}
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Code à 6 chiffres</legend>
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              aria-label={`Chiffre ${index + 1}`}
              aria-invalid={invalid ? true : undefined}
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={LENGTH}
              value={digit}
              onChange={(event) => setDigit(index, event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && !digits[index] && index > 0) inputs.current[index - 1]?.focus();
              }}
              className="h-14 w-full rounded-[10px] border border-field-border text-center text-2xl font-semibold text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15 aria-invalid:border-destructive sm:h-16"
            />
          ))}
        </div>
        {invalid ? (
          <p role="alert" className="text-[13px] text-destructive">
            {invalid}
          </p>
        ) : null}
      </fieldset>
      <Button type="submit" size="xl" disabled={pending || !email} className="w-full hover:bg-primary hover:brightness-[.88]">
        {pending ? "Vérification…" : "Vérifier et continuer"}
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        {seconds > 0 ? (
          <span className="text-muted-foreground" aria-live="polite">
            Renvoyer le code dans 0:{String(seconds).padStart(2, "0")}
          </span>
        ) : (
          <Link href="/connexion" className="font-semibold text-foreground">
            Renvoyer le code
          </Link>
        )}
        <Link href="/connexion" className="text-foreground">
          Modifier l&apos;adresse e-mail
        </Link>
      </div>
    </form>
  );
}
