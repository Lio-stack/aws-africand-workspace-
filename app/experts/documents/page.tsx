import type { Metadata } from "next";

import { DemoAction } from "@/components/app/demo-action";
import { PageHeader } from "@/components/app/page-header";
import { DocumentsList } from "@/components/experts/documents-list";

export const metadata: Metadata = { title: "Experts · Documents" };

// Écran 21 · Experts · Documents.
export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Documents"]}
        title="Documents"
        actions={
          <DemoAction className="h-10 rounded-[10px] bg-action px-4 font-semibold hover:bg-action hover:brightness-[.88]">
            Déposer un document
          </DemoAction>
        }
      />
      <DocumentsList />
    </>
  );
}
