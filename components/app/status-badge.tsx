import { cn } from "@/lib/utils";

export type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

const tones: Record<StatusTone, string> = {
  neutral: "bg-secondary text-label",
  info: "bg-secondary text-foreground",
  success: "bg-success/12 text-success",
  warning: "bg-warning/15 text-[#8a4b00]",
  danger: "bg-destructive/10 text-destructive",
};

export function StatusBadge({ tone = "neutral", children }: { tone?: StatusTone; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap", tones[tone])}>
      {children}
    </span>
  );
}
