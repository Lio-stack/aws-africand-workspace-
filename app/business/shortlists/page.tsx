import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { ShortlistTabs } from "@/components/business/shortlist-tabs";

export const metadata: Metadata = { title: "Business · Shortlists" };

// Écran 31 · Business · Shortlists.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Shortlists"]}
        title="Shortlists"
      />
      <ShortlistTabs />
    </>
  );
}
