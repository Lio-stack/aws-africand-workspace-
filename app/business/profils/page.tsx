import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/app/page-header";
import { ProfilesExplorer } from "@/components/business/profiles-explorer";

export const metadata: Metadata = { title: "Business · Explorer les profils" };

// Écran 29 · Exploration de profils anonymisés.
export default function ProfilsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Profils", "Explorer"]}
        title="Explorer les profils"
        description="Profils anonymisés et validés par AfriCand. Les identités sont révélées après approbation de l'introduction."
      />
      <Suspense>
        <ProfilesExplorer />
      </Suspense>
    </>
  );
}
