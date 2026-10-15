import Link from "next/link";
import { ArrowUpRight, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sparkline } from "./charts";

export { AreaChart, BarRow, Donut, Sparkline } from "./charts";

/* ------------------------------------------------------------------ */
/* ACW Web — style référence mobile (blanc / bleu / gris).             */
/* Titre noir franc, recherche gris clair, pills bleu plein,           */
/* badges gris #F1F2F4, boutons outline bleu, lignes épurées.          */
/* Aucun doré, aucun vert/rouge vif.                                   */
/* Graphiques interactifs : voir ./charts.tsx (tooltips au survol).    */
/* ------------------------------------------------------------------ */

export type KpiProProps = {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
  spark?: number[];
  icon: LucideIcon;
  href?: string;
  cta?: string;
};

export function KpiPro({ label, value, sub, delta, deltaTone = "up", spark, icon: Icon, href, cta }: KpiProProps) {
  const DeltaIcon = deltaTone === "down" ? TrendingDown : TrendingUp;
  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-ref-chip text-ref-muted">
          <Icon aria-hidden className="size-5" />
        </span>
        {delta ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-ref-chip px-2 py-0.5 text-xs font-semibold text-ref-ink tabular-nums">
            <DeltaIcon aria-hidden className="size-3.5 text-ref-ink" />
            {delta}
          </span>
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-3 pt-1">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-sm text-ref-muted">{label}</span>
          <span className="text-[32px] leading-none font-bold tracking-tight text-ref-ink tabular-nums">{value}</span>
          {sub ? <span className="pt-1 text-[13px] text-ref-muted">{sub}</span> : null}
          {cta ? <span className="pt-1 text-sm font-semibold text-ref-ink">{cta}</span> : null}
        </div>
        {spark ? <Sparkline values={spark} tone={deltaTone} label={`Évolution ${label}`} /> : null}
      </div>
    </>
  );
  const cls =
    "flex min-w-0 flex-col gap-3 rounded-2xl border border-ref-line bg-white p-5 shadow-[0_1px_2px_rgb(16_24_40/0.05)] transition-all duration-(--duration-fast) hover:shadow-[0_8px_24px_-12px_rgb(16_24_40/0.18)] hover:-translate-y-px outline-none focus-visible:ring-3 focus-visible:ring-ring/30";
  return href ? (
    <Link href={href} className={cls} aria-label={`${label} : ${value}`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

/* Hero clair façon référence : fond blanc, titre noir franc, sous-titre gris. */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  meta,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  breadcrumb?: string[];
}) {
  return (
    <section
      aria-labelledby="dashboard-title"
      className="rounded-2xl border border-ref-line bg-white px-5 py-6 shadow-[0_1px_2px_rgb(16_24_40/0.05)] sm:px-7 sm:py-7"
    >
      {breadcrumb ? (
        <nav aria-label="Fil d'Ariane" className="pb-3">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ref-muted">
            {breadcrumb.map((item, i) => (
              <li key={item} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden className="text-ref-muted/70">›</span> : null}
                <span aria-current={i === breadcrumb.length - 1 ? "page" : undefined} className={i === breadcrumb.length - 1 ? "text-ref-ink" : undefined}>
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="inline-flex w-fit items-center gap-1.5 rounded-md bg-ref-chip px-2.5 py-1 text-xs font-semibold text-ref-ink">
            {eyebrow}
          </p>
          <h1 id="dashboard-title" className="text-2xl font-bold tracking-tight text-ref-ink text-balance sm:text-[28px]">
            {title}
          </h1>
          {description ? <p className="max-w-2xl text-[15px] text-ref-muted">{description}</p> : null}
          {meta ? <div className="flex flex-wrap items-center gap-2 pt-1">{meta}</div> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-label={title}
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-2xl border border-ref-line bg-white shadow-[0_1px_2px_rgb(16_24_40/0.05)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="text-[17px] font-bold tracking-[-0.01em] text-ref-ink">{title}</h2>
          {subtitle ? <p className="text-[13px] text-ref-muted">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="flex flex-col px-5 pb-5 sm:px-6">{children}</div>
    </section>
  );
}

export function FeedItem({ text, when, tone = "info", icon: Icon }: { text: string; when: string; tone?: "info" | "danger" | "success"; icon?: LucideIcon }) {  return (
    <li className="flex gap-3 border-b border-ref-line px-5 py-3.5 last:border-0 sm:px-6">
      {Icon ? (
        <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-ref-chip text-ref-muted">
          <Icon className="size-4" />
        </span>
      ) : (
      <span
        aria-hidden
        className={cn(
          "mt-2 size-2 shrink-0 rounded-full",
          tone === "danger" ? "bg-navy-950 ring-2 ring-ref-blue/30" : tone === "success" ? "bg-navy-950" : "bg-ref-blue",
        )}
      />
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-[14px] leading-snug text-ref-ink">{text}</span>
        <span className="pt-0.5 text-xs text-ref-muted">{when}</span>
      </span>
      <ArrowUpRight aria-hidden className="mt-1 size-4 shrink-0 text-ref-faint" />
    </li>
  );
}

/* Carte KPI façon maquette : libellé + info, valeur forte, ratios navy, pied de carte. */
export function StatCard({
  label,
  value,
  info,
  ratios,
  footer,
  visual,
  href,
  icon: Icon,
}: {
  label: string;
  value: string;
  info: string;
  ratios?: { k: string; v: string; up: boolean }[];
  footer?: string;
  visual?: React.ReactNode;
  href?: string;
  icon?: LucideIcon;
}) {
  const body = (
    <>
      <div className="flex items-center gap-2.5">
        {Icon ? (
          <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-ref-chip text-ref-muted">
            <Icon className="size-[18px]" />
          </span>
        ) : null}
        <span className="min-w-0 flex-1 text-[15px] text-ref-muted">{label}</span>
        <span title={info} aria-label={info} className="flex size-5 shrink-0 items-center justify-center rounded-full border border-ref-softborder text-xs text-ref-faint">
          i
        </span>
      </div>
      <p className="pt-1 text-[28px] leading-none font-bold tracking-tight text-ref-ink tabular-nums">{value}</p>
      {ratios ? (
        <ul className="flex flex-col gap-1 pt-2 text-sm">
          {ratios.map((r) => (
            <li key={r.k} className="flex items-center gap-2 text-ref-muted">
              {r.k}
              <strong className="font-semibold text-ref-ink tabular-nums">{r.v}</strong>
              <span aria-hidden className={r.up ? "text-ref-ink" : "text-ref-faint"}>{r.up ? "▲" : "▼"}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {visual ? <div className="pt-2">{visual}</div> : null}
      {footer ? (
        <>
          <hr className="mt-3 border-ref-line" />
          <p className="pt-3 text-center text-[15px] font-medium text-ref-ink">{footer}</p>
        </>
      ) : null}
    </>
  );
  const cls =
    "flex min-w-0 flex-col rounded-2xl border border-ref-line bg-white p-5 shadow-[0_1px_2px_rgb(16_24_40/0.05)] transition-all duration-(--duration-fast) hover:shadow-[0_8px_24px_-12px_rgb(16_24_40/0.18)] hover:-translate-y-px outline-none focus-visible:ring-3 focus-visible:ring-ref-blue/30";
  return href ? (
    <Link href={href} className={cls} aria-label={`${label} : ${value}`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
