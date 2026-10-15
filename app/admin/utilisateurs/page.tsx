import type { Metadata } from "next";

import { UsersAndRoles } from "@/components/admin/system";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Utilisateurs et rôles" };

// Écran 50 · Admin · Utilisateurs et rôles.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Système", "Utilisateurs et rôles"]}
        title={"Utilisateurs et rôles"}
      />
      <UsersAndRoles />
    </>
  );
}
