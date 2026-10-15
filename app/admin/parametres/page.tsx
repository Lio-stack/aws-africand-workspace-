import type { Metadata } from "next";

import { SettingsForm } from "@/components/admin/system";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Paramètres" };

// Écran 51 · Admin · Paramètres.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Système", "Paramètres"]}
        title={"Paramètres"}
      />
      <SettingsForm />
    </>
  );
}
