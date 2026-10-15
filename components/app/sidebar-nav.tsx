"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { isActive, type NavGroup } from "@/lib/navigation";

export function SidebarNav({
  groups,
  spaceRoot,
  onNavigate,
  collapsed = false,
}: {
  groups: NavGroup[];
  spaceRoot: string;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  // Navigation groupée (Administration) : éléments compacts et compteurs en pastilles (écran 03).
  const compact = groups.some((group) => group.title);

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group, index) => (
        <div key={group.title ?? index} className="flex flex-col gap-0.5">
          {group.title && !collapsed ? (
            <span className="px-3 pb-0.5 text-[11px] font-semibold tracking-[0.08em] text-ref-muted uppercase">
              {group.title}
            </span>
          ) : null}
          {group.items.map((item) => {
            const active = isActive(pathname, item.href, spaceRoot);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                aria-label={collapsed ? item.label : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl transition-colors duration-(--duration-fast) outline-none focus-visible:ring-2 focus-visible:ring-ref-blue/40",
                  collapsed
                    ? "size-11 justify-center"
                    : compact
                      ? "h-9 px-3 text-sm"
                      : "h-10 px-3 text-[15px]",
                  active
                    ? "bg-ref-chip font-semibold text-ref-ink"
                    : "font-medium text-ref-muted hover:bg-black/[0.04] hover:text-ref-ink",
                )}
              >
                <Icon aria-hidden className="size-5 shrink-0" strokeWidth={1.75} />
                {collapsed ? null : <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                {item.badge && !collapsed ? (
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      compact
                        ? "min-w-5 rounded-full px-1.5 py-px text-center font-semibold tabular-nums"
                        : "text-ref-muted",
                      compact && (active ? "bg-ref-ink text-white" : "bg-ref-chip text-ref-ink"),
                      !compact && active && "text-ref-ink",
                    )}
                    aria-label={`${item.badge} en attente`}
                  >
                    {item.badge}
                  </span>
                ) : null}
                {item.badge && collapsed ? (
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-ref-ink text-[10px] font-bold text-white tabular-nums",
                    )}
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
