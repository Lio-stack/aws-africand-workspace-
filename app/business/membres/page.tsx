import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { MembersManager } from "@/components/business/members-manager";

export const metadata: Metadata = { title: "Business · Membres et invitations" };

// Écran 25 · Business · Membres et invitations.
export default function MembresPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Membres et invitations"]} title="Membres et invitations" />
      <MembersManager />
    </>
  );
}
