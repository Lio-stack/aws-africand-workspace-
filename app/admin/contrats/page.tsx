import type { Metadata } from "next";

import { ContractsTable } from "@/components/admin/contracting";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Contrats" };

// Écran 45 · Admin · Contrats.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Contractualisation", "Contrats"]}
        title={"Contrats"}
        description="Double contrat : AfriCand avec l'entreprise, AfriCand avec l'expert. Pas de contrat direct entreprise-consultant."
      />
      <ContractsTable />
    </>
  );
}
