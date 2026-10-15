import type { Metadata } from "next";

import { PageHeader } from "@/components/app/page-header";
import { SkillsEditor } from "@/components/experts/skills-editor";
import { expertLanguages, expertSectors } from "@/lib/demo/experts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Experts · Compétences" };

// Écran 15 · Experts · Compétences.
export default function CompetencesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={["ACW Experts", "Mon dossier", "Compétences"]}
        title="Compétences"
        description="Cliquez sur un niveau pour le modifier. Le niveau Expert compte davantage dans le score de matching."
      />
      <SkillsEditor />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <section aria-labelledby="secteurs" className="flex flex-col gap-3 rounded-2xl bg-card px-6 py-5 shadow-card">
          <h2 id="secteurs" className="text-lg font-bold">Secteurs</h2>
          <ul className="flex flex-wrap gap-2">
            {expertSectors.map((sector) => (
              <li
                key={sector.name}
                className={cn(
                  "rounded-[10px] px-3.5 py-2 text-sm",
                  sector.selected ? "bg-action text-white" : "border border-field-border text-foreground",
                )}
              >
                {sector.name}
                {sector.selected ? <span className="sr-only"> (sélectionné)</span> : null}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="langues" className="flex flex-col gap-3 rounded-2xl bg-card px-6 py-5 shadow-card">
          <h2 id="langues" className="text-lg font-bold">Langues</h2>
          <dl className="flex flex-col gap-2">
            {expertLanguages.map((language) => (
              <div key={language.name} className="flex justify-between text-[15px]">
                <dt>{language.name}</dt>
                <dd className="text-muted-foreground">{language.level}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
