import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { ExperiencesTabs } from "@/components/experts/experiences-tabs";

export const metadata: Metadata = { title: "Experts · Expériences et références" };

// Écran 16 · Experts · Expériences et références.
export default function ExperiencesPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Experts", "Mon dossier", "Expériences et références"]} title="Expériences et références" />
      <ExperiencesTabs />
    </>
  );
}
