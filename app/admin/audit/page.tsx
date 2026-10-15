import type { Metadata } from "next";

import { AuditLog } from "@/components/admin/system";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Journal d'audit" };

// Écran 49 · Admin · Journal d'audit.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Système", "Journal d'audit"]}
        title={"Journal d'audit"}
        description="Journal en lecture seule. Aucune entrée ne peut être modifiée ou supprimée."
      />
      <AuditLog />
    </>
  );
}
