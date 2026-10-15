import type { Metadata } from "next";

import { CompaniesQueue } from "@/components/admin/decisions";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Validation des entreprises" };

// Écran 39 · Admin · Validation des entreprises.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Validation", "Entreprises"]}
        title={"Validation des entreprises"}
        description="Contrôles d'identité et de conformité avant l'accès aux profils."
      />
      <CompaniesQueue />
    </>
  );
}
