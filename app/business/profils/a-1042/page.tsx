import type { Metadata } from "next";

import { ProfileConsultant } from "@/components/business/profile-consultant";

export const metadata: Metadata = { title: "Business · Profil consultant" };

// Écran 55 · Profil consultant, variante anonymisée (pré-introduction) :
// code + accomplishments, aucun contact direct, tout via AfriCand.
// La variante révélée (écran 52, anonymous={false}) servira après double accord.
export default function ProfilConsultantPage() {
  return <ProfileConsultant anonymous />;
}
