import Link from "next/link";

import { cn } from "@/lib/utils";

// Carte de contenu ACW : fond blanc, rayon 16 px, ombre douce (prototype).
export function Panel({
  title,
  action,
  children,
  className,
  bodyClassName,
  as: Component = "section",
}: {
  title?: React.ReactNode;
  action?: { label: string; href: string } | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: "section" | "div" | "article" | "aside";
}) {
  const headingId = typeof title === "string" ? `panel-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}` : undefined;
  return (
    <Component
      aria-labelledby={headingId}
      className={cn("flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card shadow-card", className)}
    >
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
          <h2 id={headingId} className="text-lg font-semibold tracking-[-0.01em] text-foreground">
            {title}
          </h2>
          {action && typeof action === "object" && "href" in action ? (
            <Link href={action.href} className="text-[15px] font-semibold text-foreground">
              {action.label}
            </Link>
          ) : (
            (action as React.ReactNode)
          )}
        </div>
      ) : null}
      <div className={cn("flex flex-col", bodyClassName)}>{children}</div>
    </Component>
  );
}

export function KpiCard({
  label,
  value,
  cta,
  href,
  sub,
}: {
  label: string;
  value: string;
  cta?: string;
  href?: string;
  sub?: string;
}) {
  const body = (
    <>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-[30px] leading-tight font-bold tracking-tight text-foreground tabular-nums">{value}</span>
      {sub ? <span className="text-sm text-muted-foreground">{sub}</span> : null}
      {cta ? <span className="text-sm font-semibold text-foreground">{cta}</span> : null}
    </>
  );
  const className =
    "flex min-w-0 flex-col gap-1.5 rounded-2xl bg-card p-5 shadow-card transition-shadow duration-(--duration-fast)";
  return href ? (
    <Link href={href} className={cn(className, "outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/30")}>
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-[13px] text-label", className)}>
      {children}
    </span>
  );
}

export function Meter({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className="h-2 w-full overflow-hidden rounded-full bg-border"
    >
      <div className="h-full rounded-full bg-action" style={{ width: `${value}%` }} />
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
