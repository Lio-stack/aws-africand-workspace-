import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { IntroductionsTracker } from "@/components/business/introductions-tracker";

export const metadata: Metadata = { title: "Business · Introductions" };

// Écran 32 · Business · Introductions.
export default function Page() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Business", "Introductions"]}
        title="Introductions"
        description="Chaque introduction est approuvée par AfriCand puis acceptée par l'expert avant que son identité vous soit révélée."
      />
      <IntroductionsTracker />
    </>
  );
}
