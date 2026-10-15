import type { Metadata } from "next";

import { ReportingBoard } from "@/components/admin/system";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Reporting" };

// Écran 48 · Admin · Reporting.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Pilotage", "Reporting"]}
        title={"Reporting"}
      />
      <ReportingBoard />
    </>
  );
}
