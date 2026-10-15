import { cn } from "@/lib/utils";

// Progression par étapes (besoins, introductions) : barres pleines jusqu'à l'étape courante.
export function StageTrack({
  stages,
  current,
  label,
  size = "sm",
}: {
  stages: { label: string; date?: string }[];
  current: number; // nombre d'étapes atteintes
  label: string;
  size?: "sm" | "md";
}) {
  return (
    <ol aria-label={label} className="grid gap-2" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map((stage, index) => {
        const reached = index < current;
        const isCurrent = index === current - 1;
        return (
          <li key={stage.label} aria-current={isCurrent ? "step" : undefined} className="flex min-w-0 flex-col gap-1.5">
            <span aria-hidden className={cn("h-1.5 rounded-full", reached ? "bg-action" : "bg-field-border")} />
            <span
              className={cn(
                "truncate",
                size === "sm" ? "text-xs" : "text-sm",
                isCurrent ? "font-semibold text-action" : reached ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {stage.label}
              <span className="sr-only">{reached ? " (atteinte)" : " (à venir)"}</span>
            </span>
            {stage.date ? <span className="text-xs text-muted-foreground">{stage.date}</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
