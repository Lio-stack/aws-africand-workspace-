import { Fragment } from "react";

export function PageHeader({
  breadcrumb,
  title,
  description,
  actions,
  demo = true,
}: {
  breadcrumb: string[];
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  demo?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <nav aria-label="Fil d'Ariane">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {breadcrumb.map((crumb, index) => (
            <Fragment key={`${crumb}-${index}`}>
              {index > 0 ? (
                <li aria-hidden className="text-muted-foreground/70">
                  ›
                </li>
              ) : null}
              <li aria-current={index === breadcrumb.length - 1 ? "page" : undefined} className={index === breadcrumb.length - 1 ? "text-foreground" : undefined}>
                {crumb}
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h1 className="text-[26px] leading-tight font-bold tracking-[-0.02em] text-foreground sm:text-[30px]">{title}</h1>
          {description ? <p className="max-w-3xl text-base text-muted-foreground">{description}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {demo ? <DemoBadge /> : null}
          {actions}
        </div>
      </div>
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="rounded-full border border-action px-3 py-1 text-xs font-semibold whitespace-nowrap text-action">
      Données fictives, à titre de démonstration
    </span>
  );
}
