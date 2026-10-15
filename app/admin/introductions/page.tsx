import type { Metadata } from "next";

import { IntroductionsApproval } from "@/components/admin/decisions";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Approbation des introductions" };

// Écran 43 · Admin · Approbation des introductions.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Matching", "Introductions"]}
        title={"Approbation des introductions"}
        description="Après approbation, l'expert reçoit la demande et décide de partager ou non son identité."
      />
      <IntroductionsApproval />
    </>
  );
}
