import { BadgeCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { Toaster } from "@/components/ui/sonner";
import { navigation, spaceLabels, type Space } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { HeaderSearch } from "./header-search";
import { MobileNav } from "./mobile-nav";
import { NotificationsButton } from "./notifications-button";
import { SidebarNav } from "./sidebar-nav";

const spaceConfig: Record<Space, { root: string; initials: string; search: string; searchTarget: string }> = {
  experts: {
    root: "/experts",
    initials: "AO",
    search: "Rechercher des opportunités, missions, documents...",
    searchTarget: "/experts/opportunites",
  },
  business: {
    root: "/business",
    initials: "KA",
    search: "Rechercher des profils, besoins, missions...",
    searchTarget: "/business/profils",
  },
  admin: {
    root: "/admin",
    initials: "JN",
    search: "Consultant, entreprise, besoin, mission...",
    searchTarget: "/admin/consultants",
  },
};

export function Wordmark({ space, inverted = false }: { space: Space; inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className={inverted ? "text-[22px] font-bold tracking-tight text-white" : "text-[22px] font-bold tracking-tight text-foreground"}>
        ACW
      </span>
      <BadgeCheck aria-hidden className={inverted ? "size-[18px] text-nav-indicator" : "size-[18px] text-action"} />
      <span
        className={
          inverted
            ? "rounded-full bg-white/12 px-2.5 py-0.5 text-xs font-semibold text-white"
            : "rounded-full bg-action-subtle px-2.5 py-0.5 text-xs font-semibold text-action"
        }
      >
        {spaceLabels[space]}
      </span>
    </span>
  );
}

function DemoBanner() {
  return (
    <p className="bg-navy-950 px-4 py-1.5 text-center text-xs text-white/80">
      Environnement de démonstration : données fictives, aucune action n&apos;est enregistrée.
    </p>
  );
}

function Sidebar({ space, sidebarTop }: { space: Space; sidebarTop?: React.ReactNode }) {
  const config = spaceConfig[space];
  return (
    <nav
      aria-label={`Navigation ${spaceLabels[space]}`}
      className={cn(
        "sticky hidden w-[264px] shrink-0 flex-col gap-5 overflow-y-auto bg-linear-170 from-navy-800 via-primary to-navy-950 px-4 py-5 lg:flex",
        space === "admin" ? "top-0 h-dvh" : "top-[72px] h-[calc(100dvh-72px)]",
      )}
    >
      {space === "admin" ? (
        <Link href={config.root} className="px-2 pb-1">
          <Wordmark space={space} inverted />
        </Link>
      ) : null}
      {sidebarTop}
      <SidebarNav groups={navigation[space]} spaceRoot={config.root} />
      <div className="mt-auto flex flex-col gap-1 border-t border-white/14 pt-4">
        <Link
          href="/compte"
          className="flex h-11 items-center rounded-[10px] px-3 text-[15px] font-medium text-white/74 hover:bg-white/7 hover:text-white"
        >
          Mon compte
        </Link>
        <Link
          href="/connexion"
          className="flex h-11 items-center rounded-[10px] px-3 text-[15px] font-medium text-white/74 hover:bg-white/7 hover:text-white"
        >
          Se déconnecter
        </Link>
      </div>
    </nav>
  );
}

function Header({ space, sidebarTop }: { space: Space; sidebarTop?: React.ReactNode }) {
  const config = spaceConfig[space];
  return (
    <header className="sticky top-0 z-30 flex min-h-[72px] items-center gap-4 border-b border-border bg-white/86 px-4 backdrop-blur-md sm:gap-5 sm:px-6">
      <MobileNav space={space} groups={navigation[space]} spaceRoot={config.root} sidebarTop={sidebarTop} />
      <Link href={config.root} className={space === "admin" ? "lg:hidden" : "shrink-0 lg:w-[228px]"}>
        <Wordmark space={space} />
      </Link>
      <HeaderSearch placeholder={config.search} target={config.searchTarget} />
      <div className="ml-auto flex items-center gap-3">
        {space === "admin" ? (
          <span className="hidden items-center gap-1.5 rounded-full bg-action px-3 py-1 text-[13px] font-semibold text-white sm:flex">
            <ShieldCheck aria-hidden className="size-3.5" />
            Session MFA vérifiée
          </span>
        ) : null}
        <NotificationsButton />
        <Link
          href="/compte"
          aria-label="Mon compte"
          className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          {config.initials}
        </Link>
      </div>
    </header>
  );
}

export function AppShell({
  space,
  sidebarTop,
  children,
}: {
  space: Space;
  sidebarTop?: React.ReactNode;
  children: React.ReactNode;
}) {
  const main = (
    <main id="contenu" className="flex min-w-0 flex-1 flex-col gap-5 px-4 pt-6 pb-12 sm:px-8">
      {children}
    </main>
  );

  return (
    <div className="flex min-h-dvh flex-col bg-muted">
      <DemoBanner />
      {space === "admin" ? (
        // Administration : la barre latérale porte le logo et occupe toute la hauteur (écran 03).
        <div className="flex flex-1">
          <Sidebar space={space} sidebarTop={sidebarTop} />
          <div className="flex min-w-0 flex-1 flex-col">
            <Header space={space} sidebarTop={sidebarTop} />
            {main}
          </div>
        </div>
      ) : (
        // Experts et Business : en-tête pleine largeur, barre latérale dessous (écrans 01 et 02).
        <>
          <Header space={space} sidebarTop={sidebarTop} />
          <div className="flex flex-1">
            <Sidebar space={space} sidebarTop={sidebarTop} />
            {main}
          </div>
        </>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
}
