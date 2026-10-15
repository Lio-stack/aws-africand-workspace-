"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { isActive, type NavGroup } from "@/lib/navigation";

export function SidebarNav({
  groups,
  spaceRoot,
  onNavigate,
}: {
  groups: NavGroup[];
  spaceRoot: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  // Navigation groupée (Administration) : éléments compacts et compteurs en pastilles (écran 03).
  const compact = groups.some((group) => group.title);

  return (
    <div className="flex flex-col gap-5">
      {groups.map((group, index) => (
        <div key={group.title ?? index} className="flex flex-col gap-1">
          {group.title ? (
            <span className="px-3 pb-1 text-[11px] font-semibold tracking-[0.08em] text-white/50 uppercase">
              {group.title}
            </span>
          ) : null}
          {group.items.map((item) => {
            const active = isActive(pathname, item.href, spaceRoot);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-[10px] px-3 transition-colors duration-(--duration-fast) outline-none focus-visible:ring-2 focus-visible:ring-nav-indicator",
                  compact ? "h-10 text-sm" : "h-11 text-[15px]",
                  active
                    ? "bg-white/12 font-semibold text-white before:absolute before:inset-y-2.5 before:left-0 before:w-[3px] before:rounded-r-[3px] before:bg-nav-indicator"
                    : "font-medium text-white/74 hover:bg-white/7 hover:text-white",
                )}
              >
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge ? (
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      compact ? "min-w-5 rounded-full bg-white px-1.5 py-px text-center font-semibold text-foreground" : "text-white/55",
                    )}
                    aria-label={`${item.badge} en attente`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
