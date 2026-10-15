import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

import { DemoNotice } from "@/components/auth/access-layout";
import { AccountTypeTabs, CompanySignupForm } from "@/components/auth/signup-forms";
import { SignupLayout } from "@/components/auth/signup-layout";

export const metadata: Metadata = { title: "Inscription entreprise" };

const benefits = ["Profils vérifiés et anonymisés", "Score de matching expliqué pour chaque profil", "Contrats, missions et factures au même endroit"];

// Écran 08 · Inscription entreprise.
export default function InscriptionEntreprisePage() {
  return (
    <SignupLayout
      eyebrow="ACW Business"
      title="Trouvez l'expertise qualifiée pour vos projets en Afrique."
      description="Déposez un besoin, recevez une shortlist de profils évalués, puis rencontrez les experts après introduction par AfriCand."
      heading="Créer un compte entreprise"
      intro="Votre entreprise est vérifiée par AfriCand avant l'accès aux profils."
      aside={
        <ul className="flex flex-col gap-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-[15px]">
              <CheckCircle2 aria-hidden className="size-5 shrink-0 text-nav-indicator" />
              {benefit}
            </li>
          ))}
        </ul>
      }
    >
      <AccountTypeTabs current="entreprise" />
      <DemoNotice>Démonstration : la création de compte sera branchée en phase 3. Aucune donnée n&apos;est envoyée.</DemoNotice>
      <CompanySignupForm />
    </SignupLayout>
  );
}
