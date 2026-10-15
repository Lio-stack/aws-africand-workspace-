"use client";

import { useState } from "react";

import { availabilityCalendar, availabilityStatuses } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

const weekdays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

// Écran 17 · Disponibilités : statut, capacité et calendrier mensuel (sélection locale).
export function AvailabilityEditor() {
  const [status, setStatus] = useState<string>("Partiellement disponible");
  const [days, setDays] = useState<number[]>(availabilityCalendar.available);
  const busy = new Set(availabilityCalendar.busy);

  const toggle = (day: number) => {
    if (busy.has(day)) return;
    setDays(days.includes(day) ? days.filter((d) => d !== day) : [...days, day]);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(300px,1fr)_minmax(0,1.6fr)]">
      <section aria-labelledby="statut" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <h2 id="statut" className="text-lg font-bold">Statut</h2>
        <div role="radiogroup" aria-labelledby="statut" className="flex flex-col gap-2">
          {availabilityStatuses.map((item) => {
            const active = status === item.label;
            return (
              <button
                key={item.label}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setStatus(item.label)}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-left outline-none focus-visible:ring-3 focus-visible:ring-action/25",
                  active ? "border-2 border-action bg-[#f4f7fd]" : "border border-field-border bg-white",
                )}
              >
                <span aria-hidden className={cn("size-3 shrink-0 rounded-full", item.color)} />
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold">{item.label}</span>
                  <span className="text-[13px] text-muted-foreground">{item.sub}</span>
                </span>
              </button>
            );
          })}
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
          Jours disponibles par mois
          <input defaultValue="8" inputMode="numeric" className="h-12 rounded-[10px] border border-field-border px-3.5 text-base font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15" />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-semibold text-label">
          Disponible à partir du
          <input defaultValue="[DATE]" className="h-12 rounded-[10px] border border-field-border px-3.5 text-base font-normal text-foreground outline-none focus-visible:border-action focus-visible:ring-3 focus-visible:ring-action/15" />
        </label>
        <div className="flex flex-col gap-2 text-sm font-semibold text-label">
          Mode d&apos;intervention
          <div className="flex flex-wrap gap-2">
            {availabilityCalendar.modes.map((mode) => (
              <span key={mode} className="rounded-[10px] bg-action-subtle px-3 py-1.5 text-sm font-normal text-primary">
                {mode}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section aria-labelledby="calendrier" className="flex flex-col gap-4 rounded-2xl bg-card p-5 shadow-card sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="calendrier" className="text-lg font-bold">{availabilityCalendar.month}</h2>
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {days.length} jours marqués disponibles
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekdays.map((day) => (
            <span key={day} className="text-center text-xs font-semibold text-muted-foreground">
              {day}
            </span>
          ))}
          {Array.from({ length: availabilityCalendar.offset }, (_, i) => (
            <span key={`vide-${i}`} aria-hidden />
          ))}
          {Array.from({ length: availabilityCalendar.days }, (_, i) => {
            const day = i + 1;
            const isBusy = busy.has(day);
            const isOn = days.includes(day);
            return (
              <button
                key={day}
                type="button"
                aria-label={`${day} novembre${isBusy ? ", en mission" : isOn ? ", disponible" : ""}`}
                aria-pressed={isBusy ? undefined : isOn}
                disabled={isBusy}
                onClick={() => toggle(day)}
                className={cn(
                  "h-11 rounded-[10px] text-[15px] outline-none focus-visible:ring-3 focus-visible:ring-action/30 sm:h-[52px]",
                  isBusy ? "bg-[#dbe5f6] text-foreground" : isOn ? "bg-action font-semibold text-white" : "border border-border bg-white text-foreground hover:border-action",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 text-[13px] text-muted-foreground">
          <span className="flex items-center gap-2"><span aria-hidden className="size-3 rounded bg-action" />Disponible</span>
          <span className="flex items-center gap-2"><span aria-hidden className="size-3 rounded bg-[#dbe5f6]" />En mission</span>
          <span className="flex items-center gap-2"><span aria-hidden className="size-3 rounded border border-border bg-white" />Non renseigné</span>
        </div>
      </section>
    </div>
  );
}
