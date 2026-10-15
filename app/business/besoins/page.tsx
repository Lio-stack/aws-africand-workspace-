import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/app/page-header";
import { NeedsTable } from "@/components/business/needs-table";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Business · Besoins" };

// Écran 26 · Business · Liste des besoins.
export default function BesoinsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Besoins"]}
        title="Besoins"
        actions={
          <Button asChild className="h-10 rounded-[10px] bg-action px-4 font-semibold hover:bg-action hover:brightness-[.88]">
            <Link href="/business/besoins/nouveau">Nouveau besoin</Link>
          </Button>
        }
      />
      <NeedsTable />
    </>
  );
}
