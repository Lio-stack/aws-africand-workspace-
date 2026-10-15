import type { Metadata } from "next";

import { IntroCall } from "@/components/business/intro-call";

export const metadata: Metadata = { title: "Business · Appel d'introduction" };

// Écran 53 · Appel d'introduction (Figma) : créneau, format, participants, confirmation.
export default function AppelIntroductionPage() {
  return <IntroCall />;
}
