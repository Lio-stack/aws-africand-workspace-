import { Lock, SearchX, TriangleAlert } from "lucide-react";

import { AcwLogo } from "@/components/auth/access-layout";
import { cn } from "@/lib/utils";

const variants = {
  "403": { icon: Lock, iconClass: "bg-white text-muted-foreground ring-1 ring-border", title: "Accès non autorisé" },
  "404": { icon: SearchX, iconClass: "bg-secondary text-muted-foreground", title: "Page introuvable" },
  "500": { icon: TriangleAlert, iconClass: "bg-destructive/10 text-destructive", title: "Une erreur est survenue" },
} as const;

// Écran 11 · Erreurs 403, 404, 500 : message actionnable, jamais de détail technique.
export function ErrorScreen({
  code,
  text,
  hint,
  primary,
}: {
  code: keyof typeof variants;
  text: string;
  hint: string;
  primary: React.ReactNode;
}) {
  const variant = variants[code];
  const Icon = variant.icon;
  return (
    <div className="flex min-h-dvh flex-col bg-muted">
      <header className="flex h-[72px] items-center border-b border-border bg-white px-4 sm:px-6">
        <AcwLogo />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <span aria-hidden className={cn("flex size-[72px] items-center justify-center rounded-2xl", variant.iconClass)}>
          <Icon className="size-8" />
        </span>
        <p className="text-sm font-semibold tracking-[0.08em] text-muted-foreground uppercase">Erreur {code}</p>
        <h1 className="text-[30px] leading-tight font-bold tracking-tight sm:text-[34px]">{variant.title}</h1>
        <p className="max-w-[560px] text-[17px] leading-relaxed text-muted-foreground">{text}</p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {primary}
          <a href="mailto:contact@africand.com" className="flex h-[52px] items-center rounded-[10px] border border-field-border bg-white px-6 text-base hover:bg-secondary">
            Contacter le support
          </a>
        </div>
        <p className="text-[13px] text-muted-foreground">{hint}</p>
      </main>
    </div>
  );
}

export const primaryLinkClass =
  "flex h-[52px] items-center rounded-[10px] bg-primary px-6 text-base font-semibold text-white hover:brightness-[.88]";
