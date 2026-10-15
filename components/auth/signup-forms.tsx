"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { companySignupSchema, consultantSignupSchema } from "@/modules/auth/schema";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-[52px] w-full rounded-[10px] border border-field-border bg-white px-4 text-base text-foreground outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15 aria-invalid:border-destructive";

type Errors = Record<string, string>;

function useValidatedSubmit(schema: z.ZodType) {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] ??= issue.message;
      }
      setErrors(next);
      const first = event.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setErrors({});
    // Démonstration : aucun compte n'est créé. On montre l'écran suivant du parcours.
    router.push("/compte/attente");
  };

  return { errors, onSubmit };
}

function Field({ name, errors, children }: { name: string; errors: Errors; children: (props: { id: string; invalid: boolean; describedBy?: string }) => React.ReactNode }) {
  const error = errors[name];
  const id = `champ-${name}`;
  return (
    <div className="flex flex-col gap-1">
      {children({ id, invalid: Boolean(error), describedBy: error ? `${id}-erreur` : undefined })}
      {error ? (
        <p id={`${id}-erreur`} className="text-[13px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextField({ name, label, errors, type = "text", autoComplete }: { name: string; label: string; errors: Errors; type?: string; autoComplete?: string }) {
  return (
    <Field name={name} errors={errors}>
      {({ id, invalid, describedBy }) => (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          aria-label={label}
          placeholder={label}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={fieldClass}
        />
      )}
    </Field>
  );
}

function SelectField({ name, label, options, errors }: { name: string; label: string; options: string[]; errors: Errors }) {
  return (
    <Field name={name} errors={errors}>
      {({ id, invalid, describedBy }) => (
        <select id={id} name={name} aria-label={label} defaultValue="" aria-invalid={invalid || undefined} aria-describedby={describedBy} className={cn(fieldClass, "px-3.5")}>
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      )}
    </Field>
  );
}

function Terms({ errors, children }: { errors: Errors; children: React.ReactNode }) {
  return (
    <Field name="terms" errors={errors}>
      {({ id, invalid, describedBy }) => (
        <label htmlFor={id} className="flex items-start gap-3 text-sm text-label">
          <input id={id} name="terms" type="checkbox" aria-invalid={invalid || undefined} aria-describedby={describedBy} className="mt-0.5 size-[18px] shrink-0 accent-action" />
          <span>{children}</span>
        </label>
      )}
    </Field>
  );
}

const countries = ["Côte d'Ivoire", "Sénégal", "Burkina Faso", "Maroc"];

export function AccountTypeTabs({ current }: { current: "consultant" | "entreprise" }) {
  return (
    <nav aria-label="Type de compte" className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
      {[
        { key: "consultant", label: "Je suis consultant", href: "/inscription/consultant" },
        { key: "entreprise", label: "Je représente une entreprise", href: "/inscription/entreprise" },
      ].map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          aria-current={current === tab.key ? "page" : undefined}
          className={cn(
            "flex min-h-11 items-center justify-center rounded-[10px] px-2 text-center text-[15px]",
            current === tab.key ? "bg-white font-semibold text-foreground shadow-sm" : "text-label hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

const conditions = (
  <>
    J&apos;accepte les <span className="text-action">Conditions d&apos;utilisation</span> et la{" "}
    <span className="text-action">Politique de confidentialité</span>
  </>
);

// Écran 07 · Inscription consultant.
export function ConsultantSignupForm() {
  const { errors, onSubmit } = useValidatedSubmit(consultantSignupSchema);
  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField name="firstName" label="Prénom" autoComplete="given-name" errors={errors} />
        <TextField name="lastName" label="Nom" autoComplete="family-name" errors={errors} />
      </div>
      <TextField name="email" label="Adresse e-mail professionnelle" type="email" autoComplete="email" errors={errors} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SelectField name="country" label="Pays de résidence" options={countries} errors={errors} />
        <SelectField name="experience" label="Années d'expérience" options={["3 à 5 ans", "6 à 10 ans", "11 à 15 ans", "Plus de 15 ans"]} errors={errors} />
      </div>
      <SelectField name="domain" label="Domaine d'expertise principal" options={["Stratégie", "Finance", "M&A et due diligence", "Opérations"]} errors={errors} />
      <TextField name="linkedin" label="URL de votre profil LinkedIn (facultatif)" type="url" errors={errors} />
      <Terms errors={errors}>{conditions}, et que mon profil soit présenté de façon anonyme aux entreprises.</Terms>
      <Button type="submit" size="xl" className="w-full hover:bg-primary hover:brightness-[.88]">
        Créer un compte
      </Button>
    </form>
  );
}

// Écran 08 · Inscription entreprise.
export function CompanySignupForm() {
  const { errors, onSubmit } = useValidatedSubmit(companySignupSchema);
  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="text-sm font-semibold text-foreground">Entreprise</p>
      <TextField name="companyName" label="Raison sociale" autoComplete="organization" errors={errors} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SelectField name="country" label="Pays du siège" options={countries} errors={errors} />
        <SelectField name="organizationType" label="Type d'organisation" options={["PME", "Grande entreprise", "Fonds d'investissement", "Institution, bailleur"]} errors={errors} />
      </div>
      <TextField name="registration" label="Numéro RCCM ou identifiant légal" errors={errors} />
      <p className="pt-1 text-sm font-semibold text-foreground">Votre contact</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <TextField name="firstName" label="Prénom" autoComplete="given-name" errors={errors} />
        <TextField name="lastName" label="Nom" autoComplete="family-name" errors={errors} />
      </div>
      <TextField name="role" label="Fonction" autoComplete="organization-title" errors={errors} />
      <TextField name="email" label="E-mail professionnel" type="email" autoComplete="email" errors={errors} />
      <Terms errors={errors}>Je confirme être habilité à représenter cette entreprise. {conditions}.</Terms>
      <Button type="submit" size="xl" className="w-full hover:bg-primary hover:brightness-[.88]">
        Créer le compte entreprise
      </Button>
    </form>
  );
}
