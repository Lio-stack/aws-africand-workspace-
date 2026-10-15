"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const LENGTH = 6;

// Écran 05 · Saisie du code : six cases, collage accepté, compte à rebours de renvoi.
// Démonstration : aucun code n'est envoyé ni vérifié tant que Supabase Auth n'est pas branché.
export function OtpForm() {
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [seconds, setSeconds] = useState(42);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

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

  return (
    <form
      noValidate
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (digits.join("").length !== LENGTH) {
          setError("Saisissez les 6 chiffres du code reçu.");
          return;
        }
        setError(null);
        toast("Code non vérifié (démonstration)", { description: "La vérification sera branchée avec Supabase Auth (phase 3)." });
      }}
    >
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
              aria-invalid={error ? true : undefined}
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
        {error ? (
          <p role="alert" className="text-[13px] text-destructive">
            {error}
          </p>
        ) : null}
      </fieldset>
      <Button type="submit" size="xl" className="w-full hover:bg-primary hover:brightness-[.88]">
        Vérifier et continuer
      </Button>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        {seconds > 0 ? (
          <span className="text-muted-foreground" aria-live="polite">
            Renvoyer le code dans 0:{String(seconds).padStart(2, "0")}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setSeconds(42);
              toast("Code non renvoyé (démonstration)");
            }}
            className="font-semibold text-foreground"
          >
            Renvoyer le code
          </button>
        )}
        <Link href="/connexion" className="text-foreground">
          Modifier l&apos;adresse e-mail
        </Link>
      </div>
    </form>
  );
}
