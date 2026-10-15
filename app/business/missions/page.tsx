import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { MissionReview } from "@/components/business/mission-review";

export const metadata: Metadata = { title: "Business · Missions" };

// Écran 34 · Business · Missions.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Missions"]}
        title="Missions"
      />
      <MissionReview />
    </>
  );
}
