import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { AvailabilityEditor } from "@/components/experts/availability-editor";

export const metadata: Metadata = { title: "Experts · Disponibilités" };

// Écran 17 · Experts · Disponibilités.
export default function DisponibilitesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Mon dossier", "Disponibilités"]}
        title="Disponibilités"
        description="Les entreprises voient uniquement votre statut et votre capacité mensuelle."
      />
      <AvailabilityEditor />
    </>
  );
}
