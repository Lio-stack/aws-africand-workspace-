import type { Metadata } from "next";
import Link from "next/link";

import { ErrorScreen, primaryLinkClass } from "@/components/errors/error-screen";

export const metadata: Metadata = { title: "Accès non autorisé" };

// Écran 11 · Erreur 403 : cible des contrôles d'accès par rôle (phase 3).
export default function AccesRefusePage() {
  return (
    <ErrorScreen
      code="403"
      text="Vous n'avez pas les droits nécessaires pour afficher cette page. Si vous pensez qu'il s'agit d'une erreur, demandez l'accès à l'administrateur de votre espace."
      hint="Votre rôle actuel ne donne pas accès à ce module."
      primary={
        <Link href="/" className={primaryLinkClass}>
          Retour à l&apos;accueil
        </Link>
      }
    />
  );
}
