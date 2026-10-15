"use client";

import { LogOut, PanelLeftClose, PanelLeftOpen, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SignalW } from "./acw-symbol";

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
      <SignalW size={24} stroke={inverted ? "#FFFFFF" : "var(--color-brand-mark)"} dot={inverted ? "#FFFFFF" : "var(--color-brand-navy)"} />
      <span
        className="font-brand text-[22px] font-extrabold tracking-[-0.03em]"
        style={{ color: inverted ? "#FFFFFF" : "var(--color-brand-navy)" }}
      >
        ACW
      </span>
      <span
        className={
          inverted
            ? "rounded-full bg-white/12 px-2.5 py-0.5 text-xs font-semibold text-white"
            : "rounded-full bg-ref-chip px-2.5 py-0.5 text-xs font-semibold text-ref-ink"
        }
      >
        {spaceLabels[space]}
      </span>
    </span>
  );
}

function Sidebar({
  space,
  sidebarTop,
  collapsed,
  onToggle,
}: {
  space: Space;
  sidebarTop?: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const config = spaceConfig[space];
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;
  return (
    <nav
      aria-label={`Navigation ${spaceLabels[space]}`}
      className={cn(
        "sticky hidden shrink-0 flex-col gap-4 overflow-y-auto border-r border-ref-line bg-white px-3 py-5 transition-[width] duration-200 lg:flex",
        collapsed ? "w-[68px] items-center px-2" : "w-[264px]",
        space === "admin" ? "top-0 h-dvh" : "top-[72px] h-[calc(100dvh-72px)]",
      )}
    >
      <div className={cn("flex w-full items-center", collapsed ? "justify-center" : "justify-end")}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Déplier la barre latérale" : "Rabattre la barre latérale"}
          title={collapsed ? "Déplier" : "Rabattre"}
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-ref-muted outline-none hover:bg-black/5 hover:text-ref-ink focus-visible:ring-2 focus-visible:ring-ref-blue/40"
        >
          <ToggleIcon aria-hidden className="size-5" strokeWidth={1.75} />
        </button>
      </div>
      {sidebarTop && !collapsed ? sidebarTop : null}
      <div className="w-full min-w-0 flex-1">
        <SidebarNav groups={navigation[space]} spaceRoot={config.root} collapsed={collapsed} />
      </div>
      <div className={cn("flex w-full flex-col gap-1 border-t border-ref-line pt-3", collapsed && "items-center")}>
        {collapsed ? (
          <>
            <Link
              href="/compte"
              title="Mon compte"
              aria-label="Mon compte"
              className="flex size-10 items-center justify-center rounded-xl text-ref-muted hover:bg-black/[0.04] hover:text-ref-ink"
            >
              <UserRound aria-hidden className="size-5" strokeWidth={1.75} />
            </Link>
            <Link
              href="/connexion"
              title="Se déconnecter"
              aria-label="Se déconnecter"
              className="flex size-10 items-center justify-center rounded-xl text-ref-muted hover:bg-black/[0.04] hover:text-ref-ink"
            >
              <LogOut aria-hidden className="size-5" strokeWidth={1.75} />
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/compte"
              className="flex h-10 items-center rounded-xl px-3 text-[15px] font-medium text-ref-muted hover:bg-black/[0.04] hover:text-ref-ink"
            >
              Mon compte
            </Link>
            <Link
              href="/connexion"
              className="flex h-10 items-center rounded-xl px-3 text-[15px] font-medium text-ref-muted hover:bg-black/[0.04] hover:text-ref-ink"
            >
              Se déconnecter
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function Header({ space, sidebarTop }: { space: Space; sidebarTop?: React.ReactNode }) {
  const config = spaceConfig[space];
  return (
    <>
      <header className="sticky top-0 z-30 flex min-h-[72px] items-center gap-4 border-b border-border bg-white/86 px-4 backdrop-blur-md sm:gap-5 sm:px-6">
        <MobileNav space={space} groups={navigation[space]} spaceRoot={config.root} sidebarTop={sidebarTop} />
        <Link href={config.root} className="shrink-0 lg:w-[228px]">
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
      <div className="border-b border-border bg-white px-4 py-2.5 md:hidden">
        <HeaderSearch placeholder={config.search} target={config.searchTarget} mobile />
      </div>
    </>
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
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const pref = typeof window !== "undefined" ? window.localStorage.getItem("acw-sidebar") : null;
      // Rail d'icônes par défaut (façon Clay) : tout visible sans scroll.
      return pref ? pref === "collapsed" : true;
    } catch {
      return true;
    }
  });
  const toggle = () => {
    setCollapsed((c) => {
      try {
        window.localStorage.setItem("acw-sidebar", c ? "expanded" : "collapsed");
      } catch {
        /* stockage indisponible */
      }
      return !c;
    });
  };
  const main = (
    <main id="contenu" className="flex min-w-0 flex-1 flex-col gap-5 px-4 pt-6 pb-12 sm:px-8">
      {children}
    </main>
  );

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ref-ink focus:shadow-lg"
      >
        Aller au contenu
      </a>
      {space === "admin" ? (
        // Administration : la barre latérale occupe toute la hauteur (écran 03).
        <div className="flex flex-1">
          <Sidebar space={space} sidebarTop={sidebarTop} collapsed={collapsed} onToggle={toggle} />
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
            <Sidebar space={space} sidebarTop={sidebarTop} collapsed={collapsed} onToggle={toggle} />
            {main}
          </div>
        </>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
}
