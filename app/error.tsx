"use client";

import { ErrorScreen, primaryLinkClass } from "@/components/errors/error-screen";

// Écran 11 · Erreur 500. Aucun détail technique affiché ; seule la référence (digest) est donnée.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <ErrorScreen
      code="500"
      text="Nos équipes ont été prévenues et travaillent à rétablir le service. Vos données ne sont pas affectées. Réessayez dans quelques instants."
      hint={`Référence de l'incident : ${error.digest ?? "indisponible"}`}
      primary={
        <button type="button" onClick={() => retry()} className={primaryLinkClass}>
          Réessayer
        </button>
      }
    />
  );
}
