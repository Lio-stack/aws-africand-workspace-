"use client";

import { cn } from "@/lib/utils";

// Filtres en pastilles (prototype : 40 px, rayon 10 px, actif en bleu d'action).
export function Pills({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === value;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option)}
            className={cn(
              "h-10 rounded-[10px] border px-[18px] text-[15px] transition-colors duration-(--duration-fast) outline-none focus-visible:ring-3 focus-visible:ring-action/25",
              active ? "border-action bg-action text-white" : "border-field-border bg-white text-foreground hover:border-action",
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-11 w-full min-w-0 shrink-0 items-center gap-2.5 rounded-[10px] bg-secondary px-3.5 focus-within:ring-3 focus-within:ring-action/15">
      <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-label">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-placeholder"
      />
    </label>
  );
}
