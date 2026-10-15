import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { ProposalViewer } from "@/components/business/proposal-viewer";
import { proposal } from "@/lib/demo/business";

export const metadata: Metadata = { title: "Business · Propositions" };

// Écran 33 · Business · Propositions.
export default function PropositionsPage() {
  return (
    <>
      <PageHeader breadcrumb={["ACW Business", "Propositions", proposal.ref]} title={proposal.title} />
      <ProposalViewer />
    </>
  );
}
