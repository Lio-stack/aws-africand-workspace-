import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { StatusBadge } from "@/components/app/status-badge";
import { MissionDeliverables } from "@/components/experts/mission-deliverables";
import { currentMission } from "@/lib/demo/experts";

export const metadata: Metadata = { title: "Experts · Missions et livrables" };

// Écran 20 · Experts · Missions et livrables.
export default function MissionsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Missions", currentMission.ref]}
        title={currentMission.title}
        actions={<StatusBadge tone="info">En cours</StatusBadge>}
      />
      <MissionDeliverables />
    </>
  );
}
