import { ChevronsUpDown } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { requireSpace } from "@/lib/auth/guard";
import { demoCompany } from "@/lib/demo/business";

// Contexte entreprise (docs/design-system.md §3). Une seule entreprise en démonstration.
function CompanyContext() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/14 bg-white/6 p-3">
      <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-action text-sm font-semibold text-white">
        {demoCompany.name.replace(/[^A-Za-zÀ-ÿ]/g, "").charAt(0)}
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-white">{demoCompany.name}</span>
        <span className="text-xs text-white/60">Entreprise active</span>
      </span>
      <ChevronsUpDown aria-hidden className="size-4 text-white/50" />
    </div>
  );
}

export default async function BusinessLayout({ children }: LayoutProps<"/business">) {
  await requireSpace("business");
  return (
    <AppShell space="business" sidebarTop={<CompanyContext />}>
      {children}
    </AppShell>
  );
}
