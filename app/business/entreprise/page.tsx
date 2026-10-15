import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { CompanyForm } from "@/components/business/company-form";
import { companyDocuments, demoCompany } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Fiche entreprise" };

// Écran 24 · Business · Fiche entreprise.
export default function EntreprisePage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Fiche entreprise"]} title="Fiche entreprise" />
      <div className="flex flex-wrap items-center gap-5 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <span aria-hidden className="flex size-20 items-center justify-center rounded-2xl bg-action text-3xl font-semibold text-white">S</span>
        <div className="flex min-w-[220px] flex-1 flex-col gap-1">
          <h2 className="text-2xl font-bold">{demoCompany.name}</h2>
          <span className="text-[15px] text-label">Agro-industrie · Abidjan, Côte d&apos;Ivoire</span>
          <div className="flex flex-wrap gap-2 pt-1">
            <StatusBadge tone="neutral">Entreprise vérifiée par AfriCand</StatusBadge>
            <StatusBadge>PME</StatusBadge>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <CompanyForm />
        <aside className="flex flex-col gap-5">
          <section aria-labelledby="contact" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
            <h2 id="contact" className="text-lg font-bold">Contact principal</h2>
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">KA</span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold">[Prénom Nom]</span>
                <span className="text-sm text-muted-foreground">Directeur général</span>
              </span>
            </div>
            <Link href="/business/membres" className="text-[15px] font-semibold text-foreground">
              Gérer les membres
            </Link>
          </section>
          <section aria-labelledby="pieces" className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-card sm:p-6">
            <h2 id="pieces" className="text-lg font-bold">Pièces justificatives</h2>
            <ul className="flex flex-col gap-2.5">
              {companyDocuments.map((doc) => (
                <li key={doc.label} className="flex items-center justify-between gap-3 text-[15px]">
                  {doc.label}
                  <StatusBadge tone={doc.tone}>{doc.status}</StatusBadge>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
