import { cn } from "@/lib/utils";

export interface Column<T> {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
  /** Affiché comme titre de la carte sur mobile. */
  primary?: boolean;
}

// Tableau sur écran large, liste de cartes sur mobile (docs/design-system.md §6).
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
}: {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption: string;
}) {
  const primary = columns.find((column) => column.primary) ?? columns[0];
  const secondary = columns.filter((column) => column !== primary);

  return (
    <>
      <div className="relative hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-border">
              {columns.map((column) => (
                <th
                  key={column.header}
                  scope="col"
                  className={cn(
                    "px-5 py-3 text-[11px] font-semibold tracking-[0.1em] whitespace-nowrap text-muted-foreground uppercase first:pl-6 last:pr-6",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-border transition-colors last:border-0 hover:bg-[#f8f8f8]">
                {columns.map((column) => (
                  <td key={column.header} className={cn("px-5 py-4 align-middle text-foreground first:pl-6 last:pr-6", column.className)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex flex-col md:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={rowKey(row)} className="flex flex-col gap-2 border-b border-border px-5 py-4 last:border-0">
            <div className="text-[15px] font-semibold text-foreground">{primary.cell(row)}</div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
              {secondary.map((column) => (
                <div key={column.header} className="contents">
                  <dt className="text-muted-foreground">{column.header}</dt>
                  <dd className="min-w-0 text-foreground">{column.cell(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
