import type { Metadata } from "next";

import { ProposalVersions } from "@/components/admin/contracting";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Propositions" };

// Écran 44 · Admin · Propositions.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Contractualisation", "Propositions"]}
        title={"[P-012] · DAF de transition"}
      />
      <ProposalVersions />
    </>
  );
}
