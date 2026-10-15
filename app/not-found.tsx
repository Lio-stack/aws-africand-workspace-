import Link from "next/link";

import { ErrorScreen, primaryLinkClass } from "@/components/errors/error-screen";

// Écran 11 · Erreur 404.
export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      text="La page demandée n'existe pas ou a été déplacée. Vérifiez l'adresse ou revenez à votre espace."
      hint="Lien expiré ou mal saisi."
      primary={
        <Link href="/" className={primaryLinkClass}>
          Retour à l&apos;accueil
        </Link>
      }
    />
  );
}
