import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { KpiCard } from "@/components/app/panel";
import { DocumentsTabs } from "@/components/business/documents-tabs";
import { businessDocsSummary } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Documents et factures" };

// Écran 35 · Business · Documents et factures.
export default function DocumentsPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Documents et factures"]} title="Documents et factures" description="Montants en FCFA." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {businessDocsSummary.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>
      <DocumentsTabs />
    </>
  );
}
