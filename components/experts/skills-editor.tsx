"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";

import { expertSkills, type SkillLevel } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

const levels: SkillLevel[] = ["Intermédiaire", "Avancé", "Expert"];
const levelStyles: Record<SkillLevel, string> = {
  Intermédiaire: "bg-secondary text-label",
  Avancé: "bg-action-subtle text-primary",
  Expert: "bg-action text-white",
};

// Écran 15 · Compétences : modifications locales au navigateur (démonstration).
export function SkillsEditor() {
  const [skills, setSkills] = useState(expertSkills);
  const [draft, setDraft] = useState("");

  const add = () => {
    const name = draft.trim();
    if (!name || skills.some((skill) => skill.name.toLowerCase() === name.toLowerCase())) return;
    setSkills([...skills, { name, years: "—", level: "Intermédiaire" }]);
    setDraft("");
  };

  return (
    <section aria-label="Compétences" className="overflow-hidden rounded-2xl bg-card shadow-card">
      <form
        className="flex flex-wrap gap-2.5 border-b border-secondary px-5 py-4 sm:px-6"
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
      >
        <label className="flex h-11 min-w-[240px] flex-1 items-center gap-2.5 rounded-[10px] bg-secondary px-3.5 focus-within:ring-3 focus-within:ring-action/15">
          <Plus aria-hidden className="size-[18px] text-label" />
          <span className="sr-only">Ajouter une compétence</span>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ajouter une compétence, ex. modélisation financière"
            className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-placeholder"
          />
        </label>
        <button type="submit" className="h-11 rounded-[10px] bg-action px-[18px] text-[15px] font-semibold text-white hover:brightness-[.88]">
          Ajouter
        </button>
      </form>
      <ul>
        {skills.map((skill) => (
          <li key={skill.name} className="flex flex-wrap items-center gap-3 border-b border-secondary px-5 py-3.5 last:border-0 sm:px-6">
            <span className="min-w-[200px] flex-1 text-base font-semibold">{skill.name}</span>
            <span className="w-24 text-[13px] text-muted-foreground">{skill.years}</span>
            <button
              type="button"
              aria-label={`Niveau ${skill.level}, cliquer pour changer`}
              onClick={() =>
                setSkills(
                  skills.map((item) =>
                    item.name === skill.name ? { ...item, level: levels[(levels.indexOf(item.level) + 1) % levels.length] } : item,
                  ),
                )
              }
              className={cn("h-9 w-[132px] rounded-full text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-action/25", levelStyles[skill.level])}
            >
              {skill.level}
            </button>
            <button
              type="button"
              aria-label={`Retirer ${skill.name}`}
              onClick={() => setSkills(skills.filter((item) => item.name !== skill.name))}
              className="flex size-10 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-secondary"
            >
              <X className="size-[18px]" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
