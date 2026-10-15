import type { Metadata } from "next";

import { ConsultantFile } from "@/components/admin/consultant-file";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Fiche consultant" };

// Écran 38 · Admin · Fiche consultant complète (exemple [Candidat 1]).
export default function ConsultantFichePage() {
  return (
    <>
      <PageHeader breadcrumb={["Administration", "Consultants", "[Candidat 1]"]} title="[Candidat 1]" />
      <ConsultantFile />
    </>
  );
}
