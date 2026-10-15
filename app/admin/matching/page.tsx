import type { Metadata } from "next";

import { MatchingBoard } from "@/components/admin/matching-board";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Matching" };

// Écran 41 · Admin · Matching.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Matching", "[B-031]"]}
        title={"Matching : due diligence financière"}
      />
      <MatchingBoard />
    </>
  );
}
