"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { spaceLabels, type NavGroup, type Space } from "@/lib/navigation";
import { SidebarNav } from "./sidebar-nav";

export function MobileNav({
  space,
  groups,
  spaceRoot,
  sidebarTop,
}: {
  space: Space;
  groups: NavGroup[];
  spaceRoot: string;
  sidebarTop?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="size-11 lg:hidden" aria-label="Ouvrir le menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] max-w-[85vw] gap-5 overflow-y-auto border-0 bg-linear-170 from-navy-800 via-primary to-navy-950 px-4 py-6 text-white"
      >
        <SheetTitle className="px-3 text-white">ACW {spaceLabels[space]}</SheetTitle>
        <SheetDescription className="sr-only">Navigation de l&apos;espace {spaceLabels[space]}</SheetDescription>
        {sidebarTop}
        <SidebarNav groups={groups} spaceRoot={spaceRoot} onNavigate={close} />
        <div className="mt-auto flex flex-col gap-1 border-t border-white/14 pt-4">
          <Link href="/compte" onClick={close} className="flex h-11 items-center rounded-[10px] px-3 text-[15px] text-white/74 hover:bg-white/7">
            Mon compte
          </Link>
          <Link href="/connexion" onClick={close} className="flex h-11 items-center rounded-[10px] px-3 text-[15px] text-white/74 hover:bg-white/7">
            Se déconnecter
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
