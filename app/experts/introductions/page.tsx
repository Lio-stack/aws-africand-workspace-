import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { IntroductionsConsent } from "@/components/experts/introductions-consent";

export const metadata: Metadata = { title: "Experts · Introductions" };

// Écran 19 · Experts · Introductions et consentement.
export default function IntroductionsPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Introductions"]}
        title="Introductions et consentement"
        description="Votre identité n'est jamais révélée sans votre accord explicite."
      />
      <IntroductionsConsent />
    </>
  );
}
