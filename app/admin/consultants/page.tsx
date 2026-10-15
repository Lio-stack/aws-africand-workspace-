import type { Metadata } from "next";

import { CandidatesQueue } from "@/components/admin/decisions";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Validation des consultants" };

// Écran 37 · Admin · Validation des consultants.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Validation", "Consultants"]}
        title={"Validation des consultants"}
      />
      <CandidatesQueue />
    </>
  );
}
