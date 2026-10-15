import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { StepWizard } from "@/components/app/step-wizard";
import { needSteps } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Nouveau besoin" };

// Écran 27 · Business · Nouveau besoin en 5 étapes.
export default function NouveauBesoinPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Besoins", "Nouveau besoin"]} title="Nouveau besoin" />
      <StepWizard
        steps={needSteps}
        savedLabel="Brouillon non enregistré (démonstration)"
        finishLabel="Envoyer à AfriCand"
        finishMessage="Besoin non envoyé"
      />
    </>
  );
}
