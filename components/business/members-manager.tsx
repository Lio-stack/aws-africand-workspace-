"use client";

import { useState } from "react";
import { toast } from "sonner";

import { DemoAction } from "@/components/app/demo-action";
import { StatusBadge } from "@/components/app/status-badge";
import { companyMembers, memberRoles } from "@/lib/demo/business";
import { loginRequestSchema } from "@/modules/auth/schema";

// Écran 25 · Membres et invitations : l'invitation est ajoutée localement (aucun e-mail envoyé).
export function MembersManager() {
  const [members, setMembers] = useState(companyMembers);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <section aria-labelledby="inviter" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="inviter" className="text-lg font-bold">Inviter un collaborateur</h2>
        <form
          noValidate
          className="flex flex-wrap items-start gap-2.5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const parsed = loginRequestSchema.safeParse({ email: data.get("email") });
            if (!parsed.success) {
              setError(parsed.error.issues[0]?.message ?? "Adresse e-mail invalide.");
              return;
            }
            setError(null);
            setMembers([
              ...members,
              { ini: "?", name: "Invitation envoyée", email: parsed.data.email, role: String(data.get("role")), status: "En attente", action: "Relancer" },
            ]);
            event.currentTarget.reset();
            toast("Invitation ajoutée (démonstration)", { description: "Aucun e-mail n'est envoyé." });
          }}
        >
          <div className="flex min-w-[240px] flex-1 flex-col gap-1">
            <input
              name="email"
              type="email"
              aria-label="Adresse e-mail"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "invite-error" : undefined}
              placeholder="nom@entreprise.com"
              className="h-12 rounded-[10px] border border-field-border px-3.5 text-base outline-none placeholder:text-placeholder focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15 aria-invalid:border-destructive"
            />
            {error ? (
              <p id="invite-error" role="alert" className="text-[13px] text-destructive">
                {error}
              </p>
            ) : null}
          </div>
          <select
            name="role"
            aria-label="Rôle"
            className="h-12 rounded-[10px] border border-field-border bg-white px-3 text-base outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15"
          >
            {memberRoles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <button type="submit" className="h-12 rounded-[10px] bg-action px-5 text-base font-semibold text-white hover:brightness-[.88]">
            Envoyer l&apos;invitation
          </button>
        </form>
        <p className="text-sm text-muted-foreground">Seuls les administrateurs peuvent signer des propositions et valider des factures.</p>
      </section>
      <section aria-label="Membres" className="overflow-hidden rounded-2xl bg-card shadow-card">
        <ul>
          {members.map((member, index) => (
            <li key={`${member.email}-${index}`} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-4 last:border-0 sm:px-6">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {member.ini}
              </span>
              <div className="flex min-w-[180px] flex-1 flex-col">
                <span className="text-[15px] font-semibold">{member.name}</span>
                <span className="text-[13px] break-all text-muted-foreground">{member.email}</span>
              </div>
              <span className="w-28 text-sm text-label">{member.role}</span>
              <StatusBadge tone={member.status === "Actif" ? "success" : "info"}>{member.status}</StatusBadge>
              <DemoAction variant="outline" className="h-9 rounded-[10px] border-field-border px-3.5">
                {member.action}
              </DemoAction>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
