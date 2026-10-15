import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/app/page-header";
import { OpportunitiesList } from "@/components/experts/opportunities-list";

export const metadata: Metadata = { title: "Experts · Opportunités" };

// Écran 18 · Experts · Opportunités.
export default function OpportunitesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Opportunités"]}
        title="Opportunités"
        description="Besoins qualifiés par AfriCand. L'entreprise reste anonyme jusqu'à l'introduction."
      />
      <Suspense>
        <OpportunitiesList />
      </Suspense>
    </>
  );
}
