"use client";

import { useState } from "react";
import { toast } from "sonner";

import { DemoAction } from "@/components/app/demo-action";
import { StatusBadge } from "@/components/app/status-badge";
import { cn } from "@/lib/utils";

const tabs = ["Profil", "Sécurité", "Notifications"] as const;

const notifications = [
  { label: "Nouvelles opportunités", desc: "Une mission correspond à votre profil.", email: true, app: false },
  { label: "Demandes d'introduction", desc: "Une entreprise souhaite vous rencontrer.", email: true, app: false },
  { label: "Propositions et contrats", desc: "Un document attend votre signature.", email: true, app: false },
  { label: "Paiements", desc: "Un paiement a été émis ou reçu.", email: true, app: false },
  { label: "Actualités AfriCand", desc: "Informations sur la plateforme.", email: true, app: false },
];

const fieldClass =
  "h-12 rounded-[10px] border border-field-border bg-white px-3.5 text-base font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15";

// Écran 10 · Mon compte : profil, sécurité, préférences de notification (rien n'est enregistré).
export function AccountSettings() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Profil");

  return (
    <>
      <div role="tablist" aria-label="Sections du compte" className="flex border-b border-border">
        {tabs.map((label) => (
          <button
            key={label}
            role="tab"
            type="button"
            aria-selected={tab === label}
            onClick={() => setTab(label)}
            className={cn(
              "-mb-px h-12 border-b-[3px] px-4 text-base outline-none focus-visible:bg-action-subtle",
              tab === label ? "border-action font-semibold text-foreground" : "border-transparent font-medium text-label",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "Profil" ? (
        <form
          role="tabpanel"
          aria-label="Profil"
          className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            toast("Profil non enregistré (démonstration)");
          }}
        >
          <h2 className="text-lg font-bold">Informations personnelles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ["Prénom", "[Prénom]", "given-name"],
              ["Nom", "[Nom]", "family-name"],
              ["Adresse e-mail", "nom@entreprise.com", "email"],
              ["Téléphone", "+225 [NUMÉRO]", "tel"],
            ].map(([label, value, autoComplete]) => (
              <label key={label} className="flex flex-col gap-1.5 text-sm font-semibold text-label">
                {label}
                <input defaultValue={value} autoComplete={autoComplete} className={fieldClass} />
              </label>
            ))}
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
              Langue de l&apos;interface
              <select className={fieldClass} defaultValue="Français">
                <option>Français</option>
                <option>English</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
              Fuseau horaire
              <select className={fieldClass} defaultValue="Africa/Abidjan (UTC+0)">
                <option>Africa/Abidjan (UTC+0)</option>
                <option>Africa/Casablanca (UTC+1)</option>
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-3">
            <button type="reset" className="h-11 rounded-[10px] border border-field-border px-5 text-[15px] hover:bg-secondary">
              Annuler
            </button>
            <button type="submit" className="h-11 rounded-[10px] bg-primary px-5 text-[15px] font-semibold text-white hover:brightness-[.88]">
              Enregistrer
            </button>
          </div>
        </form>
      ) : null}

      {tab === "Sécurité" ? (
        <ul role="tabpanel" aria-label="Sécurité" className="overflow-hidden rounded-2xl bg-card shadow-card">
          <li className="flex flex-wrap items-center gap-4 border-b border-secondary px-5 py-4 sm:px-6">
            <span className="flex min-w-[220px] flex-1 flex-col">
              <span className="text-[15px] font-semibold">Connexion par code e-mail</span>
              <span className="text-[13px] text-muted-foreground">Un code à usage unique vous est envoyé à chaque connexion.</span>
            </span>
            <StatusBadge tone="success">Actif</StatusBadge>
          </li>
          <li className="flex flex-wrap items-center gap-4 border-b border-secondary px-5 py-4 sm:px-6">
            <span className="flex min-w-[220px] flex-1 flex-col">
              <span className="text-[15px] font-semibold">Application d&apos;authentification</span>
              <span className="text-[13px] text-muted-foreground">Ajoutez une seconde vérification. Obligatoire pour l&apos;équipe AfriCand.</span>
            </span>
            <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5">Configurer</DemoAction>
          </li>
          <li className="flex flex-wrap items-center gap-4 px-5 py-4 sm:px-6">
            <span className="flex min-w-[220px] flex-1 flex-col">
              <span className="text-[15px] font-semibold">Sessions actives</span>
              <span className="text-[13px] text-muted-foreground">Cet appareil, Abidjan · 2 autres sessions</span>
            </span>
            <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5">Déconnecter les autres</DemoAction>
          </li>
        </ul>
      ) : null}

      {tab === "Notifications" ? (
        <ul role="tabpanel" aria-label="Notifications" className="overflow-hidden rounded-2xl bg-card shadow-card">
          {notifications.map((item) => (
            <li key={item.label} className="flex flex-wrap items-center gap-4 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span className="flex min-w-[220px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{item.label}</span>
                <span className="text-[13px] text-muted-foreground">{item.desc}</span>
              </span>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked={item.email} className="size-[18px] accent-action" />
                E-mail
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked={item.app} className="size-[18px] accent-action" />
                Dans l&apos;app
              </label>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
