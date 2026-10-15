import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { StepWizard } from "@/components/app/step-wizard";
import { applicationSteps } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Candidature" };

// Écran 13 · Experts · Candidature.
export default function CandidaturePage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Experts", "Candidature"]} title="Ma candidature" />
      <StepWizard
        steps={applicationSteps}
        savedLabel="Brouillon non enregistré (démonstration)"
        finishLabel="Envoyer ma candidature"
        finishMessage="Candidature non envoyée"
      />
    </>
  );
}
