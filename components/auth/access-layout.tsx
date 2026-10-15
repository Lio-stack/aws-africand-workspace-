import { BadgeCheck, ChevronLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function AcwLogo({ label = "ACW", inverted = false }: { label?: string; inverted?: boolean }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("text-[28px] font-bold tracking-tight", inverted ? "text-white" : "text-foreground")}>{label}</span>
      <BadgeCheck aria-hidden className="size-[22px] fill-action text-white" />
    </span>
  );
}

export function BackLink({ href, label = "Retour" }: { href: string; label?: string }) {
  return (
    <Link href={href} aria-label={label} className="-ml-2 flex size-10 items-center justify-center rounded-[10px] text-foreground hover:bg-secondary">
      <ChevronLeft className="size-6" />
    </Link>
  );
}

export function DemoNotice({ children }: { children: React.ReactNode }) {
  return <p className="rounded-[10px] bg-action-subtle px-3.5 py-2.5 text-[13px] text-primary">{children}</p>;
}

// Carte centrée des écrans d'accès (05, 06, 09), sur fond gris ou bleu nuit.
export function AccessCard({
  children,
  footer,
  tone = "light",
  width = "max-w-[480px]",
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
  tone?: "light" | "dark";
  width?: string;
}) {
  return (
    <main className={cn("flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12", tone === "dark" ? "bg-primary" : "bg-muted")}>
      <div className={cn("flex w-full flex-col gap-6 rounded-2xl border border-border bg-white p-6 sm:p-10", width)}>{children}</div>
      {footer ? (
        <div className={cn("max-w-[480px] text-center text-[13px]", tone === "dark" ? "text-white/75" : "text-muted-foreground")}>{footer}</div>
      ) : null}
    </main>
  );
}
