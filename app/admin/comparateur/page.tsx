import type { Metadata } from "next";
import Link from "next/link";

import { Comparator } from "@/components/admin/comparator";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Comparateur de profils" };

// Écran 42 · Admin · Comparateur de profils.
export default function ComparateurPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Matching [B-031]", "Comparateur"]}
        title="Comparateur de profils"
        description="La meilleure valeur de chaque ligne est surlignée."
        actions={
          <Link href="/admin/matching" className="flex h-10 items-center rounded-[10px] border border-field-border bg-white px-4 text-sm hover:bg-secondary">
            Retour au matching
          </Link>
        }
      />
      <Comparator />
    </>
  );
}
