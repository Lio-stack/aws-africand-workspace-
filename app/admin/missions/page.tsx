import type { Metadata } from "next";

import { MissionsBoard } from "@/components/admin/contracting";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Missions" };

// Écran 46 · Admin · Missions.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Contractualisation", "Missions"]}
        title={"Missions"}
      />
      <MissionsBoard />
    </>
  );
}
