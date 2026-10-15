import type { Metadata } from "next";

import { DemoNotice } from "@/components/auth/access-layout";
import { AccountTypeTabs, ConsultantSignupForm } from "@/components/auth/signup-forms";
import { SignupLayout } from "@/components/auth/signup-layout";

export const metadata: Metadata = { title: "Inscription consultant" };

const steps = [
  { title: "Créer votre compte", sub: "Informations de base, deux minutes" },
  { title: "Compléter votre candidature", sub: "Compétences, expériences, références" },
  { title: "Validation par AfriCand", sub: "Entretien de qualification" },
];

// Écran 07 · Inscription consultant.
export default function InscriptionConsultantPage() {
  return (
    <SignupLayout
      eyebrow="ACW Experts"
      title="Rejoignez le réseau d'experts AfriCand."
      description="Votre profil est vérifié par notre équipe avant d'être proposé, de façon anonyme, aux entreprises."
      heading="Créer un compte"
      intro="Rejoignez une communauté de professionnels et accédez à des missions exclusives."
      aside={
        <ol className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span
                aria-hidden
                className={index === 0 ? "flex size-7 shrink-0 items-center justify-center rounded-full bg-action text-sm font-semibold" : "flex size-7 shrink-0 items-center justify-center rounded-full border border-white/40 text-sm"}
              >
                {index + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold">{step.title}</span>
                <span className="text-sm text-white/65">{step.sub}</span>
              </span>
            </li>
          ))}
        </ol>
      }
    >
      <AccountTypeTabs current="consultant" />
      <DemoNotice>Démonstration : la création de compte sera branchée en phase 3. Aucune donnée n&apos;est envoyée.</DemoNotice>
      <ConsultantSignupForm />
    </SignupLayout>
  );
}
