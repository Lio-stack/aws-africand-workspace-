import type { Metadata } from "next";

import { NeedQualification } from "@/components/admin/qualification";
import { PageHeader } from "@/components/app/page-header";

export const metadata: Metadata = { title: "Admin · Qualification des besoins" };

// Écran 40 · Admin · Qualification des besoins.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["Administration", "Validation", "Qualification des besoins"]}
        title={"Qualification des besoins"}
      />
      <NeedQualification />
    </>
  );
}
