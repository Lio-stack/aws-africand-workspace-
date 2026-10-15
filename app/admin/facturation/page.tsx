import type { Metadata } from "next";

import { BillingTabs } from "@/components/admin/contracting";
import { PageHeader } from "@/components/app/page-header";
import { KpiCard } from "@/components/app/panel";
import { billingSummary } from "@/lib/demo/admin";

export const metadata: Metadata = { title: "Admin · Facturation" };

// Écran 47 · Admin · Facturation.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Contractualisation", "Facturation"]}
        title={"Facturation"}
        description="Montants en FCFA."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {billingSummary.map((item) => (
          <KpiCard key={item.label} {...item} />
        ))}
      </div>
      <BillingTabs />
    </>
  );
}
