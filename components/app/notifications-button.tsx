"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { demoNotifications } from "@/lib/demo/notifications";

export function NotificationsButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="relative size-10 rounded-full" aria-label="Notifications">
          <Bell className="size-[22px]" />
          <span aria-hidden className="absolute top-2 right-2.5 size-2 rounded-full bg-notification ring-2 ring-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Données fictives, à titre de démonstration.</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col px-4">
          {demoNotifications.map((notification) => (
            <li key={notification.title} className="flex flex-col gap-0.5 border-b border-border py-3">
              <span className="text-sm font-semibold text-foreground">{notification.title}</span>
              <span className="text-[13px] text-muted-foreground">{notification.when}</span>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
