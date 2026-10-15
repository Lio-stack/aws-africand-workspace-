import type { Metadata } from "next";
import { Suspense } from "react";

import { AccessCard, AcwLogo, BackLink } from "@/components/auth/access-layout";
import { OtpForm } from "@/components/auth/otp-form";

export const metadata: Metadata = { title: "Code de connexion" };

// Écran 05 · Saisie du code OTP (e-mail + code, ADR-011).
export default function CodePage() {
  return (
    <AccessCard footer="Vous ne trouvez pas l'e-mail ? Vérifiez vos courriers indésirables.">
      <BackLink href="/connexion" />
      <AcwLogo />
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[26px] leading-tight font-bold tracking-tight">Saisissez votre code</h1>
        <p className="text-base text-muted-foreground">
          Un code à 6 chiffres est envoyé à votre adresse e-mail. Il expire dans 10 minutes.
        </p>
      </div>
      <Suspense>
        <OtpForm />
      </Suspense>
    </AccessCard>
  );
}
